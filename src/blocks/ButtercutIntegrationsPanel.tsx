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

export function ButtercutIntegrationsPanel({ config }: ButtercutBlockProps) {
  const status = buttercutIntegrationStatus(config);
  const entries = Object.entries(status) as Array<
    [keyof typeof LABELS, (typeof status)["lastfm"]]
  >;

  return (
    <section className="mag-card">
      <div className="mag-label">Integrations (optional)</div>
      <p className="mb-4 font-serif text-sm text-zinc-600 dark:text-zinc-400">
        Turn features on in{" "}
        <code className="rounded bg-zinc-100 px-1 py-0.5 font-jetbrains-mono text-xs dark:bg-zinc-800">
          site.config.ts
        </code>{" "}
        and add environment variables when you are ready. With everything off, the site still builds and runs.
      </p>
      <ul className="space-y-2 text-sm">
        {entries.map(([key, s]) => (
          <li
            key={key}
            className="flex flex-wrap items-center justify-between gap-2 rounded-sm border border-zinc-200 px-3 py-2 dark:border-zinc-700"
          >
            <span className="font-nunito font-medium text-zinc-800 dark:text-zinc-200">
              {LABELS[key]}
            </span>
            <span className="font-nunito text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {!s.configuredInSiteConfig && "disabled"}
              {s.configuredInSiteConfig && !s.active && "needs env"}
              {s.active && "ready"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
