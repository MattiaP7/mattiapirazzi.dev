import Link from "next/link";
import { ArrowRight, Code2, Terminal, Cpu, FolderGit2 } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import { BlogCard } from "@/components/blog-card";
import { projects, type Project } from "@/data/projects";

export default async function HomePage() {
  const allPosts = await getAllPosts();
  // Prendi solo i 3 articoli più recenti per la Home
  const recentPosts = allPosts.slice(0, 3);
  const first_projects: Project[] = projects.slice(0, 2);

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="space-y-6 max-w-2xl">
        {/*
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Studente di informatica
        </div>
        */}

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
          Sviluppo software low-level, C++ e sistemi Linux.
        </h1>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Ciao, sono{" "}
          <strong className="text-neutral-900 dark:text-neutral-100">
            Mattia Pirazzi
          </strong>
          . In questo spazio raccolgo note tecniche, guide ed esperimenti su
          C++23, programmazione di sistema UNIX, networking e tanto altro legato
          all'informatica.
        </p>

        {/* Quick Links / Badges */}
        <div className="flex flex-wrap gap-3 pt-2 text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300">
            <Code2 className="w-4 h-4 text-blue-500" />
            <span>C++</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>Linux </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300">
            <Cpu className="w-4 h-4 text-purple-500" />
            <span>UNIX Systems & Networking</span>
          </div>
        </div>
      </section>

      {/* Ultimi Articoli del Blog */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Ultimi Articoli
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Tutti gli articoli
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
          {recentPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      </section>

      {/* Progetti in Evidenza */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Progetti in Evidenza
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Tutti i progetti
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {first_projects.map((project) => (
            <div
              key={project.title}
              className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-lg font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  {project.title}
                </span>

                {/* Mostra i primi 1 o 2 tag del progetto come badge */}
                {project.tags && project.tags.length > 0 && (
                  <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/50">
                    {project.tags.slice(0, 2).join(" / ")}
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
