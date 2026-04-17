import { registerButtercutDefaultBlocks } from "@/lib/blocks/register-defaults";
import { getButtercutBlock } from "@/lib/blocks/registry";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { siteConfig } from "../../site.config";

registerButtercutDefaultBlocks();

export default async function Home() {
  const demo = await loadButtercutDemoContent();
  const blocks = siteConfig.home.blocks.filter((b) => b.enabled);

  return (
    <div className="mx-auto max-w-[1360px] space-y-14 px-4 py-16 md:px-8">
      {blocks.map((block, index) => {
        const Component = getButtercutBlock(block.id);
        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `[Buttercut] Unknown home block id "${block.id}" — skipping.`,
            );
          }
          return null;
        }
        return (
          <div
            key={block.id}
            className="fade-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <Component config={siteConfig} demo={demo} />
          </div>
        );
      })}

      <footer className="fade-up font-nunito text-sm text-zinc-400 dark:text-zinc-600">
        <p>
          © {new Date().getFullYear()} {siteConfig.site.title}. Demo content:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-jetbrains-mono text-xs dark:bg-zinc-800">
            content/demo/
          </code>
        </p>
      </footer>
    </div>
  );
}
