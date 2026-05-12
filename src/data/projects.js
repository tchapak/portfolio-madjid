/* ═══════════════════════════════════════════════════════════════
   POUR MODIFIER TES PROJETS : éditer ce fichier src/data/projects.js
   Chaque objet = 1 carte projet affichée dans la section Projets.
   Tu peux ajouter / supprimer / modifier librement.
   ═══════════════════════════════════════════════════════════════ */

export const PROJECTS = [
  {
    id:               'projet-ad-multisites',
    title:            'Déploiement d\'un Active Directory multi-sites',
    slug:             'active-directory-multisites',
    category:         'Infrastructure',
    shortDescription: 'Mise en place d\'un AD DS multi-sites avec réplication, GPO, DNS intégré et automatisation PowerShell.',
    context:          'Stage 1ère année',
    duration:         '3 semaines',
    date:             '2024-03',
    problem:          "L'entreprise disposait d'un réseau non structuré avec des comptes locaux sur chaque poste. La gestion des droits d'accès était manuelle, impossible à industrialiser. Il fallait centraliser l'authentification et l'administration du parc sur deux sites géographiques distants.",
    solution:         "Déploiement d'un Active Directory Domain Services (AD DS) sur Windows Server 2022 avec deux sites AD (siège + agence). Mise en place de la réplication inter-sites via des liens de sites SMTP. Configuration de plus de 20 GPO pour sécuriser les postes (politique de mots de passe, pare-feu Windows, restrictions d'accès). Automatisation des tâches récurrentes avec des scripts PowerShell.",
    technologies:     ['Windows Server 2022', 'AD DS', 'DNS intégré', 'DHCP', 'GPO', 'PowerShell', 'Sites & Services AD'],
    skills: [
      'B1.1 — Administrer les éléments d\'une infrastructure',
      'B1.2 — Administrer les éléments logiciels d\'une infrastructure',
      'Automatiser des tâches d\'administration système',
      'Gérer les droits d\'accès et les habilitations',
    ],
    image:      '/placeholder-project.svg',
    links:      { github: null, demo: null, documentation: null },
    status:     'UP',
    highlights: [
      '200+ comptes utilisateurs centralisés',
      '20 GPO déployées sur 2 sites AD',
      'Réplication inter-sites configurée et testée',
      'Scripts PowerShell réduisant les tâches répétitives de 80%',
    ],
  },

  {
    id:               'projet-vlan-entreprise',
    title:            'Conception d\'un réseau d\'entreprise segmenté en VLAN',
    slug:             'reseau-vlan-entreprise',
    category:         'Réseau',
    shortDescription: 'Architecture réseau multi-VLAN avec routage inter-VLAN, trunking 802.1Q et redondance STP sur Cisco.',
    context:          'Projet de classe — TP réseau avancé',
    duration:         '2 semaines',
    date:             '2023-11',
    problem:          "Le réseau simulé de l'entreprise n'était pas segmenté : tous les utilisateurs étaient dans le même domaine de diffusion. Les performances étaient dégradées par les broadcasts et il n'y avait aucun cloisonnement entre les services (RH, DSI, Production). L'objectif était de segmenter le réseau et d'assurer le routage entre services.",
    solution:         "Conception complète de l'architecture dans Cisco Packet Tracer. Création de 4 VLANs (Gestion, RH, Production, DSI) avec des pools d'adresses dédiés. Configuration du trunking 802.1Q entre les commutateurs et le routeur. Mise en place du routage inter-VLAN (Router-on-a-Stick). Configuration du protocole STP pour la redondance et l'élimination des boucles.",
    technologies:     ['Cisco Packet Tracer', 'VLAN 802.1Q', 'VTP', 'Trunking', 'STP / RSTP', 'Routage inter-VLAN', 'DHCP par VLAN'],
    skills: [
      'B2.1 — Concevoir une solution d\'infrastructure réseau',
      'B2.2 — Déployer une solution d\'infrastructure réseau',
      'Configurer les équipements réseau (switch, routeur Cisco)',
      'Documenter une architecture réseau',
    ],
    image:      '/placeholder-project.svg',
    links:      { github: null, demo: null, documentation: null },
    status:     'UP',
    highlights: [
      '4 VLANs configurés avec isolation complète',
      'Routage inter-VLAN fonctionnel via Router-on-a-Stick',
      'STP configuré pour éliminer les boucles réseau',
      'Documentation technique complète (schéma + plan d\'adressage)',
    ],
  },

  {
    id:               'projet-pfsense-vpn',
    title:            'Pare-feu pfSense avec VPN site-à-site et IDS',
    slug:             'pfsense-vpn-site-a-site',
    category:         'Sécurité',
    shortDescription: 'Sécurisation d\'un réseau avec pfSense, tunnel VPN IPsec site-à-site et système de détection d\'intrusions Suricata.',
    context:          'TP Sécurité + Atelier professionnel',
    duration:         '4 semaines',
    date:             '2024-01',
    problem:          "L'entreprise avait besoin d'interconnecter de manière sécurisée son siège social avec une agence distante. Les données transitant sur Internet n'étaient pas chiffrées. De plus, il n'existait aucune solution de détection des tentatives d'intrusion sur le réseau local.",
    solution:         "Déploiement de pfSense sur une VM dédiée en tant que pare-feu périmétrique. Configuration d'un tunnel VPN IPsec site-à-site (IKEv2) entre le siège et l'agence avec chiffrement AES-256. Mise en place de Suricata en mode IDS/IPS pour la détection d'intrusions sur les interfaces WAN et LAN. Définition de règles de filtrage strictes par interface et par VLAN.",
    technologies:     ['pfSense 2.7', 'IPsec / IKEv2', 'Suricata IDS', 'WireGuard (test)', 'Règles de filtrage', 'NAT', 'HAProxy'],
    skills: [
      'B1.4 — Superviser et sécuriser les éléments d\'une infrastructure',
      'B1.5 — Gérer des actifs numériques et les risques associés',
      'Mettre en œuvre des solutions de sécurité réseau',
      'Gérer les identités et les habilitations d\'accès',
    ],
    image:      '/placeholder-project.svg',
    links:      { github: null, demo: null, documentation: null },
    status:     'UP',
    highlights: [
      'Tunnel VPN IPsec AES-256 opérationnel entre 2 sites',
      'IDS Suricata avec règles personnalisées déployé',
      'Réduction de 95% du trafic non autorisé',
      'Audit de sécurité documenté avec recommandations',
    ],
  },

  {
    id:               'projet-zabbix-glpi',
    title:            'Supervision d\'un parc informatique avec Zabbix et GLPI',
    slug:             'supervision-zabbix-glpi',
    category:         'Supervision',
    shortDescription: 'Déploiement d\'une solution complète de supervision (Zabbix) et de gestion de parc ITSM (GLPI + OCS Inventory).',
    context:          'Stage 2ème année',
    duration:         '5 semaines',
    date:             '2024-10',
    problem:          "L'entreprise ne disposait d'aucun outil de supervision : les pannes étaient détectées uniquement par les utilisateurs, sans vision globale de l'état du parc. Il n'existait pas non plus d'inventaire fiable du matériel et des logiciels, rendant impossible la gestion des licences et des renouvellements.",
    solution:         "Installation et configuration de Zabbix sur un serveur Linux Debian avec surveillance des équipements réseau (SNMP), serveurs (agent Zabbix) et services critiques (HTTP, DNS, DHCP). Mise en place d'alertes e-mail et SMS pour les incidents critiques. Déploiement de GLPI couplé à OCS Inventory pour l'inventaire automatique du parc et la gestion des tickets d'incidents.",
    technologies:     ['Zabbix 6.4', 'GLPI 10', 'OCS Inventory', 'MySQL 8', 'Linux Debian 12', 'SNMP v2/v3', 'Scripts Bash'],
    skills: [
      'B1.3 — Administrer et superviser une infrastructure virtualisée',
      'B1.4 — Superviser et sécuriser les éléments d\'une infrastructure',
      'Gérer le patrimoine informatique (inventaire, licences)',
      'Mettre en œuvre et exploiter des outils ITSM',
    ],
    image:      '/placeholder-project.svg',
    links:      { github: null, demo: null, documentation: null },
    status:     'UP',
    highlights: [
      '150+ équipements supervisés en temps réel',
      'Temps de détection des incidents réduit à < 2 min',
      'Inventaire complet de 200 postes automatisé via OCS',
      'Tableaux de bord Zabbix personnalisés pour le NOC',
    ],
  },
]

/* Couleurs par catégorie — utilisées dans les composants */
export const CATEGORY_COLORS = {
  Infrastructure: '#3B82F6',
  Réseau:         '#06B6D4',
  Sécurité:       '#F59E0B',
  Supervision:    '#10B981',
}
