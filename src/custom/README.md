# `src/custom/`

Drop your own components and registrations here. Anything imported from
`src/custom/register.ts` is loaded once at startup, so it is the right
place to:

- replace a built-in block via `registerButtercutBlock("hero", MyHero)`;
- add brand-new blocks that you then reference from `site.config.ts`'s
  `home.blocks` by matching id;
- initialise local helpers you need at boot time.

`src/custom/` is **not** touched by the theme's own refactors — you can
keep this folder across Buttercut updates.
