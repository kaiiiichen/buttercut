import { ButtercutPinnedProjectLink } from "@/components/ButtercutPinnedProjectLink";
import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { getButtercutPinnedProjects } from "@/lib/integrations/github-pinned";

export async function ButtercutDemoProjects({ config, demo }: ButtercutBlockProps) {
  const projects = await getButtercutPinnedProjects(
    demo.projects,
    config.integrations.github.login,
  );
  const hasGithubToken = Boolean(process.env.GITHUB_TOKEN);

  return (
    <section className="mag-card">
      <div className="mag-label">Projects</div>
      <div>
        {projects.length === 0 ? (
          <p
            className="py-2 font-nunito text-sm text-zinc-400 dark:text-zinc-600"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            {hasGithubToken
              ? "Pin repositories on your GitHub profile to show them here."
              : "Add projects in content/demo/projects.json or set GITHUB_TOKEN to mirror profile pins."}
          </p>
        ) : (
          projects.map((p) => (
            <ButtercutPinnedProjectLink key={p.repo} {...p} variant="list" />
          ))
        )}
      </div>
    </section>
  );
}
