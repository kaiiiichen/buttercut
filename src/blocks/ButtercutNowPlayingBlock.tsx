import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { fetchButtercutNowPlaying } from "@/lib/integrations/lastfm";

function Placeholder({ reason }: { reason: string }) {
  return (
    <section className="mag-card">
      <div className="mag-label">Listening</div>
      <p className="font-serif text-sm text-zinc-400 dark:text-zinc-600">{reason}</p>
    </section>
  );
}

export async function ButtercutNowPlayingBlock({ config }: ButtercutBlockProps) {
  const integration = config.integrations.lastfm;

  if (!integration.enabled) {
    return <Placeholder reason="Last.fm integration disabled in site.config.ts." />;
  }
  if (!integration.username) {
    return <Placeholder reason="Add a Last.fm username in site.config.ts to enable Now Playing." />;
  }
  if (!process.env.LASTFM_API_KEY) {
    return <Placeholder reason="Add LASTFM_API_KEY to your environment to enable Now Playing." />;
  }

  const track = await fetchButtercutNowPlaying({
    username: integration.username,
    apiKey: process.env.LASTFM_API_KEY,
  });

  if (!track) {
    return <Placeholder reason="Last.fm is quiet right now. Play something and refresh." />;
  }

  return (
    <section className="mag-card">
      <div className="mag-label">{track.isPlaying ? "Listening" : "Last played"}</div>
      <div className="flex items-center gap-4">
        {track.albumArt ? (
          // Remote host not in next.config.ts images list; plain <img> is intentional.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={track.albumArt}
            alt={track.album ? `${track.album} cover` : ""}
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 rounded-sm border border-zinc-200 object-cover dark:border-zinc-700"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-14 w-14 rounded-sm border border-dashed border-zinc-300 dark:border-zinc-700"
          />
        )}
        <div className="min-w-0">
          <p className="font-serif text-base font-semibold italic text-zinc-900 dark:text-zinc-100">
            {track.title || "Unknown track"}
          </p>
          <p className="font-serif text-sm text-zinc-500 dark:text-zinc-400">
            {track.artist || "Unknown artist"}
          </p>
        </div>
      </div>
    </section>
  );
}
