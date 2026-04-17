import type { Metadata } from "next";
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
  const demo = await loadButtercutDemoContent();
  const showStars = siteConfig.integrations.github.enabled;
  const inlineOpts = {
    allowedLinkSchemes: siteConfig.content.allowedLinkSchemes,
  };

  return (
    <div className="mx-auto max-w-[900px] px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="font-nunito text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Projects
        </p>
        <h1 className="mt-2 font-nunito text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100">
          Selected work
        </h1>
        <p className="mt-3 max-w-xl font-serif text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          Demo content loaded from{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-jetbrains-mono text-xs dark:bg-zinc-800">
            content/demo/projects.json
          </code>
          .
        </p>
      </header>

      <ul className="space-y-5">
        {demo.projects.map((p) => {
          const repo = showStars ? p.repo ?? inferRepo(p.href) : undefined;
          return (
            <li key={p.name} className="mag-card">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl font-semibold italic text-zinc-900 transition-colors hover:text-[var(--accent)] dark:text-zinc-100"
                >
                  {p.name}
                </a>
                {repo ? <ButtercutGitHubStarBadge repo={repo} /> : null}
              </div>
              <p className="mt-2 font-serif text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {renderButtercutInlineMarkdown(p.description, inlineOpts)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm bg-zinc-100 px-1.5 py-0.5 font-nunito text-[10px] text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
                  >
                    {renderButtercutInlineMarkdown(tag, inlineOpts)}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
