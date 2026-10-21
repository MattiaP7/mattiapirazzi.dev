import { getPostsByTag, getAllTags } from "@/lib/mdx";
import { BlogCard } from "@/components/blog-card";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: slugify(tag) }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `Articoli su "${decodedTag}" | pirazzi.blog`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  // Risale al nome originale (es: "C++17") partendo dallo slug ("cpp17")
  const originalTagName =
    posts[0].frontmatter.tags.find((t) => slugify(t) === decodedTag) ||
    decodedTag;

  return (
    <div className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Tutti gli articoli
      </Link>

      <div className="flex items-center gap-3 py-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
          <Tag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 capitalize">
            {originalTagName}
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
            {posts.length} {posts.length === 1 ? "articolo" : "articoli"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            slug={post.slug}
            frontmatter={post.frontmatter}
            readingTime={post.readingTime}
          />
        ))}
      </div>
    </div>
  );
}
