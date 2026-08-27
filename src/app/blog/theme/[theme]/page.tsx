import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import { ThemePill } from "@/components/theme-pill";
import { getAllPosts } from "@/lib/content";
import { themeFromSlug, themeSlug, themes } from "@/lib/site";

type Props = { params: Promise<{ theme: string }> };

/**
 * Themes are real static routes rather than a client-side filter, so filtering
 * works without JavaScript, is linkable, and is individually indexable.
 */
export function generateStaticParams() {
  return themes.map((theme) => ({ theme: themeSlug(theme) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { theme: slug } = await params;
  const theme = themeFromSlug(slug);
  if (!theme) return {};

  return {
    title: theme,
    description: `Posts filed under ${theme}.`,
  };
}

export default async function ThemePage({ params }: Props) {
  const { theme: slug } = await params;
  const theme = themeFromSlug(slug);
  if (!theme) notFound();

  const posts = getAllPosts().filter((p) => p.theme === theme);

  return (
    <PageShell title={theme} intro={`Posts filed under ${theme}.`}>
      <nav aria-label="Filter by theme" className="flex flex-wrap gap-2">
        {themes.map((t) => (
          <ThemePill key={t} theme={t} active={t === theme} />
        ))}
      </nav>

      {posts.length === 0 ? (
        <p className="mt-10 text-neutral-500 dark:text-neutral-400">
          No posts under this theme yet.
        </p>
      ) : (
        <div className="mt-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <p className="mt-12 border-t border-neutral-200 pt-8 text-sm dark:border-neutral-800">
        <Link
          href="/blog"
          className="rounded-sm text-neutral-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400"
        >
          ← All posts
        </Link>
      </p>
    </PageShell>
  );
}
