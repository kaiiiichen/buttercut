# Contributing to Buttercut

Thank you for helping improve Buttercut. This document tells you how to set up your machine, match what CI expects, and land changes that stay consistent with how the theme documents itself.

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before you open an issue or pull request. For security-sensitive reports, use [SECURITY.md](SECURITY.md).

---

## Who this is for

We welcome:

- **Bug reports** with a minimal reproduction (repo branch or clear steps).
- **Documentation fixes**—typos, broken anchors, unclear Guide steps.
- **Small, focused features** that fit the theme’s goals: maintainable config, optional integrations, editorial quality, zero-key defaults.
- **Tests** that lock in behaviour (inline markdown, config merge, guide anchors).

Large UI rewrites or new integrations are easier to review when discussed in an issue first.

---

## Prerequisites

- **Node.js 20** (same major version as [CI](.github/workflows/ci.yml))
- **npm** — this repository ships `package-lock.json`; use `npm ci` when you want deterministic installs (CI uses `npm ci`)

---

## Local setup

```bash
git clone https://github.com/kaiiiichen/buttercut.git
cd buttercut
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when you work on **optional integrations** (GitHub token, Last.fm, etc.). You do **not** need any API keys to run the default demo, run tests, or produce a production build.

Never commit `.env.local`, tokens, or secrets.

---

## Commands you must run before a PR

These mirror CI. Run them in order on a clean tree:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:smoke
```

- **`test:smoke`** reads the built `/guide` HTML and asserts every id in `BUTTERCUT_GUIDE_ANCHORS` appears in the output. It needs a successful `build` first.
- If `lint` or `typecheck` fails, fix those before spending time on narrative docs—CI will block the merge.

---

## Architecture at a glance

Understanding these pieces makes reviews faster:

| Piece | Role |
| ----- | ---- |
| `site.config.ts` + `src/lib/config/*` | Typed config, defaults, merge. |
| `content/demo/*` | Demo copy; safe to replace entirely for your fork. |
| `src/lib/blocks/registry.ts` | String id → React component for home sections. |
| `src/lib/blocks/register-defaults.ts` | Registers built-in blocks; calls `applyButtercutCustom()` from `src/custom/register.ts`. |
| `src/lib/demo/mdx-notes.ts` | Literal dynamic imports for each `.mdx` note—required because bundlers cannot infer `import(\`./${slug}.mdx\`)`. |
| `src/lib/markdown/inline.tsx` | Short-copy markdown (**bold**, `` `code` ``, links) with an explicit URL allow list. |
| `src/lib/guide/anchors.ts` | Single source of truth for which `#…` anchor ids exist on `/guide`. |
| `mdx-components.tsx` | Global MDX components (`ButtercutProse`, heading ids, `TableOfContents`). |

---

## The documentation loop (please follow it)

Buttercut deliberately keeps three layers aligned:

1. **Source of truth** — TypeScript types and JSDoc (`src/lib/config/types.ts`, integration helpers, `inline.tsx`).
2. **Reference** — This README and [CHANGELOG.md](CHANGELOG.md).
3. **Tutorial** — [`src/app/guide/page.mdx`](src/app/guide/page.mdx) at `/guide`, with stable anchors listed in `src/lib/guide/anchors.ts`.

If your change touches user-visible behaviour, plan updates in **all** relevant layers in the **same PR** unless the change is purely internal with no observable effect.

### Checklist by change type

| Change | Update |
| ------ | ------ |
| New or renamed `site.config.ts` field | Types + defaults + `merge-site-config.ts` + README + matching Guide step + JSDoc `@see` to `/guide#…` |
| New built-in block id | `register-defaults.ts` + README home-blocks section + Guide `#home-blocks` / `#blocks` |
| Inline markdown behaviour | `inline.test.tsx` + README “Inline markdown” + Guide `#short-copy` |
| New Guide step | New entry in `BUTTERCUT_GUIDE_ANCHORS` + `<Step {...anchorFor("id")}>` in `page.mdx` + [Unreleased] in CHANGELOG |
| Integration env or behaviour | `.env.example` + README integrations table + Guide `#integrations` |

The **anchors reference test** (`src/lib/guide/anchors-refs.test.ts`) scans the repo for `/guide#<id>` strings and fails if an id is not in `anchors.ts`. Use it as a safety net—grep for your anchor when you rename or remove one.

---

## Pull requests

- One logical change per PR when possible; stack follow-ups separately.
- **User-facing changes** belong in `CHANGELOG.md` under `[Unreleased]` ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/)).
- **New config knobs** must ship with defaults that keep **zero-key** `npm run build` green.
- If you rename or remove a `/guide` anchor, update **every** README, JSDoc, and changelog reference—the anchors-refs test helps, but human-readable text can still mention old names in prose.

---

## Questions

Open an issue if you are unsure whether an idea fits the project. Describe your goal and, for bugs, include reproduction steps or a minimal branch. That gets the fastest, most actionable replies.

Thank you for contributing.
