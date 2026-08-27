import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Social",
  description: "Find me elsewhere.",
};

export default function SocialPage() {
  return (
    <PageShell title="Social" intro="Find me elsewhere.">
      <ul className="flex flex-col gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800">
        {socialLinks.map((link) => (
          <li key={link.href} className="bg-white dark:bg-neutral-950">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer me"
              className="flex items-center justify-between px-5 py-5 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-current dark:hover:bg-neutral-900"
            >
              <span className="font-medium">{link.label}</span>
              <span className="sr-only"> (opens in a new tab)</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
