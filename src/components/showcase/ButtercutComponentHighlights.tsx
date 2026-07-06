"use client";

import { ButtercutJumpText } from "@/components/ButtercutJumpText";
import { ButtercutMagChip } from "@/components/ButtercutMagChip";
import { ButtercutSocialIcons } from "@/components/ButtercutSocialIcons";
import { ButtercutHoverTip } from "@/components/ButtercutHoverTip";
import { ButtercutShowcaseSectionBlock } from "@/components/showcase/ButtercutShowcaseSectionBlock";
import { ButtercutHoverLinkHintDemos } from "@/components/showcase/ButtercutHoverLinkHintDemos";
import { ButtercutMagCardDemo } from "@/components/showcase/ButtercutMagCardDemo";
import { COMPONENT_HIGHLIGHTS } from "@/lib/showcase/highlights";
import type { ButtercutSocialLink } from "@/lib/config/types";

const DEMO_SOCIALS: ButtercutSocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/kaiiiichen/buttercut",
    tip: "View source",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@example.com",
    tip: "hello@example.com",
  },
];

const byId = Object.fromEntries(COMPONENT_HIGHLIGHTS.map((h) => [h.id, h])) as Record<
  string,
  (typeof COMPONENT_HIGHLIGHTS)[number]
>;

export function ButtercutComponentHighlights() {
  return (
    <div className="space-y-14">
      <ButtercutShowcaseSectionBlock
        id="cards"
        label={byId.cards.title}
        hint={byId.cards.hint}
      >
        <ButtercutMagCardDemo />
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        id="links"
        label={byId.links.title}
        hint={byId.links.hint}
      >
        <div className="mag-card">
          <ButtercutHoverLinkHintDemos compact />
        </div>
      </ButtercutShowcaseSectionBlock>

      <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
        <ButtercutShowcaseSectionBlock
          id="greeting"
          label={byId.greeting.title}
          hint={byId.greeting.hint}
        >
          <div className="mag-card">
            <p
              className="font-nunito text-[28px] font-light tracking-tight text-zinc-700 dark:text-zinc-300"
              style={{ fontFamily: "var(--font-ui-en)" }}
            >
              <ButtercutJumpText text="Aloha :D" staggerMs={72} />
            </p>
          </div>
        </ButtercutShowcaseSectionBlock>

        <ButtercutShowcaseSectionBlock
          id="tooltip"
          label={byId.tooltip.title}
          hint={byId.tooltip.hint}
        >
          <div className="mag-card">
            <div className="flex items-center gap-3">
              <span
                className="font-nunito text-[17px] text-zinc-700 dark:text-zinc-300"
                style={{ fontFamily: "var(--font-ui-en)" }}
              >
                Listening card footer
              </span>
              <ButtercutHoverTip tip="Spotify, Last.fm, or your own OAuth — enable in site.config.ts">
                <button
                  type="button"
                  className="help-icon inline-flex size-5 items-center justify-center rounded-full border border-zinc-200 text-[11px] text-zinc-400 dark:border-zinc-700 dark:text-zinc-500"
                  aria-label="More about listening integrations"
                >
                  ?
                </button>
              </ButtercutHoverTip>
            </div>
          </div>
        </ButtercutShowcaseSectionBlock>
      </div>

      <ButtercutShowcaseSectionBlock
        id="projects"
        label={byId.projects.title}
        hint={byId.projects.hint}
      >
        <div className="mag-card">
          <ButtercutHoverLinkHintDemos projectsOnly />
        </div>
      </ButtercutShowcaseSectionBlock>

      <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
        <ButtercutShowcaseSectionBlock
          id="chips"
          label={byId.chips.title}
          hint={byId.chips.hint}
        >
          <div className="mag-card">
            <div className="flex flex-wrap gap-2">
              <ButtercutMagChip href="/get-started" arrow="right">
                Get Started
              </ButtercutMagChip>
              <ButtercutMagChip href="/sandbox" arrow="right" size="sm">
                Sandbox
              </ButtercutMagChip>
              <ButtercutMagChip
                href="https://github.com/kaiiiichen/buttercut"
                arrow="external"
                size="sm"
              >
                GitHub
              </ButtercutMagChip>
            </div>
          </div>
        </ButtercutShowcaseSectionBlock>

        <ButtercutShowcaseSectionBlock
          id="socials"
          label={byId.socials.title}
          hint={byId.socials.hint}
        >
          <div className="mag-card">
            <ButtercutSocialIcons socials={DEMO_SOCIALS} />
          </div>
        </ButtercutShowcaseSectionBlock>
      </div>
    </div>
  );
}
