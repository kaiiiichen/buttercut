# Buttercut

**Buttercut** is a configurable, theme-oriented [Next.js](https://nextjs.org/) (App Router) starter: one typed `site.config.ts`, demo content under `content/demo/`, and optional integrations that stay off until you configure them.

## Quick start

```bash
cd buttercut
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API keys are required for local preview.

## Scripts

| Script       | Command        | Purpose              |
| ------------ | -------------- | -------------------- |
| `dev`        | `next dev`     | Local development    |
| `build`      | `next build`   | Production bundle    |
| `start`      | `next start`   | Serve built output   |
| `lint`       | `eslint .`     | Lint                 |
| `typecheck`  | `tsc --noEmit` | Typecheck            |
| `test`       | `vitest run`   | Unit tests           |

CI runs: `lint` → `typecheck` → `test` → `build`.

## Project layout

| Path                 | Role                                      |
| -------------------- | ----------------------------------------- |
| `site.config.ts`     | Theme configuration (typed, with defaults) |
| `src/app`            | Next.js App Router                        |
| `src/components`     | Shared UI                                 |
| `src/blocks`         | Home sections (`Buttercut*` components)   |
| `src/lib/config`     | Defaults, merge helpers, types            |
| `src/lib/integrations` | Optional integration helpers            |
| `src/lib/demo`       | Loaders for `content/demo`                |
| `content/demo`       | Demo copy and structured JSON             |
| `public`             | Static assets                             |

## Configuration

Edit **`site.config.ts`** for site metadata, navigation, social links, home block order, brand assets, and integration toggles. Defaults live in `src/lib/config/defaults.ts`.

Demo home content is loaded from **`content/demo/`** (`intro.md` + `projects.json`).

## Optional environment variables

See **`.env.example`**. Integrations are designed to be **off by default**; enable them in `site.config.ts` first, then add keys as you wire features.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

Add a license file when you publish this repository publicly.
