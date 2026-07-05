import Image from "next/image";
import {
  ButtercutHoverLinkArrow,
  ButtercutHoverLinkDestinationHint,
} from "./ButtercutHoverLinkHint";

const HOVER_RING =
  "ring-0 group-hover/track:ring-[1.5px] " +
  "group-hover/track:ring-[#C4894F]/45 group-hover/track:ring-offset-[2px] " +
  "group-hover/track:ring-offset-white " +
  "dark:group-hover/track:ring-[#D9A870]/40 dark:group-hover/track:ring-offset-[#252019]";

type ButtercutListeningTrackRowProps = {
  title: string;
  artist: string;
  albumArt: string;
  songUrl: string;
  live?: boolean;
  compact?: boolean;
  className?: string;
};

export function ButtercutListeningTrackRow({
  title,
  artist,
  albumArt,
  songUrl,
  live = false,
  compact = false,
  className = "",
}: ButtercutListeningTrackRowProps) {
  const artSize = compact ? 32 : 40;
  const artClass = compact ? "size-8" : "size-10";

  return (
    <a
      href={songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group group/track -mx-2 flex items-center rounded-sm px-2 pl-3 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 ${
        compact ? "gap-2 py-1" : "gap-3 py-1.5"
      } ${live ? "" : "opacity-[0.97]"} ${className}`}
    >
      <ButtercutHoverLinkArrow className={compact ? "text-[10px]" : undefined} />

      <div className="relative shrink-0">
        {albumArt ? (
          <Image
            src={albumArt}
            alt={`${title} album art`}
            width={artSize}
            height={artSize}
            unoptimized
            className={`${artClass} rounded-[3px] object-cover transition-[filter,box-shadow] duration-200 ${HOVER_RING} ${
              live
                ? "listening-art-live"
                : "grayscale-[18%] opacity-[0.88] contrast-[0.98] saturate-[0.92] dark:grayscale-[12%]"
            }`}
          />
        ) : (
          <div
            className={`${artClass} rounded-[3px] transition-[box-shadow] duration-200 ${HOVER_RING} ${
              live
                ? "listening-art-live bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800"
                : "bg-zinc-200/90 dark:bg-zinc-700/80"
            }`}
          />
        )}
      </div>

      <div className={`min-w-0 flex-1 ${compact ? "pt-0" : "pt-0.5"}`}>
        <p
          style={{
            fontFamily: "var(--font-ui-en)",
            fontWeight: 600,
            fontSize: compact ? 14 : 18,
            lineHeight: 1.3,
          }}
          className="truncate text-zinc-800 transition-colors duration-150 group-hover/track:text-[#C4894F] dark:text-zinc-200 dark:group-hover/track:text-[#D9A870]"
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: "var(--font-ui-en)",
            fontWeight: 400,
            fontSize: compact ? 9 : 10,
          }}
          className={`mt-0.5 truncate transition-colors duration-300 ${
            live
              ? "text-zinc-500 dark:text-zinc-500"
              : "text-zinc-400 dark:text-zinc-600"
          }`}
        >
          {artist}
        </p>
      </div>

      <ButtercutHoverLinkDestinationHint href={songUrl} label="Spotify" />
    </a>
  );
}
