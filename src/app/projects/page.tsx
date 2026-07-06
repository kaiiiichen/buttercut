import type { Metadata } from "next";
import { ButtercutCourseProjectLink } from "@/components/ButtercutCourseProjectLink";
import { ButtercutGitHubActivity } from "@/components/ButtercutGitHubActivity";
import { ButtercutPinnedProjectLink } from "@/components/ButtercutPinnedProjectLink";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { getButtercutPinnedProjects } from "@/lib/integrations/github-pinned";
import { renderButtercutInlineMarkdown } from "@/lib/markdown/inline";
import { siteConfig } from "../../../site.config";

export const revalidate = 120;

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.site.title}`,
  description: `Projects in ${siteConfig.site.title}`,
};

export default async function ProjectsPage() {
  const demo = await loadButtercutDemoContent();
  const pinned = await getButtercutPinnedProjects(
    demo.projects,
    siteConfig.integrations.github.login,
  );
  const hasGithubToken = Boolean(process.env.GITHUB_TOKEN);
  const inlineOpts = {
    allowedLinkSchemes: siteConfig.content.allowedLinkSchemes,
  };

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-12">
      <div className="fade-up mb-12" style={{ animationDelay: "0ms" }}>
        <h1
          className="font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[48px]"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          Projects
        </h1>
        <p
          className="mt-3 font-nunito text-[17px] leading-[1.7] text-zinc-400 dark:text-zinc-600"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          {renderButtercutInlineMarkdown(demo.tagline, inlineOpts)}
        </p>
      </div>

      {demo.courseProjects.length > 0 ? (
        <div className="fade-up mb-12" style={{ animationDelay: "40ms" }}>
          <div className="mag-label">Featured</div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {demo.courseProjects.map((entry) => (
              <ButtercutCourseProjectLink key={entry.id} entry={entry} variant="card" />
            ))}
          </div>
        </div>
      ) : null}

      <div className="fade-up" style={{ animationDelay: "80ms" }}>
        <div className="mag-label">Projects</div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {pinned.length === 0 ? (
            <p
              className="col-span-full font-nunito text-sm text-zinc-400 dark:text-zinc-600"
              style={{ fontFamily: "var(--font-ui-en)" }}
            >
              {hasGithubToken
                ? "Pin repositories on your GitHub profile to show them here."
                : "Add projects in content/demo/projects.json or set GITHUB_TOKEN to mirror profile pins."}
            </p>
          ) : (
            pinned.map((p) => (
              <ButtercutPinnedProjectLink key={p.repo} {...p} variant="card" />
            ))
          )}
        </div>
      </div>

      <div className="fade-up mt-14" style={{ animationDelay: "120ms" }}>
        <div className="mag-label">GitHub Activity</div>
        <div className="overflow-x-auto">
          <ButtercutGitHubActivity />
        </div>
      </div>
    </div>
  );
}
