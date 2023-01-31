<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceDetailRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InvoiceDetailRepository::class)]
#[ApiResource(
    

    normalizationContext: ['groups' => ['invoices_dt_read']],
    denormalizationContext: ['disable_type_enforcement' => true ]

    
)]
class InvoiceDetail
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['invoices_dt_read',"invoices_read","customers_read"])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'invoiceDetails')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invoices_dt_read'])]
    private ?Invoice $invoice = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices_dt_read',"invoices_read","customers_read"])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['invoices_dt_read',"invoices_read","customers_read"])]
    private ?int $quantity = null;

    #[ORM\Column]
    #[Groups(['invoices_dt_read',"invoices_read","customers_read"])]
    private ?float $price = null;

    #[ORM\Column]
    #[Groups(['invoices_dt_read',"invoices_read","customers_read"])]
    private ?float $itemAmount = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getInvoice(): ?Invoice
    {
        return $this->invoice;
    }

    public function setInvoice(?Invoice $invoice): self
    {
        $this->invoice = $invoice;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getItemAmount(): ?float
    {
        return $this->itemAmount;
    }

    public function setItemAmount(float $itemAmount): self
    {
        $this->itemAmount = $itemAmount;

        return $this;
    }
}
