import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime, slugify } from "@/lib/utils";

const contentDir = path.join(process.cwd(), "content");

export interface PostFrontMatter {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
  series?: string; // nome della serie
  order?: number; // ordine della serie (1, 2, ...)
}

export interface Post {
  slug: string;
  frontmatter: PostFrontMatter;
  content: string;
  readingTime: number;
}

export interface TocItem {
  title: string;
  url: string;
  level: number;
}

export function getPostsSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = getAllFilesRecursively(contentDir);

  return files
    .filter((file) => file.endsWith(".mdx") && !file.endsWith(".en.mdx"))
    .map((file) => {
      const fileName = path.basename(file, ".mdx");
      // Se è un bundle (index.mdx), usa il nome della cartella come slug
      return fileName === "index"
        ? path.basename(path.dirname(file))
        : fileName;
    });
}

export function getPostBySlug(
  slug: string,
  lang: "it" | "en" = "it",
): Post | null {
  try {
    if (!fs.existsSync(contentDir)) return null;

    const files = getAllFilesRecursively(contentDir).filter((f) =>
      f.endsWith(".mdx"),
    );

    let targetFile;

    // 1. Se la lingua richiesta è inglese, cerchiamo il file localizzato
    if (lang === "en") {
      targetFile = files.find((file) => {
        const fileName = path.basename(file);
        const isFile = fileName === `${slug}.en.mdx`;
        const isIndex =
          fileName === "index.en.mdx" &&
          path.basename(path.dirname(file)) === slug;
        return isFile || isIndex;
      });
    }

    // 2. Fallback all'italiano: se abbiamo cercato 'en' e non esiste, o se la lingua base è 'it'
    if (!targetFile) {
      targetFile = files.find((file) => {
        const fileName = path.basename(file);
        const isFile = fileName === `${slug}.mdx`;
        const isIndex =
          fileName === "index.mdx" &&
          path.basename(path.dirname(file)) === slug;
        return isFile || isIndex;
      });
    }

    if (!targetFile) return null;

    const fileContents = fs.readFileSync(targetFile, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as PostFrontMatter,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch (error) {
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostsSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
  return posts;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    if (Array.isArray(post.frontmatter.tags)) {
      post.frontmatter.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags);
}

export function getPostsByTag(tagSlug: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(
    (post) =>
      Array.isArray(post.frontmatter.tags) &&
      post.frontmatter.tags.some((t) => slugify(t) === tagSlug),
  );
}

export function getTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    // Pulisce il titolo da markdown inline come **grassetto** o `codice`
    const title = match[2]
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/`([^`]+)`/g, "$1")
      .trim();

    // Simula lo slugger usato di default da rehype-slug
    const url =
      "#" +
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    toc.push({ title, url, level });
  }

  return toc;
}

function getAllFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // se quello che abbiamo e' una cartella continuiamo la scansione recursiva
    // altrimenti inseriamo l'elemento
    if (stat && stat.isDirectory()) {
      results = [...results, ...getAllFilesRecursively(filePath)];
    } else {
      results.push(filePath);
    }
  }

  return results;
}

export function getSeriesPosts(seriesName: string): Post[] {
  return getAllPosts()
    .filter((post) => post.frontmatter.series === seriesName)
    .sort((a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0));
}

export function getAdjacentPosts(currentSlug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === currentSlug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getRelatedPosts(currentPost: Post, limit = 2): Post[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentPost.slug);

  return allPosts
    .map((post) => {
      const sharedTags =
        post.frontmatter.tags?.filter((tag) =>
          currentPost.frontmatter.tags?.includes(tag),
        ).length || 0;
      return { post, sharedTags };
    })
    .filter((item) => item.sharedTags > 0)
    .sort((a, b) => {
      // Ordina prima per numero di tag condivisi, poi per data
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      return (
        new Date(b.post.frontmatter.date).getTime() -
        new Date(a.post.frontmatter.date).getTime()
      );
    })
    .slice(0, limit)
    .map((item) => item.post);
}

export function hasEnglishTranslation(slug: string): boolean {
  if (!fs.existsSync(contentDir)) return false;

  const files = getAllFilesRecursively(contentDir);

  return files.some((file) => {
    const fileName = path.basename(file);
    const isFile = fileName === `${slug}.en.mdx`;
    const isIndex =
      fileName === "index.en.mdx" && path.basename(path.dirname(file)) === slug;
    return isFile || isIndex;
  });
}
