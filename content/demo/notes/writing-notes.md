---
title: Writing notes
summary: How notes are parsed and rendered without MDX.
date: 2026-04-10
---

## Plain markdown, rendered by marked

Notes live under `content/demo/notes/` as `.md` files with optional frontmatter:

```
---
title: Writing notes
summary: How notes are parsed and rendered without MDX.
date: 2026-04-10
---
```

The theme uses [`marked`](https://marked.js.org/) so you get headings, lists, code blocks, bold, italic, and inline code for free.

## Why not MDX?

MDX with Turbopack currently requires extra toolchain knobs. Buttercut stays on plain markdown so the default experience is **`npm run dev`** and nothing else. MDX is an intended follow-up.

## Inline code and emphasis

Use backticks for `inline code`, **asterisks** for bold, and *single asterisks* for italics.
