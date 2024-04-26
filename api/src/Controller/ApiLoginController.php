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
use Symfony\Bundle\FrameworkBundle\HttpCache\HttpCache;
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
                'message' => 'Invalid credentials **devonly: no found user with that username**',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $passwordValid = $passwordHasher->isPasswordValid($user, $plainPassword);

        if (!$passwordValid) {
            return $this->json([
                'message' => 'Invalid credentials *devonly: password invalid**',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $JWTManager->create($user);

        return $this->json([
            'username'  => $user->getUserIdentifier(),
            'token' => $token,
        ]);
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, UserRepository $userRepository, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $JWTManager): Response
    {
        $data = json_decode($request->getContent(), true);

        $username = htmlspecialchars($data['username'] ?? '');
        $email = htmlspecialchars($data['email'] ?? '');
        $password = htmlspecialchars($data['password'] ?? '');

        if (empty($username) || empty($email) || empty($password)) {
            return $this->json([
                'message' => 'Please provide username, email, and password',
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->json([
                'message' => 'Invalid email format',
            ], Response::HTTP_BAD_REQUEST);
        }

        $existingUsername = $userRepository->findOneBy([
            'username' => $username
        ]);

        $existingEmail = $userRepository->findOneBy([
            'email' => $email
        ]);

        if ($existingUsername) {
            return $this->json([
                'message' => 'Username already exists',
            ], Response::HTTP_BAD_REQUEST);
        }

        if ($existingEmail) {
            return $this->json([
                'message' => 'Email already exists',
            ], Response::HTTP_BAD_REQUEST);
        }

        if (strlen($username) > 180) {
            return $this->json([
                'message' => 'Username is too long',
            ], Response::HTTP_BAD_REQUEST);
        }

        if (strlen($email) > 255) {
            return $this->json([
                'message' => 'Email is too long',
            ], Response::HTTP_BAD_REQUEST);
        }

        // if (strlen($password) < 8) {
        //     return $this->json([
        //         'message' => 'Password should be at least 8 characters long',
        //     ], Response::HTTP_BAD_REQUEST);
        // }

        $user = new User();
        $user->setUsername($username);
        $user->setEmail($email);
        $user->setCreatedAt(new \DateTimeImmutable());
        $hash = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hash);

        $entityManager->persist($user);
        $entityManager->flush();

        $token = $JWTManager->create($user);

        return $this->json([
            'message' => 'Account created',
            'token' => $token
        ], Response::HTTP_CREATED);
    }
}
