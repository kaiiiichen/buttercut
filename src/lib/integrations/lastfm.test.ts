import { describe, expect, it } from "vitest";
import {
  isButtercutLastFmTrackPlaying,
  parseButtercutLastFmTrack,
  pickButtercutAlbumArt,
} from "./lastfm";

describe("isButtercutLastFmTrackPlaying", () => {
  const NOW = new Date("2026-04-16T12:00:00Z");

  it("returns true for nowplaying", () => {
    expect(
      isButtercutLastFmTrackPlaying({ "@attr": { nowplaying: "true" } }, NOW),
    ).toBe(true);
  });

  it("returns true when scrobbled in the last 5 minutes", () => {
    const uts = Math.floor((NOW.getTime() - 60_000) / 1000).toString();
    expect(isButtercutLastFmTrackPlaying({ date: { uts } }, NOW)).toBe(true);
  });

  it("returns false for old scrobbles", () => {
    const uts = Math.floor((NOW.getTime() - 10 * 60 * 1000) / 1000).toString();
    expect(isButtercutLastFmTrackPlaying({ date: { uts } }, NOW)).toBe(false);
  });
});

describe("pickButtercutAlbumArt", () => {
  it("prefers extralarge", () => {
    expect(
      pickButtercutAlbumArt([
        { size: "small", "#text": "s.jpg" },
        { size: "extralarge", "#text": "xl.jpg" },
        { size: "large", "#text": "l.jpg" },
      ]),
    ).toBe("xl.jpg");
  });

  it("drops the placeholder hash", () => {
    expect(
      pickButtercutAlbumArt([
        {
          size: "extralarge",
          "#text": "https://cdn/2a96cbd8b46e442fc41c2b86b821562f.png",
        },
      ]),
    ).toBe("");
  });

  it("returns empty string when missing", () => {
    expect(pickButtercutAlbumArt(undefined)).toBe("");
  });
});

describe("parseButtercutLastFmTrack", () => {
  it("extracts string + object forms of artist/album", () => {
    const NOW = new Date("2026-04-16T12:00:00Z");
    const parsed = parseButtercutLastFmTrack(
      {
        name: "Track",
        artist: { "#text": "Artist" },
        album: { "#text": "Album" },
        image: [{ size: "large", "#text": "art.jpg" }],
        "@attr": { nowplaying: "true" },
      },
      NOW,
    );
    expect(parsed.title).toBe("Track");
    expect(parsed.artist).toBe("Artist");
    expect(parsed.album).toBe("Album");
    expect(parsed.albumArt).toBe("art.jpg");
    expect(parsed.isPlaying).toBe(true);
  });
});
