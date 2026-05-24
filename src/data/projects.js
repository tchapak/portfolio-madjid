/**
 * projects.js — Projets réalisés dans le cadre du BTS SIO SISR
 * 
 * POUR PERSONNALISER : modifiez les textes, technologies,
 * descriptions et liens selon vos vrais projets.
 * 
 * Chaque projet documente une réalisation concrète présentée
 * lors de l'épreuve E6 du BTS SIO option SISR.
 */

export const CATEGORY_COLORS = {
  Infrastructure: "#3B82F6",
  Réseau: "#06B6D4",
  Sécurité: "#F59E0B",
  Supervision: "#8B5CF6",
  Exploitation: "#10B981",
  Virtualisation: "#EC4899"
}

export const PROJECTS = [
  {
    id: "projet-square-habitat",
    title: "Administration d'un parc informatique en entreprise",
    slug: "admin-parc-square-habitat",
    category: "Infrastructure",
    shortDescription: "Gestion des utilisateurs AD et support technique N1/N2 sur un parc multi-services.",
    context: "Stage 1ère année — Square Habitat (siège Le Bourgamont)",
    duration: "5 semaines",
    date: "2025-06",
    problem: "Square Habitat, grande entreprise du secteur immobilier, dispose d'un parc informatique étendu réparti sur plusieurs services. L'équipe IT doit assurer la gestion quotidienne des comptes utilisateurs Active Directory, le support technique de niveau 1 et 2, ainsi que la résolution rapide des incidents pour garantir la continuité de l'activité.",
    solution: "Prise en charge de l'administration des comptes utilisateurs Active Directory pour l'ensemble des services : création, modification, désactivation de comptes, gestion des droits et des groupes. Résolution d'incidents variés en support hotline : problèmes d'accès NAS (droits de partage, mapping réseau), dépannage de la connectivité WiFi, déblocage de comptes verrouillés, résolution de dysfonctionnements Outlook (profils corrompus, synchronisation). Consultation régulière de l'outil de supervision Zabbix pour comprendre le monitoring de l'infrastructure.",
    technologies: ["Active Directory", "Windows Server", "Zabbix", "NAS", "Outlook", "GPO"],
    skills: [
      "— Gérer le patrimoine informatique : recenser et identifier les ressources numériques, vérifier les niveaux d'habilitation, gérer des sauvegardes",
      "— Répondre aux incidents et aux demandes d'assistance : collecter, suivre et orienter des demandes, traiter des demandes concernant les services réseau et système"
    ],
    image: "/placeholder-project.svg",
    links: {
      github: null,
      demo: null,
      documentation: null
    },
    status: "UP",
    highlights: [
      "Gestion des comptes AD de l'ensemble des services de l'entreprise",
      "Résolution d'incidents N1/N2 : accès NAS, WiFi, comptes bloqués, Outlook",
      "Découverte de la supervision Zabbix en environnement de production",
      "Mise en place de matériel : serveurs virtuels, ventilation"
    ]
  },
  {
    id: "projet-proxmox",
    title: "Mise en place d'un hyperviseur Proxmox VE",
    slug: "hyperviseur-proxmox",
    category: "Virtualisation",
    shortDescription: "Installation et configuration d'un hyperviseur Proxmox sur machine physique.",
    context: "Stage 1ère année — Square Habitat (entraînement personnel)",
    duration: "1 semaine",
    date: "2025-07",
    problem: "Dans le cadre de ma montée en compétences pendant le stage, j'ai souhaité me former à la virtualisation de type bare-metal en installant un hyperviseur professionnel sur une machine physique dédiée. L'objectif était de comprendre le processus complet d'installation et de configuration d'un environnement de virtualisation, compétence essentielle pour tout administrateur systèmes et réseaux.",
    solution: "Téléchargement de l'ISO Proxmox VE depuis le site officiel, création d'une clé USB bootable à l'aide de Rufus, puis installation complète de l'hyperviseur sur une machine physique dédiée. Configuration post-installation : paramétrage réseau, accès à l'interface web d'administration, création de premières machines virtuelles de test. Cette installation a été réalisée en environnement isolé (hors réseau de production) pour des raisons de sécurité.",
    technologies: ["Proxmox VE", "Rufus", "ISO", "Virtualisation bare-metal", "Interface web Proxmox"],
    skills: [
      "— Gérer le patrimoine informatique : mettre en place un environnement de virtualisation, vérifier les conditions de continuité d'un service",
      "— Organiser son développement professionnel : mettre en place son environnement d'apprentissage personnel, développer son projet professionnel"
    ],
    image: "/placeholder-project.svg",
    links: {
      github: null,
      demo: null,
      documentation: null
    },
    status: "UP",
    highlights: [
      "Installation complète de Proxmox VE sur machine physique (bare-metal)",
      "Création de clé USB bootable avec Rufus à partir de l'ISO officiel",
      "Configuration réseau et accès à l'interface d'administration web",
      "Environnement isolé hors production pour sécuriser l'entraînement"
    ]
  },
  {
    id: "projet-migration-solutions-cles",
    title: "Migration informatique lors d'un déménagement d'entreprise",
    slug: "migration-solutions-cles",
    category: "Exploitation",
    shortDescription: "Transfert complet du parc informatique et des données lors du déménagement du local.",
    context: "Stage 2ème année — Solutions Clés",
    duration: "5 semaines",
    date: "2026-03",
    problem: "L'entreprise Solutions Clés déménage vers un nouveau local. L'ensemble du parc informatique doit être transféré, de nouveaux postes doivent être installés et configurés, et toutes les données, dossiers et logiciels métier doivent être migrés sans perte pour assurer une reprise d'activité immédiate sur le nouveau site.",
    solution: "Planification et exécution de la migration informatique complète : transfert physique de l'ensemble des postes existants vers le nouveau local, réception et installation des nouveaux PC (déballage, branchement, configuration matérielle). Configuration logicielle de chaque poste : installation du système d'exploitation, des logiciels métier, transfert des données et dossiers utilisateurs, vérification de la connectivité réseau. Tests de validation pour garantir que chaque poste est pleinement opérationnel avant la reprise d'activité. En parallèle, interventions terrain pour la programmation de clés et cartes véhicules (utilisation de logiciels spécialisés pour retrouver les informations et programmer les nouvelles clés/cartes) et accompagnement des clients en service après-vente.",
    technologies: ["Windows 10/11", "Migration de données", "Configuration poste", "Logiciels métier", "Réseau local"],
    skills: [
      "— Mettre à disposition des utilisateurs un service informatique : réaliser les tests d'intégration, déployer un service, accompagner les utilisateurs",
      "— Gérer le patrimoine informatique : recenser et identifier les ressources numériques, gérer des sauvegardes",
      "— Répondre aux incidents et aux demandes d'assistance : traiter des demandes concernant les services réseau et système"
    ],
    image: "/placeholder-project.svg",
    links: {
      github: null,
      demo: null,
      documentation: null
    },
    status: "UP",
    highlights: [
      "Migration complète du parc informatique vers un nouveau local",
      "Installation et configuration de nouveaux postes de travail",
      "Transfert des données, dossiers et logiciels métier sans perte",
      "Validation de la reprise d'activité sur l'ensemble des postes"
    ]
  },
  {
    id: "projet-infra-reseau-complete",
    title: "Déploiement d'une infrastructure réseau complète virtualisée",
    slug: "infra-reseau-complete",
    category: "Sécurité",
    shortDescription: "Conception et déploiement d'une infra complète : AD, Nginx, Zabbix, OPNsense et VPN sur Proxmox.",
    context: "Projet de classe — Lycée Louise Michel, Grenoble",
    duration: "En cours",
    date: "2025-09",
    problem: "Dans le cadre de la formation BTS SIO SISR, il est nécessaire de concevoir et déployer une infrastructure réseau d'entreprise complète intégrant l'ensemble des services essentiels : annuaire centralisé, serveur web, supervision, pare-feu et accès distant sécurisé. L'objectif est de maîtriser le déploiement de bout en bout d'une infrastructure professionnelle dans un environnement virtualisé.",
    solution: "Déploiement complet d'une infrastructure réseau virtualisée sur Proxmox VE. L'ensemble des services tourne sur des machines virtuelles dédiées, reproduisant une architecture d'entreprise réaliste. Mise en place d'un contrôleur de domaine Active Directory pour la gestion centralisée des utilisateurs et des postes clients. Installation d'un serveur web Nginx pour l'hébergement de services internes. Déploiement de Zabbix pour la supervision de l'ensemble de l'infrastructure (monitoring des VM, alertes). Configuration du pare-feu OPNsense : création des interfaces réseau (LAN, WAN, DMZ), définition des règles de filtrage pour sécuriser les flux entre les zones. Début de mise en place d'un VPN pour l'accès distant sécurisé (en cours de finalisation).",
    technologies: ["Proxmox VE", "Active Directory", "Windows Server", "Nginx", "Zabbix", "OPNsense", "VPN", "DHCP", "DNS", "Linux Debian"],
    skills: [
      "— Travailler en mode projet : analyser les objectifs et les modalités d'organisation, planifier les activités, évaluer les indicateurs de suivi",
      "— Mettre à disposition des utilisateurs un service informatique : réaliser les tests d'intégration et d'acceptation, déployer un service",
      "— Gérer le patrimoine informatique : recenser et identifier les ressources numériques, vérifier les conditions de continuité d'un service informatique"
    ],
    image: "/placeholder-project.svg",
    links: {
      github: null,
      demo: null,
      documentation: null
    },
    status: "UP",
    highlights: [
      "Infrastructure complète virtualisée sur Proxmox VE (environnement de lab)",
      "Active Directory + Nginx + Zabbix + OPNsense déployés sur VMs dédiées",
      "Pare-feu OPNsense : interfaces LAN/WAN/DMZ, règles de filtrage, sécurisation des flux",
      "Supervision Zabbix de l'ensemble des services et machines virtuelles",
      "VPN en cours de déploiement pour l'accès distant sécurisé"
    ]
  }
]