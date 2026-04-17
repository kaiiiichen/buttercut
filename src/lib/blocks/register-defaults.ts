import { ButtercutDemoProjects } from "@/blocks/ButtercutDemoProjects";
import { ButtercutHero } from "@/blocks/ButtercutHero";
import { ButtercutIntegrationsPanel } from "@/blocks/ButtercutIntegrationsPanel";
import { ButtercutNowPlayingBlock } from "@/blocks/ButtercutNowPlayingBlock";
import { ButtercutWeatherBlock } from "@/blocks/ButtercutWeatherBlock";
import { applyButtercutCustom } from "@/custom/register";
import { registerButtercutBlock } from "./registry";

let registered = false;

/**
 * Registers the built-in blocks, then runs user registrations from
 * `src/custom/register.ts#applyButtercutCustom` so overrides always
 * take precedence over the same id emitted by the theme.
 *
 * Synchronous and idempotent — safe to call from every entry point.
 */
export function registerButtercutDefaultBlocks(): void {
  if (registered) return;
  registered = true;

  registerButtercutBlock("hero", ButtercutHero);
  registerButtercutBlock("demo_projects", ButtercutDemoProjects);
  registerButtercutBlock("integrations", ButtercutIntegrationsPanel);
  registerButtercutBlock("now_playing", ButtercutNowPlayingBlock);
  registerButtercutBlock("weather", ButtercutWeatherBlock);

  applyButtercutCustom();
}
