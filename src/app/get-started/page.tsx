import type { Metadata } from "next";
import { ButtercutCatalogList } from "@/components/showcase/ButtercutCatalogList";
import { ButtercutCopyBlock } from "@/components/showcase/ButtercutCopyBlock";
import { ButtercutStarterPrompt } from "@/components/showcase/ButtercutStarterPrompt";
import {
  ButtercutShowcasePageHeader,
  ButtercutShowcasePageShell,
} from "@/components/showcase/ButtercutShowcasePageShell";
import { ButtercutShowcaseSectionBlock } from "@/components/showcase/ButtercutShowcaseSectionBlock";
import {
  GET_STARTED_AI_TIPS,
  GET_STARTED_CONFIG,
  GET_STARTED_MASTER_PROMPT,
  GET_STARTED_STEPS,
} from "@/lib/showcase/get-started";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Get Started — ${siteConfig.site.title}`,
  description:
    "Clone, configure, and deploy Buttercut — with step-by-step AI starter prompts.",
};

const PROJECT_LAYOUT = `buttercut/
├── site.config.ts          # Your overrides
├── content/demo/           # Hero + page copy (Markdown + JSON)
├── src/app/                # Routes — add pages here
├── src/blocks/             # Built-in home sections
├── src/components/         # UI primitives
└── src/custom/register.ts  # Block overrides`;

export default function GetStartedPage() {
  return (
    <ButtercutShowcasePageShell>
      <ButtercutShowcasePageHeader
        title="Get Started"
        lede="Fork Buttercut, edit site.config.ts and content/demo/, deploy. Each step includes a copy-paste AI prompt."
      />

      <ButtercutShowcaseSectionBlock
        label="Overview"
        hint="Most forks only touch two places — config for structure, content for copy."
      >
        <p className="ui-body-lg">
          Edit <code className="ui-code-inline">site.config.ts</code> for navigation, blocks, and
          integrations. Edit <code className="ui-code-inline">content/demo/</code> for hero copy and
          page JSON. Deeper layout changes stay in{" "}
          <code className="ui-code-inline">src/custom/</code> so theme updates stay mergeable.
        </p>
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        label="Steps"
        hint="Follow in order — or paste the AI prompt under each step into your agent."
      >
        <div className="mag-card">
          <ol className="space-y-8">
            {GET_STARTED_STEPS.map((step, i) => (
              <li key={step.title}>
                <div className="flex gap-4">
                  <span className="ui-meta ui-hint w-6 shrink-0 tabular-nums">
                    {i + 1}.
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="ui-heading font-nunito text-[17px] font-semibold">
                      {step.title}
                    </p>
                    <p className="ui-hint mt-1">{step.body}</p>
                    <p className="ui-meta mt-2 font-jetbrains-mono text-[12px]">
                      {step.touch}
                    </p>
                    <ButtercutStarterPrompt prompt={step.aiPrompt} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        label="site.config.ts"
        hint="Key fields you will edit on a fork."
      >
        <div className="mag-card">
          <ButtercutCatalogList items={GET_STARTED_CONFIG} />
        </div>
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock label="Project layout" hint="Where files live in the repo.">
        <ButtercutCopyBlock text={PROJECT_LAYOUT} />
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        label="Master AI prompt"
        hint="Paste into Cursor, Claude Code, or similar — fill in the bracketed sections."
      >
        <ButtercutStarterPrompt prompt={GET_STARTED_MASTER_PROMPT} />
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        label="Working with AI"
        hint="Tips that keep agents aligned with Buttercut conventions."
      >
        <div className="mag-card">
          <ul className="space-y-4">
            {GET_STARTED_AI_TIPS.map((tip) => (
              <li key={tip} className="ui-hint">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </ButtercutShowcaseSectionBlock>
    </ButtercutShowcasePageShell>
  );
}
