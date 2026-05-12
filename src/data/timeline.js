/**
 * timeline.js — Parcours et objectifs de carrière
 * 
 * POUR PERSONNALISER : modifiez les événements ci-dessous.
 * Chaque événement représente une étape clé du parcours
 * (formation, stage, objectif).
 * 
 * Types disponibles :
 * - "formation" : études, diplômes
 * - "stage"     : expériences professionnelles
 * - "objectif"  : projection future / carrière
 * 
 * Icônes Lucide disponibles : GraduationCap, Briefcase,
 * Code, Target, Network, Crown, Award, Building2, Rocket
 */

export const timelineEvents = [
  {
    id: "event-bac",
    year: "2023",
    period: "Juin 2023",
    title: "Baccalauréat Général",
    subtitle: "Spécialités Mathématiques et SVT — Mention Assez Bien",
    description: "Obtention du baccalauréat général au Lycée Marie Reynoard de Villard-Bonnot, première étape qui m'a confirmé mon intérêt pour la rigueur logique et les sciences.",
    type: "formation",
    icon: "Award",
    current: false
  },
  {
    id: "event-bts-debut",
    year: "2024",
    period: "Septembre 2024",
    title: "Entrée en BTS SIO",
    subtitle: "Option SISR — Lycée Louise Michel, Grenoble",
    description: "Choix du BTS SIO option SISR pour bâtir des bases solides en infrastructure systèmes et réseaux, en cohérence avec mon objectif d'évoluer vers l'administration et l'architecture réseau.",
    type: "formation",
    icon: "GraduationCap",
    current: false
  },
  {
    id: "event-stage-1",
    year: "2025",
    period: "Juin - Juillet 2025",
    title: "Stage 1ère année",
    subtitle: "Square Habitat — Siège Le Bourgamont",
    description: "Stage de 5 semaines au siège d'une grande entreprise du secteur immobilier. Missions variées : support hotline, administration système, supervision du parc, mise en place de matériel (serveurs virtuels, ventilation), résolution de pannes en environnement professionnel.",
    type: "stage",
    icon: "Briefcase",
    current: false
  },
  {
    id: "event-bts-2",
    year: "2025-2026",
    period: "En cours",
    title: "2ème année BTS SIO SISR",
    subtitle: "Approfondissement technique",
    description: "Spécialisation sur l'Active Directory, la virtualisation (VMware, Proxmox), les pare-feu pfSense, la sécurité des infrastructures et l'automatisation. Préparation de l'épreuve E6 avec un portfolio professionnel.",
    type: "formation",
    icon: "Code",
    current: true
  },
  {
    id: "event-stage-2",
    year: "2026",
    period: "Mars - Avril 2026",
    title: "Stage 2ème année",
    subtitle: "Solutions Clés",
    description: "Stage de 5 semaines orienté terrain : installation de matériel informatique, programmation de clés, résolution de pannes et service client. Mise en pratique des compétences SISR en conditions réelles.",
    type: "stage",
    icon: "Briefcase",
    current: false
  },
  {
    id: "event-poursuite",
    year: "2026",
    period: "Septembre 2026",
    title: "Poursuite d'études",
    subtitle: "Bachelor DevOps ou BUT Informatique",
    description: "Poursuite envisagée vers un Bachelor DevOps (Lycée Louise Michel) ou un BUT Informatique, afin d'approfondir l'expertise en infrastructure cloud, automatisation et chaînes CI/CD modernes.",
    type: "objectif",
    icon: "Rocket",
    current: false
  },
  {
    id: "event-admin",
    year: "2028+",
    period: "Objectif carrière",
    title: "Administrateur Systèmes & Réseaux",
    subtitle: "Entrée dans la vie professionnelle",
    description: "Premier poste visé : administrateur systèmes et réseaux au sein d'une DSI ou d'une ESN. Mission : garantir la disponibilité, la performance et la sécurité d'infrastructures critiques.",
    type: "objectif",
    icon: "Network",
    current: false
  },
  {
    id: "event-architecte",
    year: "À terme",
    period: "Objectif long terme",
    title: "Architecte Réseau",
    subtitle: "Conception d'infrastructures stratégiques",
    description: "Évolution vers un poste d'architecte réseau pour concevoir, dimensionner et faire évoluer des infrastructures complexes au cœur des enjeux stratégiques des organisations.",
    type: "objectif",
    icon: "Crown",
    current: false
  }
]