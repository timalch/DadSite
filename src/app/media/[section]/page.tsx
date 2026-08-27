import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { MediaCard } from "@/components/media-card";
import { getMediaBySection } from "@/lib/content";
import { mediaSections, type MediaSectionSlug } from "@/lib/site";

type Props = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return mediaSections.map((s) => ({ section: s.slug }));
}

function findSection(slug: string) {
  return mediaSections.find((s) => s.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: slug } = await params;
  const section = findSection(slug);
  if (!section) return {};

  return { title: section.label, description: section.blurb };
}

export default async function MediaSectionPage({ params }: Props) {
  const { section: slug } = await params;
  const section = findSection(slug);
  if (!section) notFound();

  const items = getMediaBySection(section.slug as MediaSectionSlug);

  return (
    <PageShell title={section.label} intro={section.blurb}>
      {items.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          Nothing here yet.
        </p>
      ) : (
        <div>
          {items.map((item) => (
            <MediaCard key={`${item.section}/${item.slug}`} item={item} />
          ))}
        </div>
      )}

      <p className="mt-12 border-t border-neutral-200 pt-8 text-sm dark:border-neutral-800">
        <Link
          href="/media"
          className="rounded-sm text-neutral-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current dark:text-neutral-400"
        >
          ← All media
        </Link>
      </p>
    </PageShell>
  );
}
