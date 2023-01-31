<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['users_read']]
)]
#[UniqueEntity('email', message:"Un utilisateur ayant cette email existe déjà!")]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["invoices_read","customers_read",'users_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(["invoices_read","customers_read",'users_read'])]
    #[Assert\NotBlank(message:"l'email est obligatoire!")]
    #[Assert\Email(message:"le format de l'email doit être valide!")]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];
    

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Assert\NotBlank(message:"le mot de passe est obligatoire!")]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(["invoices_read","customers_read",'users_read'])]
    #[Assert\NotBlank(message:"le prénom est obligatoire!")]
    #[Assert\Length(
        min:3,
        max:150, 
        minMessage:"le prénom doit faire entre 3 et 150 caractères",
        maxMessage:"le prénom doit faire entre 3 et 150 caractères")]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["invoices_read","customers_read",'users_read'])]
    #[Assert\NotBlank(message:"le nom est obligatoire!")]
    #[Assert\Length(
        min:3,
        max:150, 
        minMessage:"le nom doit faire entre 3 et 150 caractères",
        maxMessage:"le nom doit faire entre 3 et 150 caractères")]
    private ?string $lastName = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Customer::class)]
    private Collection $customers;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["invoices_read","customers_read","users_read"])]
    private ?string $adresse = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["invoices_read","customers_read","users_read"])]
    private ?string $company = null;

    #[ORM\Column(length: 30, nullable: true)]
    #[Groups(["invoices_read","customers_read","users_read"])]
    private ?string $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["invoices_read","customers_read","users_read"])]
    private ?string $logo = "";

    #[ORM\Column(length: 20, nullable: true)]
    #[Groups(["invoices_read","customers_read","users_read"])]
    private ?string $siret = null;


    public function __construct()
    {
        $this->customers = new ArrayCollection();
        
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection<int, Customer>
     */
    public function getCustomers(): Collection
    {
        return $this->customers;
    }

    public function addCustomer(Customer $customer): self
    {
        if (!$this->customers->contains($customer)) {
            $this->customers->add($customer);
            $customer->setUser($this);
        }

        return $this;
    }

    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            // set the owning side to null (unless already changed)
            if ($customer->getUser() === $this) {
                $customer->setUser(null);
            }
        }

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    
    public function getLogo(): ?string
    {
        
        return $this->logo;
    }

    public function setLogo(?string $logo): self
    {
        $this->logo = $logo;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(?string $siret): self
    {
        $this->siret = $siret;

        return $this;
    }

    

    

    
}
