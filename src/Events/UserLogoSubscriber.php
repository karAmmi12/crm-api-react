<?php

namespace App\Events;


use App\Repository\InvoiceRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Logo;
use App\Entity\MediaObject;
use App\Entity\User;
use App\Repository\LogoRepository;
use App\Repository\UserRepository;
use SebastianBergmann\Type\ObjectType;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use function PHPUnit\Framework\stringContains;

class UserLogoSubscriber implements EventSubscriberInterface {

    private $security;
    private $userRepository;
    
    
    

    public function __construct(Security $security, userRepository $userRepository )
    {
        $this->security = $security;
        $this->userRepository = $userRepository;

    }
    
    
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['getLogoPath', EventPriorities::POST_WRITE ]
            // KernelEvents::VIEW => ['setLogoPath', EventPriorities::PRE_VALIDATE ]
        ];
    }
    // public static function getSubscribedEvents2()
    // {
    //     return [
    //         KernelEvents::VIEW => ['setLogoPath', EventPriorities::PRE_VALIDATE ]
            
    //     ];
    // }
    

    public function getLogoPath(ViewEvent $event){

        
        
        $file = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $user = $this->security->getUser();
       
        
        

        

        if($file instanceof MediaObject && $method === "POST")
        {
        

             $logoPath = $file->{'filePath'};
             
            if($user instanceof User){
                

                $user->setLogo($logoPath);

                $this->userRepository->add($user, true);
                
             
            }
           
            
             
             

             
             


            }
        
            
             
           
            
            
            
            

            // if($file  instanceof User && $method === "PUT" ){
                
                
            //         $file->setLogo($this->$logo);
            //         //j'envoie a la BDD la mise à jour
                    
                    
                    
                
            //    $this->userRepository->add($file, true);
            // }
        
    }
    
    
    
    
    // public function setLogoPath(ViewEvent $event){

        
    //     $user = $event->getControllerResult();
    //     $method = $event->getRequest()->getMethod();
    //    ;
        

    //     if($user instanceof User && $method === "PUT")
    //     {
    //     //     //on a besoin de l'utilisateur actuellement connecté (security)
    //     //     // on a besoin du repository des factures (InvoiceRepository)
    //     //     //recuperer la derniere facture qui a été inserée et choper son InvNumber
    //     //     // incrementer l'InvNumber de la nouvelle facture au dernier invNumber récupéré

    //     //     // $nextInvNumber = $this->invoiceRepository->findNextInvNumber($this->security->getUser());
    //     //     // $invoice->setInvNumber($nextInvNumber);

    //     //     // if(empty($invoice->getSentAt())){
    //     //     //     $invoice->setSentAt(new DateTime());

    //          // debut code pour ajouter une photo
             
             
    //          $user = $event->getControllerResult();
    //          $user->setPhone('000000');

             
             
             
             

    //         }

        

        
    // }
}