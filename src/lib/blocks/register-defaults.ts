import { ButtercutDemoProjects } from "@/blocks/ButtercutDemoProjects";
import { ButtercutHero } from "@/blocks/ButtercutHero";
import { ButtercutIntegrationsPanel } from "@/blocks/ButtercutIntegrationsPanel";
import { ButtercutNowPlayingBlock } from "@/blocks/ButtercutNowPlayingBlock";
import { ButtercutWeatherBlock } from "@/blocks/ButtercutWeatherBlock";
import { registerButtercutBlock } from "./registry";

let registered = false;

/**
 * Registers the built-in blocks. Idempotent and safe to call multiple times.
 * Invoked once from the root layout.
 */
export function registerButtercutDefaultBlocks(): void {
  if (registered) return;
  registered = true;
  registerButtercutBlock("hero", ButtercutHero);
  registerButtercutBlock("demo_projects", ButtercutDemoProjects);
  registerButtercutBlock("integrations", ButtercutIntegrationsPanel);
  registerButtercutBlock("now_playing", ButtercutNowPlayingBlock);
  registerButtercutBlock("weather", ButtercutWeatherBlock);
}
