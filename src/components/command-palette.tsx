"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  FileText,
  Laptop,
  FolderGit2,
  Sun,
  Moon,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Post } from "@/lib/mdx";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

interface CommandPaletteProps {
  posts?: Post[];
}

export function CommandPalette({ posts = [] }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const { setTheme } = useTheme();

  // Listener scorciatoia globale (Cmd+K / Ctrl+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    setSearch(""); // Resetta la ricerca alla chiusura
    command();
  }, []);

  // Se l'input è vuoto mostra solo gli ultimi 3 post, altrimenti cerca su tutti
  const displayedPosts = search.trim() === "" ? posts.slice(0, 3) : posts;

  return (
    <>
      {/* Pulsante attivatore per la Navbar */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Cerca o esegui...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Modale Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity" />
      )}

      <Command.Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSearch("");
        }}
        label="Command Palette"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl z-50 overflow-hidden"
      >
        {/* Input di ricerca */}
        <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-3">
          <Search className="w-4 h-4 mr-2 shrink-0 text-neutral-400" />
          <Command.Input
            value={search}
            onValueChange={setSearch}
            placeholder="Scrivi un comando o cerca un post..."
            className="w-full py-3.5 text-sm bg-transparent outline-none placeholder:text-neutral-400 text-neutral-900 dark:text-neutral-100"
          />
        </div>

        {/* Lista Risultati */}
        <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
          <Command.Empty className="py-8 text-center text-sm text-neutral-500">
            Nessun risultato trovato.
          </Command.Empty>

          {/* 1. Navigation Pagine */}
          <Command.Group
            heading="Navigazione"
            className="text-[11px] font-mono uppercase text-neutral-400 px-2 py-1"
          >
            <Command.Item
              onSelect={() => runCommand(() => router.push("/projects"))}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800 cursor-pointer"
            >
              <FolderGit2 className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Progetti</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/setup"))}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800 cursor-pointer"
            >
              <Laptop className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Setup & Dotfiles</span>
            </Command.Item>
          </Command.Group>

          {/* 2. Articoli Blog (Max 3 quando la ricerca è vuota) */}
          {displayedPosts.length > 0 && (
            <Command.Group
              heading={
                search.trim() === "" ? "Articoli Recenti" : "Articoli Trovati"
              }
              className="text-[11px] font-mono uppercase text-neutral-400 px-2 py-1"
            >
              {displayedPosts.map((post) => (
                <Command.Item
                  key={post.slug}
                  value={`${post.frontmatter.title} ${post.frontmatter.tags?.join(" ")}`}
                  onSelect={() =>
                    runCommand(() => router.push(`/blog/${post.slug}`))
                  }
                  className="flex items-center justify-between px-2.5 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span className="truncate">{post.frontmatter.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {/* 3. Azioni e Temi */}
          <Command.Group
            heading="Azioni"
            className="text-[11px] font-mono uppercase text-neutral-400 px-2 py-1"
          >
            <Command.Item
              onSelect={() => runCommand(() => setTheme("light"))}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800 cursor-pointer"
            >
              <Sun className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Attiva Tema Chiaro</span>
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => setTheme("dark"))}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800 cursor-pointer"
            >
              <Moon className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>Attiva Tema Scuro</span>
            </Command.Item>
            <Command.Item
              onSelect={() =>
                runCommand(() =>
                  window.open("https://github.com/MattiaP7", "_blank"),
                )
              }
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800 cursor-pointer"
            >
              <GitHubIcon className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>GitHub Profile</span>
            </Command.Item>
          </Command.Group>
        </Command.List>

        {/* Footer con istruzioni di navigazione */}
        <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 px-3 py-2 text-[11px] font-mono text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
                ↑↓
              </kbd>{" "}
              Naviga
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center">
                <CornerDownLeft className="w-2.5 h-2.5" />
              </kbd>{" "}
              Seleziona
            </span>
          </div>
          <span>
            <kbd className="px-1 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
              ESC
            </kbd>{" "}
            Chiudi
          </span>
        </div>
      </Command.Dialog>
    </>
  );
}
