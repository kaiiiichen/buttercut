import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { ButtercutNowPlayingBlock } from "./ButtercutNowPlayingBlock";
import { ButtercutWeatherBlock } from "./ButtercutWeatherBlock";

/**
 * Mirrors the kaichen.dev home layout: Listening and Location share
 * one row (two columns on md+, stacked on mobile).
 */
export async function ButtercutStatusRow(props: ButtercutBlockProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <ButtercutNowPlayingBlock {...props} />
      <ButtercutWeatherBlock {...props} />
    </div>
  );
}
