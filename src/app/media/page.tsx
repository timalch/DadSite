import type { Metadata } from "next";
import { PageShell, ComingSoon } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Media",
  description: "Articles, audio and video.",
};

export default function MediaPage() {
  return (
    <PageShell title="Media" intro="Articles, audio and video.">
      <ComingSoon note="Articles, audio and video subsections land in phase 2." />
    </PageShell>
  );
}
