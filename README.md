# Almas Chukin — personal site

Personal portfolio and blog. Next.js (App Router) + Tailwind, content as
Markdown in the repo, deployed on Vercel.

The full specification lives in [`docs/handoff-doc.md`](docs/handoff-doc.md).

## Local development

Requires Node.js 20+ (currently built against Node 24 LTS).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Project layout

```
src/
  app/          routes (App Router)
  components/   shared UI
  lib/site.ts   site name, nav, and the theme taxonomy — edit here, not inline
docs/           project specification
```

## Secrets

No secret ever belongs in this repository, regardless of whether it is public
or private.

- Real values live only in **Vercel → Settings → Environment Variables**.
- `.env.example` documents which variables exist, using placeholder values.
- `.env*` is git-ignored (except `.env.example`).

If you ever see a long random string labelled "key", "secret" or "token", do
not paste or forward it anywhere.

## Build status

| Phase | Scope | Status |
| --- | --- | --- |
| 1 | Foundation: scaffold, layout, nav, SEO defaults, analytics, deploy | ✅ done |
| 2 | Content engine, section pages, blog index, RSS | not started |
| 3 | Interactive Fun/Info homepage graph | not started |
| 4 | One-time historical Facebook archive import | not started |
| 5 | Ongoing content-adding skills | not started |
| 6 | Domain, accessibility/performance pass, owner handover | not started |
