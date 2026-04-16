---
title: Getting started with Buttercut
summary: A short walkthrough of configuring the theme and turning on integrations.
date: 2026-04-01
---

## Configure your site

Edit `site.config.ts` to change the title, navigation, socials, and block order. Defaults live in `src/lib/config/defaults.ts` and are merged with your overrides, so you only need to specify what differs.

## Swap demo content

`content/demo/` holds everything the home, about, and notes pages render by default:

- `intro.md` — hero copy
- `projects.json` — tagline + project list
- `about.md` — the `/about` page
- `notes/*.md` — notes listed on `/notes` and rendered at `/notes/[slug]`

## Turn on an integration

Every integration is **off** by default. To show Now Playing from Last.fm, for example:

1. Set `integrations.lastfm.enabled = true` and provide a `username` in `site.config.ts`.
2. Add `LASTFM_API_KEY` to `.env.local` (copy from `.env.example`).
3. Restart `npm run dev`.

If any requirement is missing the block renders a friendly placeholder instead of crashing the page.

## Customize a block

Blocks are registered by id in a registry (`src/lib/blocks/register-defaults.ts`). Drop in your own component and call `registerButtercutBlock("hero", MyHero)` — your version is used everywhere the id `hero` appears in `home.blocks`.
