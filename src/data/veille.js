// POUR PERSONNALISER : modifiez les valeurs ci-dessous
// (Claude Code peut aussi le faire pour vous plus tard)

/* ── Thème principal de la veille ── */
export const veilleTheme = {
  mainTopic: "Cybersécurité & Infrastructures réseau",
  subtitle:
    "Ma veille se concentre sur l'évolution des menaces, les bonnes pratiques de sécurisation des infrastructures, et les nouvelles technologies réseau (SD-WAN, Zero Trust, IPv6).",
  since: "2024-09", // format YYYY-MM
}

/* ── Sources de veille ──
   Icônes disponibles (Lucide) : Newspaper, Shield, AlertTriangle,
   BookOpen, Users, Rss, Globe, Terminal, Monitor, Wifi …
   Couleurs : n'importe quel hex */
export const veilleSources = [
  {
    name:      "Le Monde Informatique",
    type:      "Média spécialisé",
    url:       "https://www.lemondeinformatique.fr",
    frequency: "Quotidienne",
    icon:      "Newspaper",
    color:     "#3B82F6",
  },
  {
    name:      "Zataz",
    type:      "Cybersécurité",
    url:       "https://www.zataz.com",
    frequency: "Hebdomadaire",
    icon:      "Shield",
    color:     "#F59E0B",
  },
  {
    name:      "CERT-FR",
    type:      "Alertes officielles",
    url:       "https://www.cert.ssi.gouv.fr",
    frequency: "Dès publication",
    icon:      "AlertTriangle",
    color:     "#EF4444",
  },
  {
    name:      "Cisco Learning Network",
    type:      "Documentation technique",
    url:       "https://learningnetwork.cisco.com",
    frequency: "Mensuelle",
    icon:      "BookOpen",
    color:     "#06B6D4",
  },
  {
    name:      "Reddit r/sysadmin",
    type:      "Communauté",
    url:       "https://reddit.com/r/sysadmin",
    frequency: "Quotidienne",
    icon:      "Users",
    color:     "#10B981",
  },
  {
    name:      "Ars Technica",
    type:      "Actualité tech",
    url:       "https://arstechnica.com",
    frequency: "Hebdomadaire",
    icon:      "Rss",
    color:     "#8B5CF6",
  },
]

/* ── Sujets récents étudiés ──
   category : "Sécurité" | "Réseau" | "Système" | "Cloud" …
   date     : format YYYY-MM (affiché tel quel)
   keywords : tableau de tags courts */
export const veilleTopics = [
  {
    id:       "topic-1",
    title:    "Zero Trust Architecture",
    category: "Sécurité",
    summary:
      "Modèle de sécurité qui ne fait confiance à aucun élément par défaut, interne ou externe.",
    date:     "2025-12",
    keywords: ["ZTA", "Micro-segmentation", "IAM"],
  },
  {
    id:       "topic-2",
    title:    "Migration IPv6 en entreprise",
    category: "Réseau",
    summary:
      "Défis et bonnes pratiques de déploiement IPv6 dans les infrastructures existantes.",
    date:     "2025-11",
    keywords: ["IPv6", "Dual-stack", "SLAAC"],
  },
  {
    id:       "topic-3",
    title:    "Ransomware & sauvegardes immuables",
    category: "Sécurité",
    summary:
      "Comment protéger ses sauvegardes face aux attaques par rançongiciel modernes.",
    date:     "2025-10",
    keywords: ["Ransomware", "Backup", "Immutable storage"],
  },
  {
    id:       "topic-4",
    title:    "SD-WAN et télétravail",
    category: "Réseau",
    summary:
      "L'évolution des réseaux WAN avec les solutions software-defined pour connecter les sites distants.",
    date:     "2025-09",
    keywords: ["SD-WAN", "VPN", "Cloud"],
  },
]
