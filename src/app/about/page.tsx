import type { Metadata } from "next";
import { ButtercutProse } from "@/components/ButtercutProse";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { renderButtercutMarkdown } from "@/lib/markdown/render";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.site.title}`,
  description: `About ${siteConfig.site.title}`,
};

export default async function AboutPage() {
  const demo = await loadButtercutDemoContent();
  const html = renderButtercutMarkdown(demo.about || "# About\n\nReplace `content/demo/about.md` with your own copy.");

  return (
    <div className="mx-auto max-w-[760px] px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="font-nunito text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          About
        </p>
        <h1 className="mt-2 font-nunito text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100">
          {siteConfig.site.title}
        </h1>
      </header>
      <ButtercutProse html={html} />
    </div>
  );
}
