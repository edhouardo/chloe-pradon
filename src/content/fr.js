// ---------------------------------------------------------------------------
// Version française (québécoise) du site. Tous les textes sont ici;
// les composants ne font que les lire. Même structure que en.js.
// Les images sont les pages originales des PDF; `page` = numéro de page du PDF.
// ---------------------------------------------------------------------------

export const meta = {
  lang: 'fr-CA',
  title: 'Revue stratégique Chloé Pradon',
  description: 'Une revue stratégique de deux offres de service de Chloé Pradon.',
}

// Format des prix (CAD) : espace insécable avant $ et %.
const nb = (n) => n.toLocaleString('fr-CA').replace(/\s/g, ' ')
export const format = {
  money: (n) => `${nb(n)} $`,
  range: (low, high) => `${nb(low)} à ${nb(high)} $`,
  change: (low, high) => `+${low} à ${high} %`,
}

export const ui = {
  tabsLabel: 'Offres de service',
  page: 'Page',
  of: 'de',
  previous: 'Diapositive précédente',
  next: 'Diapositive suivante',
  slideAlt: 'Diapositive originale, page',
  value: 'Valeur ajoutée : ',
  hoursToday: 'Aujourd’hui',
  hoursTarget: 'Cible',
  revenue: 'Revenus potentiels',
  backFromNote: 'Retour',
  openPlan: 'Sommaire',
  closePlan: 'Fermer',
}

// Courte catégorie affichée au-dessus de chaque recommandation.
export const themes = {
  tools: 'Outils de marque',
  aiImplementation: 'Mise en application avec l’IA',
  exploration: 'Exploration créative',
  production: 'Production',
}

const markdownNote = {
  label: 'C’est quoi, ce fichier?',
  text: 'Ce sont des fichiers Markdown (.md) : des documents texte bien organisés que les outils d’IA lisent facilement. Ils ne remplacent pas la charte graphique.',
}

export const proposals = [
  {
    id: 'sarah',
    client: 'Sarah Bonneau',
    totalPages: 26,
    insights: [
      {
        page: 11,
        image: 'slides/sb-11.webp',
        theme: 'tools',
        opportunity: 'Conclure avec des outils, pas juste un document',
        recommendation:
          'Ajoute une petite trousse de démarrage : une présentation de marque prête à utiliser, trois messages clés, un cadre de contenu simple, un guide pour briefer ses futurs collaborateurs et le fichier de marque prêt pour l’IA. Sarah peut mettre sa stratégie en pratique dès la semaine où elle la reçoit.',
        value: 'Plus d’autonomie pour Sarah, et une bonne raison de demander davantage pour la stratégie.',
        detail: {
          type: 'revenue',
          current: 4000,
          low: 4750,
          high: 5250,
          scope: 'sur le forfait stratégie',
          condition: 'seulement si des outils concrets s’ajoutent aux ateliers, au one pager et à la plateforme.',
        },
      },
      {
        page: 12,
        image: 'slides/sb-12.webp',
        theme: 'exploration',
        opportunity: 'Rendre la stratégie tangible plus tôt',
        recommendation:
          'Téléverse la stratégie terminée dans Claude et demande-lui d’explorer quelques pistes créatives : moodboards, concepts de site web ou mises en page de présentation. Garde les meilleures pour briefer Louis-Pier ou pour montrer à Sarah où sa stratégie peut la mener.',
        value: 'Des présentations plus fortes et plus d’autonomie en exploration créative.',
      },
      {
        page: 13,
        image: 'slides/sb-13.webp',
        theme: 'production',
        opportunity: 'Bâtir une fois, décliner plus vite',
        recommendation:
          'Les deux offres prévoient 10 heures de déclinaisons graphiques. Avec des gabarits réutilisables pour les carrousels, les présentations, les infolettres et les bannières, et une production assistée par l’IA, certains mandats pourraient se rapprocher de cinq heures.',
        value: 'De meilleures marges et plus de capacité, à qualité et à prix égaux pour le client.',
        detail: { type: 'hours', before: 10, after: 5 },
      },
    ],
  },
  {
    id: 'marie-michele',
    client: 'Marie-Michèle Dugas',
    totalPages: 33,
    insights: [
      {
        page: 8,
        image: 'slides/mm-08.webp',
        theme: 'tools',
        opportunity: 'Offrir une marque utilisable avec l’IA',
        recommendation:
          'En plus du PDF, remets un simple fichier texte avec le positionnement, la personnalité, le ton et les règles de communication de la marque. Marie-Michèle peut le téléverser dans Claude ou un autre outil d’IA pour rédiger des contenus fidèles à sa stratégie.',
        value: 'Sa stratégie devient un outil qu’elle utilise, pas juste un document de référence.',
        detail: {
          type: 'revenue',
          current: 2500,
          low: 3250,
          high: 3750,
          scope: 'sur le forfait stratégie',
          condition: 'si l’offre ajoute aussi des outils concrets et une remise claire des livrables.',
        },
        note: markdownNote,
      },
      {
        page: 9,
        image: 'slides/mm-09.webp',
        theme: 'tools',
        opportunity: 'Ajouter un fichier de marque à l’identité visuelle',
        recommendation:
          'En plus de la charte graphique et des fichiers sources, inclus un fichier texte semblable qui précise les couleurs, les typographies, les règles du logo et les principes visuels. Les outils d’IA ont ainsi accès aux mêmes règles qu’un designer.',
        value: 'Les contenus du quotidien restent plus fidèles à l’identité, avec un œil humain qui valide toujours le résultat.',
        note: markdownNote,
      },
      {
        page: 11,
        image: 'slides/mm-11.webp',
        theme: 'aiImplementation',
        opportunity: 'Aider les clients à appliquer leur stratégie avec l’IA',
        recommendation:
          'Offre une séance pratique pour montrer à tes clients comment intégrer leur stratégie dans Claude ou un autre outil d’IA. Avec leur positionnement, leur personnalité et leur ton intégrés, ils peuvent créer slogans, messages, publications LinkedIn, infolettres et autres textes ancrés dans leur stratégie.',
        value: 'Tes clients communiquent avec plus d’autonomie, et leur marque reste cohérente.',
        detail: {
          type: 'revenue',
          low: 300,
          high: 600,
          scope: 'Par séance optionnelle',
          condition: 'selon l’envergure.',
        },
        note: {
          label: 'Fichiers de marque ou séance?',
          text: 'Les fichiers contiennent la stratégie. La séance montre comment les intégrer dans Claude et rédiger de bonnes requêtes pour écrire des textes fidèles à la marque.',
        },
      },
    ],
  },
]

export const actionPlan = {
  title: 'Sommaire',
  items: [
    { title: 'Livrer des outils de marque utiles', text: 'Des fichiers prêts à utiliser avec l’IA pour la stratégie et l’identité, et des outils de démarrage concrets.' },
    { title: 'Offrir la mise en application avec l’IA', text: 'Montrer aux clients comment intégrer leur stratégie dans Claude et rédiger des contenus fidèles à leur marque.' },
    { title: 'Visualiser la stratégie', text: 'Utiliser Claude pour explorer et présenter des pistes créatives.' },
    { title: 'Optimiser la production', text: 'Aider les collaborateurs à bâtir des systèmes numériques réutilisables.' },
    { title: 'Tarifer selon la valeur ajoutée', text: 'Augmenter les honoraires de stratégie seulement quand les clients reçoivent de nouveaux outils et plus d’accompagnement.' },
  ],
  closing: 'L’idée n’est pas d’en faire plus. C’est de donner plus de portée à ta réflexion.',
}
