<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(), // caché dans les formulaire pour ne pas permettre sa modification
            TextField::new('username'),
            TextField::new('email'),
            ArrayField::new('roles')->setPermission('ROLE_ADMIN'),
            TextField::new('password')->onlyOnForms(), // je cache le champ password si ce n'est pas dans un formulaire parce que c'est juste un hash donc ça n'a aucune utilité de l'afficher
            DateTimeField::new('created_at', 'Created'),
            DateTimeField::new('updated_at', 'Updated')->hideOnForm(),
        ];
    }
}
