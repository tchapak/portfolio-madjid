/**
 * veille.js — Veille technologique
 * 
 * POUR PERSONNALISER : modifiez le thème, les sources et les
 * sujets selon votre vraie veille. C'est un critère obligatoire
 * de l'épreuve E6 — le jury va vous poser des questions !
 * 
 * Structure :
 * - veilleTheme  : thème principal de la veille
 * - veilleSources : liste des sources suivies (médias, sites,
 *                   chaînes YouTube, communautés)
 * - veilleTopics  : sujets récents étudiés (préparer 3 phrases
 *                   clés par sujet pour l'oral)
 */

export const veilleTheme = {
  mainTopic: "Cybersécurité des infrastructures réseau",
  subtitle: "Ma veille se concentre sur la sécurisation des systèmes d'information : nouvelles menaces, modèles de sécurité modernes (Zero Trust), réglementations européennes et bonnes pratiques de durcissement des infrastructures critiques.",
  since: "2024-09"
}

export const veilleSources = [
  { 
    name: "CERT-FR",
    type: "Alertes officielles ANSSI",
    url: "https://www.cert.ssi.gouv.fr",
    frequency: "Dès publication",
    icon: "AlertTriangle"
  },
  { 
    name: "Le Monde Informatique",
    type: "Média spécialisé B2B",
    url: "https://www.lemondeinformatique.fr",
    frequency: "Quotidienne",
    icon: "Newspaper"
  },
  { 
    name: "Zataz",
    type: "Cybersécurité francophone",
    url: "https://www.zataz.com",
    frequency: "Hebdomadaire",
    icon: "Shield"
  },
  { 
    name: "Korben",
    type: "Tech & sécurité accessible",
    url: "https://korben.info",
    frequency: "Plusieurs fois/semaine",
    icon: "Rss"
  },
  {
    name: "Cocadmin (YouTube)",
    type: "Chaîne FR administration & SISR",
    url: "https://www.youtube.com/@cocadmin",
    frequency: "Mensuelle",
    icon: "Youtube"
  },
  {
    name: "Reddit r/sysadmin",
    type: "Communauté internationale",
    url: "https://www.reddit.com/r/sysadmin",
    frequency: "Hebdomadaire",
    icon: "Users"
  }
]

export const veilleTopics = [
  {
    id: "topic-1",
    title: "Zero Trust Architecture",
    category: "Sécurité",
    summary: "Modèle de sécurité qui ne fait confiance à aucun élément par défaut, qu'il soit interne ou externe. Repose sur la micro-segmentation, le contrôle d'accès strict (IAM) et l'authentification multifacteur partout.",
    date: "2026-04",
    keywords: ["ZTA", "Micro-segmentation", "IAM"]
  },
  {
    id: "topic-2",
    title: "Ransomware & sauvegardes immuables",
    category: "Sécurité",
    summary: "Évolution des ransomwares vers la double extorsion (chiffrement + exfiltration). Le stockage immuable (objet lock, WORM, snapshots verrouillés) permet de protéger les sauvegardes des attaquants. La règle 3-2-1-1-0 devient le standard.",
    date: "2026-03",
    keywords: ["Ransomware", "Immutable backup", "3-2-1-1-0"]
  },
  {
    id: "topic-3",
    title: "Directive NIS2 & obligations cyber",
    category: "Réglementation",
    summary: "Transposition européenne qui élargit considérablement le périmètre des entreprises soumises à des obligations de cybersécurité. Notification d'incidents sous 24h, sanctions financières renforcées, gouvernance imposée au top management.",
    date: "2026-02",
    keywords: ["NIS2", "ANSSI", "Compliance"]
  },
  {
    id: "topic-4",
    title: "Active Directory & attaques modernes",
    category: "Système",
    summary: "Techniques d'attaque ciblant AD : Kerberoasting (extraction de hash), Pass-the-Hash, Golden Ticket. Outils utilisés (BloodHound, Mimikatz). Bonnes pratiques de hardening : tier model, comptes admin séparés, surveillance des privilèges.",
    date: "2026-01",
    keywords: ["AD", "Kerberoasting", "Hardening"]
  }
]