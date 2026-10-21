import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { slugify } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { TagSearch } from "@/components/tag-search"; // Aggiunto import

export const metadata = {
  title: "Tutti i Tag | pirazzi.blog",
  description: "Esplora tutti gli argomenti e i tag del blog.",
};

export default function TagsIndexPage() {
  const posts = getAllPosts();

  const tagCounts: Record<
    string,
    { name: string; count: number; slug: string }
  > = {};

  posts.forEach((post) => {
    if (Array.isArray(post.frontmatter.tags)) {
      post.frontmatter.tags.forEach((tag) => {
        const slug = slugify(tag);
        if (!tagCounts[slug]) {
          tagCounts[slug] = { name: tag, count: 0, slug };
        }
        tagCounts[slug].count++;
      });
    }
  });

  const sortedTags = Object.values(tagCounts).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Torna alla home
      </Link>

      <header className="space-y-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Esplora per Argomento
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Sfoglia i {sortedTags.length} argomenti trattati nel blog.
        </p>
      </header>

      {/* Il nuovo componente gestisce la barra di ricerca e il rendering */}
      <TagSearch tags={sortedTags} />
    </div>
  );
}
