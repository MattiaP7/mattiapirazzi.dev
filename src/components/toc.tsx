"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TocItem } from "@/lib/mdx";

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // Attiva l'id quando il titolo tocca il margine superiore (con un po' di offset)
      { rootMargin: "-80px 0px -80% 0px" },
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.url.substring(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block w-64 shrink-0">
      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-4 uppercase tracking-wider">
        Indice
      </h4>
      <ul className="space-y-3 text-sm">
        {toc.map((item, index) => (
          <li key={index} style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}>
            <Link
              href={item.url}
              className={cn(
                "block truncate transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                activeId === item.url.substring(1)
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-neutral-500 dark:text-neutral-400",
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
