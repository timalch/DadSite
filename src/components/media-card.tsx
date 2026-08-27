import { formatDate, isoDate } from "@/lib/format";
import type { MediaItem } from "@/lib/content";

/** Media entries link outward, so the card is an anchor to an external URL. */
export function MediaCard({ item }: { item: MediaItem }) {
  return (
    <article className="border-b border-neutral-200 py-7 last:border-0 dark:border-neutral-800">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
        <time dateTime={isoDate(item.date)}>{formatDate(item.date)}</time>
        {item.source && (
          <>
            <span aria-hidden="true">·</span>
            <span lang={item.lang}>{item.source}</span>
          </>
        )}
      </div>

      <h2 className="mt-2 text-xl font-medium tracking-tight">
        <a
          href={item.url}
          lang={item.lang}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {item.title}
          <span className="sr-only"> (opens in a new tab)</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="ml-1.5 inline size-3.5 -translate-y-px text-neutral-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17 17 7M9 7h8v8" />
          </svg>
        </a>
      </h2>

      {item.description && (
        <p
          lang={item.lang}
          className="mt-2 text-neutral-600 dark:text-neutral-400"
        >
          {item.description}
        </p>
      )}
    </article>
  );
}
