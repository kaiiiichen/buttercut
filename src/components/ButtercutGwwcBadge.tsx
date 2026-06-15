"use client";

import { ButtercutHoverTip } from "./ButtercutHoverTip";

/**
 * Optional pledge badge slot — mirrors kaichen.dev's GwwcBadge.
 * Enable via `brand.showGwwcBadge` in site.config.ts.
 */
export function ButtercutGwwcBadge() {
  return (
    <ButtercutHoverTip
      tip={
        <span className="flex flex-col gap-1.5 text-left">
          <span>Giving What We Can — 10% Pledge Member.</span>
          <span>
            I commit to donate at least 10% of my income to effective charities.
          </span>
        </span>
      }
      placement="top"
      tipClassName="max-w-[280px] px-3.5 py-2.5 text-[13px] leading-relaxed text-left"
    >
      <a
        href="https://www.givingwhatwecan.org/pledge"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Giving What We Can 10% Pledge"
        className="inline-flex no-underline transition-opacity duration-150 hover:opacity-70"
      >
        <span style={{ fontSize: "0.75em" }}>🔸</span>
      </a>
    </ButtercutHoverTip>
  );
}
