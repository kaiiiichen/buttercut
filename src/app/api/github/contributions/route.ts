import { NextResponse } from "next/server";
import { resolveGithubProfileLogin } from "@/lib/integrations/github-pinned";

export const revalidate = 300;

const QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 404 });
  }

  const now = new Date();
  const from = new Date(now);
  from.setFullYear(now.getFullYear() - 1);

  const graphqlRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    next: { revalidate: 300 },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        login: resolveGithubProfileLogin(),
        from: from.toISOString(),
        to: now.toISOString(),
      },
    }),
  });

  if (!graphqlRes.ok) {
    return NextResponse.json({ error: "GitHub API error" }, { status: 502 });
  }

  const data = await graphqlRes.json();
  const calendar =
    data?.data?.user?.contributionsCollection?.contributionCalendar;
  const rawWeeks: {
    contributionDays: { date: string; contributionCount: number }[];
  }[] = calendar?.weeks ?? [];
  const totalContributions: number = calendar?.totalContributions ?? 0;

  const weeks = rawWeeks.map((w) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
    })),
  );

  return NextResponse.json(
    { weeks, totalContributions },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
}
