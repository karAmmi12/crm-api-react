<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Invoice;
use App\Entity\Customer;
use App\Entity\InvoiceDetail;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    /**
     * le hasher des mots de passe
     *
     * @var UserPasswordHasherInterface
     */
    private $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        

        for ($u=0; $u < 10; $u++) { 
            $user = new User();
            $invNumber = 1;
            $hash = $this->hasher->hashPassword($user, "password");

            $user->setFirstName($faker->firstName())
                 ->setLastName($faker->lastName())
                 ->setemail($faker->email)
                 ->setPassword($hash);

            $manager->persist($user);

            for ($c=0; $c < mt_rand(5,20) ; $c++) { 
                $customer = new Customer();
                $customer->setFirstName($faker->firstName())
                         ->setLastName($faker->firstName())
                         ->setCompany($faker->company())
                         ->setEmail($faker->email())
                         ->setAddress($faker->address())
                         ->setPhone($faker->phoneNumber())
                         ->setUser($user);
                         
                $manager->persist($customer);
    
                for ($i=0; $i < mt_rand(3,10) ; $i++) { 
                    $invoice = new Invoice();
                    $invoice
                            ->setSentAt($faker->dateTimeBetween('-6 months'))
                            ->setStatus($faker->randomElement(['SENT','PAID' ,'CANCELLED']))
                            ->setInvNumber($invNumber)
                            ->setCustomer($customer);
                    
                    $total=0;
                    for ($d=0; $d < mt_rand(2,5) ; $d++) { 
                        $invoiceDt = new InvoiceDetail();
                        
                        $invoiceDt->setDescription("description de l'article ".$d)
                                ->setPrice($faker->randomFloat(2, 50, 200))
                                ->setQuantity(mt_rand(1,5))
                                ->setItemAmount(($invoiceDt->getPrice())*($invoiceDt->getQuantity()))
                                ->setInvoice($invoice);
                        
        
                        $manager->persist($invoiceDt);
                        $total=$total+($invoiceDt->getItemAmount());
                       
                    }
                    $invoice->setAmount($total);

                    $invNumber++;
    
                    $manager->persist($invoice);
                }
    
            }

        }


        $manager->flush();
    }
}
