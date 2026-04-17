/**
 * Buttercut custom registrations.
 *
 * `applyButtercutCustom` runs once at startup, **after** the built-in
 * blocks are registered, so anything you register here overrides a
 * default with the same id.
 *
 * Example:
 *
 * ```ts
 * import { registerButtercutBlock } from "@/lib/blocks/registry";
 * import { MyHero } from "./blocks/MyHero";
 *
 * export function applyButtercutCustom(): void {
 *   registerButtercutBlock("hero", MyHero);          // override default
 *   registerButtercutBlock("changelog", ChangelogBlock); // brand-new id
 * }
 * ```
 *
 * Leave this as a no-op when you don't need anything custom. Keeping the
 * export means the theme still type-checks.
 */
export function applyButtercutCustom(): void {
  // Add `registerButtercutBlock(...)` calls here.
}
