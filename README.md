# Buttercut

*Friendly nickname: **Butternut** — same theme, extra warmth.*

Hi there — welcome.

**Buttercut** is a personal-site theme for [Next.js](https://nextjs.org/) (App Router, React 19) that wants you to ship something beautiful *without* wrestling the codebase every weekend. One typed **`site.config.ts`** ties together navigation, brand, home sections, and optional integrations; your words live in **`content/demo/`** as Markdown, JSON, and MDX. Clone it, run it, and you already get a full portfolio: home, about, projects, notes, and a built-in **Guide** that walks you from zero to deployed. No API keys are required for the default demo — optional Last.fm, weather, and GitHub touches **fail open** when you have not wired them yet, so your site stays calm and usable.

If you care about **maintainability** (registry-based blocks, explicit MDX note registration, tests that keep docs honest) and **editorial polish** (Nunito, Bitter, JetBrains Mono; light and dark; motion that does not steal the show), we built this for you. Come on in.

---

## Contents

- [Why Buttercut might feel like home](#why-buttercut-might-feel-like-home)
- [What you get on day one](#what-you-get-on-day-one)
- [Live demo and stack](#live-demo-and-stack)
- [Quick start](#quick-start)
- [Philosophy](#philosophy)
- [Project layout](#project-layout)
- [Configuration](#configuration)
  - [Home blocks and overrides](#home-blocks-and-overrides)
  - [Theming and presets](#theming-and-presets)
  - [MDX routes and long-form notes](#mdx-routes-and-long-form-notes)
  - [Table of contents on notes](#table-of-contents-on-notes)
  - [Optional integrations](#optional-integrations)
  - [Content files](#content-files)
  - [Inline markdown for short copy](#inline-markdown-for-short-copy)
- [Documentation map](#documentation-map)
- [Scripts and CI](#scripts-and-ci)
- [Forking and deployment](#forking-and-deployment)
- [Changelog](#changelog)
- [Contributing and security](#contributing-and-security)
- [License](#license)

---

## Why Buttercut might feel like home

- **Real pages, not a promise.** Home, About, Projects, Notes, and an in-repo **Guide** are already wired, styled, and tested — you are not staring at an empty layout wondering what to build first.
- **It runs the moment you clone.** `npm install` and `npm run dev` are enough to see the whole experience. Integrations show gentle placeholders until you add credentials; nothing crashes the shell.
- **Configuration you can trust.** `createSiteConfig` merges your `site.config.ts` with `src/lib/config/defaults.ts`, so you override only what is different and TypeScript helps you stay on track.
- **Copy lives where writers expect it.** Hero body, projects, about sections, and note metadata sit under `content/demo/` — tweak text without hunting through `src/app` for every string.
- **MDX notes that feel like a real publication.** Notes are `.mdx` with `export const frontmatter`, optional JSX, stable heading ids (`github-slugger`), and an optional **Table of contents** aligned with [kaichen.dev](https://kaichen.dev) note UX — add `<TableOfContents />` before the first `##` when you want it.
- **Documentation that does not lie.** The **Guide** (`/guide`) uses stable URL fragments; README and source share the same anchors via `src/lib/guide/anchors.ts`, with tests that catch broken links.
- **GPL-3.0-or-later.** Fork it, adapt it, ship it; share improvements if you redistribute — same spirit as many personal-site and tool projects.

---

## What you get on day one

| Area | What you get |
| ---- | -------------- |
| **Home** | Block-based layout: hero, status row (Now Playing + weather slots), demo projects with GitHub stars, integrations panel — all reorderable and toggleable via config. |
| **About / Projects** | Structured sections (education, experience, volunteering, focus) and project cards with tags and optional repo-linked stars. |
| **Notes** | MDX under `content/demo/notes/`, explicit registry in `src/lib/demo/mdx-notes.ts`, `/notes/[slug]` with an editorial header and prose scale. |
| **Guide** | Ten-step onboarding in MDX with permalinks — clone, config, content, short copy, theme, blocks, notes, integrations, deploy. |
| **Theme** | CSS variables plus optional `brand.theme` overrides sanitized at build time; presets (`sunset`, `ocean`, `terminal`). |
| **Integrations** | GitHub repo stars (on by default, unauthenticated quota), Last.fm, Open-Meteo weather — each optional and null-safe. |

---

## Live demo and stack

- **See it live:** [buttercut.kaichen.dev](https://buttercut.kaichen.dev) — tutorial links in this README point here; after you fork, you may swap in your own site URL while keeping the same `#anchor` ids.
- **Under the hood:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, MDX via `@next/mdx`, Vitest for unit and smoke tests.

---

## Quick start

You belong here. Take the guided tour: [Step 1 — Clone and run](https://buttercut.kaichen.dev/guide#clone-and-run).

```bash
git clone https://github.com/kaiiiichen/buttercut.git
cd buttercut
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You do not need a `.env` file for the default demo.

---

## Philosophy

1. **Simple changes stay in config.** Title, nav, socials, block order, and theme tokens belong in `site.config.ts` and `content/demo/` — not in a fork of half the theme.
2. **Deep changes have a hook.** Register or replace blocks in `src/custom/register.ts` so upstream theme updates can still merge without tears.
3. **Integrations are optional by design.** If an API key or username is missing, the UI explains the gap instead of throwing — your deploy keeps smiling.
4. **Trusted author content.** Inline markdown and MDX are for **your** copy in the repo, not arbitrary public user input. Treat `content/demo` like source code.

---

## Project layout

| Path | Role |
| ---- | ---- |
| `site.config.ts` | Your overrides on top of defaults — site metadata, nav, socials, `home.blocks`, `brand`, `integrations`, `content.allowedLinkSchemes`. |
| `mdx-components.tsx` | Global MDX mapping: `ButtercutProse` wrapper, `h2`/`h3` ids, `TableOfContents` tag name. |
| `src/app` | App Router routes: `/`, `/about`, `/projects`, `/notes`, `/notes/[slug]`, `/guide`, `/mdx-demo`. |
| `src/blocks` | Home section components (`ButtercutHero`, `ButtercutDemoProjects`, …). |
| `src/components` | Shared UI: nav, theme, prose, GitHub activity, note TOC, etc. |
| `src/custom` | Your `register.ts` and optional block components — survives theme pulls if you keep changes here. |
| `src/lib/blocks` | Block registry API. |
| `src/lib/config` | Types, defaults, `mergeSiteConfig`. |
| `src/lib/integrations` | Fetch helpers for GitHub, Last.fm, weather. |
| `src/lib/demo` | Loaders for demo JSON/Markdown and the MDX note registry. |
| `src/lib/markdown` | `inline.tsx` for short copy (`**`, `` ` ``, links) — auditable, no raw HTML dump. |
| `src/lib/guide` | Canonical `/guide` anchor list and reference tests. |
| `content/demo` | `intro.md`, `about.json`, `projects.json`, `notes/*.mdx`. |
| `public` | Avatars, OG placeholders, static assets. |

---

## Configuration

Walkthrough: [Step 2 — Fill in site.config.ts](https://buttercut.kaichen.dev/guide#site-config).

Edit **`site.config.ts`**. Defaults live in `src/lib/config/defaults.ts`; merging is handled by `mergeSiteConfig` so partial objects are safe.

### Home blocks and overrides

Guides: [Step 6 — Reorder or hide home blocks](https://buttercut.kaichen.dev/guide#home-blocks) · [Step 7 — Add or override a block](https://buttercut.kaichen.dev/guide#blocks).

Built-in block ids include `hero`, `status`, `demo_projects`, `integrations`, `now_playing`, `weather`. Order and visibility come from `home.blocks` in config.

To replace or add a block without editing the theme core, use **`src/custom/register.ts`**:

```ts
import { registerButtercutBlock } from "@/lib/blocks/registry";
import { MyHero } from "./blocks/MyHero";

export function applyButtercutCustom(): void {
  registerButtercutBlock("hero", MyHero);
}
```

Each block receives `{ config, demo }` where `config` is the merged site config and `demo` is loaded demo content.

### Theming and presets

Guide: [Step 5 — Pick a colour mood](https://buttercut.kaichen.dev/guide#theme).

Override CSS custom properties from config — values are sanitized before injection:

```ts
export const siteConfig = createSiteConfig({
  brand: {
    theme: {
      accent: "#ff6f3c",
      accentDark: "#ffa07a",
      background: "oklch(99% 0 0)",
      backgroundDark: "#111",
    },
  },
});
```

**Presets** (`src/lib/theme/presets.ts`):

```ts
import { buttercutPreset } from "@/lib/theme/presets";

brand: {
  theme: { ...buttercutPreset("sunset"), accent: "#ff3366" },
}
```

| Preset | Mood |
| ------ | ---- |
| `sunset` | Warm editorial, paper-like light / deep warm dark. |
| `ocean` | Cool blues, calm corporate. |
| `terminal` | Monochrome green accent, night-friendly. |

### MDX routes and long-form notes

Guide: [Step 8 — Write notes in MDX](https://buttercut.kaichen.dev/guide#notes).

- Routes under `src/app/**/*.mdx` use the global MDX wrapper (typography per route layout).
- Demo notes live in **`content/demo/notes/<slug>.mdx`**. Each file exports `frontmatter` with at least `title`, and usually `summary` and `date`.
- Register every note in **`src/lib/demo/mdx-notes.ts`** — the registry is the publish list; unregistered files do not get routes.

### Table of contents on notes

After the frontmatter (and any local components), **before the first `##`**, you can add:

```mdx
<TableOfContents />
```

The `/notes/[slug]` page wraps content in `<article id="note-content">`. The TOC scans `#note-content h2[id], h3[id]` and only renders when there are at least **two** headings (`MIN_HEADINGS = 2`), matching the reference behaviour from kaichen.dev’s note TOC. Heading ids come from MDX `h2`/`h3` components using `github-slugger` (Turbopack-friendly — no `rehype-slug` in `next.config`).

### Optional integrations

Guide: [Step 9 — Turn on optional integrations](https://buttercut.kaichen.dev/guide#integrations).

| Integration | Default | Config keys | Environment |
| ----------- | ------- | ----------- | ------------- |
| GitHub stars | on | `integrations.github.enabled` | Optional `GITHUB_TOKEN` (higher API quota) |
| Last.fm | off | `integrations.lastfm.enabled`, `username` | `LASTFM_API_KEY` |
| Weather | off | `integrations.weather.enabled`, `lat`, `lon`, `label` | None (Open-Meteo) |

All fetch helpers return `null` on failure so the page always renders.

### Content files

Guide: [Step 3 — Swap the content in content/demo/](https://buttercut.kaichen.dev/guide#content).

| File | Purpose |
| ---- | ------- |
| `intro.md` | Home hero body (inline markdown subset). |
| `about.json` | Sections for `/about` — omit or empty arrays hide cards. |
| `projects.json` | Tagline and project list; `repo` can drive `href` and stars. |
| `notes/*.mdx` | Long-form notes; register each in `mdx-notes.ts`. |

### Inline markdown for short copy

Guide: [Step 4 — Authoring short copy](https://buttercut.kaichen.dev/guide#short-copy).

Used for hero intro, card summaries, note one-liners — implemented in [`src/lib/markdown/inline.tsx`](src/lib/markdown/inline.tsx) as real React nodes (no `dangerouslySetInnerHTML` for this path):

| Syntax | Output |
| ------ | ------ |
| `**bold**` | Strong emphasis |
| `` `code` `` | Inline code chip |
| `[label](url)` | Link; external URLs get `rel`/`target` |

Extend allowed URL schemes when you need `tel:` or `sms:`:

```ts
content: {
  allowedLinkSchemes: ["http", "https", "mailto", "tel", "sms"],
}
```

A hard deny list always blocks `javascript:`, `data:`, `vbscript:`, and `file:`.

For block-level markdown (headings, lists, tables, fenced code), use **MDX** and `ButtercutProse` — not this inline helper.

---

## Documentation map

| Layer | Where |
| ----- | ----- |
| **Tutorial (step-by-step)** | [`/guide`](https://buttercut.kaichen.dev/guide) — ten anchors from `#clone-and-run` to `#deploy`, defined in `src/lib/guide/anchors.ts`. |
| **Reference (this file)** | Feature overview, tables, and links into the Guide. |
| **API detail** | JSDoc on types (`src/lib/config/types.ts`) and integration helpers. |

Tutorial links in this README use `https://buttercut.kaichen.dev/guide#...`. After you fork, you may replace the origin with your own deployment; keep fragment ids aligned with `anchors.ts` so cross-links stay valid.

---

## Scripts and CI

| Script | Command | Purpose |
| ------ | ------- | ------- |
| `dev` | `next dev` | Local development |
| `build` | `next build` | Production build |
| `start` | `next start` | Serve production output |
| `lint` | `eslint .` | Lint |
| `typecheck` | `tsc --noEmit` | Typecheck |
| `test` | `vitest run` | Unit and integration tests |
| `test:smoke` | `vitest run --dir src/app/guide` | Post-build smoke: `/guide` anchors in HTML |

CI runs: `lint` → `typecheck` → `test` → `build` → `test:smoke`.

---

## Forking and deployment

Guide: [Step 10 — Deploy](https://buttercut.kaichen.dev/guide#deploy).

Buttercut is a standard Next.js app — deploy on [Vercel](https://vercel.com/) or any Node host. Set `site.siteUrl` in `site.config.ts` to your production URL for metadata and OG. Replace demo placeholder copy in `content/demo/` and adjust `nav` / `socials` to match your identity.

---

## Changelog

Human-readable history: [CHANGELOG.md](CHANGELOG.md) ([Keep a Changelog](https://keepachangelog.com/)). Current package version: **0.1.0**.

---

## Contributing and security

- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md) — local setup, full CI command list, and how to keep README, Guide, and code in sync.
- **Code of conduct:** [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- **Security:** [SECURITY.md](SECURITY.md) — how to report issues affecting the theme.

---

## License

[GPL-3.0-or-later](LICENSE). Same license family as the [kaichen.dev](https://github.com/kaiiiichen/kaichen.dev) reference implementation.
