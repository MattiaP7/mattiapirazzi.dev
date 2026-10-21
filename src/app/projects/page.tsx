import Link from "next/link";
import {
  FolderGit2,
  ExternalLink,
  Code2,
  Terminal,
  Globe,
  Cpu,
} from "lucide-react";

export const metadata = {
  title: "Progetti | Mattia Pirazzi",
  description:
    "Showcase dei progetti software: librerie C++23, tool di sistema Linux e applicazioni web.",
};

// SVG dell'icona GitHub (Simple Icons)
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

interface Project {
  title: string;
  description: string;
  category: "system" | "web";
  tags: string[];
  status: "In Sviluppo" | "Attivo" | "Completato";
  githubUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
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

export default function ProjectsPage() {
  const systemProjects = projects.filter((p) => p.category === "system");
  const webProjects = projects.filter((p) => p.category === "web");

  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-3 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Progetti & Software
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Una selezione dei progetti a cui lavoro: utility di sistema in C++,
          librerie low-level e applicazioni web moderne.
        </p>
      </header>

      {/* Sezione 1: Sistemi & C++ */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-500" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Sistemi Operativi, C++ & Utility
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Sezione 2: Web Applications */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Sviluppo Web & Strumenti
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-between p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-sm group">
      <div className="space-y-4">
        {/* Titolo + Status Badge */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-500 transition-colors">
            {project.title}
          </h3>
          <span
            className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
              project.status === "In Sviluppo"
                ? "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                : project.status === "Attivo"
                  ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                  : "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Descrizione */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Link Footer */}
      <div className="flex items-center gap-4 pt-6 mt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Repository</span>
          </Link>
        )}
        {project.demoUrl && (
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Sito Web</span>
          </Link>
        )}
      </div>
    </div>
  );
}
