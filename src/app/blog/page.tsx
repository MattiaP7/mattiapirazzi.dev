import { getAllPosts } from "@/lib/mdx";
import { BlogSearch } from "@/components/blog-search";

export const metadata = {
  title: "Blog | Mattia Pirazzi",
  description: "Articoli approfonditi su C++23, UNIX, Linux e Networking.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-6">
      <header className="space-y-2 border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Blog & Note Tecniche
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Esplora tutti gli articoli, le guide e le serie su C++, sistemi
          operativi e rete.
        </p>
      </header>

      {/* Componente con ricerca e ordinamento per serie */}
      <BlogSearch posts={posts} />
    </div>
  );
}
