import type { Metadata } from "next";
import { PageShell, ComingSoon } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "About",
  description: "Biography and background.",
};

export default function AboutPage() {
  return (
    <PageShell title="About" intro="Biography and background.">
      <ComingSoon note="Bio copy lands in phase 2." />
    </PageShell>
  );
}
