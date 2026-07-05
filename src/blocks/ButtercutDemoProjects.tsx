import { ButtercutProjectsSplit } from "@/components/ButtercutProjectsSplit";
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
      <ButtercutProjectsSplit
        courseProjects={demo.courseProjects}
        personalProjects={projects}
        personalVariant="list"
        personalEmptyMessage={
          hasGithubToken
            ? "Pin repositories on your GitHub profile to show them here."
            : "Add projects in content/demo/projects.json or set GITHUB_TOKEN to mirror profile pins."
        }
      />
    </section>
  );
}
