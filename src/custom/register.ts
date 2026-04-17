/**
 * Buttercut custom registrations.
 *
 * `applyButtercutCustom` runs once at startup, **after** the built-in
 * blocks are registered, so anything you register here overrides a
 * default with the same id.
 *
 * ## Pattern 1 — override an existing block
 *
 * ```ts
 * import { registerButtercutBlock } from "@/lib/blocks/registry";
 * import { MyHero } from "./blocks/MyHero";
 *
 * export function applyButtercutCustom(): void {
 *   registerButtercutBlock("hero", MyHero);
 * }
 * ```
 *
 * ## Pattern 2 — add a brand-new block
 *
 * Register a new id, then reference it from `site.config.ts`'s
 * `home.blocks` array:
 *
 * ```ts
 * registerButtercutBlock("changelog", ChangelogBlock);
 * ```
 *
 * Leave this file as a no-op when you don't need anything custom —
 * the export must still exist so the theme type-checks.
 */

// Imports stay out of the commented-out demo so both TypeScript and
// the bundler tree-shake cleanly when the demo is off. Move them
// above `applyButtercutCustom` and uncomment the `registerButtercutBlock`
// line below to see `MyHero` replace the built-in hero.
// import { registerButtercutBlock } from "@/lib/blocks/registry";
// import { MyHero } from "./blocks/MyHero";

export function applyButtercutCustom(): void {
  // --- demo override (uncomment to enable) ----------------------------
  // registerButtercutBlock("hero", MyHero);
  // --------------------------------------------------------------------
}
