import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { mediaSections, site, themeSlug, themes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/events",
    "/media",
    "/blog",
    "/social",
    ...mediaSections.map((s) => `/media/${s.slug}`),
    ...themes.map((t) => `/blog/theme/${themeSlug(t)}`),
  ];

  const posts = getAllPosts();

  return [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p}`,
      lastModified: posts[0]?.date ?? new Date(),
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.date,
    })),
  ];
}
