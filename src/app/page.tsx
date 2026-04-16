import { ButtercutDemoProjects } from "@/blocks/ButtercutDemoProjects";
import { ButtercutHero } from "@/blocks/ButtercutHero";
import { ButtercutIntegrationsPanel } from "@/blocks/ButtercutIntegrationsPanel";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { siteConfig } from "../../site.config";

export default async function Home() {
  const demo = await loadButtercutDemoContent();
  const blocks = siteConfig.home.blocks.filter((b) => b.enabled);

  return (
    <div className="mx-auto max-w-[1180px] space-y-14 px-4 py-16 md:px-12">
      {blocks.map((block, index) => {
        const delay = `${index * 60}ms`;
        if (block.id === "hero") {
          return (
            <div key="hero" className="fade-up" style={{ animationDelay: delay }}>
              <ButtercutHero config={siteConfig} demo={demo} />
            </div>
          );
        }
        if (block.id === "demo_projects") {
          return (
            <div key="demo_projects" className="fade-up" style={{ animationDelay: delay }}>
              <ButtercutDemoProjects projects={demo.projects} />
            </div>
          );
        }
        if (block.id === "integrations") {
          return (
            <div key="integrations" className="fade-up" style={{ animationDelay: delay }}>
              <ButtercutIntegrationsPanel config={siteConfig} />
            </div>
          );
        }
        return null;
      })}

      <footer className="fade-up text-sm text-zinc-400 dark:text-zinc-600">
        <p>
          © {new Date().getFullYear()} {siteConfig.site.title}. Demo content:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">content/demo/</code>
        </p>
      </footer>
    </div>
  );
}
