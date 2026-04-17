import type { Metadata } from "next";
import { ButtercutGitHubActivity } from "@/components/ButtercutGitHubActivity";
import { ButtercutGitHubStarBadge } from "@/components/ButtercutGitHubStarBadge";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { renderButtercutInlineMarkdown } from "@/lib/markdown/inline";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.site.title}`,
  description: `Projects in ${siteConfig.site.title}`,
};

function inferRepo(href: string): string | undefined {
  const m = href.match(/^https?:\/\/github\.com\/([^/]+\/[^/?#]+)/i);
  return m?.[1];
}

export default async function ProjectsPage() {
  const { projects, tagline } = await loadButtercutDemoContent();
  const showStars = siteConfig.integrations.github.enabled;
  const inlineOpts = {
    allowedLinkSchemes: siteConfig.content.allowedLinkSchemes,
  };

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-12">
      <div className="mb-12 fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[48px]">
          Projects
        </h1>
        <p className="mt-3 font-serif text-sm leading-[1.8] text-zinc-400 dark:text-zinc-600">
          {renderButtercutInlineMarkdown(tagline, inlineOpts)}
        </p>
        <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {projects.length === 0 ? (
        <p
          className="fade-up font-serif text-sm text-zinc-500 dark:text-zinc-400"
          style={{ animationDelay: "60ms" }}
        >
          No projects yet — edit{" "}
          <code className="font-jetbrains-mono text-xs">
            content/demo/projects.json
          </code>{" "}
          to fill this page in.
        </p>
      ) : (
        <div
          className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2"
          style={{ animationDelay: "60ms" }}
        >
          {projects.map((p) => {
            const repo = showStars ? p.repo ?? inferRepo(p.href) : undefined;
            return (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mag-card group block no-underline"
                style={{ textDecoration: "none" }}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="shrink-0 -translate-x-1 text-xs text-[var(--accent)] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
                    ↗
                  </span>
                  <p className="font-serif text-[20px] font-semibold italic text-zinc-800 transition-colors duration-150 group-hover:text-[var(--accent)] dark:text-zinc-200">
                    {p.name}
                  </p>
                  {repo ? <ButtercutGitHubStarBadge repo={repo} /> : null}
                </div>

                <p className="mb-3 pl-4 font-serif text-[13px] leading-[1.7] text-zinc-500 dark:text-zinc-500">
                  {renderButtercutInlineMarkdown(p.description, inlineOpts)}
                </p>

                <div className="flex items-center justify-between pl-4">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm bg-zinc-100 px-1.5 py-0.5 font-nunito text-[10px] text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
                      >
                        {renderButtercutInlineMarkdown(tag, inlineOpts)}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 shrink-0 font-nunito text-[11px] text-zinc-300 transition-colors duration-150 group-hover:text-[var(--accent)] dark:text-zinc-700">
                    GitHub ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}

      <div className="mt-14 fade-up" style={{ animationDelay: "120ms" }}>
        <div className="mag-label">GitHub Activity</div>
        <div className="overflow-x-auto">
          <ButtercutGitHubActivity />
        </div>
      </div>
    </div>
  );
}
