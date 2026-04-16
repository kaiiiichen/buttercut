import type { ButtercutSiteConfig } from "@/lib/config/types";

export type ButtercutIntegrationRuntimeStatus = {
  configuredInSiteConfig: boolean;
  hasRequiredEnv: boolean;
  active: boolean;
};

function hasValue(s: string | undefined): boolean {
  return typeof s === "string" && s.trim().length > 0;
}

/**
 * Compute whether each optional integration is ready to call external APIs.
 * Never throws; UI decides visuals based on `active`.
 */
export function buttercutIntegrationStatus(
  site: ButtercutSiteConfig,
): Record<keyof ButtercutSiteConfig["integrations"], ButtercutIntegrationRuntimeStatus> {
  const lastfm = site.integrations.lastfm;
  const github = site.integrations.github;
  const supabase = site.integrations.supabase.enabled;
  const sentry = site.integrations.sentry.enabled;
  const weather = site.integrations.weather;

  return {
    lastfm: {
      configuredInSiteConfig: lastfm.enabled,
      hasRequiredEnv: hasValue(process.env.LASTFM_API_KEY),
      active:
        lastfm.enabled && hasValue(process.env.LASTFM_API_KEY) && hasValue(lastfm.username),
    },
    github: {
      configuredInSiteConfig: github.enabled,
      hasRequiredEnv: hasValue(process.env.GITHUB_TOKEN),
      active: github.enabled, // public API works without token
    },
    supabase: {
      configuredInSiteConfig: supabase,
      hasRequiredEnv:
        hasValue(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
        hasValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      active:
        supabase &&
        hasValue(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
        hasValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    },
    sentry: {
      configuredInSiteConfig: sentry,
      hasRequiredEnv:
        hasValue(process.env.SENTRY_DSN) || hasValue(process.env.NEXT_PUBLIC_SENTRY_DSN),
      active:
        sentry &&
        (hasValue(process.env.SENTRY_DSN) ||
          hasValue(process.env.NEXT_PUBLIC_SENTRY_DSN)),
    },
    weather: {
      configuredInSiteConfig: weather.enabled,
      hasRequiredEnv: true, // Open-Meteo requires no key
      active:
        weather.enabled && weather.lat !== undefined && weather.lon !== undefined,
    },
  };
}
