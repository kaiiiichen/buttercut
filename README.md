# Buttercut

**Buttercut** is a configurable, theme-oriented [Next.js](https://nextjs.org/) (App Router) starter: one typed `site.config.ts`, demo content under `content/demo/`, and optional integrations that stay off until you configure them.

## Quick start

```bash
cd buttercut
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). **No API keys are required** to run the demo — every integration block is off by default and renders a graceful placeholder when disabled.

## Scripts

| Script      | Command        | Purpose              |
| ----------- | -------------- | -------------------- |
| `dev`       | `next dev`     | Local development    |
| `build`     | `next build`   | Production bundle    |
| `start`     | `next start`   | Serve built output   |
| `lint`      | `eslint .`     | Lint                 |
| `typecheck` | `tsc --noEmit` | Typecheck            |
| `test`      | `vitest run`   | Unit tests           |

CI runs: `lint` → `typecheck` → `test` → `build`.

## Project layout

| Path                     | Role                                              |
| ------------------------ | ------------------------------------------------- |
| `site.config.ts`         | Theme configuration (typed, with defaults)        |
| `mdx-components.tsx`     | Global MDX component overrides                    |
| `src/app`                | Next.js App Router — `/`, `/about`, `/projects`, `/notes[/:slug]`, `/mdx-demo` |
| `src/components`         | Shared UI (`ButtercutNav`, theme, prose, badges)  |
| `src/blocks`             | Home sections (`Buttercut*` components)           |
| `src/custom`             | User space for registrations & custom blocks      |
| `src/lib/blocks`         | Block **registry** — register / override blocks   |
| `src/lib/config`         | Defaults, merge helpers, types                    |
| `src/lib/integrations`   | GitHub / Last.fm / weather helpers                |
| `src/lib/demo`           | Loaders for `content/demo/`                       |
| `src/lib/markdown`       | `marked`-based renderer used by `/about` & `/notes` |
| `src/lib/theme`          | Runtime-safe brand token helpers                  |
| `content/demo`           | Demo copy: `intro.md`, `about.md`, `projects.json`, `notes/*.md` |
| `public`                 | Static assets                                     |

## Configuration

Edit **`site.config.ts`** for site metadata, navigation, social links, block order, brand assets, and integration toggles. Defaults live in `src/lib/config/defaults.ts`; `mergeSiteConfig` merges your overrides.

### Extending home blocks

Home blocks are keyed by string id and resolved from a registry. Built-in ids: `hero`, `demo_projects`, `integrations`, `now_playing`, `weather`.

Edit **`src/custom/register.ts`** (loaded automatically on startup) to override a default or add your own block without touching theme code:

```ts
import { registerButtercutBlock } from "@/lib/blocks/registry";
import { MyCustomHero } from "./blocks/MyCustomHero";

registerButtercutBlock("hero", MyCustomHero);        // replace default
registerButtercutBlock("changelog", ChangelogBlock); // new id for site.config.ts
```

Each block receives `{ config, demo }` props. Built-in `ButtercutHero` also accepts a `slots` prop (`avatar`, `title`, `tagline`, `body`, `socials`) to override individual parts without forking the component.

### Theming

Override any of Buttercut's CSS color tokens from `site.config.ts` — no CSS edits needed:

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

Values are sanitized before being written into a `<style>` tag — invalid or overlong entries are silently dropped.

#### Colour presets

Three hand-tuned moods ship with the theme. Spread one and override any token:

```ts
import { buttercutPreset } from "@/lib/theme/presets";

brand: {
  theme: { ...buttercutPreset("sunset"), accent: "#ff3366" },
}
```

| Preset     | Mood                                | Accent (light → dark) | Background (light → dark) |
| ---------- | ----------------------------------- | --------------------- | ------------------------- |
| `sunset`   | Warm, editorial, paper-white        | `#ff6f3c` → `#ffa07a` | `#fff7ee` → `#1c140e`     |
| `ocean`    | Cool blues, approachable corporate  | `#0b6ea4` → `#7dd3fc` | `#f2f7fb` → `#0b1e2b`     |
| `terminal` | Monochrome green-on-black, night-only | `#10b981` → `#6ee7b7` | `#0a0a0a` → `#0a0a0a`     |

### MDX

`.mdx` pages work under `src/app/` out of the box (see `/mdx-demo`). Every MDX document is wrapped in `ButtercutProse` via `mdx-components.tsx`, so typography matches the rest of the theme.

For long-form notes, `/notes` accepts both formats:

- drop a `.md` file in `content/demo/notes/` and it is picked up automatically;
- add a `.mdx` file next to it and register one line in `src/lib/demo/mdx-notes.ts`. Both kinds share the same frontmatter contract (`title`, `summary`, `date`) and the same `/notes/[slug]` URL shape. MDX entries are flagged with a small `mdx` badge on the index.

### Optional integrations

Each integration is **off by default**. Enable in `site.config.ts`, then add any required env vars from `.env.example`.

| Integration | Default | `site.config.ts` keys                                  | Env required                          |
| ----------- | ------- | ------------------------------------------------------ | ------------------------------------- |
| GitHub stars | **on** | `integrations.github.enabled`                         | Optional `GITHUB_TOKEN` (raises the 60 req/hr/IP limit) |
| Last.fm     | off     | `integrations.lastfm.enabled` + `username`             | `LASTFM_API_KEY`                      |
| Weather     | off     | `integrations.weather.enabled` + `lat`, `lon`, `label` | None (Open-Meteo, key-free)           |

All fetch helpers return `null` on any failure, so a misconfigured integration degrades to a placeholder instead of breaking the page.

### Content

Under `content/demo/`:

- `intro.md` — hero body (supports `**bold**`)
- `about.md` — `/about` page body
- `projects.json` — `{ tagline, projects[] }`. Each project may set `repo` for inline GitHub stars, and when `href` is omitted it auto-resolves to `https://github.com/<repo>`
- `notes/*.md` — each file becomes `/notes/<slug>` with optional frontmatter (`title`, `summary`, `date`)
- `notes/*.mdx` — same URL, same frontmatter, but authored as MDX and listed in `src/lib/demo/mdx-notes.ts`

`.md` notes render through [`marked`](https://marked.js.org/); `.mdx` notes are compiled by `@next/mdx` and rendered inside `ButtercutProse`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

[GPL-3.0-or-later](LICENSE). Same license as [kaichen.dev](https://github.com/kaichen/kaichen.dev).
