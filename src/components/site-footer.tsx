import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-neutral-500 dark:text-neutral-400">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
