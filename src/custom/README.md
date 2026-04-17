# `src/custom/`

Drop your own components, helpers, and registrations here. Buttercut
imports `applyButtercutCustom` from `src/custom/register.ts` exactly
once, **after** the built-in blocks are registered, so anything you add
there overrides a default with the same id.

Typical uses:

- replace a built-in block: `registerButtercutBlock("hero", MyHero)`;
- add a brand-new block referenced by id in `site.config.ts`'s
  `home.blocks`;
- initialise local helpers you need at boot time.

`src/custom/` is intentionally outside the theme's refactor surface — it
is meant to survive Buttercut updates without merge conflicts.
