<?php

namespace App\Controller\Admin;

use App\Entity\Fight;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class FightCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Fight::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('title'),
            TextField::new('address'),
            TextEditorField::new('message'),
            IntegerField::new('fighters_needed'),
            BooleanField::new('is_fighting'),
            BooleanField::new('cover'),
            DateTimeField::new('created_at', 'Created'),
            DateTimeField::new('updated_at', 'Updated')->hideOnForm(),
        ];
    }
}
