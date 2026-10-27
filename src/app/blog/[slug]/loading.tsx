export default function LoadingPost() {
  return (
    <div className="max-w-6xl mx-auto py-4 flex flex-col lg:flex-row gap-12 relative animate-pulse">
      {/* Colonna Articolo */}
      <div className="flex-1 min-w-0 space-y-8">
        {/* Pulsante Indietro */}
        <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded"></div>

        {/* Header Articolo */}
        <div className="space-y-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-blue-100 dark:bg-blue-900/40 rounded-full"></div>
            <div className="h-6 w-20 bg-blue-100 dark:bg-blue-900/40 rounded-full"></div>
          </div>
          {/* Titolo e Descrizione */}
          <div className="h-10 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
          <div className="h-6 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          {/* Metadati (autore, data) */}
          <div className="flex gap-6 pt-2">
            <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          </div>
        </div>

        {/* Simulazione Cover e Testo */}
        <div className="aspect-video w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          <div className="h-4 w-4/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
        </div>
      </div>

      {/* Colonna TOC (Indice Laterale) */}
      <div className="hidden lg:block w-64 shrink-0 space-y-4">
        <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
        <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
        <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
        <div className="h-4 w-4/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
      </div>
    </div>
  );
}
