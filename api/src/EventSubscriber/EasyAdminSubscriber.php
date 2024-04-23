<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityUpdatedEvent;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityPersistedEvent;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class EasyAdminSubscriber implements EventSubscriberInterface
{
  private $passwordHasher;

  public function __construct(UserPasswordHasherInterface $passwordHasher)
  {
    $this->passwordHasher = $passwordHasher;
  }

  public static function getSubscribedEvents()
  {
    return [
      BeforeEntityUpdatedEvent::class =>  [
        ['setUpdateDate'],
        ['hashUserPassword']
      ],
      BeforeEntityPersistedEvent::class => ['hashUserPassword'],
    ];
  }

  /**
   * Met automatiquement à jour la date d'update d'une entité lors de son update
   */
  public function setUpdateDate(BeforeEntityUpdatedEvent $event)
  {
    $entity = $event->getEntityInstance();
    $entity->setUpdatedAt(new \DateTimeImmutable());
    return;
  }

  /**
   *  Hash le password du user avant de déclencher persist/update 
   */
  public function hashUserPassword($event)
  {
    $entity = $event->getEntityInstance();

    if (!($entity instanceof User) || !$entity->getPassword()) {
      return;
    }

    $plainPassword = $entity->getPassword();
    $hashedPassword = $this->passwordHasher->hashPassword($entity, $plainPassword);
    $entity->setPassword($hashedPassword);
  }
}
