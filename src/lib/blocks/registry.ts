import type { ComponentType } from "react";
import type { ButtercutSiteConfig } from "@/lib/config/types";
import type { ButtercutDemoContent } from "@/lib/demo/load-demo-content";

export type ButtercutBlockProps = {
  config: ButtercutSiteConfig;
  demo: ButtercutDemoContent;
};

export type ButtercutBlockComponent = ComponentType<ButtercutBlockProps>;

const registry = new Map<string, ButtercutBlockComponent>();

/**
 * Register (or override) a home block. Call this from `site.config.ts`
 * (or any module imported during startup) to replace a default block
 * or introduce a brand-new one referenced by `home.blocks`.
 */
export function registerButtercutBlock(
  id: string,
  component: ButtercutBlockComponent,
): void {
  registry.set(id, component);
}

export function getButtercutBlock(id: string): ButtercutBlockComponent | undefined {
  return registry.get(id);
}

export function listButtercutBlocks(): string[] {
  return Array.from(registry.keys());
}
