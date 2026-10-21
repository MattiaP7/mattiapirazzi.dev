import Link from "next/link";
import { ArrowLeft, TerminalSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <div className="p-4 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl">
        <TerminalSquare className="w-12 h-12 text-neutral-400 dark:text-neutral-500" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          404 - Not Found
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          Segmentation fault (core dumped). La pagina che stai cercando non
          esiste, è stata spostata o il puntatore è nullo.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Torna alla Home
      </Link>
    </div>
  );
}
