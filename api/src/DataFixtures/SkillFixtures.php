<?php

namespace App\DataFixtures;

use App\Entity\Skill;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class SkillFixtures extends Fixture
{

  public function load(ObjectManager $manager): void
  {
    $skills = ['Gros biceps', 'MMA', 'Judo', 'Boxe', 'Planteur', 'Home run', 'Catch', 'Gros crâne', 'Kickeur', 'Poing fatal', 'Furtif', 'Sournois', 'Rentre dans le tas', 'Grand fou', 'Bourrin', 'Assassin', 'Plaquage', 'Tacleur', 'Sprinteur'];

    foreach ($skills as $key => $skill) {
      $newSkill = new Skill();
      $newSkill->setName($skill);
      $newSkill->setCreatedAt(new \DateTimeImmutable());
      $newSkill->setUpdatedAt(new \DateTimeImmutable());
      $manager->persist($newSkill);
      $this->addReference('skill_' . $key, $newSkill);
    }

    $manager->flush();
  }
}
