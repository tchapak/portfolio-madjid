/**
 * competences.js — Fiches de compétences BTS SIO SISR (Épreuve E6)
 * 
 * 12 fiches de compétences couvrant les 6 compétences du Bloc 1.
 * Chaque fiche correspond à un PDF dans /public/competences/
 * 
 * Pour ajouter/modifier une fiche :
 * 1. Placez le PDF dans /public/competences/
 * 2. Ajoutez une entrée dans le tableau ci-dessous
 * 3. Vérifiez que le champ pdfFile correspond au nom exact du fichier
 */

export const COMPETENCES_DATA = {
  meta: {
    title: "Fiches de compétences",
    subtitle: "Validation des compétences BTS SIO SISR — Épreuve E6",
    description: "Retrouvez ici l'ensemble des fiches de compétences validées dans le cadre de ma formation au BTS SIO option SISR. Chaque fiche documente un savoir-faire spécifique appuyé par un projet concret."
  },

  stats: {
    validees: 12,
    enCours: 0,
    total: 12
  },

  fiches: [
    {
      id: "fiche-01",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.1",
      title: "Active Directory — Déploiement et administration",
      description: "Installation et configuration d'un contrôleur de domaine Active Directory, création de la structure d'annuaire (OU, utilisateurs, groupes).",
      contextProject: "TP classe + Stage Square Habitat",
      technologies: ["Active Directory", "Windows Server", "DNS"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-01-AD.pdf"
    },
    {
      id: "fiche-02",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.5",
      title: "DHCP — Mise en place d'un service d'adressage dynamique",
      description: "Installation et configuration d'un serveur DHCP pour l'attribution automatique des adresses IP sur le réseau.",
      contextProject: "TP classe — Infrastructure réseau complète",
      technologies: ["DHCP", "Windows Server", "Linux Debian"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-02-DHCP.pdf"
    },
    {
      id: "fiche-03",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.1",
      title: "GPO — Stratégies de groupe",
      description: "Déploiement de stratégies de groupe (GPO) pour la gestion centralisée des paramètres utilisateurs et postes de travail.",
      contextProject: "TP classe + Stage Square Habitat",
      technologies: ["GPO", "Active Directory", "Windows Server"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-3-GPO-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-04",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.5",
      title: "Pare-feu — Configuration et règles de filtrage",
      description: "Installation et configuration d'un pare-feu (OPNsense), création des interfaces réseau (LAN, WAN, DMZ) et définition des règles de filtrage.",
      contextProject: "TP classe — Infrastructure réseau complète",
      technologies: ["OPNsense", "Pare-feu", "Filtrage", "NAT"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-4-Parefeu-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-05",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.5",
      title: "RDP — Accès bureau à distance",
      description: "Configuration du protocole RDP (Remote Desktop Protocol) pour permettre l'accès distant sécurisé aux postes et serveurs.",
      contextProject: "TP classe + Stage Square Habitat",
      technologies: ["RDP", "Windows Server", "GPO"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-5-RDP-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-06",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.4",
      title: "Segmentation réseau — VLAN et zones",
      description: "Segmentation logique d'un réseau en zones distinctes (LAN, DMZ, serveurs) pour améliorer la sécurité et les performances.",
      contextProject: "TP classe — Infrastructure réseau complète",
      technologies: ["VLAN", "OPNsense", "Switch", "Routage"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-6-Segmentation-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-07",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.4",
      title: "Schéma réseau — Conception d'architecture",
      description: "Conception et documentation de schémas d'architecture réseau pour planifier et visualiser l'infrastructure déployée.",
      contextProject: "TP classe — Infrastructure réseau complète",
      technologies: ["Draw.io", "Architecture réseau", "Documentation"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-7-Schema-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-08",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.5",
      title: "Serveur de fichiers — Partage et droits d'accès",
      description: "Mise en place d'un serveur de fichiers avec gestion des partages réseau, des permissions NTFS et des droits d'accès par groupe.",
      contextProject: "TP classe + Stage Square Habitat",
      technologies: ["Windows Server", "NTFS", "Partages réseau", "NAS"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-8-ServeurFichiers-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-09",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.1",
      title: "Poste de travail — Installation et intégration au domaine",
      description: "Installation, configuration et intégration de postes de travail au domaine Active Directory, déploiement des logiciels métier.",
      contextProject: "Stage Solutions Clés + Stage Square Habitat",
      technologies: ["Windows 10/11", "Active Directory", "Logiciels métier"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-9-PosteTravail-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-10",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.1",
      title: "Comptes AD — Gestion des utilisateurs et des droits",
      description: "Gestion complète des comptes utilisateurs Active Directory : création, modification, désactivation, gestion des groupes et des habilitations.",
      contextProject: "Stage Square Habitat",
      technologies: ["Active Directory", "Groupes AD", "OU", "Habilitations"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-10-CompteAD-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-11",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.5",
      title: "Boîte mail — Configuration de messagerie",
      description: "Mise en place et configuration de boîtes mail professionnelles, gestion des profils Outlook et résolution de problèmes de synchronisation.",
      contextProject: "Stage Square Habitat",
      technologies: ["Outlook", "Exchange", "Profils mail", "IMAP/SMTP"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-11-BoiteMail-AlloutiMadjid.pdf"
    },
    {
      id: "fiche-12",
      bloc: "Bloc 1",
      blocTitle: "Support et mise à disposition de services informatiques",
      code: "B1.2",
      title: "Imprimante — Installation et dépannage",
      description: "Installation, configuration et dépannage d'imprimantes réseau, gestion des files d'impression et résolution des incidents courants.",
      contextProject: "Stage Square Habitat + Stage Solutions Clés",
      technologies: ["Imprimantes réseau", "Pilotes", "File d'impression", "TCP/IP"],
      status: "validee",
      date: "2026-05",
      pdfFile: "/competences/Fiche-12-Imprimante-AlloutiMadjid.pdf"
    }
  ]
}