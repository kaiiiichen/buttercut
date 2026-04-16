export type ButtercutGitHubRepoStats = {
  repo: string;
  stars: number;
  archived: boolean;
};

/**
 * Fetch a repo's star count. Returns `null` if the repo is missing, the
 * request fails, or we hit a rate limit. Never throws — Buttercut is
 * designed to keep rendering even when integrations are misconfigured.
 *
 * @param repo e.g. "owner/name"
 * @param token optional GITHUB_TOKEN (otherwise unauthenticated public API)
 */
export async function fetchButtercutGitHubStars(
  repo: string,
  token: string | undefined = process.env.GITHUB_TOKEN,
): Promise<ButtercutGitHubRepoStats | null> {
  if (!repo || !repo.includes("/")) return null;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      stargazers_count?: number;
      archived?: boolean;
    };
    return {
      repo,
      stars: data.stargazers_count ?? 0,
      archived: data.archived ?? false,
    };
  } catch {
    return null;
  }
}
