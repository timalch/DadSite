import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getMediaBySection } from "@/lib/content";
import { mediaSections } from "@/lib/site";

export const metadata: Metadata = {
  title: "Media",
  description: "Articles, audio and video.",
};

export default function MediaPage() {
  return (
    <PageShell title="Media" intro="Articles, audio and video.">
      <ul className="grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-800">
        {mediaSections.map((section) => {
          const count = getMediaBySection(section.slug).length;
          return (
            <li key={section.slug} className="bg-white dark:bg-neutral-950">
              <Link
                href={`/media/${section.slug}`}
                className="block h-full px-5 py-6 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current dark:hover:bg-neutral-900"
              >
                <span className="font-medium">{section.label}</span>
                <span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
                  {section.blurb}
                </span>
                <span className="mt-3 block text-sm text-neutral-400 dark:text-neutral-500">
                  {count} {count === 1 ? "entry" : "entries"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
