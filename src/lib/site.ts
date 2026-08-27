/**
 * Single source of truth for site-wide identity, navigation and taxonomy.
 * Anything that appears in more than one place should live here.
 */

export const site = {
  name: "Almas Chukin",
  /** Used in <title> as "Page — Almas Chukin" */
  titleTemplate: "%s — Almas Chukin",
  description:
    "Writing, talks and media from Almas Chukin — on business, the macro-economy, and everything in between.",
  /**
   * Absolute base URL, required for Open Graph tags and the RSS feed.
   * Vercel injects VERCEL_PROJECT_PRODUCTION_URL automatically; the localhost
   * fallback keeps `next dev` working without any env setup.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "en",
} as const;

export type NavItem = {
  href: string;
  label: string;
  /** Short line shown on section landing pages and, later, as graph dot labels. */
  blurb: string;
};

export const nav: NavItem[] = [
  { href: "/about", label: "About", blurb: "Biography and background" },
  { href: "/events", label: "Events", blurb: "Talks, panels and appearances" },
  { href: "/media", label: "Media", blurb: "Articles, audio and video" },
  { href: "/blog", label: "Blog", blurb: "Notes, essays and posts" },
  { href: "/social", label: "Social", blurb: "Find me elsewhere" },
];

/**
 * Fixed starter taxonomy (handoff doc §6), confirmed by the maintainer.
 * Extending this list is safe; renaming an existing entry is not — the values
 * are written into post frontmatter and would need a bulk re-classification.
 */
export const themes = [
  "Business",
  "Macro-Economy",
  "Just for Fun",
  "Personal",
] as const;

export type Theme = (typeof themes)[number];
