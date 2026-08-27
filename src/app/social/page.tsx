import type { Metadata } from "next";
import { PageShell, ComingSoon } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Social",
  description: "Find me elsewhere.",
};

export default function SocialPage() {
  return (
    <PageShell title="Social" intro="Find me elsewhere.">
      <ComingSoon note="Profile links land in phase 2, once the full list is confirmed." />
    </PageShell>
  );
}
