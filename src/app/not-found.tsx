import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell
      title="Page not found"
      intro="That page doesn't exist, or has moved."
    >
      <Link
        href="/"
        className="rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
      >
        Back to the homepage
      </Link>
    </PageShell>
  );
}
