<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Faker\Generator;
use App\Entity\Fight;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class FightFixtures extends Fixture implements DependentFixtureInterface
{
  protected Generator $faker;
  protected $passwordHasher;

  public function __construct(UserPasswordHasherInterface $passwordHasher)
  {
    $this->faker = Factory::create('fr_FR');
    $this->passwordHasher = $passwordHasher;
  }

  public function load(ObjectManager $manager): void
  {

    $admin = new User();
    $admin->setUsername('admin');
    $admin->setEmail('admin@uberbagarre.com');
    $admin->setRoles(['ROLE_ADMIN']);
    $admin->setPassword($this->passwordHasher->hashPassword($admin, 'admin1234'));
    $admin->setCreatedAt(new \DateTimeImmutable());

    $manager->persist($admin);

    for ($i = 0; $i < 10; $i++) {
      $user = new User();
      $user->setUsername($this->faker->userName());
      $user->setEmail($this->faker->email());
      $user->setRoles(['ROLE_ADMIN']);
      $user->setPassword($this->passwordHasher->hashPassword($user, $this->faker->password()));
      $user->setCreatedAt(new \DateTimeImmutable());

      $manager->persist($user);
      $this->addReference('user_' . $i, $user);
    }

    $manager->flush();


    for ($i = 0; $i < 10; $i++) {
      $fight = new Fight();
      $fight->setUser($this->getReference('user_' . $this->faker->numberBetween(0, 9)));
      $fight->addCategory($this->getReference('category_' . $this->faker->numberBetween(0, 20)));
      $fight->addFighter($this->getReference('fighter_' . $this->faker->numberBetween(0, 9)));
      $fight->setTitle($this->faker->sentence());
      $fight->setMessage($this->faker->text());
      $fight->setAddress($this->faker->address());
      $fight->setFightersNeeded($this->faker->numberBetween(1, 10));
      $fight->setFighting($this->faker->numberBetween(0, 1));
      $fight->setCover($this->faker->numberBetween(0, 1));
      $fight->setCreatedAt(new \DateTimeImmutable());

      $manager->persist($fight);
      $this->addReference('fight_' . $i, $fight);
    }

    $manager->flush();
  }

  public function getDependencies()
  {
    return [
      CategoryFixtures::class,
      FighterFixtures::class
    ];
  }
}
