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
    <span className="inline-flex items-center gap-1 font-jetbrains-mono text-[10px] text-zinc-500 dark:text-zinc-400">
      <svg
        aria-hidden="true"
        width="10"
        height="10"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.72 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.767 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
      </svg>
      {stats.stars.toLocaleString()}
    </span>
  );
}
