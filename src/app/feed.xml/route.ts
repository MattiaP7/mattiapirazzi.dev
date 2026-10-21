import { getAllPosts } from "@/lib/mdx";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pirazzi.blog";

export async function GET() {
  const posts = getAllPosts();

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>pirazzi.blog</title>
    <link>${SITE_URL}</link>
    <description>Articoli e tutorial su sviluppo web, C++, e architettura software.</description>
    <language>it</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
        <item>
          <title><![CDATA[${post.frontmatter.title}]]></title>
          <link>${SITE_URL}/blog/${post.slug}</link>
          <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
          <description><![CDATA[${post.frontmatter.description}]]></description>${
            Array.isArray(post.frontmatter.tags)
              ? post.frontmatter.tags
                  .map((tag) => `<category><![CDATA[${tag}]]></category>`)
                  .join("")
              : ""
          }
        </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
