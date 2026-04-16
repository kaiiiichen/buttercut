import { mergeSiteConfig } from "./merge-site-config";
import type { ButtercutSiteConfig, ButtercutSiteConfigInput } from "./types";

export function createSiteConfig(
  input: ButtercutSiteConfigInput = {},
): ButtercutSiteConfig {
  return mergeSiteConfig(input);
}
