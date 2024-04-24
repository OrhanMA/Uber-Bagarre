<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{

  public function load(ObjectManager $manager): void
  {

    $categories =  ['Revanche', 'Descente', 'Tchétchene', 'Bonhomme', 'Réglement de compte', 'Coup de pression', 'Démonstration de force', 'Guerre de gang', 'Protection rapprochée', 'Casseur', 'Manifestation', 'Hooligan', 'MMA', 'À la loyale', 'En traitre', 'Battle royale', 'Recherche et descrution', "Abattre l'ennemi", 'Russes', 'Ghetto', 'Favelas'];

    foreach ($categories as $key => $category) {
      $newCategory = new Category();
      $newCategory->setName($category);
      $newCategory->setCreatedAt(new \DateTimeImmutable());
      $newCategory->setUpdatedAt(new \DateTimeImmutable());
      $manager->persist($newCategory);
      $this->addReference('category_' . $key, $newCategory);
    }

    $manager->flush();
  }
}
