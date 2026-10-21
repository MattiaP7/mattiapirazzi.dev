"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments() {
  const { theme, resolvedTheme } = useTheme();

  const currentTheme = resolvedTheme || theme;
  const giscusTheme = currentTheme === "dark" ? "transparent_dark" : "light";

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
        Discussione & Commenti
      </h2>

      <Giscus
        id="comments"
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="it"
        loading="lazy"
      />
    </section>
  );
}
