<?php

namespace App\DataFixtures;

use Faker\Factory;
use Faker\Generator;
use App\Entity\Fighter;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class FighterFixtures extends Fixture implements DependentFixtureInterface
{

  protected Generator $faker;

  public function __construct()
  {
    $this->faker = Factory::create('fr_FR');
  }


  public function load(ObjectManager $manager): void
  {

    $fighters = [
      [
        'name' => 'Shadowblade',
        'imagePath' => 'shadowblade',
        'description' => 'Un combattant agile et furtif, maître dans l\'art des attaques surprises et des esquives.'
      ],
      [
        'name' => 'Ironclad Titan',
        'imagePath' => 'ironclad-titan',
        'description' => 'Un colosse de fer, résistant aux assauts les plus puissants et capable d\'écraser ses ennemis.'
      ],
      [
        'name' => 'Stormbringer',
        'imagePath' => 'stormbringer',
        'description' => 'Un maître des éléments, capable de déchaîner la foudre et le vent pour terrasser ses adversaires.'
      ],
      [
        'name' => 'Blademaster',
        'imagePath' => 'blademaster',
        'description' => 'Un expert du maniement des armes, capable de découper ses ennemis en morceaux avec une précision mortelle.'
      ],
      [
        'name' => 'Soulreaper',
        'imagePath' => 'soulreaper',
        'description' => 'Un chasseur implacable, traquant ses proies sans relâche pour les emporter vers les abysses.'
      ],
      [
        'name' => 'Phoenix Knight',
        'imagePath' => 'phoenix-knight',
        'description' => 'Un protecteur sacré, doté du pouvoir de régénération et capable de renaître de ses cendres tel un phénix.'
      ],
      [
        'name' => 'Duskblade',
        'imagePath' => 'duskblade',
        'description' => 'Un guerrier nocturne, maniant une lame trempée dans les ténèbres et capable d\'aveugler ses ennemis.'
      ],
      [
        'name' => 'Frostbite',
        'imagePath' => 'frostbite',
        'description' => 'Un maître du froid, gelant ses ennemis jusqu\'à leur cœur et les laissant mourir dans la glace.'
      ],
      [
        'name' => 'Bloodfang',
        'imagePath' => 'bloodfang',
        'description' => 'Un prédateur féroce, avide de sang et capable de mordre ses ennemis'
      ],
      [
        'name' => 'Firestorm',
        'imagePath' => 'firestorm',
        'description' => 'Un maître du feu, capable d\'embraser ses adversaires et de réduire ses ennemis en cendres.'
      ]
    ];

    foreach ($fighters as $key => $fighter) {
      $newFighter = new Fighter();
      $newFighter->setName($fighter['name']);
      $newFighter->setDescription($fighter['description']);
      $newFighter->setCreatedAt(new \DateTimeImmutable());
      // $newFighter->setImageName("/public/images/" . $fighter['imagePath'] . ".webp");
      $newFighter->setImageName("fighter-662a82a0900b1394283995.jpeg");
      $newFighter->addSkill($this->getReference('skill_' . $this->faker->numberBetween(0, 18)));
      $manager->persist($newFighter);
      $this->addReference('fighter_' . $key, $newFighter);
    }
    $manager->flush();
  }

  public function getDependencies()
  {
    return [
      SkillFixtures::class,
    ];
  }
}
