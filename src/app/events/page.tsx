import type { Metadata } from "next";
import { PageShell, ComingSoon } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Events",
  description: "Talks, panels and appearances.",
};

export default function EventsPage() {
  return (
    <PageShell title="Events" intro="Talks, panels and appearances.">
      <ComingSoon note="Event listings land in phase 2. Past events will gray out automatically by date." />
    </PageShell>
  );
}
