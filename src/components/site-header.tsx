"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="rounded-sm text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden sm:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-sm text-sm text-neutral-600 underline-offset-4 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current aria-[current=page]:text-neutral-950 aria-[current=page]:underline dark:text-neutral-400 dark:hover:text-neutral-50 dark:aria-[current=page]:text-neutral-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-sm p-1 text-sm text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:hidden dark:text-neutral-400"
        >
          <span className="sr-only">
            {open ? "Close main menu" : "Open main menu"}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-neutral-200 sm:hidden dark:border-neutral-800"
        >
          <ul className="mx-auto max-w-4xl px-6 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block rounded-sm py-3 text-base text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current aria-[current=page]:font-medium aria-[current=page]:text-neutral-950 dark:text-neutral-400 dark:aria-[current=page]:text-neutral-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
