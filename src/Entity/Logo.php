<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Events\UserLogoSubscriber;
use App\Repository\LogoRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: LogoRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['logos_read']],
    collectionOperations: [
        'get',
        'post' => [
            
            'deserialize' => false,
            
        ],
    ]
)]

class Logo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["users_read","logos_read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["users_read","logos_read"])]
    private ?string $logo = null;

    #[ORM\ManyToOne(inversedBy: 'logo')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(string $logo): self
    {
        $this->logo = $logo;

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
}
