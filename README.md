# Uber Bagarre

## Contexte

Uber bagarre est un mini projet proposant un service similaire à Uber mais pour les combats de rue.
C'est un exercice dans le cadre de ma formation en conception et développement d'applications à Simplon Grenoble.

### Réalisation

Le code est divisé en deux parties distinctes:

### Le front-end

La partie front a été réalisée avec le meta-framework Next.js v14.2.2 en tirant avantages des features suivantes:

- Server components
- Server actions
- Partial pre-rendering
- Suspense

Pour réaliser le front-end j'ai aussi utilisé les packages suivants:

- Zod pour la validation des données
- React hook form
- Shadcn ui pour divers composants
- Tailwind pour le style
- Leaflet et le package React Leaflet pour l'affichage des cartes openstreetmap
- Mapbox Geocoding API pour la traduction coordonnées/adresse

### Le back-end

Pour le côté back j'ai utilisé PHP avec le framework Symfony pour la logique métier qui comprend les éléments suivants:

- Authentification par formulaire pour la partie admin
- Dashboard administrateur pour les gestion des entités avec EasyAdmin
- Authentification API avec Lexik JWT
- REST API avec API Plateform

### Installation

```
git clone git@github.com:OrhanMA/Uber-Bagarre.git
cd api
composer install
mv .env.example .env.local

-- changez le .env.local pour l'URL de la base de données --

symfony console doctrine:database:create
symfony console doctrine:make:migration
symfony console d:m:m
symfony console doctrine:fixtures:load

-- Généréz vos clés publique+privée JWT --
symfony console lexik:jwt:generate-keypair

symfony serve

-- passons au côté web --
cb web
mv .env.example .env
npm install
npm run dev

-- n'oubliez pas de préciser votre clé API Mapbox dans le fichier .env.local
```

#### Image utilisée:

- https://unsplash.com/fr/photos/femme-en-robe-bleue-tenant-un-cheval-blanc-wjqFQQQdIe4
