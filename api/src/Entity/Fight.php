<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FightRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: FightRepository::class)]
#[ApiResource]
class Fight
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $message = null;

    #[ORM\Column]
    private ?int $fighters_needed = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address = null;

    #[ORM\Column]
    private ?bool $is_fighting = null;

    #[ORM\Column]
    private ?bool $cover = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'fights')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    /**
     * @var Collection<int, Category>
     */
    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'fights')]
    private Collection $categories;

    /**
     * @var Collection<int, Fighter>
     */
    #[ORM\ManyToMany(targetEntity: Fighter::class, inversedBy: 'fights')]
    private Collection $fighters;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->fighters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function getFightersNeeded(): ?int
    {
        return $this->fighters_needed;
    }

    public function setFightersNeeded(int $fighters_needed): static
    {
        $this->fighters_needed = $fighters_needed;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function isFighting(): ?bool
    {
        return $this->is_fighting;
    }

    public function setFighting(bool $is_fighting): static
    {
        $this->is_fighting = $is_fighting;

        return $this;
    }

    public function isCover(): ?bool
    {
        return $this->cover;
    }

    public function setCover(bool $cover): static
    {
        $this->cover = $cover;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategory(Category $category): static
    {
        if (!$this->categories->contains($category)) {
            $this->categories->add($category);
        }

        return $this;
    }

    public function removeCategory(Category $category): static
    {
        $this->categories->removeElement($category);

        return $this;
    }

    /**
     * @return Collection<int, Fighter>
     */
    public function getFighters(): Collection
    {
        return $this->fighters;
    }

    public function addFighter(Fighter $fighter): static
    {
        if (!$this->fighters->contains($fighter)) {
            $this->fighters->add($fighter);
        }

        return $this;
    }

    public function removeFighter(Fighter $fighter): static
    {
        $this->fighters->removeElement($fighter);

        return $this;
    }
}
