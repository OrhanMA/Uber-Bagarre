<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\FightRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;


#[ORM\Entity(repositoryClass: FightRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
    // security: "is_granted('ROLE_USER')",
    // operations: [
    //     new Get(
    //         security: "is_granted('ROLE_USER')",
    //         securityMessage: 'Sorry, but you are not the Fight user or admin.'
    //     ),
    //     new GetCollection(
    //         security: "is_granted('ROLE_USER')",
    //         securityMessage: 'Sorry, but you are not the Fight user or admin.'
    //     ),
    //     new Put(
    //         securityPostDenormalize: "is_granted('ROLE_ADMIN') or (object.user == user and previous_object.user == user)",
    //         securityPostDenormalizeMessage: 'Sorry, but you are not the actual Fight user or admin.'
    //     ),
    //     new Patch(
    //         securityPostDenormalize: "is_granted('ROLE_ADMIN') or (object.user == user and previous_object.user == user)",
    //         securityPostDenormalizeMessage: 'Sorry, but you are not the actual Fight user or admin.'
    //     ),
    //     new Post(
    //         security: "is_granted('ROLE_USER') or is_granted('ROLE_ADMIN')",
    //         securityMessage: 'Only signed in users and admins can add books.'
    //     )
    // ]
)]
// #[ApiFilter(SearchFilter::class, properties: ['user.id' => 'exact'])]
class Fight
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['read', "write"])]
    private ?string $title = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['read', "write"])]
    private ?string $message = null;

    #[ORM\Column]
    #[Groups(['read', "write"])]
    private ?int $fighters_needed = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['read', "write"])]
    private ?string $address = null;

    #[ORM\Column]
    #[Groups(['read', "write"])]
    private ?bool $is_fighting = false;

    #[ORM\Column]
    #[Groups(['read', "write"])]
    private ?bool $cover = null;

    #[ORM\Column]
    #[Groups(['read'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read'])]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'fights')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['read', "write"])]
    private ?User $user = null;

    /**
     * @var Collection<int, Category>
     */
    #[ORM\ManyToMany(targetEntity: Category::class, inversedBy: 'fights')]
    #[Groups(['read', "write"])]
    private Collection $categories;

    /**
     * @var Collection<int, Fighter>
     */
    #[ORM\ManyToMany(targetEntity: Fighter::class, inversedBy: 'fights')]
    #[Groups(['read', "write"])]
    private Collection $fighters;

    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->fighters = new ArrayCollection();
        $this->created_at = new \DateTimeImmutable();
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
