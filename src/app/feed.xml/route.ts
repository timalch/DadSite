import { getAllPosts } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { site } from "@/lib/site";

/** Escape the five XML predefined entities. */
function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();

  const items = await Promise.all(
    posts.map(async (post) => {
      const html = await renderMarkdown(post.body);
      const url = `${site.url}/blog/${post.slug}`;

      return [
        "    <item>",
        `      <title>${xml(post.title)}</title>`,
        `      <link>${xml(url)}</link>`,
        `      <guid isPermaLink="true">${xml(url)}</guid>`,
        `      <pubDate>${post.date.toUTCString()}</pubDate>`,
        `      <category>${xml(post.theme)}</category>`,
        post.summary
          ? `      <description>${xml(post.summary)}</description>`
          : "",
        `      <content:encoded><![CDATA[${html}]]></content:encoded>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    }),
  );

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.name)}</title>
    <link>${xml(site.url)}</link>
    <description>${xml(site.description)}</description>
    <language>${xml(site.contentLocale)}</language>
    <atom:link href="${xml(`${site.url}/feed.xml`)}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
