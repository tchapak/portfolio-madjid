# Portfolio Madjid ALLOUTI — BTS SIO SISR

> Portfolio personnel développé dans le cadre de l'épreuve E6 du BTS SIO option SISR  
> (Solutions d'Infrastructure, Systèmes et Réseaux).

---

## Table des matières

1. [Présentation](#-présentation)
2. [Direction artistique](#-direction-artistique)
3. [Technologies utilisées](#-technologies-utilisées)
4. [Fonctionnalités](#-fonctionnalités)
5. [Architecture du projet](#-architecture-du-projet)
6. [Installation et lancement](#-installation-et-lancement)
7. [Personnalisation du contenu](#-personnalisation-du-contenu)
8. [Performances](#-performances)
9. [Compétences BTS SIO démontrées](#-compétences-bts-sio-démontrées)
10. [Crédits et remerciements](#-crédits-et-remerciements)
11. [Déploiement](#-déploiement)
12. [Licence](#-licence)

---

## Présentation

Je suis **Madjid ALLOUTI**, étudiant en BTS SIO option SISR. Ce portfolio a été conçu pour l'épreuve E6 — il présente mes projets professionnels, mes compétences techniques en systèmes et réseaux, ma veille technologique et mon parcours.

**Objectif professionnel :** Devenir Architecte Réseau, en maîtrisant les infrastructures LAN/WAN, la cybersécurité et l'administration des systèmes d'information.

---

## Direction artistique

### Concept signature : "Topologie Vivante"

L'interface s'inspire directement de l'infrastructure réseau. Chaque élément visuel fait écho aux concepts SISR : nœuds, connexions, flux de données, topologie.

### Palette de couleurs

| Rôle              | Couleur            | Hex       |
|-------------------|--------------------|-----------|
| Fond principal    | Noir profond       | `#09090B` |
| Accent primaire   | Bleu réseau        | `#3B82F6` |
| Accent secondaire | Cyan data          | `#06B6D4` |
| Accent signature  | Ambre (Paris hub)  | `#F59E0B` |
| Texte principal   | Blanc cassé        | `#FAFAFA` |
| Texte secondaire  | Zinc               | `#A1A1AA` |

### Typographies

| Usage           | Police                  | Grammage |
|-----------------|-------------------------|----------|
| Titres          | Space Grotesk Variable  | 700–800  |
| Corps de texte  | DM Sans Variable        | 400–500  |
| Code / Terminal | JetBrains Mono Variable | 400      |

---

## Technologies utilisées

| Technologie             | Version | Rôle                                            |
|-------------------------|---------|-------------------------------------------------|
| **React**               | 19.x    | Framework UI, composants, state management      |
| **Vite**                | 8.x     | Bundler, dev server, optimisation production    |
| **Framer Motion**       | 12.x    | Animations déclaratives, transitions, layouts   |
| **GSAP**                | 3.x     | Animations timeline complexes                   |
| **Three.js**            | 0.184   | Rendu 3D WebGL (topologie réseau Hero)          |
| **React Three Fiber**   | 9.x     | Bridge React ↔ Three.js                         |
| **@react-three/drei**   | 10.x    | Helpers Three.js (caméra, contrôles, etc.)      |
| **Tailwind CSS**        | 4.x     | Système de design utilitaire (CSS-first config) |
| **d3-geo**              | —       | Projection cartographique Mercator              |
| **topojson-client**     | —       | Décodage TopoJSON (carte monde 110m)            |
| **Lenis**               | 1.x     | Smooth scroll natif avec momentum               |
| **Lucide React**        | —       | Bibliothèque d'icônes SVG cohérentes            |
| **Fontsource Variable** | —       | Auto-hébergement des polices (RGPD compliant)   |

---

## Fonctionnalités

### Intro cinématique "Réseau Vivant" (~8 secondes)

Séquence d'introduction en 3 sous-étapes :

1. **Carte mondiale animée** — 18 nœuds (grandes villes) s'allument progressivement sur une projection Mercator (d3-geo + TopoJSON depuis jsDelivr).
2. **Connexions et trafic** — 26 arcs SVG quadratic-bezier se tracent via `pathLength` Framer Motion. 30 paquets de données circulent simultanément via une boucle RAF impérative (0 re-render React par frame, 60fps garanti).
3. **Convergence et révélation** — Burst de 45 paquets convergeant vers Paris, flash lumineux radial, puis "MADJID ALLOUTI" apparaît lettre par lettre avec easing backOut.

### Sections du portfolio

| Section           | Contenu                                                      |
|-------------------|--------------------------------------------------------------|
| **Hero**          | Topologie réseau 3D (Three.js), titre animé typewriter, CTA  |
| **À propos**      | Profil, soft skills, langues, photo                          |
| **Compétences**   | Stack technique inspiré du modèle OSI, outils réseau/système |
| **Projets**       | Projets professionnels avec modal de détail complet          |
| **Veille**        | Veille technologique SISR (sources, articles, analyse)       |
| **Parcours**      | Timeline formation + expériences + objectifs                 |
| **Contact**       | Formulaire, liens professionnels, CV téléchargeable          |

### Mode présentation — Épreuve orale E6

Interface dédiée pour la soutenance devant le jury BTS SIO :

- **Barre de navigation** fixe 56px : section courante, boutons Précédent/Suivant
- **Drawer sommaire** coulissant : 7 sections avec checkmarks de progression
- **Flèches latérales** : navigation directe entre sections (desktop)
- **Indicateur de progression** : barre cyan + numéro de slide en bas
- **Raccourcis clavier intégraux** (voir tableau ci-dessous)
- **Détection automatique** de la section visible (IntersectionObserver)
- **Font-size +10%** pour la lisibilité en projection

| Raccourci              | Action                    |
|------------------------|---------------------------|
| `→` / `Espace` / `PageDown` | Section suivante      |
| `←` / `PageUp`         | Section précédente        |
| `S`                    | Ouvrir/fermer le sommaire |
| `Home` / `End`         | Première / Dernière section |
| `Ctrl+P`               | Activer / Désactiver      |
| `Échap`                | Quitter le mode           |

### Accessibilité et performance

- **60fps** sur toutes les animations (RAF impératif, zéro re-render React dans les boucles d'animation)
- **Lazy loading** des sections non critiques via `React.lazy` + `Suspense`
- **Code splitting** automatique (Three.js, Framer Motion, React en chunks séparés)
- **prefers-reduced-motion** : intro cinématique skippée, animations désactivées
- **WCAG AA** : aria-labels, rôles sémantiques, focus visible clavier, skip-to-main
- **PWA ready** : manifest.json, theme-color, apple-touch-icon

---

## Architecture du projet

```
portfolio-madjid/
├── public/
│   ├── favicon.svg              # Icône réseau (nœud central + 4 satellites)
│   ├── apple-touch-icon.svg     # Icône iOS 180×180
│   ├── manifest.json            # Manifeste PWA
│   ├── og-image.svg             # Image Open Graph 1200×630
│   ├── placeholder-project.svg  # Placeholder pour projets sans screenshot
│   ├── setup-intro.jpg          # Photo d'ambiance (optionnelle)
│   └── CV-Madjid-ALLOUTI.pdf   # À ajouter avant déploiement
│
├── src/
│   ├── contexts/
│   │   └── PresentationContext.jsx  # État global du mode présentation (React Context)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── NetworkIntro.jsx     # Intro cinématique "Réseau Vivant" (sous-étapes 1+2+3)
│   │   │   ├── Navbar.jsx           # Navigation principale avec liens d'ancre
│   │   │   ├── Footer.jsx           # Pied de page
│   │   │   ├── CustomCursor.jsx     # Curseur personnalisé (desktop uniquement)
│   │   │   └── PresentationMode.jsx # Overlay mode présentation oral E6
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.jsx             # Section d'accueil avec topologie 3D Three.js
│   │   │   ├── About.jsx            # Présentation personnelle
│   │   │   ├── Skills.jsx           # Compétences techniques et outils
│   │   │   ├── Projects.jsx         # Projets réalisés avec modal de détail
│   │   │   ├── Veille.jsx           # Veille technologique SISR
│   │   │   ├── Timeline.jsx         # Parcours chronologique
│   │   │   └── Contact.jsx          # Formulaire de contact
│   │   │
│   │   ├── three/
│   │   │   └── NetworkTopology.jsx  # Topologie réseau 3D (React Three Fiber)
│   │   │
│   │   └── ui/
│   │       └── ProjectModal.jsx     # Modal de détail des projets
│   │
│   ├── data/                        # ← CONTENU À PERSONNALISER
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── veille.js
│   │   ├── timeline.js
│   │   └── contact.js
│   │
│   ├── hooks/
│   │   ├── useLenis.js              # Initialisation Lenis smooth scroll
│   │   ├── useScrollReveal.js       # Animations d'entrée au scroll
│   │   ├── useMousePosition.js      # Suivi de position souris
│   │   └── useIsMobile.js           # Détection mobile responsive
│   │
│   ├── styles/
│   │   └── globals.css              # Tailwind v4, variables CSS, classes utilitaires
│   │
│   ├── App.jsx                      # Racine : phases intro/site, PresentationProvider
│   └── main.jsx                     # Point d'entrée React 19
│
├── index.html                       # HTML, SEO complet, Open Graph, PWA, performance hints
├── vite.config.js                   # Bundler : chunks, alias, cibles ES2020
├── package.json                     # Dépendances npm
└── README.md                        # Documentation (ce fichier)
```

---

## Installation et lancement

### Prérequis

- **Node.js** 18 ou supérieur — [nodejs.org](https://nodejs.org)
- **npm** 9+ (inclus avec Node.js)

### Installation

```bash
# 1. Cloner le projet
git clone https://github.com/ton-username/portfolio-madjid.git
cd portfolio-madjid

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
# → Ouvrir http://localhost:5173 dans le navigateur
```

### Commandes disponibles

| Commande            | Description                                       |
|---------------------|---------------------------------------------------|
| `npm run dev`       | Serveur de développement avec rechargement à chaud |
| `npm run build`     | Build de production optimisé dans `/dist`         |
| `npm run preview`   | Prévisualisation locale du build de production    |

---

## Personnalisation du contenu

> **Pour l'épreuve E6 : modifie uniquement les fichiers `src/data/` et `/public/`.**  
> Les composants React ne nécessitent aucune modification.

### Fichiers à modifier

| Fichier                          | Contenu à personnaliser                               |
|----------------------------------|-------------------------------------------------------|
| `src/data/projects.js`          | Titre, description, stack technique, screenshots, liens |
| `src/data/skills.js`            | Compétences, outils, niveaux de maîtrise              |
| `src/data/veille.js`            | Sources de veille, articles, analyses                 |
| `src/data/timeline.js`          | Formations, stages, expériences avec vraies dates     |
| `src/data/contact.js`           | Email, GitHub, LinkedIn, autres liens                 |
| `public/CV-Madjid-ALLOUTI.pdf`  | CV au format PDF (lien de téléchargement dans Contact)|
| `public/setup-intro.jpg`        | Photo d'ambiance (section intro ou About)             |
| `public/og-image.svg`           | Image de prévisualisation pour réseaux sociaux        |
| `index.html` lignes `canonical` | Remplacer l'URL par ton domaine de déploiement        |

---

## Performances

### Taille du build de production

| Chunk               | Taille brute | Gzip    | Contenu                             |
|---------------------|-------------|---------|-------------------------------------|
| `vendor-three`      | ~882 KB     | ~235 KB | Three.js + React Three Fiber + Drei |
| `vendor-motion`     | ~143 KB     | ~47 KB  | Framer Motion 12                    |
| `vendor-react`      | ~182 KB     | ~57 KB  | React 19 + ReactDOM                 |
| `index` (app)       | ~95 KB      | ~30 KB  | Code applicatif principal           |
| Sections lazy       | 7–24 KB     | 3–6 KB  | About, Skills, Projects, etc.       |

> Three.js est volumineux mais attendu pour un rendu 3D. Il est isolé dans un chunk séparé mis en cache navigateur.

### Optimisations appliquées

- Code splitting par type de lib (`manualChunks` Vite)
- `React.lazy` + `Suspense` sur toutes les sections sauf Hero
- Animations de paquets 100% impératives (RAF, DOM direct, 0 setState par frame)
- Polices auto-hébergées via Fontsource (pas de CDN externe, conforme RGPD)
- Préconnexion DNS vers jsDelivr (TopoJSON carte monde)
- `prefers-reduced-motion` OS respecté

### Scores Lighthouse cibles

| Métrique         | Cible |
|------------------|-------|
| Performance      | ≥ 90  |
| Accessibilité    | ≥ 95  |
| Best Practices   | ≥ 95  |
| SEO              | ≥ 95  |

> Mesure : Chrome DevTools → Lighthouse → Desktop → "Analyser la page".

---

## Compétences BTS SIO démontrées

> À compléter par le candidat en référence au guide d'accompagnement officiel de l'épreuve E6.

### Compétences du référentiel illustrées

| Domaine de compétences                  | Illustration dans ce portfolio                          |
|-----------------------------------------|---------------------------------------------------------|
| Concevoir et réaliser une infrastructure réseau | Topologie 3D interactive (Three.js), intro carte mondiale |
| Administrer des systèmes d'exploitation  | Projets Active Directory, Zabbix, pfSense (section Projets) |
| Sécuriser les infrastructures            | Projets et veille cybersécurité (pare-feu, VPN, IDS)   |
| Exploiter un service informatique        | Timeline des stages et missions professionnelles        |
| Communiquer en environnement professionnel | Mode présentation oral, portfolio responsive            |
| Réaliser une veille technologique        | Section Veille avec sources primaires et analyse        |

### Compétences transversales illustrées

- **Développement web moderne** : React 19, Vite 8, Tailwind CSS v4
- **Animation et performance** : 60fps, Three.js WebGL, RAF impératif
- **Accessibilité** : WCAG AA, ARIA, navigation clavier complète
- **Outillage professionnel** : Git, npm, CI/CD Vercel
- **Documentation** : README structuré, commentaires en français

---

## Crédits et remerciements

| Ressource                   | Source                                                                   |
|-----------------------------|--------------------------------------------------------------------------|
| Carte monde (TopoJSON 110m) | [world-atlas](https://github.com/topojson/world-atlas) — Mike Bostock   |
| Polices variables           | [Fontsource](https://fontsource.org) — Space Grotesk, DM Sans, JetBrains Mono |
| Icônes                      | [Lucide](https://lucide.dev)                                             |
| Smooth scroll               | [Lenis](https://lenis.studiofreight.com) — Studio Freight                |
| Photo d'ambiance (optionnelle) | [Unsplash](https://unsplash.com) — Jack B                             |

---

## Déploiement

### Vercel (recommandé — gratuit)

```bash
# 1. Créer un dépôt GitHub
git init
git add .
git commit -m "feat: portfolio initial"
git remote add origin https://github.com/ton-username/portfolio-madjid.git
git push -u origin main

# 2. Sur vercel.com
# → "Add New Project" → importer le dépôt GitHub
# → Vercel détecte Vite automatiquement (framework preset: Vite)
# → Cliquer "Deploy"
# → URL publique disponible en 30 secondes
```

**Variables d'environnement :** aucune requise. Le projet est 100% statique côté client.

### Autres hébergements

- **Netlify** — drag-and-drop du dossier `/dist` après `npm run build`
- **GitHub Pages** — ajouter `base: '/nom-du-repo/'` dans `vite.config.js`
- **Hébergement FTP classique** — uploader le contenu du dossier `/dist`

---

## Licence

Code source disponible sous licence **MIT**.

Vous êtes libre de vous inspirer de l'architecture pour votre propre portfolio. Merci de ne pas utiliser directement le contenu personnel (textes, projets, photos de Madjid ALLOUTI).

---

*Portfolio développé avec React 19, Vite 8, Framer Motion 12 et Three.js — 2025/2026.*  
*Épreuve E6 BTS SIO SISR — Futur Architecte Réseau.*
