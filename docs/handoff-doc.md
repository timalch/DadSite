# Project Handoff Doc: [Dad's Name] Personal Website

## 1. Project Overview

A personal portfolio + blog website, inspired by Yuval Harari's personal site in terms of content structure, with a distinctive interactive homepage design. The site should feel modern, be effectively maintenance-free for a non-technical owner, and support a growing archive of writing and media over time.

**Owner:** Non-technical. Design every workflow assuming the owner will only ever paste a link or short text — never touch code, terminal, or raw files directly.

**Builder:** This site is being built using Claude Code.

---

## 2. Tech Stack

- **Framework:** Next.js (App Router), styled with Tailwind CSS
- **Content:** Markdown/MDX files stored in the repo — no database, no traditional CMS
- **Hosting:** Vercel (auto-deploys from GitHub on push)
- **Version control:** GitHub (repo can be public — see Security section for what must never be committed regardless)
- **Domain:** Registered separately via Cloudflare Registrar or Namecheap, DNS pointed at Vercel
- **Analytics:** Vercel Analytics (built-in, privacy-friendly, no cookies)

---

## 3. Site Structure & Content Sections

- **About** — bio
- **Events** — title, date, location, link. Past events are grayed out or removed (no archive view needed).
- **Media** — split into three subsections, each populated the same way (see Section 5):
  - Articles
  - Audio (e.g. podcast appearances)
  - Video
- **Blog** — populated from the owner's public Facebook posts (see Section 5). Each post tagged with a theme (see Section 6).
- **Social** — hotlinks/icons to all social media profiles

No "Books" section needed.

---

## 4. Homepage Design: Interactive Fun/Info Graph

The homepage hero is a dotted line graph used as a visual/thematic centerpiece (NOT the site's primary navigation — standard nav is used on all inner pages).

- **X-axis:** "Info" (low → high information density)
- **Y-axis:** "Fun" (serious → playful)
- Each dot represents a site section (About, Events, Media subsections, Blog, Social), positioned along both axes to reflect its character — e.g., Social links skew high-fun/low-info, an in-depth article skews high-info/lower-fun.
- Dots are connected by a dotted line and are clickable, linking to their respective section.
- **Mobile requirement:** must have a genuinely redesigned mobile layout — do not simply shrink the desktop graph. Consider a simplified/stacked version on small screens.
- **Accessibility requirement:** each dot needs a proper accessible label (e.g. `aria-label`) for screen readers — do not rely on hover-only tooltips.

**Recommended step:** Prototype this graph concept visually in Claude Design before implementing it in Next.js, since it's a novel interactive component worth validating visually first.

---

## 5. Content Pipelines

### 5a. Ongoing — New Blog Posts (from Facebook)

Facebook does not provide API access to read personal profile posts automatically (this is true even though the profile is public — the restriction is per account type, not visibility). Do NOT build a scraper or poller against Facebook — it violates ToS, is fragile, and can jeopardize the account.

**Workflow instead:**
1. Owner pastes a Facebook post **link** into a Claude skill.
2. Skill attempts to auto-fetch the post content via Facebook's oEmbed Post endpoint (requires a free Facebook Developer App for an App ID/Secret — no App Review needed for this).
3. If the fetch succeeds and returns usable text: generate a Markdown file with proper frontmatter (see Section 6 for tagging).
4. If the fetch fails or returns insufficient content: prompt for the post text to be pasted manually instead of silently publishing something broken or empty.
5. Output goes to a **preview/draft state by default** — a Vercel preview deployment (via a branch/PR) that the owner or maintainer can glance at before it's merged/published.
6. Build in a toggle/flag to allow switching a given post (or all future posts) to auto-publish instead, for later if the owner trusts the pipeline.

### 5b. Ongoing — Media (Articles / Audio / Video)

Same pattern as the blog, applied consistently across all three Media subsections:
1. Owner pastes a link (YouTube, Spotify, podcast platform, article URL, etc.)
2. Skill auto-fetches what it can — YouTube and Spotify support oEmbed well; generic articles usually only offer page-preview metadata (title, image, description).
3. Falls back to a couple of manual fields (title, description) if auto-fetch is insufficient.
4. Same preview-before-publish default as blog posts.

Keep all four content-adding skills (blog, articles, audio, video) consistent in interaction pattern so the owner only has to learn one mental model.

### 5c. One-Time — Historical Facebook Archive Import

The owner has hundreds of historical Facebook posts to import (personal profile posts since 2007).

**Profile:** https://www.facebook.com/almas.chukin/ (public personal profile — used for the "Download Your Information" export and as the source for the oEmbed link-paste workflow in 5a/5b)

1. Owner requests their data via Facebook's **"Download Your Information"** tool (Settings → Your Facebook Information → Download Your Information), exporting posts in JSON format.
2. Owner (or maintainer, with access) hands off the resulting export archive.
3. Build a **one-time script** (not a repeated pipeline) that:
   - Parses `posts.json`
   - Converts each post into a dated Markdown file matching the live-pipeline's format
   - **Includes photos** where present — pull image files from the export, compress them on import, store in the repo's `public/` directory, and reference them from each post's frontmatter
   - Labels each post by type as it's processed (own text post / photo / share of someone else's content / life event / etc.) — even though ALL posts will be imported unfiltered per the owner's decision, this labeling costs little to add and makes future filtering (e.g., hiding "changed profile picture" posts) trivial without re-running the whole import
   - Auto-classifies each post's theme (see Section 6) as part of the same batch step
   - **Auto-publishes** directly (no preview/draft step for the historical batch — that review gate is for new posts going forward only)
4. If the total photo payload from the export turns out to be very large (multiple GB), reconsider committing images directly into the git repo — an external image host (e.g. Cloudinary) may be a better fit. Check the actual export size before deciding.

---

## 6. Post Theming/Tagging

Each blog post (and ideally each Media entry) gets a `theme` field in its frontmatter.

- **Approach:** Fixed starter list, easy to extend later — not fully open-ended.
- **Starter list (owner to confirm/adjust):** Business, Macro-Economy, Just for Fun, Personal — add more as needed.
- **New posts:** the skill auto-suggests a theme based on content when generating the post; owner/maintainer can override with a one-line frontmatter edit if it's wrong.
- **Historical import:** themes are auto-classified in bulk as part of the one-time import script (Section 5c).
- This also enables a filterable blog view (e.g., tag pills) essentially for free.

---

## 7. Security Guidelines (Critical — Owner Is Non-Technical)

These need to be built into the project setup itself, not left as something the owner has to remember:

- **`.gitignore` from the very first commit** — before any code exists, so there's never a window where a secret could be committed by accident.
- **All API keys/secrets (Facebook App ID/Secret, any other tokens) live only in Vercel's Environment Variables dashboard** — never hardcoded in the codebase, never committed to GitHub.
- **Commit a `.env.example` file** with placeholder/dummy values, so required env vars are documented without exposing real ones.
- **Enable 2FA on both the GitHub and Vercel accounts.** This is the single highest-leverage protection and should not be skipped.
- **Leave GitHub secret scanning on** (default for public repos) as an automatic backstop.
- **The repo itself can be public** — there's nothing sensitive in the site's code — but secrets must never be included in it regardless of repo visibility.
- **Plain-language warning for the owner:** if he ever sees a long random string of letters/numbers labeled "key," "secret," or "token" anywhere, don't share or paste it anywhere — message [maintainer's name] instead.

---

## 8. Implementation Notes (Build Quality Bar)

- **Mobile/responsive:** required throughout, not just the homepage graph.
- **Accessibility:** proper labels on interactive elements (especially the graph dots), alt text on all imported/added photos.
- **Image performance:** use Next.js's built-in image optimization (auto-resize, lazy-load) given the volume of photos from the historical import.
- **SEO:** proper page titles, meta descriptions, and Open Graph tags site-wide, so shared links preview correctly.
- **RSS feed:** add for the blog.
- **Analytics:** Vercel Analytics, no cookie banner needed given its privacy-friendly/cookieless design.
- **Email:** not needed — no matching custom email address required for this project.

---

## 9. Open Items to Confirm Before/During Build

- [ ] Confirm final theme list wording
- [ ] Confirm homepage graph's specific dot placements (can be adjusted after seeing the Claude Design mockup)
- [ ] Decide, after seeing real export size, whether photos are stored in-repo or via an external image host
