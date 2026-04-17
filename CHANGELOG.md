# Changelog

All notable changes to **Buttercut** are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- **README tutorial links clickable on GitHub.** Every `_Tutorial:_`
  pointer now targets `src/app/guide/page.mdx` (a real file GitHub can
  navigate to) instead of `/guide#id`, which GitHub was resolving
  against its own origin and 404ing. The deployed-site fragment is
  preserved alongside in backticks (e.g. `/guide#content`), so the
  reverse-ref test still guards against typos and readers on a live
  deployment still see the exact URL.

### Changed

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

## [0.1.0] — 2026-04-16

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
  `**bold**`, `` `code` ``, `[label](href)` into real React nodes — no
  `dangerouslySetInnerHTML`. Used by hero intro, project
  `description`/`tags[]`, and note `summary`.
- **`content.allowedLinkSchemes` site-config knob**: extend the inline
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
  + `path.resolve` boundary check + `dynamicParams = false` prevent
  on-demand reads outside `content/demo/notes/`.

### License

- **GPL-3.0-or-later** — same licence as the reference site
  [kaichen.dev](https://github.com/kaichen/kaichen.dev).

[Unreleased]: https://github.com/kaiiiichen/buttercut/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/kaiiiichen/buttercut/releases/tag/v0.1.0
