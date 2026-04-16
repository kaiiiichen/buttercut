export type ButtercutLastFmImageEntry = { size: string; "#text": string };

export type ButtercutLastFmRawTrack = {
  name?: string;
  artist?: { "#text"?: string } | string;
  album?: { "#text"?: string } | string;
  image?: ButtercutLastFmImageEntry[];
  "@attr"?: { nowplaying?: string };
  date?: { uts?: string };
};

export type ButtercutNowPlayingResult = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
};

const PLAYING_WINDOW_MS = 5 * 60 * 1000;
const PLACEHOLDER_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

/** True if track is "nowplaying" OR scrobbled within the last 5 minutes. */
export function isButtercutLastFmTrackPlaying(
  track: ButtercutLastFmRawTrack,
  now: Date,
): boolean {
  const isNowPlaying = track["@attr"]?.nowplaying === "true";
  const lastScrobbleTime = track.date?.uts
    ? parseInt(track.date.uts, 10) * 1000
    : 0;
  const isRecentlyPlayed =
    lastScrobbleTime > now.getTime() - PLAYING_WINDOW_MS;
  return isNowPlaying || isRecentlyPlayed;
}

/** Picks best Last.fm image size and strips the default placeholder art URL. */
export function pickButtercutAlbumArt(
  images: ButtercutLastFmImageEntry[] | undefined,
): string {
  const art =
    images?.find((i) => i.size === "extralarge")?.["#text"] ||
    images?.find((i) => i.size === "large")?.["#text"] ||
    images?.find((i) => i.size === "medium")?.["#text"] ||
    "";
  if (art.includes(PLACEHOLDER_HASH)) return "";
  return art;
}

function extractString(field: { "#text"?: string } | string | undefined): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field["#text"] ?? "";
}

export function parseButtercutLastFmTrack(
  track: ButtercutLastFmRawTrack,
  now: Date = new Date(),
): ButtercutNowPlayingResult {
  return {
    isPlaying: isButtercutLastFmTrackPlaying(track, now),
    title: track.name ?? "",
    artist: extractString(track.artist),
    album: extractString(track.album),
    albumArt: pickButtercutAlbumArt(track.image),
  };
}

/**
 * Fetch the most recent/now-playing track for a Last.fm user. Returns
 * `null` when disabled, unconfigured, or on any error.
 */
export async function fetchButtercutNowPlaying(opts: {
  username: string | undefined;
  apiKey?: string | undefined;
}): Promise<ButtercutNowPlayingResult | null> {
  const apiKey = opts.apiKey ?? process.env.LASTFM_API_KEY;
  const username = opts.username;
  if (!apiKey || !username) return null;

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      username,
    )}&api_key=${apiKey}&format=json&limit=1`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      recenttracks?: { track?: ButtercutLastFmRawTrack[] };
    };
    const track = json.recenttracks?.track?.[0];
    if (!track) return null;
    return parseButtercutLastFmTrack(track);
  } catch {
    return null;
  }
}
