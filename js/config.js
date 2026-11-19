/* =========================================================================
   MAISON DORÉE — FICHIER DE CONFIGURATION
   -------------------------------------------------------------------------
   ✏️  C'EST ICI QUE L'ON PERSONNALISE LE SITE POUR UN NOUVEAU CLIENT.

   Tout ce qui change d'une boulangerie à l'autre est rassemblé ci-dessous :
   nom, slogan, coordonnées, horaires, produits, photos, réseaux sociaux.
   Le fichier js/script.js lit ces valeurs et les injecte dans la page :
   il n'y a (en principe) pas besoin de toucher au HTML pour ces éléments.

   Les couleurs et polices se modifient dans css/style.css (section 1).
   Les longs textes (histoire, engagements) et les 3 grandes photos
   (accueil, histoire) se modifient dans index.html : elles y restent
   pour s'afficher le plus vite possible (repérez « ✏️ À PERSONNALISER »).

   ⚠️  DÉMONSTRATION : toutes les informations ci-dessous sont FICTIVES.
   ========================================================================= */

/* Petite fonction utilitaire pour construire une URL de photo Unsplash
   redimensionnée à la volée (largeur w). Pour une vraie boulangerie,
   remplacez simplement les URL par des chemins locaux : "images/baguette.webp" */
const unsplash = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

const SITE_CONFIG = {
  /* ---------------------------------------------------------------------
     1. IDENTITÉ
     --------------------------------------------------------------------- */
  name: "Maison Dorée",
  slogan: "Le goût du bon, le plaisir du fait maison.",
  shortDescription:
    "Boulangerie artisanale : pains au levain, viennoiseries pur beurre et pâtisseries préparées chaque jour dans notre fournil.",

  /* Passez à false pour un vrai client : cela retire le bandeau
     « site de démonstration » et les mentions « fictif ». */
  isDemo: true,

  /* ---------------------------------------------------------------------
     2. COORDONNÉES  (fictives pour la démonstration)
     --------------------------------------------------------------------- */
  contact: {
    street: "12 rue des Artisans",
    postalCode: "75000",
    city: "Paris",
    phoneDisplay: "01 00 00 00 00",
    phoneLink: "+33100000000", // format international, sans espaces
    email: "contact@maison-doree.example", // domaine .example = réservé aux exemples
  },

  /* Carte et itinéraire.
     Démonstration : la carte montre Paris de façon générale, SANS marqueur,
     pour ne pas associer l'adresse fictive à un lieu réel.
     Pour un vrai client : renseignez la latitude / longitude exactes
     (clic droit sur Google Maps > « Plus d'infos sur cet endroit ») et
     passez showMarker à true. */
  map: {
    lat: 48.8566,
    lng: 2.3522,
    zoom: 13,
    showMarker: false,
  },

  /* ---------------------------------------------------------------------
     3. HORAIRES
     day : 0 = dimanche, 1 = lundi … 6 = samedi (convention JavaScript)
     slots : liste de créneaux ["HH:MM", "HH:MM"] ; liste vide = fermé.
     Une journée continue = un seul créneau ; avec coupure = deux créneaux.
     --------------------------------------------------------------------- */
  timezone: "Europe/Paris",
  hours: [
    { day: 1, label: "Lundi", slots: [] },
    { day: 2, label: "Mardi", slots: [["07:00", "19:30"]] },
    { day: 3, label: "Mercredi", slots: [["07:00", "19:30"]] },
    { day: 4, label: "Jeudi", slots: [["07:00", "19:30"]] },
    { day: 5, label: "Vendredi", slots: [["07:00", "19:30"]] },
    { day: 6, label: "Samedi", slots: [["07:00", "19:30"]] },
    { day: 0, label: "Dimanche", slots: [["07:30", "13:00"]] },
  ],
  /* Résumé court affiché dans le footer et la section contact */
  hoursSummary: [
    ["Mardi – samedi", "7h00 – 19h30"],
    ["Dimanche", "7h30 – 13h00"],
    ["Lundi", "Fermé"],
  ],

  /* ---------------------------------------------------------------------
     4. PRODUITS
     category : "pains" | "viennoiseries" | "patisseries"
     price    : texte libre (laisser "" pour masquer le prix)
     tag      : petite étiquette optionnelle (ex. "Best-seller"), "" sinon
     --------------------------------------------------------------------- */
  priceNote: "Prix indicatifs, donnés à titre d'exemple pour la démonstration.",
  categories: [
    { id: "pains", label: "Nos pains" },
    { id: "viennoiseries", label: "Nos viennoiseries" },
    { id: "patisseries", label: "Nos pâtisseries" },
  ],
  products: [
    {
      category: "pains",
      name: "Baguette tradition",
      description: "Farine de blé française, fermentation lente et croûte bien dorée qui chante à la sortie du four.",
      price: "1,30 €",
      tag: "Incontournable",
      image: unsplash("photo-1599819055803-717bba43890f"),
      alt: "Baguettes dorées dans un sac en papier kraft",
    },
    {
      category: "pains",
      name: "Pain de campagne",
      description: "Une mie dense et parfumée au levain naturel, pour accompagner fromages et charcuteries.",
      price: "4,20 €",
      tag: "",
      image: unsplash("photo-1585478259844-06d7b756b082"),
      alt: "Miche de pain de campagne au levain sur une table en bois",
    },
    {
      category: "pains",
      name: "Pain complet",
      description: "Farine complète moulue sur meule de pierre, riche en saveurs et en fibres.",
      price: "3,80 €",
      tag: "",
      image: unsplash("photo-1744217083335-8b57ec3826ac"),
      alt: "Pain aux grains tranché sur une planche en bois",
    },
    {
      category: "pains",
      name: "Pain aux céréales",
      description: "Graines de tournesol, lin et sésame torréfiées pour un pain croustillant et gourmand.",
      price: "4,50 €",
      tag: "",
      image: unsplash("photo-1686154596696-d6f594a98af9"),
      alt: "Miche aux graines à la croûte dorée posée sur un plan de travail",
    },
    {
      category: "viennoiseries",
      name: "Croissant pur beurre",
      description: "Feuilletage maison au beurre, tourné à la main pour un cœur fondant et alvéolé.",
      price: "1,40 €",
      tag: "Best-seller",
      image: unsplash("photo-1692742249337-3bf05e2b1ed7"),
      alt: "Plat de croissants pur beurre fraîchement cuits",
    },
    {
      category: "viennoiseries",
      name: "Pain au chocolat",
      description: "Deux barres de chocolat noir enveloppées d'un feuilletage croustillant.",
      price: "1,50 €",
      tag: "",
      image: unsplash("photo-1483695028939-5bb13f8648b0"),
      alt: "Viennoiseries dorées alignées sur une plaque de cuisson",
    },
    {
      category: "viennoiseries",
      name: "Brioche",
      description: "Pâte filante au beurre et aux œufs frais, délicatement parfumée à la fleur d'oranger.",
      price: "6,90 €",
      tag: "",
      image: unsplash("photo-1620921568790-c1cf8984624c"),
      alt: "Brioche dorée et moelleuse posée sur un papier blanc",
    },
    {
      category: "viennoiseries",
      name: "Chausson aux pommes",
      description: "Compotée de pommes maison légèrement acidulée dans un feuilletage caramélisé.",
      price: "2,10 €",
      tag: "",
      image: unsplash("photo-1622448849336-d3151a4b5e21"),
      alt: "Feuilletés aux pommes dorés sur un plateau en bois",
    },
    {
      category: "patisseries",
      name: "Éclair au chocolat",
      description: "Pâte à choux légère, crème pâtissière au chocolat noir et glaçage brillant.",
      price: "3,20 €",
      tag: "",
      image: unsplash("photo-1784841399281-40c323e95339"),
      alt: "Éclair au chocolat accompagné de fruits rouges",
    },
    {
      category: "patisseries",
      name: "Tarte aux fruits",
      description: "Pâte sablée, crème d'amande et fruits frais de saison disposés à la main.",
      price: "4,20 €",
      tag: "De saison",
      image: unsplash("photo-1620980776848-84ac10194945"),
      alt: "Tarte aux fraises et aux myrtilles sur une table en bois",
    },
    {
      category: "patisseries",
      name: "Mille-feuille",
      description: "Trois feuilletages caramélisés et une crème vanille onctueuse, montés à la commande.",
      price: "4,00 €",
      tag: "",
      image: unsplash("photo-1587122569949-ae6e755c6bdc"),
      alt: "Mille-feuille garni de crème et de fraises",
    },
    {
      category: "patisseries",
      name: "Paris-Brest",
      description: "Couronne de pâte à choux aux amandes effilées et crème mousseline praliné.",
      price: "4,50 €",
      tag: "",
      image: unsplash("photo-1710077717714-976db5604dd7"),
      alt: "Pâtisseries à la pâte à choux garnies de crème",
    },
  ],

  /* ---------------------------------------------------------------------
     5. GALERIE PHOTO
     size : "" (normal) | "wide" (2 colonnes) | "tall" (2 rangées)
     --------------------------------------------------------------------- */
  gallery: [
    { image: unsplash("photo-1691862469586-9c7c183b27b7", 900), alt: "Baguette tradition à la croûte dorée sur un fond sombre", caption: "La baguette tradition", size: "tall" },
    { image: unsplash("photo-1504128668912-f893e6606db6", 1200), alt: "Boulanger au travail derrière la vitrine d'une boulangerie", caption: "Le fournil, dès l'aube", size: "wide" },
    { image: unsplash("photo-1692742249337-3bf05e2b1ed7", 900), alt: "Croissants pur beurre fraîchement sortis du four", caption: "Croissants du matin", size: "" },
    { image: unsplash("photo-1649675602217-416a4fafcecb", 900), alt: "Mains d'un boulanger façonnant une pâte à pain", caption: "Le façonnage à la main", size: "" },
    { image: unsplash("photo-1579005007697-75b2fe2c88e7", 1200), alt: "Boulangère derrière un comptoir garni de pains et viennoiseries", caption: "Au comptoir", size: "wide" },
    { image: unsplash("photo-1599819055803-717bba43890f", 900), alt: "Baguettes et petits pains dans un sac en papier", caption: "À emporter", size: "" },
    { image: unsplash("photo-1583338917451-face2751d8d5", 900), alt: "Vitrine de tartes aux fruits et gâteaux au chocolat", caption: "La vitrine pâtisserie", size: "" },
    { image: unsplash("photo-1710077717714-976db5604dd7", 900), alt: "Pâtisseries à la pâte à choux garnies de crème", caption: "Choux & crèmes", size: "" },
    { image: unsplash("photo-1595801105145-795f1927c0fc", 900), alt: "Pâte à pain farinée dans la lumière du matin", caption: "Le temps de la pousse", size: "" },
  ],

  /* ---------------------------------------------------------------------
     6. RÉSEAUX SOCIAUX
     Démonstration : les liens pointent vers l'accueil des plateformes.
     Pour un vrai client : mettez l'URL de ses pages (ou supprimez la ligne).
     --------------------------------------------------------------------- */
  socials: [
    { network: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
    { network: "facebook", label: "Facebook", url: "https://www.facebook.com/" },
    { network: "google", label: "Avis Google", url: "https://www.google.com/maps" },
  ],
};
