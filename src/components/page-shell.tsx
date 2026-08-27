import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  intro?: string;
  children?: ReactNode;
};

/** Consistent heading + width for every inner page. */
export function PageShell({ title, intro, children }: PageShellProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          {intro}
        </p>
      )}
      {children && <div className="mt-10">{children}</div>}
    </div>
  );
}

/** Marks a section that is scaffolded but not yet populated with content. */
export function ComingSoon({ note }: { note: string }) {
  return (
    <p className="rounded-lg border border-dashed border-neutral-300 px-5 py-6 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
      {note}
    </p>
  );
}
