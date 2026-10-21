"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  slug: string;
  trackView?: boolean; // Se true, fa partire la POST per incrementare la visualizzazione
}

export function ViewCounter({ slug, trackView = false }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrUpdateViews = async () => {
      try {
        const res = await fetch(`/api/views/${slug}`, {
          method: trackView ? "POST" : "GET",
          cache: "no-store",
        });
        const data = await res.json();
        setViews(data.views ?? 0);
      } catch (err) {
        console.error("Errore recupero visualizzazioni:", err);
      }
    };

    fetchOrUpdateViews();
  }, [slug, trackView]);

  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400">
      <Eye className="w-3.5 h-3.5 text-neutral-400" />
      {views !== null ? `${views.toLocaleString("it-IT")} visite` : "---"}
    </span>
  );
}
