"use client";

import { useState, type CSSProperties } from "react";
import { ButtercutJumpText } from "@/components/ButtercutJumpText";
import {
  ButtercutHoverLinkArrow,
  ButtercutHoverLinkDestinationHint,
} from "@/components/ButtercutHoverLinkHint";
import { ButtercutShowcaseSectionBlock } from "@/components/showcase/ButtercutShowcaseSectionBlock";
import { ButtercutMagCardDemo } from "@/components/showcase/ButtercutMagCardDemo";
import { DESIGN_HIGHLIGHTS } from "@/lib/showcase/highlights";
import {
  BUTTERCUT_THEME_PRESETS,
  listButtercutPresets,
  type ButtercutPresetName,
} from "@/lib/theme/presets";

const byId = Object.fromEntries(DESIGN_HIGHLIGHTS.map((h) => [h.id, h])) as Record<
  string,
  (typeof DESIGN_HIGHLIGHTS)[number]
>;

export function ButtercutDesignHighlights() {
  const presets = listButtercutPresets();
  const [active, setActive] = useState<ButtercutPresetName>("sunset");
  const theme = BUTTERCUT_THEME_PRESETS[active];

  const previewStyle = {
    "--accent": theme.accent,
    "--background": theme.background,
    "--foreground": theme.foreground,
  } as CSSProperties;

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
        id="themes"
        label={byId.themes.title}
        hint={byId.themes.hint}
      >
        <div className="flex flex-wrap gap-2">
          {presets.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActive(name)}
              className={`mag-chip mag-chip-sm capitalize transition-opacity ${
                active === name ? "opacity-100 ring-1 ring-[var(--accent)]" : "opacity-70"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="mag-card mt-4" style={previewStyle}>
          <div className="mag-label">Preview</div>
          <div style={{ color: theme.foreground }}>
            <h3
              className="font-nunito text-[28px] font-light leading-tight"
              style={{ fontFamily: "var(--font-ui-en)" }}
            >
              Your site title
            </h3>
            <p
              className="mt-2 font-nunito text-[15px] leading-[1.7] opacity-80"
              style={{ fontFamily: "var(--font-ui-en)" }}
            >
              Body copy — links use{" "}
              <span style={{ color: theme.accent }}>accent color</span>.
            </p>
            <div
              className="mt-4 inline-flex rounded-md px-3 py-1.5 font-nunito text-[13px]"
              style={{
                fontFamily: "var(--font-ui-en)",
                background: theme.accent,
                color: theme.background,
              }}
            >
              Primary action
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-3 dark:border-zinc-800/60">
            <span
              className="size-4 rounded-full border border-zinc-200 dark:border-zinc-700"
              style={{ background: theme.accent }}
            />
            <span className="font-jetbrains-mono text-[11px] text-zinc-500">{theme.accent}</span>
          </div>
        </div>
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        id="type"
        label={byId.type.title}
        hint={byId.type.hint}
      >
        <div className="mag-card">
          <div className="mag-label">Type scale</div>
          <p
            className="font-nunito text-[36px] font-light leading-[1.1] text-zinc-900 dark:text-zinc-100"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            Display light
          </p>
          <p
            className="mt-4 font-nunito text-[17px] font-semibold text-zinc-800 dark:text-zinc-200"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            Section heading semibold
          </p>
          <p
            className="mt-2 font-nunito text-[15px] leading-[1.75] text-zinc-500 dark:text-zinc-500"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            Body at 15–17px with generous line height — hero intros, card copy, and about pages.
          </p>
          <p className="mt-2 font-jetbrains-mono text-[12px] text-zinc-400">
            site.config.ts · content/demo/
          </p>
        </div>
      </ButtercutShowcaseSectionBlock>

      <ButtercutShowcaseSectionBlock
        id="motion"
        label={byId.motion.title}
        hint={byId.motion.hint}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="mag-card">
            <div className="mag-label">JumpText</div>
            <p
              className="font-nunito text-[26px] font-light text-zinc-700 dark:text-zinc-300"
              style={{ fontFamily: "var(--font-ui-en)" }}
            >
              <ButtercutJumpText text="Hello :)" staggerMs={64} />
            </p>
          </div>
          <div className="mag-card">
            <div className="mag-label">Hover link row</div>
            <a
              href="/components"
              className="group -mx-2 flex items-center justify-between rounded-sm px-2 py-2 no-underline transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
              style={{ textDecoration: "none" }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <ButtercutHoverLinkArrow />
                <span
                  className="font-nunito text-[17px] font-semibold italic text-zinc-800 group-hover:text-[var(--accent)] dark:text-zinc-200"
                  style={{ fontFamily: "var(--font-ui-en)" }}
                >
                  Components
                </span>
              </div>
              <ButtercutHoverLinkDestinationHint href="/components" />
            </a>
          </div>
        </div>
      </ButtercutShowcaseSectionBlock>
    </div>
  );
}
