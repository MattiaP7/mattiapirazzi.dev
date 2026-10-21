"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { Post } from "@/lib/mdx";
import { BlogCard } from "@/components/blog-card";

interface BlogSearchProps {
  posts: Post[];
}

function getSeriesInfo(post: Post) {
  const fm = post.frontmatter as Record<string, any>;
  if (!fm) return null;

  // Gestisce il formato oggetto -> series: { name: "C++23", order: 1 }
  if (
    typeof fm.series === "object" &&
    fm.series !== null &&
    "name" in fm.series
  ) {
    return {
      name: String(fm.series.name),
      order: Number(fm.series.order ?? fm.series.part ?? 0),
    };
  }

  // Gestisce il formato stringa -> series: "C++23", seriesOrder: 1 (oppure part / order)
  if (typeof fm.series === "string" && fm.series.trim() !== "") {
    return {
      name: fm.series,
      order: Number(fm.seriesOrder ?? fm.part ?? fm.order ?? 0),
    };
  }

  return null;
}

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: [
        { name: "frontmatter.title", weight: 0.4 },
        { name: "frontmatter.description", weight: 0.3 },
        { name: "frontmatter.series", weight: 0.2 }, // Cerca anche per nome della serie
        { name: "frontmatter.tags", weight: 0.2 },
        { name: "frontmatter.author", weight: 0.1 },
        { name: "content", weight: 0.1 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
    });
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const isSearching = Boolean(query.trim());
    const initialList = isSearching
      ? fuse.search(query).map((result) => result.item)
      : posts;

    return [...initialList].sort((a, b) => {
      const seriesA = getSeriesInfo(a);
      const seriesB = getSeriesInfo(b);

      // 1. Se entrambi appartengono alla STESSA serie -> ordina per numero crescente (1, 2, 3...)
      if (
        seriesA &&
        seriesB &&
        seriesA.name.toLowerCase() === seriesB.name.toLowerCase()
      ) {
        return seriesA.order - seriesB.order;
      }

      // 2. Se c'è una ricerca attiva e non appartengono alla stessa serie,
      // preserva l'ordine di rilevanza calcolato da Fuse.js
      if (isSearching) {
        return 0;
      }

      // 3. Se NON c'è ricerca attiva, ordina per data decrescente (più recenti prima)
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();

      if (!isNaN(dateA) && !isNaN(dateB) && dateA !== dateB) {
        return dateB - dateA;
      }

      return 0;
    });
  }, [query, fuse, posts]);

  return (
    <div className="space-y-8 mt-8">
      {/* Barra di ricerca allineata a sinistra */}
      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un articolo, un argomento o un tag..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>

      {/* Lista post con separatore orizzontale (divide-y) */}
      {filteredPosts.length > 0 ? (
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-left py-12 text-neutral-500 dark:text-neutral-400">
          Nessun articolo trovato per &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
}
