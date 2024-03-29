<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource(
    attributes: 
        ["pagination_enabled" => false,
         "pagination_items_per_page" => 20,
         "order"=> ["sentAt" => "desc"]
         
        ],
    
    normalizationContext: ['groups' => ['invoices_read']],
    denormalizationContext: ['disable_type_enforcement' => true ]

    
)]
class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["invoices_read","customers_read",'invoices_dt_read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(["invoices_read","customers_read",'invoices_dt_read'])]
    #[Assert\NotBlank(message:"le montant de la facture est obligatoire!")]
    #[Assert\Type(
        type: 'numeric',
        message: "le montant doit être un chiffre!"
    )]
    private $amount = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(["invoices_read","customers_read"])]
    
    #[Assert\NotBlank(message:"la date d'envoie doit être renseignée!")]

    private ?\DateTimeInterface $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(["invoices_read","customers_read"])]
    #[Assert\NotBlank(message:"le status doit être renseigné !")]
    #[Assert\Choice(['PAID', 'CANCELLED', 'SENT'])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["invoices_read"])]
    #[Assert\NotBlank(message:"le client de la facture doit être renseigné !")]
    private ?Customer $customer = null;

    #[ORM\Column]
    #[Groups(["invoices_read","customers_read"])]
    #[Assert\NotBlank(message:"le numero de la facture doit être renseigné!")]
    #[Assert\Type(
        type: 'integer',
        message: "le numero doit être un entier!"
    )]
    private ?int  $invNumber = null;

    #[ORM\OneToMany(mappedBy: 'invoice', targetEntity: InvoiceDetail::class)]
    private Collection $invoiceDetails;

    public function __construct()
    {
        $this->invoiceDetails = new ArrayCollection();
    }

    /**
     * Récuperer le user à qui appartient la facture
     * @Groups({"invoices_read"})
     * @return User
     */
    public function getUser() : User {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getInvNumber(): ?int
    {
        return $this->invNumber;
    }

    public function setInvNumber($invNumber): self
    {
        $this->invNumber = $invNumber;

        return $this;
    }

    /**
     * @Groups({"invoices_read"})
     * @return Collection<int, InvoiceDetail>
     */
    public function getInvoiceDetails(): Collection
    {
        return $this->invoiceDetails;
    }

    public function addInvoiceDetail(InvoiceDetail $invoiceDetail): self
    {
        if (!$this->invoiceDetails->contains($invoiceDetail)) {
            $this->invoiceDetails->add($invoiceDetail);
            $invoiceDetail->setInvoice($this);
        }

        return $this;
    }

    public function removeInvoiceDetail(InvoiceDetail $invoiceDetail): self
    {
        if ($this->invoiceDetails->removeElement($invoiceDetail)) {
            // set the owning side to null (unless already changed)
            if ($invoiceDetail->getInvoice() === $this) {
                $invoiceDetail->setInvoice(null);
            }
        }

        return $this;
    }
}
