import Link from "next/link";
import { getSeriesPosts } from "@/lib/mdx";
import { Layers, ArrowRight } from "lucide-react";
// import { cn } from "@/lib/utils";

interface SeriesBoxProps {
  seriesName: string;
  currentSlug: string;
}

export function SeriesBox({ seriesName, currentSlug }: SeriesBoxProps) {
  const seriesPosts = getSeriesPosts(seriesName);
  if (seriesPosts.length <= 1) return null;

  const series_name: string = seriesName.replace(/-/g, " ");

  const currentIndex = seriesPosts.findIndex((p) => p.slug === currentSlug);

  return (
    <div className="my-8 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/60 rounded-lg text-blue-700 dark:text-blue-300">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
            {series_name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Parte {currentIndex + 1} di {seriesPosts.length}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {seriesPosts.map((post, index) => {
          const isCurrent = post.slug === currentSlug;
          return (
            <div key={post.slug} className="flex items-center gap-3 text-sm">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium text-xs shrink-0">
                {post.frontmatter.order}
              </span>
              {isCurrent ? (
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {post.frontmatter.title}
                </span>
              ) : (
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  {post.frontmatter.title}
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
