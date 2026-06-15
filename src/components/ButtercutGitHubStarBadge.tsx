import { fetchButtercutGitHubStars } from "@/lib/integrations/github";

/**
 * Server component. Renders nothing when the repo is missing or the API
 * is unavailable, so it is safe to drop in without a graceful-fallback wrapper.
 */
export async function ButtercutGitHubStarBadge({ repo }: { repo?: string }) {
  if (!repo) return null;
  const stats = await fetchButtercutGitHubStars(repo);
  if (!stats) return null;
  return (
    <span className="inline-flex items-center gap-0.5 text-zinc-400 dark:text-zinc-600">
      <span style={{ fontSize: 17, lineHeight: 1 }}>★</span>
      <span className="font-jetbrains-mono text-[11px]">{stats.stars.toLocaleString()}</span>
    </span>
  );
}
