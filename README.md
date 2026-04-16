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
| `src/app`                | Next.js App Router — `/`, `/about`, `/projects`, `/notes[/:slug]` |
| `src/components`         | Shared UI (`ButtercutNav`, theme, prose, badges)  |
| `src/blocks`             | Home sections (`Buttercut*` components)           |
| `src/lib/blocks`         | Block **registry** — register / override blocks   |
| `src/lib/config`         | Defaults, merge helpers, types                    |
| `src/lib/integrations`   | GitHub / Last.fm / weather helpers                |
| `src/lib/demo`           | Loaders for `content/demo/`                       |
| `src/lib/markdown`       | `marked`-based renderer used by `/about` & `/notes` |
| `content/demo`           | Demo copy: `intro.md`, `about.md`, `projects.json`, `notes/*.md` |
| `public`                 | Static assets                                     |

## Configuration

Edit **`site.config.ts`** for site metadata, navigation, social links, block order, brand assets, and integration toggles. Defaults live in `src/lib/config/defaults.ts`; `mergeSiteConfig` merges your overrides.

### Extending home blocks

Home blocks are keyed by string id and resolved from a registry. Built-in ids: `hero`, `demo_projects`, `integrations`, `now_playing`, `weather`.

Swap a default or add your own by calling `registerButtercutBlock(id, component)` before the home page renders — a convenient place is `src/lib/blocks/register-defaults.ts` (or import your custom registration from there):

```ts
import { registerButtercutBlock } from "@/lib/blocks/registry";
import { MyCustomHero } from "@/custom/MyCustomHero";

registerButtercutBlock("hero", MyCustomHero);
```

Each block receives `{ config, demo }` props. Built-in `ButtercutHero` also accepts a `slots` prop (`avatar`, `title`, `tagline`, `body`, `socials`) to override individual parts without forking the component.

### Optional integrations

Each integration is **off by default**. Enable in `site.config.ts`, then add any required env vars from `.env.example`.

| Integration | `site.config.ts` keys                                  | Env required                          |
| ----------- | ------------------------------------------------------ | ------------------------------------- |
| GitHub stars | `integrations.github.enabled`                         | Optional `GITHUB_TOKEN` (raises limit) |
| Last.fm     | `integrations.lastfm.enabled` + `username`             | `LASTFM_API_KEY`                      |
| Weather     | `integrations.weather.enabled` + `lat`, `lon`, `label` | None (Open-Meteo, key-free)           |

All fetch helpers return `null` on any failure, so a misconfigured integration degrades to a placeholder instead of breaking the page.

### Content

Under `content/demo/`:

- `intro.md` — hero body (supports `**bold**`)
- `about.md` — `/about` page body
- `projects.json` — `{ tagline, projects[] }` where each project may set `repo` for inline GitHub stars
- `notes/*.md` — each file becomes `/notes/<slug>` with optional frontmatter (`title`, `summary`, `date`)

Notes are rendered with [`marked`](https://marked.js.org/). MDX is an intended follow-up once Turbopack's MDX story stabilizes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

Add a license file when you publish this repository publicly.
