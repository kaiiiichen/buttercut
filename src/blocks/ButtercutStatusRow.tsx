import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { ButtercutNowPlayingBlock } from "./ButtercutNowPlayingBlock";
import { ButtercutWeatherBlock } from "./ButtercutWeatherBlock";

/**
 * Mirrors the kaichen.dev home layout: Listening and Location share
 * one row (two columns on md+, stacked on mobile). Both children are
 * server components and fetch in parallel because React Server
 * Components await them independently.
 *
 * If you want them stacked (the pre-0.2 layout), drop `status` from
 * `home.blocks` and list `now_playing` and `weather` individually
 * instead.
 */
export async function ButtercutStatusRow(props: ButtercutBlockProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <ButtercutNowPlayingBlock {...props} />
      <ButtercutWeatherBlock {...props} />
    </div>
  );
}
