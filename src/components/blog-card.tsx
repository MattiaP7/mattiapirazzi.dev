import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { PostFrontMatter } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { ViewCounter } from "@/components/view-counter";

interface BlogCardProps {
  slug: string;
  frontmatter: PostFrontMatter;
  readingTime: number;
}

export function BlogCard({ slug, frontmatter, readingTime }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col items-start justify-between py-8">
      {/* Metadati superiori (Data e Tempo) */}
      <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-3">
        <time dateTime={frontmatter.date} className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(frontmatter.date)}
        </time>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {readingTime} min
        </span>
        <span className="flex items-center gap-1.5">
          <ViewCounter slug={slug} trackView={false} />
        </span>
      </div>

      {/* Titolo e Descrizione */}
      <div className="relative w-full">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link href={`/blog/${slug}`}>
            {/* Link invisibile che rende cliccabile l'intera area dell'articolo */}
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
            {frontmatter.title}
          </Link>
        </h2>
        <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {frontmatter.description}
        </p>
      </div>

      {/* Footer interattivo: Tag e Call to action */}
      <div className="mt-4 flex items-center justify-between w-full z-10">
        <div className="flex flex-wrap gap-3">
          {frontmatter.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-sm font-medium text-neutral-400 dark:text-neutral-500 group-hover:text-blue-500 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        <span className="hidden sm:flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          Leggi tutto <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </article>
  );
}
