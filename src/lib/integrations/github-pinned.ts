import type { ButtercutDemoProject } from "@/lib/demo/load-demo-content";

export type ButtercutPinnedProject = {
  name: string;
  desc: string;
  href: string;
  repo: string;
  stack: string[];
  stars?: number;
  archived?: boolean;
};

export function demoProjectsToPinned(
  projects: ButtercutDemoProject[],
): ButtercutPinnedProject[] {
  return projects.map((p) => ({
    name: p.name,
    desc: p.description,
    href: p.href,
    repo: p.repo ?? p.name,
    stack: p.tags,
  }));
}

export function resolveGithubProfileLogin(): string {
  return process.env.GITHUB_LOGIN ?? "octocat";
}

const PINNED_QUERY = `
  query PinnedRepositories($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            nameWithOwner
            stargazerCount
            isArchived
            isPrivate
            languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
              nodes { name }
            }
          }
        }
      }
    }
  }
`;

/**
 * Mirrors github.com/{login} pinned repos when GITHUB_TOKEN is set.
 * Falls back to demo JSON projects when unavailable.
 */
export async function getButtercutPinnedProjects(
  fallback: ButtercutDemoProject[],
  login?: string,
): Promise<ButtercutPinnedProject[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return demoProjectsToPinned(fallback);

  const profileLogin = login ?? resolveGithubProfileLogin();

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: PINNED_QUERY,
        variables: { login: profileLogin },
      }),
      next: { revalidate: 120 },
    });

    const json: {
      data?: {
        user?: {
          pinnedItems?: {
            nodes?: Array<{
              name?: string;
              description?: string | null;
              url?: string;
              nameWithOwner?: string;
              stargazerCount?: number;
              isArchived?: boolean;
              isPrivate?: boolean;
              languages?: { nodes?: Array<{ name?: string | null } | null> | null };
            } | null>;
          };
        };
      };
      errors?: unknown[];
    } = await res.json();

    if (!res.ok || json.errors?.length) {
      return demoProjectsToPinned(fallback);
    }

    const nodes = json.data?.user?.pinnedItems?.nodes;
    if (!Array.isArray(nodes) || nodes.length === 0) {
      return [];
    }

    const out: ButtercutPinnedProject[] = [];
    for (const node of nodes) {
      if (!node?.nameWithOwner || !node.url || !node.name) continue;
      if (node.isPrivate) continue;
      const langNames = (node.languages?.nodes ?? [])
        .map((n) => n?.name)
        .filter((n): n is string => Boolean(n));
      out.push({
        name: node.name,
        desc: node.description?.trim() ?? "",
        href: node.url,
        repo: node.nameWithOwner,
        stack: langNames.slice(0, 6),
        stars:
          typeof node.stargazerCount === "number" ? node.stargazerCount : undefined,
        archived: node.isArchived ?? false,
      });
    }

    return out;
  } catch {
    return demoProjectsToPinned(fallback);
  }
}
