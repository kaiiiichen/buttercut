import type { Metadata } from "next";
import { ButtercutGitHubActivity } from "@/components/ButtercutGitHubActivity";
import { ButtercutCatalogList } from "@/components/showcase/ButtercutCatalogList";
import { ButtercutShowcaseReference } from "@/components/showcase/ButtercutShowcaseReference";
import {
  ButtercutShowcasePageHeader,
  ButtercutShowcasePageShell,
} from "@/components/showcase/ButtercutShowcasePageShell";
import { ButtercutShowcaseSectionBlock } from "@/components/showcase/ButtercutShowcaseSectionBlock";
import { ButtercutIntegrationsPanel } from "@/blocks/ButtercutIntegrationsPanel";
import { ButtercutNowPlayingBlock } from "@/blocks/ButtercutNowPlayingBlock";
import { ButtercutWeatherBlock } from "@/blocks/ButtercutWeatherBlock";
import { registerButtercutDefaultBlocks } from "@/lib/blocks/register-defaults";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { SANDBOX_WIDGETS } from "@/lib/showcase/catalog";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Sandbox — ${siteConfig.site.title}`,
  description:
    "Try live widgets — listening, weather, GitHub activity — the same blocks you enable on a forked site.",
};

export default async function SandboxPage() {
  registerButtercutDefaultBlocks();
  const demo = await loadButtercutDemoContent();
  const blockProps = { config: siteConfig, demo };

  return (
    <ButtercutShowcasePageShell>
      <ButtercutShowcasePageHeader
        title="Sandbox"
        lede="Drop these widgets onto any Buttercut home page. Everything below is live — the same components your visitors would see after you flip a toggle in site.config.ts."
      />

      <ButtercutShowcaseSectionBlock
        label="Home status row"
        hint="Listening and location side-by-side — exactly how they appear on a personal site home page."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ButtercutNowPlayingBlock {...blockProps} />
          <ButtercutWeatherBlock {...blockProps} />
        </div>
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        label="GitHub activity"
        hint="Contribution heatmap — scroll horizontally on small screens."
      >
        <div className="mag-card overflow-x-auto">
          <ButtercutGitHubActivity />
        </div>
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        label="Integration status"
        hint="See what's configured vs. waiting for API keys."
      >
        <ButtercutIntegrationsPanel {...blockProps} />
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseReference
        title="How to enable"
        lede="Config fields and env vars — expand when you're ready to wire these on your fork."
        delayMs={120}
      >
        <ButtercutCatalogList items={SANDBOX_WIDGETS} />
      </ButtercutShowcaseReference>
    </ButtercutShowcasePageShell>
  );
}
