import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import type { ButtercutSiteConfig } from "@/lib/config/types";
import { buttercutIntegrationStatus } from "@/lib/integrations/integration-env";

const LABELS: Record<keyof ButtercutSiteConfig["integrations"], string> = {
  lastfm: "Last.fm",
  github: "GitHub API",
  supabase: "Supabase",
  sentry: "Sentry",
  weather: "Weather",
};

function statusLabel(s: {
  configuredInSiteConfig: boolean;
  active: boolean;
}): string {
  if (!s.configuredInSiteConfig) return "disabled";
  if (!s.active) return "needs env";
  return "ready";
}

export function ButtercutIntegrationsPanel({ config }: ButtercutBlockProps) {
  const status = buttercutIntegrationStatus(config);
  const entries = Object.entries(status) as Array<
    [keyof typeof LABELS, (typeof status)["lastfm"]]
  >;

  return (
    <section className="mag-card">
      <div className="mag-label">Integrations (optional)</div>
      <p className="ui-body-lg mb-4">
        Turn features on in{" "}
        <code className="ui-code-inline rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">
          site.config.ts
        </code>{" "}
        and add environment variables when you are ready. With everything off, the site still
        builds and runs.
      </p>
      <ul className="space-y-3">
        {entries.map(([key, s]) => (
          <li
            key={key}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
          >
            <span className="ui-heading font-medium">{LABELS[key]}</span>
            <span className="ui-meta text-[11px] uppercase tracking-wider">
              {statusLabel(s)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
