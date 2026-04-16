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
```

## Pull requests

- Keep changes focused and easy to review.
- Update `.env.example` / `README.md` when optional env vars or user-facing behavior changes.
- If you add a feature behind `site.config.ts`, include sensible defaults so zero-key builds keep working.
