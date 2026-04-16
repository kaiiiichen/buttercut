import type { ButtercutSiteConfig } from "@/lib/config/types";

export type ButtercutIntegrationRuntimeStatus = {
  configuredInSiteConfig: boolean;
  hasRequiredEnv: boolean;
  /** Ready to call external APIs */
  active: boolean;
};

function hasEnv(key: string | undefined): boolean {
  return typeof key === "string" && key.trim().length > 0;
}

/**
 * Optional integrations: never throw; callers decide UI based on `active`.
 */
export function buttercutIntegrationStatus(
  site: ButtercutSiteConfig,
): Record<keyof ButtercutSiteConfig["integrations"], ButtercutIntegrationRuntimeStatus> {
  const lastfm = site.integrations.lastfm.enabled;
  const github = site.integrations.github.enabled;
  const supabase = site.integrations.supabase.enabled;
  const sentry = site.integrations.sentry.enabled;
  const weather = site.integrations.weather.enabled;

  return {
    lastfm: {
      configuredInSiteConfig: lastfm,
      hasRequiredEnv: hasEnv(process.env.LASTFM_API_KEY),
      active: lastfm && hasEnv(process.env.LASTFM_API_KEY),
    },
    github: {
      configuredInSiteConfig: github,
      hasRequiredEnv: hasEnv(process.env.GITHUB_TOKEN),
      active: github && hasEnv(process.env.GITHUB_TOKEN),
    },
    supabase: {
      configuredInSiteConfig: supabase,
      hasRequiredEnv:
        hasEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
        hasEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      active:
        supabase &&
        hasEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
        hasEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    },
    sentry: {
      configuredInSiteConfig: sentry,
      hasRequiredEnv: hasEnv(process.env.SENTRY_DSN) || hasEnv(process.env.NEXT_PUBLIC_SENTRY_DSN),
      active:
        sentry &&
        (hasEnv(process.env.SENTRY_DSN) || hasEnv(process.env.NEXT_PUBLIC_SENTRY_DSN)),
    },
    weather: {
      configuredInSiteConfig: weather,
      hasRequiredEnv: true,
      // Open-Meteo needs no key, but the route/widget is not wired yet — keep inactive until implemented.
      active: false,
    },
  };
}
