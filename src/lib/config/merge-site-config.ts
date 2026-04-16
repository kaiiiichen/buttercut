import { BUTTERCUT_DEFAULT_SITE_CONFIG } from "./defaults";
import type {
  ButtercutIntegrationKey,
  ButtercutIntegrationsConfig,
  ButtercutSiteConfig,
  ButtercutSiteConfigInput,
} from "./types";

function mergeIntegrations(
  base: ButtercutIntegrationsConfig,
  input?: ButtercutSiteConfigInput["integrations"],
): ButtercutIntegrationsConfig {
  const keys: ButtercutIntegrationKey[] = [
    "github",
    "lastfm",
    "supabase",
    "sentry",
    "weather",
  ];
  const out: ButtercutIntegrationsConfig = {
    github: { ...base.github },
    lastfm: { ...base.lastfm },
    supabase: { ...base.supabase },
    sentry: { ...base.sentry },
    weather: { ...base.weather },
  };
  if (!input) return out;
  for (const k of keys) {
    const patch = input[k];
    if (!patch) continue;
    // `as` is required because the union member types differ per key.
    (out[k] as Record<string, unknown>) = {
      ...(out[k] as Record<string, unknown>),
      ...(patch as Record<string, unknown>),
    };
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
