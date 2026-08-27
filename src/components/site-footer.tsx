import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between dark:text-neutral-400">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <a
          href="/feed.xml"
          className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          RSS
        </a>
      </div>
    </footer>
  );
}
