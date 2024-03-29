<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CustomerRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[ApiResource(
    collectionOperations: ["GET","POST"],
    itemOperations: ["GET","PUT","DELETE"],
    
    normalizationContext: ['groups' => ['customers_read']]
)]
#[ApiFilter(SearchFilter::class)]
#[ApiFilter(OrderFilter::class)]
class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["customers_read","invoices_read"])]
    
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customers_read","invoices_read"])]
    #[Assert\NotBlank(message:"le prénom est obligatoire!")]
    #[Assert\Length(
        min:3,
        max:150, 
        minMessage:"le prénom doit faire entre 3 et 150 caractères",
        maxMessage:"le prénom doit faire entre 3 et 150 caractères")]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customers_read","invoices_read"])]
    #[Assert\NotBlank(message:"le nom est obligatoire!")]
    #[Assert\Length(
        min:3,
        max:150, 
        minMessage:"le nom doit faire entre 3 et 150 caractères",
        maxMessage:"le nom doit faire entre 3 et 150 caractères")]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customers_read","invoices_read"])]
    #[Assert\NotBlank(message:"l'email est obligatoire!")]
    #[Assert\Email(message:"le format de l'email doit être valide!")]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["customers_read","invoices_read"])]
    private ?string $company = null;

    #[ORM\OneToMany(mappedBy: 'customer', targetEntity: Invoice::class)]
    #[Groups(["customers_read"])]
    #[ApiSubresource]
    private Collection $invoices;

    #[ORM\ManyToOne(inversedBy: 'customers')]
    #[Groups(["customers_read"])]
    #[Assert\NotBlank(message:"l'utilisateur est obligatoire!")]
    private ?User $user = null;


    #[ORM\Column(length: 20, nullable: true)]
    #[Groups(["customers_read","invoices_read"])]
    private ?string $phone = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["customers_read","invoices_read"])]
    private ?string $address = null;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    /**
     * Récuperer le total des invoices
     * @Groups({"customers_read"})
     * @return float
     */
    public function getTotalAmount():float{
        return array_reduce($this->invoices->toArray(),function($total, $invoice){
            return $total + $invoice->getAmount();
        }, 0);
    }

    /**
     * Récupérer le total non payé
     * @Groups({"customers_read"})
     * @return float
     */
    public function getUnpaidAmount():float{
        return array_reduce($this->invoices->toArray(),function($total, $invoice){
            return $total + ($invoice->getStatus()==="PAID" || $invoice->getStatus()==="CANCELED" ? 0 : $invoice->getAmount());
        }, 0);
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

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

    /**
     * @return Collection<int, Invoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices->add($invoice);
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }
}
