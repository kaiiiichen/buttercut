import { BUTTERCUT_DEFAULT_SITE_CONFIG } from "./defaults";
import type {
  ButtercutIntegrationKey,
  ButtercutSiteConfig,
  ButtercutSiteConfigInput,
} from "./types";

function mergeIntegrations(
  base: ButtercutSiteConfig["integrations"],
  input?: ButtercutSiteConfigInput["integrations"],
): ButtercutSiteConfig["integrations"] {
  const keys: ButtercutIntegrationKey[] = [
    "lastfm",
    "github",
    "supabase",
    "sentry",
    "weather",
  ];
  const out = { ...base };
  if (!input) return out;
  for (const k of keys) {
    const patch = input[k];
    if (!patch) continue;
    out[k] = { ...out[k], ...patch };
  }
  return out;
}

export function mergeSiteConfig(
  input: ButtercutSiteConfigInput,
): ButtercutSiteConfig {
  const defaults = BUTTERCUT_DEFAULT_SITE_CONFIG;
  return {
    site: { ...defaults.site, ...input.site },
    nav: input.nav ?? defaults.nav,
    socials: input.socials ?? defaults.socials,
    home: {
      blocks: input.home?.blocks ?? defaults.home.blocks,
    },
    brand: {
      ...defaults.brand,
      ...input.brand,
      og: {
        ...defaults.brand.og,
        ...input.brand?.og,
      },
    },
    integrations: mergeIntegrations(defaults.integrations, input.integrations),
  };
}
