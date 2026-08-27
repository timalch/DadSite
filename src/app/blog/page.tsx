import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PostCard } from "@/components/post-card";
import { ThemePill } from "@/components/theme-pill";
import { getAllPosts } from "@/lib/content";
import { themes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes, essays and posts.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageShell title="Blog" intro="Notes, essays and posts.">
      <nav aria-label="Filter by theme" className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <ThemePill key={theme} theme={theme} />
        ))}
      </nav>

      {posts.length === 0 ? (
        <p className="mt-10 text-neutral-500 dark:text-neutral-400">
          No posts yet.
        </p>
      ) : (
        <div className="mt-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
