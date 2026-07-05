# Buttercut

## Deploy

Import [this GitHub repository](https://github.com/kaiiiichen/buttercut) into Vercel and go live without cloning locally first — you can wire env and domains in the Vercel dashboard after import.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkaiiiichen%2Fbuttercut)

---

[![CI](https://img.shields.io/github/actions/workflow/status/kaiiiichen/buttercut/ci.yml?branch=main&logo=github&label=CI)](https://github.com/kaiiiichen/buttercut/actions/workflows/ci.yml)
[![tests](https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![lint](https://img.shields.io/badge/lint-ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/node.js-20.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)

[![license](https://img.shields.io/badge/license-GPL%203.0-007ec6?logo=gnu&logoColor=white)](./LICENSE)
[![Dependabot](https://img.shields.io/badge/Dependabot-enabled-025E8C?logo=dependabot&logoColor=white)](https://github.com/kaiiiichen/buttercut/network/updates)
[![site](https://img.shields.io/badge/site-buttercut.kaichen.dev-D4A574?logo=googlechrome&logoColor=white)](https://buttercut.kaichen.dev)

**Buttercut** is a production-oriented personal-site theme distilled from [kaichen.dev](https://kaichen.dev). It ships the same editorial shell — Nunito UI, magazine cards, accent navigation, home status widgets — with **placeholder content** you replace through config and `content/demo/`.

Built on **Next.js 16** (App Router, React 19). One typed **`site.config.ts`** drives navigation, brand, home sections, and optional integrations. Copy lives under **`content/demo/`** as Markdown and JSON. The default demo needs no API keys; optional GitHub, weather, and Spotify routes **fail open** with empty or synthetic placeholders.

---

## Contents

- [Deploy](#deploy)
- [Why Buttercut](#why-buttercut)
- [What's included](#whats-included)
- [Live demo and stack](#live-demo-and-stack)
- [Quick start](#quick-start)
- [Philosophy](#philosophy)
- [Project layout](#project-layout)
- [Configuration](#configuration)
- [Documentation map](#documentation-map)
- [Scripts and CI](#scripts-and-ci)
- [Forking and deployment](#forking-and-deployment)
- [Changelog](#changelog)
- [Contributing and security](#contributing-and-security)
- [License](#license)

---

## Why Buttercut

- **Same design language as kaichen.dev.** Layout rhythm (`max-w-[1180px]`, `mag-card`, nav underline states, home hero grid, Listening / Location / Projects rows) is inherited 1:1; only the copy is generic.
- **Runs on first clone.** `npm install` and `npm run dev` show the full experience. Integrations render gentle placeholders until you add credentials.
- **Configuration you can trust.** `createSiteConfig` merges your `site.config.ts` with typed defaults — override only what differs.
- **Copy where writers expect it.** Hero body, projects, and about sections sit under `content/demo/`.
- **Same nav as kaichen.dev.** Core routes: `About`, `Projects`, `Misc` — no extra theme-only pages.
- **GPL-3.0-or-later.** Fork, adapt, ship; share improvements if you redistribute.

---

## What's included

| Area | What you get |
| ---- | -------------- |
| **Home** | Hero (avatar + socials + JumpText + intro), Listening card, Location card, Projects list — reorderable via `home.blocks`. |
| **About** | Education, Experience, Volunteering, Focus cards from `content/demo/about.json`. |
| **Projects** | Card grid + GitHub Activity heatmap (`/projects`). |
| **Misc** | Watching, Remembrance, Things I Love (inset cards), Resources — from `content/demo/misc.json`. |
| **Theme** | CSS variables + optional `brand.theme` overrides; light default. |
| **Integrations** | GitHub pins & activity (`GITHUB_TOKEN`), Open-Meteo weather, Spotify API stubs for Listening UI. |

---

## Live demo and stack

- **See it live:** [buttercut.kaichen.dev](https://buttercut.kaichen.dev)
- **Reference site:** [kaichen.dev](https://kaichen.dev) — the visual source of truth for core pages.
- **Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, Vitest.

---

## Quick start

```bash
git clone https://github.com/kaiiiichen/buttercut.git
cd buttercut
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No `.env` file is required for the default demo. Edit `content/demo/intro.md` for the hero blurb and `site.config.ts` for site metadata.

---

## Philosophy

1. **Simple changes stay in config.** Title, nav, socials, block order, and theme tokens belong in `site.config.ts` and `content/demo/`.
2. **Deep changes have a hook.** Register or replace blocks in `src/custom/register.ts`.
3. **Integrations are optional.** Missing keys show placeholders — the deployment still renders.
4. **Trusted author content.** Inline markdown is for your repo copy, not arbitrary user input.

---

## Project layout

| Path | Role |
| ---- | ---- |
| `site.config.ts` | Site metadata, nav, socials, `home.blocks`, `brand`, `integrations`. |
| `content/demo/` | `intro.md`, `about.json`, `projects.json`, `course-projects.json`, `misc.json`. |
| `src/app/` | Routes: `/`, `/about`, `/projects`, `/misc`, `api/*`. |
| `src/blocks/` | Home sections (`ButtercutHero`, `ButtercutStatusRow`, `ButtercutDemoProjects`). |
| `src/components/` | Shared UI ported from kaichen.dev (nav, listening, weather, pinned projects, …). |
| `src/custom/` | Your `register.ts` and optional block overrides. |
| `src/lib/config/` | Types, defaults, `mergeSiteConfig`. |
| `src/lib/integrations/` | GitHub pins, weather, Last.fm helpers. |
| `src/lib/demo/` | Demo content loaders. |
| `src/lib/markdown/inline.tsx` | Short-copy markdown (`**`, `` ` ``, links). |
| `public/` | Avatar placeholder, OG default SVG. |

---

## Configuration

Edit `site.config.ts` at the repo root. Only fields you set override the typed defaults from `createSiteConfig`.

### Identity

```ts
export const siteConfig = createSiteConfig({
  site: {
    title: "Your Name",
    description: "One-line tagline",
    siteUrl: "https://example.com",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Misc", href: "/misc" },
  ],
  socials: [
    { id: "email", label: "Email", href: "mailto:you@example.com" },
    { id: "signal", label: "Signal", href: "https://signal.me" },
    { id: "github", label: "GitHub", href: "https://github.com/you" },
  ],
  brand: {
    showGwwcBadge: false, // set true to show the optional pledge badge
    avatar: "/avatar-placeholder.svg",
  },
});
```

### Home content (`content/demo/`)

| File | Fields |
| ---- | ------ |
| `intro.md` | Hero body paragraphs (blank-line separated). |
| `projects.json` | `greeting`, `subtitles[]`, `tagline`, `projects[]`. |
| `course-projects.json` | `projects[]` — course portfolio cards (home + `/projects`). |
| `about.json` | `intro`, `education`, `experience`, `volunteering`, `focus`. |
| `misc.json` | `watching`, `remembrance`, `thingGroups`, `resources`. |

### Home blocks

```ts
home: {
  blocks: [
    { id: "hero", enabled: true },
    { id: "status", enabled: true },      // Listening + Location
    { id: "demo_projects", enabled: true },
  ],
},
```

Built-in ids: `hero`, `status`, `now_playing`, `weather`, `demo_projects`, `integrations`.

### Integrations

| Integration | Env | Config | Behaviour |
| ----------- | --- | ------ | --------- |
| GitHub pins & activity | `GITHUB_TOKEN`, `GITHUB_LOGIN` | `integrations.github.login` | Mirrors profile pins when token set; else `projects.json` |
| Weather | — | `integrations.weather` (`lat`, `lon`, `label`, `timezone`) | Open-Meteo via `/api/weather` |
| Spotify Listening UI | Wire your OAuth in `api/spotify/*` | — | Stubs return empty; UI matches kaichen.dev |
| Last.fm | `LASTFM_API_KEY` | `integrations.lastfm` | Legacy server fetch (optional) |

Copy `.env.example` to `.env.local` when enabling integrations.

### Inline markdown

Used in hero intro and card summaries — `**bold**`, `` `code` ``, `[label](url)` with zinc/bronze link styling matching kaichen.dev. See [`src/lib/markdown/inline.tsx`](src/lib/markdown/inline.tsx).

---

## Documentation map

| Layer | Where |
| ----- | ----- |
| **Reference** | This README + [CHANGELOG.md](CHANGELOG.md). |
| **API detail** | JSDoc on `src/lib/config/types.ts` and integration helpers. |

---

## Scripts and CI

| Script | Command |
| ------ | ------- |
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint .` |
| `typecheck` | `tsc --noEmit` |
| `test` | `vitest run` |

CI: `lint` → `typecheck` → `test` → `build`.

---

## Forking and deployment

1. Replace demo copy in `content/demo/`.
2. Set `site.siteUrl` to your production URL.
3. Add `GITHUB_TOKEN` + `GITHUB_LOGIN` to mirror pinned repos and live contribution graph.
4. Enable weather coordinates for a live Location card.
5. Deploy on Vercel (one-click import above) or any Node host.

---

## Changelog

[CHANGELOG.md](CHANGELOG.md) — current package version **0.4.0** (kaichen.dev parity refresh: TOC, split projects, misc/resources, grouped about).

---

## Contributing and security

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)

---

## License

[GPL-3.0-or-later](LICENSE). Same license family as [kaichen.dev](https://github.com/kaiiiichen/kaichen.dev).
