import Link from "next/link";
import { Rss, Mail, ArrowUpRight } from "lucide-react";

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

export async function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs text-neutral-600 dark:text-neutral-400">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Griglia principale: 1 colonna su mobile, 3 colonne su desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonna 1: Bio & Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm text-neutral-900 dark:text-neutral-100">
                mattiapirazzi.dev
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-neutral-500 leading-relaxed">
              Sviluppatore C++, Linux enthusiast e studente di Computer Science.
              Scrivo di sistemi, networking e low-level programming.
            </p>
          </div>

          {/* Colonna 2: Navigazione */}
          <div className="space-y-3">
            <h3 className="font-mono font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider text-[11px]">
              Navigazione
            </h3>
            <ul className="space-y-2 font-mono">
              <li>
                <Link
                  href="/"
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Blog & Articoli
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Progetti
                </Link>
              </li>
              <li>
                <Link
                  href="/setup"
                  className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Setup & Dotfiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonna 3: Social & RSS */}
          <div className="space-y-3">
            <h3 className="font-mono font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider text-[11px]">
              Connettiti
            </h3>
            <ul className="space-y-2 font-mono">
              <li>
                <a
                  href="https://github.com/MattiaP7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:tuoemail@domain.com"
                  className="inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contatto Email</span>
                </a>
              </li>
              <li>
                <Link
                  href="/rss.xml"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-orange-600 dark:text-orange-400 hover:underline"
                >
                  <Rss className="w-3.5 h-3.5" />
                  <span>RSS Feed</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Fascia finale (Copyright e Credit) */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 font-mono text-[11px]">
          <p>
            © 2026 - {currentYear} Mattia Pirazzi. Tutti i diritti riservati.
          </p>
          <p>
            Sviluppato con{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              Next.js
            </span>{" "}
            &{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              Vercel
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
