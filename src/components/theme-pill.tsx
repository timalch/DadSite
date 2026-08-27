import Link from "next/link";
import { themeSlug, type Theme } from "@/lib/site";

export function ThemePill({
  theme,
  active = false,
}: {
  theme: Theme;
  active?: boolean;
}) {
  return (
    <Link
      href={`/blog/theme/${themeSlug(theme)}`}
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "inline-flex rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:bg-white dark:text-neutral-900"
          : "inline-flex rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"
      }
    >
      {theme}
    </Link>
  );
}
