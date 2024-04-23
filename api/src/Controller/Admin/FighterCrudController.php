<?php

namespace App\Controller\Admin;

use App\Entity\Fighter;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class FighterCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Fighter::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('name'),
            TextEditorField::new('description'),
            DateTimeField::new('created_at', 'Created'),
            DateTimeField::new('updated_at', 'Updated')->hideOnForm(),
        ];
    }
}
