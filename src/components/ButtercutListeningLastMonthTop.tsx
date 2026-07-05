"use client";

import { useEffect, useState } from "react";
import { ButtercutHoverTip } from "./ButtercutHoverTip";
import { ButtercutListeningTrackRow } from "./ButtercutListeningTrackRow";
import { ButtercutMagChip } from "./ButtercutMagChip";

type HighlightTrack = {
  title: string;
  artist: string;
  albumArt: string;
  songUrl: string;
};

function LastMonthTopTipContent() {
  const [tracks, setTracks] = useState<HighlightTrack[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/spotify/last-month-top")
      .then((r) => (r.ok ? r.json() : { tracks: [] }))
      .then((body: { tracks?: HighlightTrack[] }) => {
        if (!cancelled) setTracks(body.tracks ?? []);
      })
      .catch(() => {
        if (!cancelled) setTracks([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (tracks === null) {
    return (
      <span
        style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 11 }}
        className="py-2 text-zinc-400 dark:text-zinc-500"
      >
        Loading…
      </span>
    );
  }

  return (
    <span className="flex w-full flex-col gap-0.5 text-left">
      <span
        style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 16 }}
        className="pb-1.5 text-zinc-400 dark:text-zinc-500"
      >
        last month · top 5
      </span>
      {tracks.length === 0 ? (
        <span
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 11 }}
          className="py-0.5 text-zinc-500 dark:text-zinc-400"
        >
          No plays recorded last month.
        </span>
      ) : (
        tracks.map((track) => (
          <ButtercutListeningTrackRow
            key={`${track.songUrl}-${track.title}`}
            {...track}
            compact
            className="-mx-0 px-0 pl-0.5"
          />
        ))
      )}
    </span>
  );
}

export function ButtercutListeningLastMonthTop() {
  return (
    <ButtercutHoverTip
      interactive
      portal
      align="end"
      placement="top"
      tipClassName="pointer-events-auto w-[min(calc(100vw-2rem),300px)] max-w-[min(calc(100vw-2rem),300px)] px-4 py-3 text-left"
      tip={<LastMonthTopTipContent />}
    >
      <ButtercutMagChip
        as="button"
        className="cursor-default"
        aria-label="last month's top five tracks"
      >
        last month&apos;s tops
      </ButtercutMagChip>
    </ButtercutHoverTip>
  );
}
