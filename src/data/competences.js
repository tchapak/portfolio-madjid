/* ═══════════════════════════════════════════════════════
   competences.js — Fiches de compétences BTS SIO SISR
   Épreuve E6 — Validation des savoirs professionnels
   ═══════════════════════════════════════════════════════
   POUR MODIFIER : ajoutez / modifiez les entrées dans fiches[]
   Les stats (validées, en cours, total) sont calculées
   automatiquement depuis les statuts des fiches.
   ═══════════════════════════════════════════════════════ */

export const COMPETENCES_DATA = {
  meta: {
    title: "Fiches de compétences",
    subtitle: "Validation des compétences BTS SIO SISR — Épreuve E6",
    description: "Retrouvez ici l'ensemble des fiches de compétences validées dans le cadre de ma formation au BTS SIO option SISR. Chaque fiche documente un savoir-faire spécifique appuyé par un projet concret.",
  },

  /* Les stats sont calculées dynamiquement dans le composant.
     Ces valeurs servent de fallback si besoin. */
  stats: {
    validees: 0,
    enCours:  0,
    total:    0,
  },

  /* ── Liste des fiches ── */
  fiches: [
    {
      id:           "fiche-1",
      bloc:         "Bloc 1",
      blocTitle:    "Support et mise à disposition de services informatiques",
      code:         "B1.1",
      title:        "Gérer le patrimoine informatique",
      description:  "Recenser et identifier les ressources numériques, exploiter des référentiels, schémas et diagrammes. Mettre en place et maintenir un inventaire du parc informatique.",
      contextProject: "Stage Square Habitat — Gestion d'un parc de 80+ postes Windows",
      technologies: ["GLPI", "Active Directory", "Windows Server 2019"],
      status:       "validee",
      date:         "2025-06",
      pdfFile:      "/competences/B1-1-gerer-patrimoine.pdf",
    },
    {
      id:           "fiche-2",
      bloc:         "Bloc 2",
      blocTitle:    "Administration des systèmes et des réseaux",
      code:         "B2.2",
      title:        "Concevoir une solution d'infrastructure réseau",
      description:  "Analyser les besoins, proposer et documenter une architecture réseau adaptée. Configurer des équipements réseau, implémenter des VLANs et le routage inter-VLAN.",
      contextProject: "Projet de classe — Conception d'une infrastructure multi-sites",
      technologies: ["Cisco Packet Tracer", "VLAN", "Routage statique", "Cisco IOS"],
      status:       "validee",
      date:         "2025-04",
      pdfFile:      "/competences/B2-2-concevoir-infrastructure.pdf",
    },
    {
      id:           "fiche-3",
      bloc:         "Bloc 2",
      blocTitle:    "Administration des systèmes et des réseaux",
      code:         "B2.3",
      title:        "Installer, configurer et maintenir des systèmes",
      description:  "Déployer et administrer un environnement Active Directory complet avec GPO, DNS, DHCP et partages réseau. Automatiser les tâches d'administration via PowerShell.",
      contextProject: "TP classe + Stage — Déploiement d'un domaine Windows Server",
      technologies: ["Windows Server 2019", "Active Directory", "GPO", "DNS", "DHCP"],
      status:       "validee",
      date:         "2025-05",
      pdfFile:      "/competences/B2-3-installer-systemes.pdf",
    },
    {
      id:           "fiche-4",
      bloc:         "Bloc 3",
      blocTitle:    "Cybersécurité des services informatiques",
      code:         "B3.1",
      title:        "Sécuriser les équipements et les usages",
      description:  "Mettre en œuvre une politique de sécurité : pare-feu pfSense, filtrage applicatif, GPO de durcissement, segmentation réseau DMZ. Rédiger les procédures de sécurité.",
      contextProject: "TP sécurité — Mise en place d'un périmètre sécurisé avec pfSense",
      technologies: ["pfSense", "GPO", "Pare-feu", "Filtrage URL", "DMZ"],
      status:       "en-cours",
      date:         "2025-09",
      pdfFile:      "/competences/B3-1-securiser-equipements.pdf",
    },
    {
      id:           "fiche-5",
      bloc:         "Bloc 3",
      blocTitle:    "Cybersécurité des services informatiques",
      code:         "B3.2",
      title:        "Détecter et prévenir les intrusions",
      description:  "Surveiller une infrastructure réseau, analyser les flux avec Wireshark, mettre en place un système de supervision Zabbix, interpréter les journaux système.",
      contextProject: "Projet supervision — Monitoring d'une infrastructure virtuelle",
      technologies: ["Wireshark", "Zabbix", "Syslog", "SNMP"],
      status:       "en-cours",
      date:         "2025-10",
      pdfFile:      "/competences/B3-2-detecter-intrusions.pdf",
    },
  ],
}
