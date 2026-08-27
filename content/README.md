# Content

All site content lives here as Markdown with validated frontmatter. There is no
database and no CMS.

```
content/
  blog/                 one .md file per post
  media/articles/       one .md file per link
  media/audio/
  media/video/
  events.json           structured list, no body text
```

Every entry currently in this folder is **sample content**, marked "Пример" or
"Sample". Delete these files once real content lands — nothing references them
by name.

Frontmatter is validated against `src/lib/schemas.ts` at build time. A missing
or malformed field fails the build and names the offending file, rather than
publishing a broken entry.

Setting `published: false` hides an entry without deleting the file.
