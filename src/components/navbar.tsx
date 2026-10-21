import Link from "next/link";
import { getAllPosts } from "@/lib/mdx"; // O la tua funzione per prendere tutti i post MDX
import { CommandPalette } from "@/components/command-palette";

export async function Navbar() {
  // Carica i post lato server al build / request
  const posts = await getAllPosts();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="font-bold text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
        >
          Mattia Pirazzi
        </Link>

        {/* Centro / Destra: Navigazione e Command Palette */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              href="/blog"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Progetti
            </Link>
            <Link
              href="/setup"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Setup
            </Link>
          </nav>

          {/* Il pulsante "Cerca / ⌘K" e la modale integrata */}
          <CommandPalette posts={posts} />
        </div>
      </div>
    </header>
  );
}
