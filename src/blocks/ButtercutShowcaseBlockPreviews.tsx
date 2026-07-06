import { ButtercutDemoProjects } from "@/blocks/ButtercutDemoProjects";
import { ButtercutIntegrationsPanel } from "@/blocks/ButtercutIntegrationsPanel";
import { ButtercutMagChip } from "@/components/ButtercutMagChip";
import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { renderButtercutInlineMarkdown } from "@/lib/markdown/inline";

function MiniAboutPreview({
  demo,
  allowedLinkSchemes,
}: {
  demo: Awaited<ReturnType<typeof loadButtercutDemoContent>>;
  allowedLinkSchemes?: string[];
}) {
  const entry = demo.about.education[0];
  if (!entry) return null;

  const md = (s: string) =>
    renderButtercutInlineMarkdown(s, { allowedLinkSchemes });

  return (
    <div className="mag-card flex flex-col">
      <div className="mag-label">About block</div>
      <div className="py-1">
        <span
          className="mb-2 block font-nunito text-[11px] tracking-[0.04em] text-zinc-400 dark:text-zinc-600"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          {entry.years}
        </span>
        <p
          className="font-nunito text-[17px] font-semibold leading-[1.6] text-zinc-800 dark:text-zinc-200"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          {md(entry.institution)}
        </p>
        <p
          className="mt-1 font-nunito text-[17px] font-semibold leading-[1.4] text-[#C4894F] dark:text-[#D9A870]"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          {md(entry.role)}
        </p>
      </div>
      <p
        className="mt-3 font-nunito text-[13px] leading-[1.5] text-zinc-400 dark:text-zinc-600"
        style={{ fontFamily: "var(--font-ui-en)" }}
      >
        Edit copy in{" "}
        <code className="font-jetbrains-mono text-xs">content/demo/about.json</code>
      </p>
    </div>
  );
}

function MiniMiscPreview({
  demo,
}: {
  demo: Awaited<ReturnType<typeof loadButtercutDemoContent>>;
}) {
  const group = demo.misc.thingGroups[0];
  if (!group) return null;

  return (
    <div className="mag-card">
      <div className="mag-label">Misc inset</div>
      <p
        className="mb-3 font-nunito text-[11px] uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-600"
        style={{ fontFamily: "var(--font-ui-en)" }}
      >
        {group.category}
      </p>
      <div className="mag-card-inset">
        {group.rows.flat().map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block font-nunito text-[15px] text-zinc-700 underline-offset-2 hover:text-[#C4894F] hover:underline dark:text-zinc-300 dark:hover:text-[#D9A870]"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}

/** Live previews of composable home blocks — sample data from content/demo/. */
export async function ButtercutShowcaseBlockPreviews({
  config,
}: ButtercutBlockProps) {
  const demo = await loadButtercutDemoContent();

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mag-label">Block previews</div>
          <p className="ui-hint mt-1 max-w-xl">
            Every home section is a registered block. Reorder via{" "}
            <code className="ui-code-inline">home.blocks</code> — no layout surgery. Below: live
            renders from your content folder.
          </p>
        </div>
        <ButtercutMagChip href="/sandbox" arrow="right" size="sm" className="shrink-0">
          Integration sandbox
        </ButtercutMagChip>
      </div>

      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ButtercutDemoProjects config={config} demo={demo} />
          <ButtercutIntegrationsPanel config={config} demo={demo} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <MiniAboutPreview
            demo={demo}
            allowedLinkSchemes={config.content.allowedLinkSchemes}
          />
          <MiniMiscPreview demo={demo} />
        </div>
      </div>
    </section>
  );
}
