"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Tag } from "lucide-react";

interface TagData {
  name: string;
  count: number;
  slug: string;
}

interface TagSearchProps {
  tags: TagData[];
}

export function TagSearch({ tags }: TagSearchProps) {
  const [query, setQuery] = useState("");

  const filteredTags = useMemo(() => {
    if (!query.trim()) return tags;
    // Cerca ignorando maiuscole/minuscole
    return tags.filter((tag) =>
      tag.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, tags]);

  return (
    <div className="space-y-8">
      {/* Barra di ricerca */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un tag specifico..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>

      {/* Griglia dei tag filtrati */}
      {filteredTags.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTags.map((tagData) => (
            <Link
              key={tagData.slug}
              href={`/tags/${tagData.slug}`}
              className="group flex items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                  <Tag className="w-4 h-4 text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tagData.name}
                </span>
              </div>

              <span className="flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                {tagData.count}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
          Nessun tag trovato per &quot;{query}&quot;.
        </div>
      )}
    </div>
  );
}
