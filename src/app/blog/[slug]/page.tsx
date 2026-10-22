import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getPostBySlug,
  getPostsSlugs,
  getTableOfContents,
  getAdjacentPosts,
  getRelatedPosts,
  hasEnglishTranslation,
} from "@/lib/mdx";
import { formatDate, slugify } from "@/lib/utils";
import { mdxComponents } from "@/components/mdx-components";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Tag,
  Clock,
  Globe,
} from "lucide-react";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/toc";
import { SeriesBox } from "@/components/series-box";
import { BlogCard } from "@/components/blog-card";
import { Metadata } from "next";
import { Comments } from "@/components/comments";
import { ViewCounter } from "@/components/view-counter";

interface PostPageProps {
  params: Promise<{ slug: string }>;
  // NUOVO: Aggiunto searchParams per leggere ?lang=en
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  const slugs = getPostsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // NUOVO: Determinazione della lingua dai parametri
  const currentLang = resolvedSearchParams?.lang === "en" ? "en" : "it";
  const post = getPostBySlug(slug, currentLang); // Passata la lingua

  if (!post) return {};

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mattiapirazzi.dev";

  const ogSearchParams = new URLSearchParams({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    author: post.frontmatter.author || "Mattia Pirazzi",
  });

  if (post.frontmatter.coverImage) {
    ogSearchParams.set("coverImage", post.frontmatter.coverImage);
  }

  const ogImageUrl = `${siteUrl}/api/og?${ogSearchParams.toString()}`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [ogImageUrl],
    },
  };
}

export default async function PostPage({
  params,
  searchParams,
}: PostPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  // NUOVO: Determinazione della lingua e recupero post localizzato
  const currentLang = resolvedSearchParams?.lang === "en" ? "en" : "it";
  const post = getPostBySlug(slug, currentLang);

  if (!post) {
    notFound();
  }

  const hasEnglish = hasEnglishTranslation(slug);

  const toc = getTableOfContents(post.content);

  const { prev, next } = getAdjacentPosts(post.slug);
  const relatedPosts = getRelatedPosts(post, 2);

  return (
    <>
      <ReadingProgress />

      <div className="max-w-6xl mx-auto py-4 flex flex-col lg:flex-row gap-12 relative">
        <article className="flex-1 min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla home
          </Link>

          <header className="space-y-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slugify(tag)}`}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              {post.frontmatter.title}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {post.frontmatter.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.frontmatter.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime} min
              </span>
              <span className="flex items-center gap-1.5">
                <ViewCounter slug={slug} trackView={true} />
              </span>
            </div>

            {/* NUOVO: Switcher Lingua integrato nell'header */}
            {hasEnglish && (
              <div className="flex items-center gap-2 text-sm font-mono pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/50">
                <Globe className="w-4 h-4 text-neutral-500" />
                <Link
                  href={`/blog/${slug}`}
                  className={`px-2 py-1 rounded transition-colors ${
                    currentLang === "it"
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                      : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  IT
                </Link>
                <Link
                  href={`/blog/${slug}?lang=en`}
                  className={`px-2 py-1 rounded transition-colors ${
                    currentLang === "en"
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                      : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  EN
                </Link>
              </div>
            )}
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none mt-8 prose-pre:p-0 prose-pre:bg-transparent">
            {post.frontmatter.series && (
              <SeriesBox
                seriesName={post.frontmatter.series}
                currentSlug={post.slug}
              />
            )}

            {post.frontmatter.coverImage && (
              <div className="relative aspect-video mt-8 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                <Image
                  src={post.frontmatter.coverImage}
                  alt={post.frontmatter.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypeShiki,
                      {
                        themes: {
                          dark: "tokyo-night",
                          light: "github-light",
                        },
                        defaultColor: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm text-neutral-500">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />{" "}
                    Precedente
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                    {next.frontmatter.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800 transition-colors text-right"
                >
                  <span className="flex items-center justify-end gap-2 text-sm text-neutral-500">
                    Successivo{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                    {prev.frontmatter.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Potrebbe interessarti anche
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard
                      key={relatedPost.slug}
                      slug={relatedPost.slug}
                      frontmatter={relatedPost.frontmatter}
                      readingTime={relatedPost.readingTime}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <Comments />
        </article>

        <aside className="hidden lg:block w-64 shrink-0">
          <TableOfContents toc={toc} />
        </aside>
      </div>
    </>
  );
}
