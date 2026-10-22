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

  // Gestore del click per lo scroll fluido con offset
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url: string,
  ) => {
    e.preventDefault(); // Previene il salto istantaneo di default
    const targetId = url.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      // Offset di 80px per compensare l'altezza della navbar sticky
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Aggiorna l'URL nel browser (es. #titolo) senza ricaricare
      window.history.pushState(null, "", url);
    }
  };

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
              onClick={(e) => handleScroll(e, item.url)}
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
