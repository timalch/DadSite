import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { formatDate, isoDate } from "@/lib/format";
import { themeSlug } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date.toISOString(),
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.body);

  return (
    <div className="mx-auto max-w-2xl px-6 py-14 sm:py-20">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
        <time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <Link
          href={`/blog/theme/${themeSlug(post.theme)}`}
          className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {post.theme}
        </Link>
      </div>

      <h1
        lang={post.lang}
        className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {post.title}
      </h1>

      <article
        lang={post.lang}
        className="prose prose-neutral mt-9 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {post.sourceUrl && (
        <p className="mt-10 text-sm text-neutral-500 dark:text-neutral-400">
          <a
            href={post.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            Original post
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      )}

      <p className="mt-12 border-t border-neutral-200 pt-8 text-sm dark:border-neutral-800">
        <Link
          href="/blog"
          className="rounded-sm text-neutral-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400"
        >
          ← All posts
        </Link>
      </p>
    </div>
  );
}
