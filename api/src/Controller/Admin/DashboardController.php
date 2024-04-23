<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Entity\Fight;
use App\Entity\Skill;
use App\Entity\Fighter;
use App\Entity\Category;
use App\Controller\Admin\UserCrudController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(UserCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Uber bagarre');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Home', 'fa fa-home');
        yield MenuItem::subMenu('Users', 'fa fa-user')->setSubItems([
            MenuItem::linkToCrud('All users', 'fa fa-eye', User::class)->setDefaultSort(['created_at' => 'DESC']),
            MenuItem::linkToCrud('Add new user', 'fa fa-plus', User::class)->setAction('new'),
        ]);
        yield MenuItem::subMenu('Skills', 'fa fa-screwdriver-wrench')->setSubItems([
            MenuItem::linkToCrud('All skills', 'fa fa-eye', Skill::class)->setDefaultSort(['created_at' => 'DESC']),
            MenuItem::linkToCrud('Add new skill', 'fa fa-plus', Skill::class)->setAction('new'),
        ]);
        yield MenuItem::subMenu('Fighters', 'fa fa-user-ninja')->setSubItems([
            MenuItem::linkToCrud('All fighters', 'fa fa-eye', Fighter::class)->setDefaultSort(['created_at' => 'DESC']),
            MenuItem::linkToCrud('Add new fighter', 'fa fa-plus', Fighter::class)->setAction('new'),
        ]);
        yield MenuItem::subMenu('Fights', 'fa fa-gun')->setSubItems([
            MenuItem::linkToCrud('All fights', 'fa fa-eye', Fight::class)->setDefaultSort(['created_at' => 'DESC']),
            MenuItem::linkToCrud('Add new fight', 'fa fa-plus', Fight::class)->setAction('new'),
        ]);
        yield MenuItem::subMenu('Categories', 'fa fa-box')->setSubItems([
            MenuItem::linkToCrud('All categories', 'fa fa-eye', Category::class)->setDefaultSort(['created_at' => 'DESC']),
            MenuItem::linkToCrud('Add new category', 'fa fa-plus', Category::class)->setAction('new'),
        ]);
        // yield MenuItem::linkToCrud('Add Category', 'fa fa-tags', Category::class)
        //     ->setAction('new');
    }

    public function configureCrud(): Crud
    {
        return Crud::new()->setEntityPermission('ROLE_ADMIN')->setPaginatorPageSize(20)->setPaginatorRangeSize(3)->hideNullValues();
    }
}
