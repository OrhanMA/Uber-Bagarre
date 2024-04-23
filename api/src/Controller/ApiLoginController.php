<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function index(#[CurrentUser] ?User $user, JWTTokenManagerInterface $JWTManager, Request $request, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher): Response
    {
        $body = json_decode($request->getContent());

        $username = $body->username;
        $plainPassword = $body->password;

        $user = $userRepository->findOneBy([
            'username' => $username,
        ]);

        if (null === $user) {
            return $this->json([
                'message' => 'missing credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $passwordValid = $passwordHasher->isPasswordValid($user, $plainPassword);

        if (!$passwordValid) {
            //
        }

        $token = $JWTManager->create($user);

        return $this->json([
            'username'  => $user->getUserIdentifier(),
            'token' => $token,
        ]);
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = json_decode($request->getContent());

        // récupérer les données du formulaire
        // sanitize
        // valider
        // renvoyer réponse 
        return $this->json($data);
    }
}
