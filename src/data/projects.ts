export interface Project {
  title: string;
  description: string;
  category: "system" | "web";
  tags: string[];
  status: "In Sviluppo" | "Attivo" | "Completato";
  githubUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  // {
  //   title: "mpstd",
  //   description:
  //     "Re-implementazione didattica a basso livello della libreria standard C++20/C++23. Focus su gestione della memoria RAII, allocatori custom, container dinamici, formattatori personalizzati e un'architettura moderna gestita con CMake target-based.",
  //   category: "system",
  //   tags: ["C++23", "CMake", "RAII", "Low-Level"],
  //   status: "In Sviluppo",
  //   githubUrl: "https://github.com",
  // },
  {
    title: "shrink",
    description:
      "Tool CLI multithread in C++23 ad alte prestazioni per la compressione di immagini. Utilizza librerie native WebP, spdlog per il logging strutturato e cxxopts per il parsing degli argomenti.",
    category: "system",
    tags: ["C++23", "WebP", "Multithreading", "CLI"],
    status: "Attivo",
    githubUrl: "https://github.com/MattiaP7/Shrink",
  },

  {
    title: "homelab",
    description:
      "Guida completa per costruire da zero un media server casalingo con Jellyfin, stack *arr e Docker. Parte dai concetti di base e arriva a un'infrastruttura sicura: VPN con kill switch (Gluetun + Mullvad), firewall UFW, accesso remoto con Tailscale e backup.",
    category: "system",
    tags: ["Docker", "Linux", "Self-hosting", "VPN"],
    status: "Attivo",
    githubUrl: "https://github.com/MattiaP7/homelab",
    demoUrl: "https://mattiap7.github.io/homelab/",
  },

  {
    title: "OurShelf",
    description:
      "Piattaforma web scolastica sviluppata in PHP 8 con architettura MVC pura, creata per facilitare lo scambio e la compravendita di libri di testo usati tra studenti.",
    category: "web",
    tags: ["PHP 8", "MVC", "MySQL/MariaDB", "JavaScript"],
    status: "Completato",
    githubUrl: "https://github.com/MattiaP7/OurShelf",
  },
  {
    title: "Andrea Corazza Website",
    description:
      "Sito web professionale sviluppato per un consulente tecnico sulla sicurezza sul lavoro. Include form di contatto gestiti via Nodemailer e una struttura altamente ottimizzata SEO.",
    category: "web",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Nodemailer"],
    status: "Completato",
    demoUrl: "https://www.andreacorazza.com/",
  },
];
