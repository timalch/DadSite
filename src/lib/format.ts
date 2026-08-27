import { site } from "@/lib/site";

/** Long-form date, e.g. "12 апреля 2026 г." */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(site.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Machine-readable value for <time dateTime> — always YYYY-MM-DD. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
