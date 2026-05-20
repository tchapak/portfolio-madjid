/**
 * skills.js — Compétences techniques organisées par couche OSI
 * 
 * POUR PERSONNALISER : modifiez les niveaux (0-100) selon vos
 * vraies compétences. Soyez honnête, le jury peut vous tester !
 * 
 * Échelle :
 * - 20-40 : Notions / Débutant
 * - 50-65 : Intermédiaire / Pratique guidée
 * - 70-80 : Confirmé / Autonome
 * - 85-95 : Avancé / Expert
 */

export const SKILLS_CATEGORIES = [
  {
    id: "systemes",
    title: "Systèmes",
    layer: "L7 — Application",
    icon: "Server",
    color: "#3B82F6",
    description: "Administration des systèmes d'exploitation serveurs et postes clients.",
    skills: [
      { name: "Windows Server 2019", level: 75, description: "Installation, configuration, administration courante" },
      { name: "Linux (Debian, Ubuntu, Kali)", level: 60, description: "Administration en ligne de commande, services" },
      { name: "Active Directory", level: 75, description: "Création/gestion d'utilisateurs, OU, structure de domaine" },
      { name: "GPO (Stratégies de groupe)", level: 70, description: "Déploiement de stratégies utilisateurs et machines" },
      { name: "PowerShell", level: 55, description: "Scripts d'administration et d'automatisation" },
      { name: "Bash", level: 55, description: "Scripts shell sur Linux pour automatiser des tâches" }
    ]
  },
  {
    id: "reseaux",
    title: "Réseaux",
    layer: "L3 — Network",
    icon: "Network",
    color: "#06B6D4",
    description: "Conception et configuration d'infrastructures réseau.",
    skills: [
      { name: "Cisco IOS (CLI)", level: 50, description: "Configuration de switchs et routeurs en ligne de commande" },
      { name: "VLAN (segmentation, trunk, access)", level: 40, description: "Segmentation logique d'un réseau, 802.1Q" },
      { name: "Routage statique", level: 50, description: "Création de routes manuelles entre réseaux" },
      { name: "DHCP", level: 65, description: "Attribution dynamique des adresses IP" },
      { name: "DNS", level: 50, description: "Résolution de noms, zones, enregistrements" }
    ]
  },
  {
    id: "virtualisation",
    title: "Virtualisation",
    layer: "L2 — Infrastructure",
    icon: "Boxes",
    color: "#3B82F6",
    description: "Mise en place et gestion d'environnements virtualisés.",
    skills: [
      { name: "VMware ESXi", level: 65, description: "Création et administration de VMs sur hyperviseur" },
      { name: "Proxmox", level: 65, description: "Hyperviseur open-source pour VMs et containers" },
      { name: "Hyper-V", level: 40, description: "Solution de virtualisation Microsoft" },
      { name: "VirtualBox", level: 55, description: "Virtualisation desktop pour tests et lab" },
      { name: "Docker", level: 25, description: "Notions de containerisation et conteneurs" }
    ]
  },
  {
    id: "securite",
    title: "Sécurité",
    layer: "L4 — Transport",
    icon: "Shield",
    color: "#F59E0B",
    description: "Sécurisation des infrastructures et supervision.",
    skills: [
      { name: "pfSense (pare-feu)", level: 60, description: "Règles de filtrage, NAT, VPN sur pare-feu open-source" },
      { name: "Pare-feu Windows", level: 50, description: "Configuration des règles entrantes et sortantes" },
      { name: "Zabbix (supervision)", level: 40, description: "Monitoring d'équipements et services réseau" },
      { name: "Sauvegardes", level: 40, description: "Stratégies de backup, restauration de données" },
      { name: "IDS/IPS (Suricata, Snort)", level: 35, description: "Notions de détection et prévention d'intrusion" }
    ]
  },
  {
    id: "services",
    title: "Services",
    layer: "L5 — Session",
    icon: "Globe",
    color: "#06B6D4",
    description: "Mise en place de services applicatifs et serveurs.",
    skills: [
      { name: "Apache / Nginx", level: 55, description: "Hébergement de sites web, configuration vhosts" },
      { name: "Bases de données (MySQL, MSSQL)", level: 50, description: "Création/gestion de bases, requêtes SQL simples" }
    ]
  },
  {
    id: "outils",
    title: "Outils",
    layer: "Dev / Ops",
    icon: "Wrench",
    color: "#3B82F6",
    description: "Outils transverses pour l'administration et le développement.",
    skills: [
      { name: "Git / GitHub", level: 40, description: "Versionnement de code, push, pull, commits" },
      { name: "Wireshark", level: 40, description: "Capture et analyse de paquets réseau" },
      { name: "Packet Tracer", level: 60, description: "Simulation de réseaux Cisco pour TP et tests" },
      { name: "GLPI", level: 20, description: "Notions de gestion de parc informatique" },
      { name: "VS Code", level: 50, description: "Édition de code et scripts" }
    ]
  }
]