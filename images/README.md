# Dossier `images/`

## Contenu actuel

| Fichier | Rôle |
|---|---|
| `favicon.svg` | Icône d'onglet (épi de blé doré) — navigateurs modernes |
| `favicon-32.png` | Icône d'onglet de secours (anciens navigateurs) |
| `apple-touch-icon.png` | Icône lors d'un ajout à l'écran d'accueil (iPhone / iPad) |
| `og-image.jpg` | Image d'aperçu (1200 × 630) quand le lien est partagé (WhatsApp, Facebook, LinkedIn, e-mail…) |

## Photographies de la démonstration

Pour la démo, les photos ne sont **pas stockées ici** : elles sont chargées depuis le CDN d'Unsplash
(`images.unsplash.com`), qui les redimensionne et les compresse à la volée (format WebP/AVIF selon le navigateur).
Toutes sont publiées sous la **licence Unsplash** : utilisation gratuite, y compris commerciale, sans attribution obligatoire
(crédits donnés ci-dessous par courtoisie). Aucune ne comporte de filigrane.

| Usage | Photographe | Page source |
|---|---|---|
| Accueil (hero) | Jason Leung | https://unsplash.com/photos/LbYHCLgC148 |
| Histoire — pétrissage | Theme Photos | https://unsplash.com/photos/Hx7xdwhj2AY |
| Histoire — pâte farinée / galerie | Duncan Kidd | https://unsplash.com/photos/2HMPWWifKrs |
| Baguette tradition / galerie | Bas Peperzak | https://unsplash.com/photos/XNNurImW1xM |
| Pain de campagne | Tommaso Urli | https://unsplash.com/photos/b5v5dKikmRU |
| Pain complet | Victoria Druc | https://unsplash.com/photos/d5ZiqFIG8b0 |
| Pain aux céréales | Ben Stein | https://unsplash.com/photos/NPYmhef4kX4 |
| Croissant / galerie | Natalia Gusakova | https://unsplash.com/photos/CiVGoF0tCks |
| Pain au chocolat | Mink Mingle | https://unsplash.com/photos/qZ5lPCPvdXE |
| Brioche | Vicky Ng | https://unsplash.com/photos/BjJxLSr23oc |
| Chausson aux pommes | micheile henderson | https://unsplash.com/photos/FZFN76uR2DQ |
| Éclair au chocolat | Emre Çoban | https://unsplash.com/photos/ZIVhImrOI3w |
| Tarte aux fruits | Oliver-Timm Haarmann | https://unsplash.com/photos/p6OLZPnq810 |
| Mille-feuille | amirali mirhashemian | https://unsplash.com/photos/ZYtbCrOoiDU |
| Paris-Brest (choux à la crème) / galerie | The Now Time | https://unsplash.com/photos/qwVGPwmtWsM |
| Galerie — baguette | Ilham Putra | https://unsplash.com/photos/dY8F7ZlZvYU |
| Galerie — boulanger en vitrine | Anh Tran | https://unsplash.com/photos/qPQqZ0y-rJ0 |
| Galerie — façonnage | DDP | https://unsplash.com/photos/5CRzqqWzEKQ |
| Galerie — comptoir | Ekaterina Tyapkina | https://unsplash.com/photos/b5kN9ClBRNU |
| Galerie — vitrine pâtisserie | Ulysse Pointcheval | https://unsplash.com/photos/1WmlAiYgnoI |

> Remarque : quelques photos sont des **illustrations approchantes** (le pain au chocolat montre un assortiment de
> viennoiseries, le Paris-Brest des choux à la crème, le chausson des feuilletés aux pommes). Pour un vrai client,
> rien ne remplace des photos de **ses propres produits**.

## Pour un vrai client : héberger ses propres photos

1. Faites (ou faites faire) les photos en lumière naturelle, format paysage, sans filigrane.
2. Redimensionnez-les : **1920 px** de large pour l'accueil, **1000 px** pour la section histoire, **900 px** pour les produits et la galerie.
3. Convertissez-les en **WebP** (ou JPEG qualité 75–80) avec https://squoosh.app (gratuit, dans le navigateur). Visez < 200 Ko par photo, < 350 Ko pour l'accueil.
4. Déposez-les dans ce dossier avec des noms simples, sans espaces ni accents : `baguette.webp`, `croissant.webp`, `hero.webp`…
5. Remplacez les URL :
   - produits et galerie : dans `js/config.js`, par exemple `image: "images/baguette.webp"` ;
   - accueil et histoire : dans `index.html` (attributs `src` / `srcset`, et la balise `<link rel="preload">` du `<head>` pour l'accueil).
6. Supprimez alors `<link rel="preconnect" href="https://images.unsplash.com">` dans `index.html` s'il ne sert plus.

Héberger ses images sur son propre site est recommandé en production : pas de dépendance à un service tiers, et un contrôle total sur les fichiers.
