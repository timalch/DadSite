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
  /** Language of the site chrome (nav, headings, labels). */
  locale: "en",
  /**
   * Default language of the *content*. Most posts are Russian; individual
   * entries override this with a `lang` field in their frontmatter, which is
   * applied to the article element so screen readers switch voices correctly.
   */
  contentLocale: "ru",
  /** Locale used to format dates. Change here to restyle every date on the site. */
  dateLocale: "ru-RU",
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

/** The three Media subsections, each populated by the same skill pattern. */
export const mediaSections = [
  {
    slug: "articles",
    label: "Articles",
    blurb: "Published writing and press coverage",
  },
  {
    slug: "audio",
    label: "Audio",
    blurb: "Podcast appearances and interviews",
  },
  { slug: "video", label: "Video", blurb: "Talks, panels and broadcasts" },
] as const;

export type MediaSectionSlug = (typeof mediaSections)[number]["slug"];

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/almas.chukin/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/almas-chukin-b9023039b/",
  },
] as const;

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

/** URL-safe slug for a theme, e.g. "Macro-Economy" -> "macro-economy". */
export function themeSlug(theme: Theme): string {
  return theme.toLowerCase().replace(/\s+/g, "-");
}

export function themeFromSlug(slug: string): Theme | undefined {
  return themes.find((t) => themeSlug(t) === slug);
}
