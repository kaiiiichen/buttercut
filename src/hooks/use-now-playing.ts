"use client";

import { useEffect, useRef, useState } from "react";

export type ButtercutNowPlayingResult = {
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

export type ButtercutDisplayItem = {
  title: string;
  artist: string;
  songUrl: string;
  albumArt?: string;
  playedAt?: number;
} | null;

export type UseButtercutNowPlayingReturn = {
  data: ButtercutNowPlayingResult | null;
  displayItem: ButtercutDisplayItem;
  dotPlaying: boolean;
  slideClass: string;
};

export function useButtercutNowPlaying(): UseButtercutNowPlayingReturn {
  const [data, setData] = useState<ButtercutNowPlayingResult | null>(null);
  const [displayItem, setDisplayItem] = useState<ButtercutDisplayItem>(null);
  const [slideClass, setSlideClass] = useState("");
  const prevItemKeyRef = useRef<string | null>(null);
  const slideTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const requestSeqRef = useRef(0);

  useEffect(() => {
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let activeController: AbortController | null = null;

    const poll = async () => {
      const seq = ++requestSeqRef.current;
      activeController = new AbortController();

      try {
        const res = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
          signal: activeController.signal,
        });
        const d = (await res.json()) as ButtercutNowPlayingResult;

        if (!disposed && seq === requestSeqRef.current) {
          setData(d);
        }
      } catch {
        if (!disposed && seq === requestSeqRef.current) {
          setData({ isPlaying: false });
        }
      } finally {
        if (!disposed) {
          timer = setTimeout(poll, 10_000);
        }
      }
    };

    void poll();
    return () => {
      disposed = true;
      activeController?.abort();
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!data) return;
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      const nextItem: ButtercutDisplayItem = data.isPlaying
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

      const nextItemKey = `${data.isPlaying ? "playing" : "recent"}|${nextItem.songUrl}|${nextItem.title}|${nextItem.artist}|${nextItem.playedAt ?? ""}`;

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
    });

    return () => {
      cancelled = true;
    };
  }, [data]);

  useEffect(() => {
    return () => {
      slideTimers.current.forEach(clearTimeout);
      slideTimers.current = [];
    };
  }, []);

  const dotPlaying = Boolean(data?.isPlaying);

  return { data, displayItem, dotPlaying, slideClass };
}
