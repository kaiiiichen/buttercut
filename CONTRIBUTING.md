# Contributing to Buttercut

Thanks for helping improve Buttercut. The deployed site at [buttercut.kaichen.dev](https://buttercut.kaichen.dev) documents the theme. Keep changes focused and documented.

## Before you open a PR

1. **Fork** and branch from `main`.
2. Run the full local check:

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

3. Update **[CHANGELOG.md](CHANGELOG.md)** under `[Unreleased]` for user-visible changes.
4. If you change `site.config.ts` fields, update **types**, **defaults**, **`merge-site-config.ts`**, and **README**.

## What belongs in a PR

- Bug fixes and regressions against the showcase site or theme building blocks.
- Clear improvements to config, blocks, showcase pages, or demo content loaders.
- Tests that lock in behaviour (inline markdown, config merge, block rendering).

## Project map

| Path | Role |
| ---- | ---- |
| `site.config.ts` | Author overrides merged with typed defaults. |
| `content/demo/` | Hero intro (`intro.md`) and page JSON schemas for forks. |
| `src/app/` | Showcase routes (`/design`, `/components`, `/sandbox`, `/get-started`) + `api/*`. |
| `src/blocks/` | Home sections registered in the block registry. |
| `src/components/showcase/` | Docs-site shells and interactive catalog highlights. |
| `src/lib/showcase/` | Static catalog and Get Started copy. |
| `src/custom/` | Optional `register.ts` for forks. |
| `src/lib/config/` | Types, defaults, merge helper. |
| `src/lib/markdown/inline.tsx` | Short-copy markdown for hero and cards. |

## Releases

Maintainers cut releases from `main`:

1. Move `[Unreleased]` notes into a dated section (for example `[0.5.0] — YYYY-MM-DD`) and reset `[Unreleased]` with a compare link to the new tag.
2. Tag on GitHub and publish release notes summarising breaking changes.

## Community

- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md) for vulnerability reports

Template users should follow [/get-started](https://buttercut.kaichen.dev/get-started): replace demo copy under `content/demo/`, edit `site.config.ts` (nav, `home.heroLayout`, `home.blocks`), add routes under `src/app/`, and point `site.siteUrl` at their deployment.
