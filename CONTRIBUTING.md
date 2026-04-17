# Contributing to Buttercut

Thanks for your interest in improving Buttercut.

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before opening an issue or pull request.

## Prerequisites

- **Node.js 20** (aligned with CI)
- **npm** (this repo uses `package-lock.json`; prefer `npm ci` in CI-like runs)

## Local setup

```bash
cd buttercut
npm install
```

Copy `.env.example` to `.env.local` when you begin enabling optional integrations. You do **not** need API keys to run the app locally for the default demo.

Do not commit `.env.local`, tokens, or secrets.

## Commands (same as CI)

Before opening a PR, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:smoke   # asserts /guide anchor ids exist in the built HTML
```

The smoke suite auto-skips when no build artifact is present, so the
pre-build `npm run test` step stays green on a fresh checkout.

## Documentation loop

Buttercut keeps three layers of docs in sync on purpose:

1. **Source of truth** — TypeScript types, JSDoc, and code comments
   (e.g. `src/lib/config/types.ts`, `src/lib/markdown/inline.tsx`).
2. **Reference** — [`README.md`](README.md), organised by feature area
   with a top-level TOC.
3. **Tutorial** — [`/guide`](src/app/guide/page.mdx), a 10-step MDX
   walkthrough with stable section anchors (`#clone-and-run`,
   `#site-config`, `#content`, `#short-copy`, `#theme`, `#home-blocks`,
   `#blocks`, `#notes`, `#integrations`, `#deploy`).

If your change touches any of the surfaces below, please update all
three layers in the **same PR**:

- **New `site.config.ts` field** → add/extend the type in
  `src/lib/config/types.ts` (with JSDoc and an `@see` to the relevant
  `/guide#<id>` step), wire defaults in `src/lib/config/defaults.ts`
  and `merge-site-config.ts`, document it in the matching `README.md`
  section, and show a worked example in the corresponding
  `/guide` Step.
- **New or renamed built-in block** → update `src/lib/blocks/register-defaults.ts`,
  mention the id in `README.md` → "Home blocks" and in
  `/guide#home-blocks` / `#blocks`.
- **Inline markdown behaviour** (`src/lib/markdown/inline.tsx`) →
  extend the Vitest suite in `inline.test.tsx`, refresh the
  `README.md` "Inline markdown subset" section, and adjust the live
  examples in `/guide#short-copy`.
- **New `/guide` step** → append an entry to `BUTTERCUT_GUIDE_ANCHORS`
  in `src/lib/guide/anchors.ts` (`id`, `title`, `stepNumber` — the
  single source of truth), drop `<Step {...anchorFor("id")}>` into
  `src/app/guide/page.mdx`, and log the addition under "Changed" in
  `CHANGELOG.md`. The TOC, permalink, smoke test, and reverse-ref
  test all pick up the new id automatically from that one edit.
- **User-visible integration** → update `.env.example`, the README
  "Optional integrations" section, and `/guide#integrations`.

When in doubt, grep for the existing id you're touching — if it shows
up in code, README, and `page.mdx`, you probably have three edits to
make, not one.

## Pull requests

- Keep changes focused and easy to review.
- Update `.env.example` / `README.md` when optional env vars or user-facing behavior changes.
- If you add a feature behind `site.config.ts`, include sensible defaults so zero-key builds keep working.
- If your change renames or removes a `/guide` anchor, update
  `BUTTERCUT_GUIDE_ANCHORS` in `src/lib/guide/anchors.ts` **and**
  every `README.md` / JSDoc reference — the anchors-refs test
  (`src/lib/guide/anchors-refs.test.ts`) catches stale ids in `npm
  test`, and the smoke step catches missing ids post-build.
- Note user-facing changes in `CHANGELOG.md` under `[Unreleased]`
  following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
