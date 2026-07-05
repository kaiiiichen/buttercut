"use client";

import type { CSSProperties } from "react";
import { useButtercutNowPlaying } from "@/hooks/use-now-playing";
import { ButtercutListeningLastMonthTop } from "./ButtercutListeningLastMonthTop";
import { ButtercutListeningTrackRow } from "./ButtercutListeningTrackRow";
import { ButtercutMagChip } from "./ButtercutMagChip";

const PULSE_MS = 2200;
const DOT_SCALE = 1.125;

function ListeningEmptyVisual() {
  return (
    <div className="flex items-center justify-center gap-4 py-1" aria-hidden>
      <div className="relative size-14 shrink-0 text-zinc-300 dark:text-zinc-600">
        <span className="absolute inset-1 rounded-full border border-dashed border-current opacity-[0.45]" />
        <span className="absolute inset-2.5 rounded-full border border-current opacity-[0.7]" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="size-1.5 rounded-full bg-current opacity-50" />
        </span>
      </div>
      <div className="flex min-w-0 max-w-[12rem] flex-col gap-2 text-[11px] leading-snug text-zinc-400 dark:text-zinc-600">
        <span
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400 }}
          className="text-[10px] uppercase tracking-[0.2em] text-zinc-400/90 dark:text-zinc-600"
        >
          No signal
        </span>
        <span
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400 }}
          className="text-zinc-500 dark:text-zinc-500"
        >
          Nothing on the speakers yet—connect Spotify in site.config.ts to show
          what you are listening to.
        </span>
      </div>
    </div>
  );
}

type ButtercutListeningCardProps = {
  featuredLink?: { label: string; href: string };
};

export function ButtercutListeningCard({ featuredLink }: ButtercutListeningCardProps) {
  const { displayItem, dotPlaying, slideClass } = useButtercutNowPlaying();
  const hasTrack = Boolean(displayItem);
  const live = hasTrack && dotPlaying;
  const stateText = live ? "now playing" : hasTrack ? "last played" : "idle";

  return (
    <div className="space-y-3">
      <div className="relative py-0.5 transition-[color,opacity,filter] duration-500">
        {!displayItem ? (
          <ListeningEmptyVisual />
        ) : (
          <ButtercutListeningTrackRow
            title={displayItem.title}
            artist={displayItem.artist}
            albumArt={displayItem.albumArt ?? ""}
            songUrl={displayItem.songUrl}
            live={live}
            className={slideClass}
          />
        )}
      </div>

      <div className="pt-0" aria-live="polite">
        <div className="flex min-w-0 items-center gap-3.5 py-1 pl-3">
          <span className="shrink-0 text-xs opacity-0" aria-hidden>
            ↗
          </span>
          <span
            className={`size-2 shrink-0 rounded-full bg-[#1DB954] transition-colors duration-300 ${
              live ? "listening-live-dot" : "opacity-35"
            }`}
            style={
              live
                ? ({
                    animationDuration: `${PULSE_MS}ms`,
                    transform: `scale(${DOT_SCALE})`,
                  } as CSSProperties)
                : undefined
            }
            aria-hidden
          />
          <span
            style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 14 }}
            className={`min-w-0 shrink truncate tracking-widest ${
              live
                ? "text-zinc-600 dark:text-zinc-400"
                : "text-zinc-400 dark:text-zinc-600"
            }`}
          >
            {stateText}
          </span>
          <div className="ml-auto flex min-w-0 max-w-full flex-wrap gap-2">
            <div className="shrink-0">
              <ButtercutListeningLastMonthTop />
            </div>
            {featuredLink ? (
              <ButtercutMagChip
                href={featuredLink.href}
                arrow="right"
                aria-label={featuredLink.label}
                className="shrink-0"
              >
                {featuredLink.label}
              </ButtercutMagChip>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
