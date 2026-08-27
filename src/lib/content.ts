import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  eventsFileSchema,
  mediaFrontmatterSchema,
  postFrontmatterSchema,
  type MediaFrontmatter,
  type PostFrontmatter,
  type SiteEvent,
} from "@/lib/schemas";
import type { MediaSectionSlug } from "@/lib/site";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Post = PostFrontmatter & {
  slug: string;
  /** Raw markdown body; render with renderMarkdown() at the point of use. */
  body: string;
};

export type MediaItem = MediaFrontmatter & {
  slug: string;
  section: MediaSectionSlug;
  body: string;
};

function readMarkdownDir(dir: string): { slug: string; raw: string }[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
      raw: fs.readFileSync(path.join(dir, file), "utf8"),
    }));
}

/**
 * Fail the build with a message that names the offending file and lists each
 * bad field. With hundreds of machine-generated posts from the phase 4 import,
 * a generic "Invalid date" would be undebuggable.
 */
function describeFailure(file: string, error: z.ZodError): never {
  const detail = error.issues
    .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid frontmatter in ${file}:\n${detail}`);
}

let postCache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (postCache) return postCache;

  const dir = path.join(CONTENT_DIR, "blog");

  const posts = readMarkdownDir(dir).map(({ slug, raw }) => {
    const { data, content } = matter(raw);
    const parsed = postFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      describeFailure(`content/blog/${slug}.md`, parsed.error);
    }
    return { ...parsed.data, slug, body: content.trim() };
  });

  postCache = posts
    .filter((p) => p.published)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return postCache;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

let mediaCache: MediaItem[] | null = null;

export function getAllMedia(): MediaItem[] {
  if (mediaCache) return mediaCache;

  const sections: MediaSectionSlug[] = ["articles", "audio", "video"];

  const items = sections.flatMap((section) =>
    readMarkdownDir(path.join(CONTENT_DIR, "media", section)).map(
      ({ slug, raw }) => {
        const { data, content } = matter(raw);
        const parsed = mediaFrontmatterSchema.safeParse(data);
        if (!parsed.success) {
          describeFailure(`content/media/${section}/${slug}.md`, parsed.error);
        }
        return { ...parsed.data, slug, section, body: content.trim() };
      },
    ),
  );

  mediaCache = items
    .filter((m) => m.published)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return mediaCache;
}

export function getMediaBySection(section: MediaSectionSlug): MediaItem[] {
  return getAllMedia().filter((m) => m.section === section);
}

let eventCache: SiteEvent[] | null = null;

export function getAllEvents(): SiteEvent[] {
  if (eventCache) return eventCache;

  const file = path.join(CONTENT_DIR, "events.json");
  if (!fs.existsSync(file)) return (eventCache = []);

  const parsed = eventsFileSchema.safeParse(
    JSON.parse(fs.readFileSync(file, "utf8")),
  );
  if (!parsed.success) {
    describeFailure("content/events.json", parsed.error);
  }

  // Soonest first; the page splits them into upcoming and past.
  eventCache = parsed.data.sort((a, b) => a.date.getTime() - b.date.getTime());
  return eventCache;
}

/** An event counts as past from the day after it happens. */
export function isPastEvent(event: SiteEvent, now = new Date()): boolean {
  const endOfDay = new Date(event.date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime() < now.getTime();
}
