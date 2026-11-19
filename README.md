# Maison Dorée — site vitrine de boulangerie artisanale (démonstration)

Site vitrine complet, responsive et prêt à publier, conçu comme **support de démonstration commerciale**
pour la création de sites de boulangeries.

> ⚠️ **Maison Dorée est une boulangerie fictive.** L'adresse, le téléphone, l'e-mail, les prix et les liens
> sociaux sont des exemples. Le site l'affiche clairement (bandeau en haut, mentions « fictif », footer)
> et n'est pas indexé par les moteurs de recherche (`noindex`).

---

## Sommaire

1. [Aperçu](#1-aperçu)
2. [Arborescence](#2-arborescence)
3. [Tester le site en local](#3-tester-le-site-en-local)
4. [Publier sur GitHub Pages](#4-publier-sur-github-pages)
5. [Personnaliser pour un vrai client](#5-personnaliser-pour-un-vrai-client)
6. [Choix techniques](#6-choix-techniques)
7. [Liste de contrôle avant livraison](#7-liste-de-contrôle-avant-livraison)

---

## 1. Aperçu

| Section | Ce qu'elle contient |
|---|---|
| En-tête | Logo typographique, menu (Accueil, Notre histoire, Nos produits, Nos engagements, Contact), bouton « Nous trouver ». Fixe au défilement, menu hamburger sur mobile. |
| Accueil | Grande photo, slogan, présentation, boutons « Découvrir nos produits » et « Nous trouver », **statut d'ouverture en direct** (« Ouvert jusqu'à 19h30 », « Fermé · ouvre demain à 7h00 »). |
| Notre histoire | Deux blocs texte + photo en alternance. Aucune date ni récompense inventée. |
| Nos produits | 12 cartes (pains, viennoiseries, pâtisseries) avec filtres par catégorie et prix indicatifs. |
| Nos engagements | 4 engagements avec icônes (présentés comme des principes, pas des labels). |
| Galerie | Mosaïque responsive + visionneuse plein écran (clavier, clic, balayage tactile). |
| Infos pratiques | Horaires (jour courant mis en évidence), adresse, téléphone, boutons **Appeler** et **Itinéraire**, carte OpenStreetMap. |
| Contact | Coordonnées, boutons d'appel et d'e-mail, formulaire avec validation qui **prépare un e-mail** (pas de faux envoi). |
| Footer | Logo, description, navigation, coordonnées, horaires, réseaux sociaux (liens de démonstration), mention « Site de démonstration ». |

---

## 2. Arborescence

```
maison-doree/
├── index.html            Structure de la page, textes longs, SEO
├── css/
│   └── style.css         Styles (couleurs et polices en tête de fichier)
├── js/
│   ├── config.js         ✏️ TOUTES les infos à personnaliser (nom, contact, horaires, produits, photos…)
│   └── script.js         Fonctionnement (ne pas modifier en principe)
├── fonts/                Polices auto-hébergées (Crimson Text + DM Sans, licence OFL)
├── images/
│   ├── README.md         Crédits photos + méthode pour utiliser ses propres photos
│   ├── favicon.svg / favicon-32.png / apple-touch-icon.png
│   └── og-image.jpg      Image d'aperçu pour les partages
└── README.md             Ce fichier
```

Par rapport à l'arborescence de départ, deux ajouts volontaires :
- **`js/config.js`** : sépare le *contenu* (ce qui change d'un client à l'autre) du *code*. Personnaliser un site
  revient à modifier ce seul fichier, sans risque de casser le fonctionnement.
- **`fonts/`** : les polices sont hébergées avec le site plutôt que chargées depuis Google Fonts
  (plus rapide, et aucune donnée de visiteur transmise à un tiers — argument RGPD apprécié des commerçants).

---

## 3. Tester le site en local

Le site est 100 % statique : aucune installation, aucune dépendance.

**Option A — le plus simple :** double-cliquez sur `index.html`. Il s'ouvre dans votre navigateur.

**Option B — recommandé (comportement identique à la mise en ligne) :** lancez un petit serveur local
depuis le dossier `maison-doree/` :

```bash
# Avec Python (déjà installé sur macOS / Linux, disponible sur Windows)
python3 -m http.server 8000      # sous Windows : py -m http.server 8000
# puis ouvrez http://localhost:8000
```

ou avec Node.js : `npx serve .` — ou dans VS Code, l'extension **Live Server** (clic droit sur `index.html` > *Open with Live Server*).

**À vérifier pendant le test :**
- Outils de développement (F12) > mode appareil (Ctrl+Maj+M / Cmd+Maj+M) : testez 360 px, 768 px, 1440 px.
- Le menu hamburger s'ouvre / se ferme (aussi avec la touche Échap).
- Les filtres de produits, la visionneuse de la galerie (flèches du clavier), le formulaire (laissez un champ vide pour voir les messages d'erreur).
- Une connexion Internet est nécessaire pour les photos (servies par Unsplash) et la carte.

---

## 4. Publier sur GitHub Pages

Gratuit, en HTTPS, adresse du type `https://votre-pseudo.github.io/maison-doree/`.

### Méthode sans ligne de commande

1. Créez un compte sur https://github.com (si besoin).
2. En haut à droite : **+ > New repository**.
   - Nom : `maison-doree`
   - Visibilité : **Public** (obligatoire pour GitHub Pages sur un compte gratuit)
   - Ne cochez rien d'autre, puis **Create repository**.
3. Sur la page du dépôt vide, cliquez sur **uploading an existing file**.
4. Glissez-déposez **le contenu** du dossier `maison-doree/` (le fichier `index.html` doit être à la racine du dépôt,
   pas dans un sous-dossier), puis **Commit changes**.
5. Allez dans **Settings > Pages**.
   - *Source* : **Deploy from a branch**
   - *Branch* : **main**, dossier **/ (root)**, puis **Save**.
6. Patientez 1 à 2 minutes et rafraîchissez : l'adresse du site s'affiche en haut de la page *Pages*.

### Méthode en ligne de commande (Git)

```bash
cd maison-doree
git init
git add .
git commit -m "Site vitrine Maison Dorée (démonstration)"
git branch -M main
git remote add origin https://github.com/VOTRE-PSEUDO/maison-doree.git
git push -u origin main
```
Puis activez Pages comme à l'étape 5 ci-dessus.

### Après la mise en ligne

- Dans `index.html`, remplacez `og:image` par l'URL **complète** de l'image
  (`https://votre-pseudo.github.io/maison-doree/images/og-image.jpg`) et ajoutez `og:url` :
  les aperçus sur WhatsApp, LinkedIn ou Facebook en ont besoin.
- Testez l'aperçu avec https://www.opengraph.xyz.
- Testez la performance avec https://pagespeed.web.dev.
- Mise à jour : modifiez les fichiers sur GitHub (icône crayon) ou refaites un `git push` ; le site se met à jour en 1 à 2 minutes.

### Nom de domaine d'un client (ex. `boulangerie-dupont.fr`)

Dans **Settings > Pages > Custom domain**, saisissez le domaine, puis chez le registraire (OVH, Gandi, IONOS…)
créez un enregistrement `CNAME` `www` → `votre-pseudo.github.io` (et les enregistrements `A` indiqués dans la
documentation GitHub Pages pour le domaine nu). Cochez ensuite **Enforce HTTPS**.

---

## 5. Personnaliser pour un vrai client

Comptez environ une heure une fois les informations et photos du client en main.

### Étape 1 — `js/config.js` (l'essentiel)

| Clé | À renseigner |
|---|---|
| `name`, `slogan`, `shortDescription` | Nom de la boulangerie, phrase d'accroche, description courte (footer) |
| `isDemo` | Passez à **`false`** : retire le bandeau de démonstration et toutes les mentions « fictif » |
| `contact` | Adresse, téléphone (affiché + format `+33…`), e-mail |
| `map` | Latitude / longitude exactes (Google Maps : clic droit sur le lieu > copier les coordonnées) et `showMarker: true` |
| `hours` | Créneaux par jour ; liste vide = fermé ; deux créneaux pour une fermeture le midi : `[["07:00","13:00"],["15:30","19:30"]]` |
| `hoursSummary` | Résumé des horaires (footer) |
| `products` | Nom, description, prix (ou `""` pour masquer), étiquette, photo et texte alternatif de chaque produit |
| `gallery` | Photos de la galerie (`size`: `""`, `"wide"` ou `"tall"`) |
| `socials` | Vraies pages Instagram / Facebook / fiche Google (supprimez une ligne pour retirer un réseau) |

Le **statut d'ouverture**, le tableau des horaires, les liens `tel:` / `mailto:`, l'itinéraire et la carte se mettent à jour automatiquement.

### Étape 2 — `index.html` (textes et SEO)

Cherchez `✏️` dans le fichier :
- `<title>`, `meta description`, balises Open Graph : nom, ville et spécialités du client
  (ex. *« Boulangerie Dupont à Lyon 3e — pains au levain et viennoiseries maison »*).
- Remplacez `<meta name="robots" content="noindex, nofollow">` par `index, follow`.
- Décommentez `<link rel="canonical">` avec l'URL définitive.
- Textes des sections **Notre histoire** et **Nos engagements** (vrais éléments du client uniquement).
- Photo d'accueil et photos de l'histoire (voir `images/README.md`).
- Dans le footer, retirez « Photos : Unsplash » si toutes les photos appartiennent au client.

### Étape 3 — `css/style.css` (identité visuelle)

En tête du fichier, section **1. VARIABLES** : les cinq couleurs de la charte et les polices.
Pour une nouvelle police, déposez les fichiers dans `fonts/` et adaptez les blocs `@font-face` (section 2).

### Étape 4 — Données structurées (SEO local)

Pour un **vrai** établissement uniquement, remplacez le bloc `<script type="application/ld+json">` du `<head>` par :

```json
{
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Boulangerie Dupont",
  "image": "https://www.boulangerie-dupont.fr/images/og-image.jpg",
  "url": "https://www.boulangerie-dupont.fr/",
  "telephone": "+33 4 00 00 00 00",
  "priceRange": "€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "…",
    "postalCode": "…",
    "addressLocality": "…",
    "addressCountry": "FR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 0, "longitude": 0 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "07:00", "closes": "19:30" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "07:30", "closes": "13:00" }
  ],
  "sameAs": ["https://www.instagram.com/…", "https://www.facebook.com/…"]
}
```
Vérifiez-le avec https://search.google.com/test/rich-results, et pensez à la **fiche Google Business Profile**
du client : c'est elle qui compte le plus pour le référencement local.

### Étape 5 — Formulaire de contact (optionnel)

Par défaut, le formulaire ouvre la messagerie du visiteur avec un message pré-rempli (aucun serveur nécessaire).
Pour un envoi direct, utilisez un service gratuit comme **Formspree** ou **Web3Forms** : créez un formulaire
chez eux, puis remplacez dans `js/script.js` (section 11) la ligne `window.location.href = "mailto:…"` par un
`fetch()` vers l'adresse fournie. Ajoutez alors une mention RGPD sous le formulaire.

### Étape 6 — Mentions légales

Un site professionnel en France doit afficher des **mentions légales** (raison sociale, SIRET, hébergeur…).
Ajoutez une page `mentions-legales.html` (en reprenant l'en-tête et le footer) et un lien dans le footer.

---

## 6. Choix techniques

- **HTML5 / CSS3 / JavaScript vanilla**, aucune bibliothèque, aucun build : le site s'ouvre tel quel.
- **HTML sémantique** : `header`, `nav`, `main`, `section`, `article`, `footer`, un seul `h1`, hiérarchie `h2`/`h3`.
- **Accessibilité** : lien d'évitement, navigation au clavier, focus visible, `aria-expanded` sur le menu,
  textes alternatifs, contrastes AA (le doré est assombri pour les petits textes sur fond clair),
  zones cliquables ≥ 44 px, respect de `prefers-reduced-motion`.
- **Performance** : photo d'accueil préchargée et prioritaire, autres images en `loading="lazy"` et redimensionnées
  par le CDN, polices allégées (caractères latins uniquement) et auto-hébergées, carte chargée en différé.
- **Robustesse** : si une photo ne charge pas, un fond élégant avec le nom du produit la remplace ;
  sans JavaScript, le contenu principal reste lisible.
- **Statut d'ouverture** calculé dans le fuseau de la boulangerie (Europe/Paris), même si le visiteur est ailleurs.
- **Honnêteté de la démo** : bandeau et badges « fictif », carte sans marqueur, e-mail en `.example`
  (domaine réservé), `noindex`, données structurées limitées à une page web.

---

## 7. Liste de contrôle avant livraison

- [ ] `isDemo: false` dans `js/config.js`
- [ ] Coordonnées, horaires et prix vérifiés **avec le client**
- [ ] Photos du client, compressées, avec textes alternatifs descriptifs
- [ ] `<title>`, description, Open Graph (URL absolues) et `robots: index, follow`
- [ ] Données structurées `Bakery` remplies et testées
- [ ] Liens réseaux sociaux réels
- [ ] Mentions légales
- [ ] Test sur un vrai smartphone (iPhone + Android)
- [ ] Score PageSpeed Insights vérifié
