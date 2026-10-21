import { getAllPosts } from "@/lib/mdx";

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mattiapirazzidev.vercel.app/";

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.description}]]></description>
    </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mattia Pirazzi Blog</title>
    <link>${siteUrl}</link>
    <description>Articoli approfonditi su C++23, UNIX, Linux e Systems Programming</description>
    <language>it</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}
