import Link from "next/link";
import { nav, site } from "@/lib/site";

/**
 * Placeholder hero. The interactive Fun/Info graph (handoff doc §4) replaces
 * this section in phase 3; the section list below is the accessible fallback
 * that will keep working alongside it.
 */
export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {site.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
        {site.description}
      </p>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 dark:border-neutral-800 dark:bg-neutral-800">
        {nav.map((item) => (
          <li key={item.href} className="bg-white dark:bg-neutral-950">
            <Link
              href={item.href}
              className="block h-full px-5 py-6 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current dark:hover:bg-neutral-900"
            >
              <span className="font-medium">{item.label}</span>
              <span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
                {item.blurb}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
