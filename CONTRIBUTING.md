# Contributing to Buttercut

Thanks for helping improve Buttercut. This theme tracks [kaichen.dev](https://kaichen.dev) for core pages; keep changes focused and documented.

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

- Bug fixes and regressions against kaichen.dev parity.
- Clear improvements to config, blocks, or demo content loaders.
- Tests that lock in behaviour (inline markdown, config merge, block rendering).

## Project map

| Path | Role |
| ---- | ---- |
| `site.config.ts` | Author overrides merged with typed defaults. |
| `content/demo/` | Hero intro, about JSON, projects JSON. |
| `src/blocks/` | Home sections registered in the block registry. |
| `src/custom/` | Optional `register.ts` for forks. |
| `src/lib/config/` | Types, defaults, merge helper. |
| `src/lib/markdown/inline.tsx` | Short-copy markdown for hero and cards. |

## Releases

Maintainers cut releases from `main`:

1. Move `[Unreleased]` notes into a dated section (for example `[0.3.0] — YYYY-MM-DD`) and reset `[Unreleased]` with a compare link to the new tag.
2. Tag on GitHub and publish release notes summarising breaking changes.

## Community

- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md) for vulnerability reports

Template users should replace demo copy under `content/demo/`, edit `site.config.ts`, and point `site.siteUrl` at their deployment.
