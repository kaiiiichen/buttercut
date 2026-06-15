"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ButtercutListeningLastMonthTop } from "./ButtercutListeningLastMonthTop";
import { ButtercutListeningTrackRow } from "./ButtercutListeningTrackRow";

type NowPlayingPayload = {
  isPlaying?: boolean;
  title?: string;
  artist?: string;
  songUrl?: string;
  albumArt?: string;
  recentTrack?: {
    title: string;
    artist: string;
    songUrl: string;
    albumArt?: string;
    playedAt?: number;
  } | null;
};

type DisplayItem = {
  title: string;
  artist: string;
  songUrl: string;
  albumArt?: string;
} | null;

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

export function ButtercutListeningCard() {
  const [data, setData] = useState<NowPlayingPayload | null>(null);
  const [displayItem, setDisplayItem] = useState<DisplayItem>(null);
  const [slideClass, setSlideClass] = useState("");
  const prevItemKeyRef = useRef<string | null>(null);
  const slideTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing", { cache: "no-store" });
        if (!res.ok) {
          if (!disposed) setData({ isPlaying: false });
          return;
        }
        const d = (await res.json()) as NowPlayingPayload;
        if (!disposed) setData(d);
      } catch {
        if (!disposed) setData({ isPlaying: false });
      } finally {
        if (!disposed) timer = setTimeout(poll, 10_000);
      }
    };

    void poll();
    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!data) return;

    const nextItem: DisplayItem = data.isPlaying
      ? {
          title: data.title ?? "",
          artist: data.artist ?? "",
          songUrl: data.songUrl ?? "#",
          albumArt: data.albumArt,
        }
      : (data.recentTrack ?? null);

    if (!nextItem?.title) {
      setDisplayItem(null);
      prevItemKeyRef.current = null;
      return;
    }

    const nextItemKey = `${data.isPlaying ? "playing" : "recent"}|${nextItem.songUrl}|${nextItem.title}|${nextItem.artist}`;

    if (prevItemKeyRef.current === nextItemKey) return;

    const hadContent = prevItemKeyRef.current !== null;
    prevItemKeyRef.current = nextItemKey;

    if (!hadContent) {
      setDisplayItem(nextItem);
      return;
    }

    slideTimers.current.forEach(clearTimeout);
    slideTimers.current = [];
    setSlideClass("slide-exit");
    slideTimers.current.push(
      setTimeout(() => {
        setDisplayItem(nextItem);
        setSlideClass("slide-enter");
        slideTimers.current.push(setTimeout(() => setSlideClass(""), 250));
      }, 200),
    );
  }, [data]);

  useEffect(
    () => () => {
      slideTimers.current.forEach(clearTimeout);
      slideTimers.current = [];
    },
    [],
  );

  const live = Boolean(data?.isPlaying && displayItem);
  const stateText = live ? "now playing" : displayItem ? "last played" : "idle";

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
            className={`truncate tracking-widest ${
              live
                ? "text-zinc-600 dark:text-zinc-400"
                : "text-zinc-400 dark:text-zinc-600"
            }`}
          >
            {stateText}
          </span>
          <div className="ml-auto shrink-0">
            <ButtercutListeningLastMonthTop />
          </div>
        </div>
      </div>
    </div>
  );
}
