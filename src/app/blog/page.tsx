import type { Metadata } from "next";
import { PageShell, ComingSoon } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes, essays and posts.",
};

export default function BlogPage() {
  return (
    <PageShell title="Blog" intro="Notes, essays and posts.">
      <ComingSoon note="Post index, theme filtering and RSS land in phase 2." />
    </PageShell>
  );
}
