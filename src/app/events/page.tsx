import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { getAllEvents, isPastEvent } from "@/lib/content";
import { formatDate, isoDate } from "@/lib/format";
import type { SiteEvent } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Events",
  description: "Talks, panels and appearances.",
};

/**
 * Past events gray out automatically by date — nobody has to maintain the list.
 * They stay on the page rather than disappearing, so the track record is visible.
 */
function EventRow({ event, past }: { event: SiteEvent; past: boolean }) {
  const title = event.url ? (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
    >
      {event.title}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    event.title
  );

  return (
    <li
      className={
        past
          ? "border-b border-neutral-200 py-5 text-neutral-400 last:border-0 dark:border-neutral-800 dark:text-neutral-600"
          : "border-b border-neutral-200 py-5 last:border-0 dark:border-neutral-800"
      }
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
        <time
          dateTime={isoDate(event.date)}
          className="shrink-0 text-sm tabular-nums text-neutral-500 sm:w-44 dark:text-neutral-400"
        >
          {formatDate(event.date)}
        </time>
        <div>
          <p className="font-medium">{title}</p>
          {event.location && (
            <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
              {event.location}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default function EventsPage() {
  const all = getAllEvents();
  const upcoming = all.filter((e) => !isPastEvent(e));
  // Most recent first reads better than chronological for a past list.
  const past = all.filter((e) => isPastEvent(e)).reverse();

  return (
    <PageShell title="Events" intro="Talks, panels and appearances.">
      {all.length === 0 && (
        <p className="text-neutral-500 dark:text-neutral-400">
          No events listed.
        </p>
      )}

      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-heading">
          <h2
            id="upcoming-heading"
            className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
          >
            Upcoming
          </h2>
          <ul className="mt-3">
            {upcoming.map((event) => (
              <EventRow
                key={`${isoDate(event.date)}-${event.title}`}
                event={event}
                past={false}
              />
            ))}
          </ul>
        </section>
      )}

      {past.length > 0 && (
        <section aria-labelledby="past-heading" className="mt-14">
          <h2
            id="past-heading"
            className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
          >
            Past
          </h2>
          <ul className="mt-3">
            {past.map((event) => (
              <EventRow
                key={`${isoDate(event.date)}-${event.title}`}
                event={event}
                past
              />
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
}
