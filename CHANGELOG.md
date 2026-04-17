# Changelog

All notable changes to **Buttercut** are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/kaiiiichen/buttercut/compare/v0.1.0...HEAD)

### Fixed

- **README tutorial links clickable on GitHub.** Every `_Tutorial:_`
pointer was using a root-relative fragment path (e.g.
`/guide#content`) that GitHub resolved against its own origin and
404ed. Now targets `src/app/guide/page.mdx` (an intermediate fix —
superseded in the same `[Unreleased]` by the full absolute URL
below).

### Changed

- **Long-form typography rewritten to match `kaichen.dev` notes.**
`.buttercut-prose` now runs body copy through **Nunito** at
`0.95rem / 1.75`, headings through **Bitter** (h1 1.8rem, h2 1.3rem
with a section underline, h3 1.1rem), and lists / tables / code
blocks through the same scale kaichen.dev uses in its lecture
notes. Every selector is wrapped in `:where()` so any inline
Tailwind utility on an inner element (e.g. the `<Step>` h3 in
`/guide`) still wins. Drops the old `font-serif text-[15px]`
look that felt cramped.
- **`/guide` inner vocabulary matches the new prose scale.**
`<Tip>` renders as a kaichen.dev-style `<NoteBlock>` — uppercase
accent mini-label over serif (Bitter) 0.9rem body. `<Step>`
headings move to serif 1.45rem with an `.1em / 0.8rem` Nunito
eyebrow and Nunito 0.95rem body (no more 15px serif). The TOC
card, `<CopyDemo>` right pane, and header subtitle all run on
the same Nunito 0.95rem / 16px sans scale.

### Added

- **`/guide` picks up the editorial layout.** A new
`src/app/guide/layout.tsx` wraps the MDX tutorial in the same
`max-w-[1180px]` shell as `/notes`, `/about`, and `/projects` — a
`fade-up` header with a `Tutorial` eyebrow label, a big nunito h1,
a serif subtitle, and a divider — while the MDX content below
stays in a comfortable 760px reading column. The `# Guide` heading
and preamble were moved out of `page.mdx` into the layout to
avoid duplication. The "On this page" TOC block was upgraded to a
`mag-card` + `mag-label` so it speaks the same vocabulary as the
section labels across the rest of the theme.
- **Synthetic GitHub Activity heatmap** on `/projects`
(`src/components/ButtercutGitHubActivity.tsx`). A client component
that mirrors the `kaichen.dev` contributions grid — 52 weeks × 7
days with month labels, a hover-scale animation, and a portal
tooltip — but generated from a seeded `mulberry32` PRNG so a fresh
clone shows something interesting with **zero API keys and zero
network calls**. Weekdays lean active, weekends lean quiet, and
the total row is clearly marked `demo data` so no visitor mistakes
it for real contributions. The seed defaults to `"daily"` — a
stable 32-bit integer derived from the UTC date — so the heatmap
reshuffles once per calendar day. Pass `seed="fixed"` for the
old always-identical behaviour or any number for a custom pin.

### Changed

- `**/about` and `/projects` now mirror the `kaichen.dev` editorial
layout** (`max-w-[1180px]` shell, `fade-up` entrance, `mag-card`
blocks). `/about` is driven by a new structured file
`content/demo/about.json` with optional `intro`, `education[]`,
`experience[]`, `volunteering[]`, and `focus[]` sections — empty
arrays hide the corresponding card. `/projects` renders a
two-column grid of cards with the `↗` hover indicator, live GitHub
star badge, indented description, stack tags, and a `GitHub ↗`
footer row. `content/demo/about.md` was retired in the same move;
authors migrating from the old markdown file move their copy into
`about.json` fields (inline markdown is supported).
- **README tutorial links now point at the deployed reference demo**
at `[buttercut.kaichen.dev](https://buttercut.kaichen.dev)`. All 9
Tutorial pointers resolve to absolute URLs
(`https://buttercut.kaichen.dev/guide#…`) that work from GitHub,
feed readers, and the deployed site alike. The preamble explains
the Fork UX convention: downstream forks may either leave the
pointers upstream or find-and-replace with their own URL.
- **Demo site identity.** `site.config.ts` now declares
`siteUrl: "https://buttercut.kaichen.dev"`. The `/guide` Step 2
code example swaps the author-specific `title` / `siteUrl` pair
for neutral `"Your Name"` / `"https://yourdomain.com"` placeholders
so visitors read it as a template, not someone's personal site.
- **Documented stable `/guide` anchors for cross-references.** README
section headings and JSDoc on `renderButtercutInlineMarkdown` /
`ButtercutContentConfig` now link to `#clone-and-run`, `#site-config`,
`#content`, `#short-copy`, `#theme`, `#home-blocks`, `#blocks`,
`#notes`, `#integrations`, and `#deploy`. Source → README →
`/guide` now form a proper triangle instead of three isolated docs.
- **Single source of truth for `/guide` anchors**
(`src/lib/guide/anchors.ts`). The in-app "On this page" TOC,
`<Step>` headings (via `anchorFor(id)` spread), and the post-build
smoke test all read from `BUTTERCUT_GUIDE_ANCHORS` — adding or
renaming a step is now a one-file edit.

### Added

- **Reverse anchor-ref test** (`src/lib/guide/anchors-refs.test.ts`):
scans `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, and every file
under `src/` for `/guide#<id>` references and fails the pre-build
`npm test` step on any id that isn't in `BUTTERCUT_GUIDE_ANCHORS`.
Typos in anchor fragments now surface at `npm test` time instead of
at click time.

## [0.1.0](https://github.com/kaiiiichen/buttercut/releases/tag/v0.1.0) — 2026-04-16

Initial public release. Buttercut is a theme-first Next.js (App Router)
starter built around a typed `site.config.ts`, swappable home blocks, and
demo content that runs with zero third-party keys.

### Added

- **Configuration centre** (`site.config.ts`, `src/lib/config/`): typed
`ButtercutSiteConfig` covering `site`, `nav`, `socials`, `home.blocks`,
`brand`, `integrations`, and `content`, with defaults in
`src/lib/config/defaults.ts` and a deep-merge helper in
`src/lib/config/merge-site-config.ts`.
- **Home-block registry** (`src/lib/blocks/registry.ts`): map-backed
registry keyed by string id with slots-pattern support. Built-in ids:
`hero`, `status` (Listening + Location side-by-side), `now_playing`,
`weather`, `demo_projects`, `integrations`.
- **User override space** (`src/custom/`): `register.ts` is imported once
on startup and is the sanctioned spot to add or override blocks without
touching theme source.
- **Theme tokens and colour presets** (`src/lib/theme/`): `presets.ts`
ships `sunset`, `ocean`, `terminal` palettes; `build-theme-style.ts`
sanitises and renders user token overrides into a `<style>` tag with no
runtime crashes on typos.
- **UI parity with the reference site**: mag-card layout, nav-wave
overlay, Nunito + Bitter + JetBrains Mono font stack via Fontsource,
pill-shaped back button on `/notes/[slug]`, editorial scale, hljs code
theme in `ButtercutProse`, light/dark/system theme with no flash.
- **Demo content** (`content/demo/`): `intro.md`, `about.md`,
`projects.json`, `notes/*.md` and `notes/*.mdx` drive the whole site.
`projects.json` entries auto-resolve `href` from `repo` when omitted
and render live GitHub star counts by default.
- **Mixed MD + MDX notes** (`src/lib/demo/mdx-notes.ts`): explicit MDX
registry avoids Turbopack's dynamic-import guessing; `.md` and `.mdx`
notes share `/notes/[slug]` URL and the same frontmatter contract.
MDX entries get a small `mdx` badge on the index.
- **Inline markdown helper** (`src/lib/markdown/inline.tsx`): parses
`**bold`**, ``code``, `[label](href)` into real React nodes — no
`dangerouslySetInnerHTML`. Used by hero intro, project
`description`/`tags[]`, and note `summary`.
- `**content.allowedLinkSchemes` site-config knob**: extend the inline
helper's URL allow list (defaults to `http`, `https`, `mailto`) without
forking theme code; opt into e.g. `tel:` or `sms:` from
`site.config.ts`.
- **Optional integrations** (`src/lib/integrations/`): GitHub stars (on
by default, graceful null fallback), Last.fm now-playing, Open-Meteo
weather. Every fetch fails closed to a placeholder.
- **Routes** (`src/app/`): `/`, `/about`, `/projects`,
`/notes` + `/notes/[slug]`, `/mdx-demo`, `/guide` (10-step tutorial
authored as MDX with inline `Tip`, `Step`, and `CopyDemo`
components; ships an "On this page" TOC and 10 stable section
anchors — `#clone-and-run`, `#site-config`, `#content`,
`#short-copy`, `#theme`, `#home-blocks`, `#blocks`, `#notes`,
`#integrations`, `#deploy` — for deep-linking from README, code,
and commit messages).
- **Engineering baseline**: `lint`, `typecheck`, `test`, `build` scripts;
CI runs all four; `vitest` suite of 63 tests covering config merge,
inline markdown (including XSS hardening), theme style rendering,
block registry, demo loader, and integrations.
- **Community files**: `README.md` with top-level TOC, `CONTRIBUTING.md`,
`CODE_OF_CONDUCT.md`, Issue/PR templates under `.github/`.

### Security

- **Inline markdown link sanitisation**: `renderButtercutInlineMarkdown`
only emits `<a href>` for http(s), mailto, and schemeless URLs by
default; `javascript:`, `data:`, `vbscript:`, and `file:` fall back to
raw markdown text.
- **Hard-deny scheme list**: even when `content.allowedLinkSchemes`
explicitly lists a known-exploitable scheme, a built-in set
(`javascript`, `data`, `vbscript`, `file`) always overrides.
- **Path-traversal guard for notes** (`src/app/notes/[slug]`): slug regex
  - `path.resolve` boundary check + `dynamicParams = false` prevent
  on-demand reads outside `content/demo/notes/`.

### License

- **GPL-3.0-or-later** — same licence as the reference site
[kaichen.dev](https://github.com/kaichen/kaichen.dev).

