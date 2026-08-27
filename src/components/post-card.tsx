import Link from "next/link";
import { formatDate, isoDate } from "@/lib/format";
import { themeSlug } from "@/lib/site";
import type { Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-b border-neutral-200 py-7 last:border-0 dark:border-neutral-800">
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

      <h2 className="mt-2 text-xl font-medium tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          lang={post.lang}
          className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {post.title}
        </Link>
      </h2>

      {post.summary && (
        <p
          lang={post.lang}
          className="mt-2 text-neutral-600 dark:text-neutral-400"
        >
          {post.summary}
        </p>
      )}
    </article>
  );
}
