// POUR PERSONNALISER : modifiez les valeurs ci-dessous
// (Claude Code peut aussi le faire pour vous plus tard)

/* ── Événements de la timeline ──
   type  : "formation" | "stage" | "objectif"
          → formation = bleu #3B82F6
          → stage     = cyan #06B6D4
          → objectif  = amber #F59E0B
   icon  : nom d'icône Lucide (GraduationCap, Briefcase, Code,
           Target, Network, Crown, Rocket, Star …)
   current : true → nœud qui pulse + badge "En cours" */
export const timelineEvents = [
  {
    id:          "event-1",
    year:        "2024",
    period:      "Septembre 2024",
    title:       "Entrée en BTS SIO",
    subtitle:    "Option SISR",
    description:
      "Début de ma formation en Services Informatiques aux Organisations, option Solutions d'Infrastructure, Systèmes et Réseaux.",
    type:        "formation",
    icon:        "GraduationCap",
    current:     false,
  },
  {
    id:          "event-2",
    year:        "2025",
    period:      "Mai – Juin 2025",
    title:       "Stage 1ère année",
    subtitle:    "Découverte du métier",
    description:
      "Premier stage en entreprise : découverte de l'administration système et des infrastructures réseau en conditions réelles.",
    type:        "stage",
    icon:        "Briefcase",
    current:     false,
  },
  {
    id:          "event-3",
    year:        "2026",
    period:      "En cours",
    title:       "2ème année BTS SIO",
    subtitle:    "Approfondissement SISR",
    description:
      "Spécialisation sur la virtualisation, la sécurité des infrastructures et l'automatisation. Préparation à l'épreuve E6.",
    type:        "formation",
    icon:        "Code",
    current:     true,
  },
  {
    id:          "event-4",
    year:        "2026",
    period:      "Avril – Juin 2026",
    title:       "Stage 2ème année",
    subtitle:    "Mission technique",
    description:
      "Stage de fin d'études avec des missions à responsabilité sur des projets d'infrastructure.",
    type:        "stage",
    icon:        "Briefcase",
    current:     false,
  },
  {
    id:          "event-5",
    year:        "2026",
    period:      "Septembre 2026",
    title:       "Poursuite d'études",
    subtitle:    "Licence pro / Bachelor",
    description:
      "Poursuite en Licence professionnelle ou Bachelor en Administration Systèmes et Réseaux pour approfondir l'expertise.",
    type:        "objectif",
    icon:        "Target",
    current:     false,
  },
  {
    id:          "event-6",
    year:        "2027+",
    period:      "Objectif carrière",
    title:       "Administrateur Systèmes & Réseaux",
    subtitle:    "Entrée dans la vie pro",
    description:
      "Premier poste en tant qu'administrateur systèmes et réseaux au sein d'une DSI ou d'une ESN.",
    type:        "objectif",
    icon:        "Network",
    current:     false,
  },
  {
    id:          "event-7",
    year:        "À terme",
    period:      "Objectif long terme",
    title:       "Architecte Réseau",
    subtitle:    "Expertise & conception",
    description:
      "Évolution vers un poste d'architecte réseau pour concevoir des infrastructures complexes et stratégiques.",
    type:        "objectif",
    icon:        "Crown",
    current:     false,
  },
]
