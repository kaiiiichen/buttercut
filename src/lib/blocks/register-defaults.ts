import { ButtercutDemoProjects } from "@/blocks/ButtercutDemoProjects";
import { ButtercutHero } from "@/blocks/ButtercutHero";
import { ButtercutIntegrationsPanel } from "@/blocks/ButtercutIntegrationsPanel";
import { ButtercutNowPlayingBlock } from "@/blocks/ButtercutNowPlayingBlock";
import { ButtercutWeatherBlock } from "@/blocks/ButtercutWeatherBlock";
import { registerButtercutBlock } from "./registry";

let registered = false;

/**
 * Registers the built-in blocks, then pulls user registrations from
 * `src/custom/register.ts` so overrides always win over defaults.
 *
 * Idempotent — safe to call from multiple entry points.
 */
export function registerButtercutDefaultBlocks(): void {
  if (registered) return;
  registered = true;

  registerButtercutBlock("hero", ButtercutHero);
  registerButtercutBlock("demo_projects", ButtercutDemoProjects);
  registerButtercutBlock("integrations", ButtercutIntegrationsPanel);
  registerButtercutBlock("now_playing", ButtercutNowPlayingBlock);
  registerButtercutBlock("weather", ButtercutWeatherBlock);

  // Side-effect import — user registrations run after defaults so they
  // can override built-ins with the same id.
  void import("@/custom/register");
}
