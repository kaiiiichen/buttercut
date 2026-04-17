import type { ButtercutThemeTokens } from "@/lib/config/types";

export type ButtercutPresetName = "sunset" | "ocean" | "terminal";

/**
 * Hand-tuned token sets for the most common Buttercut moods. Each preset
 * sets every token `buildButtercutThemeStyle` reads, so switching presets
 * is visually complete — no orphaned defaults bleeding through.
 *
 * Values are deliberately plain hex so they are easy to diff and to
 * copy out as a starting point for a custom palette.
 */
export const BUTTERCUT_THEME_PRESETS: Record<
  ButtercutPresetName,
  Required<ButtercutThemeTokens>
> = {
  sunset: {
    accent: "#ff6f3c",
    accentDark: "#ffa07a",
    background: "#fff7ee",
    backgroundDark: "#1c140e",
    foreground: "#1f130b",
    foregroundDark: "#f6ece1",
  },
  ocean: {
    accent: "#0b6ea4",
    accentDark: "#7dd3fc",
    background: "#f2f7fb",
    backgroundDark: "#0b1e2b",
    foreground: "#0b2a3c",
    foregroundDark: "#e2f1fb",
  },
  terminal: {
    accent: "#10b981",
    accentDark: "#6ee7b7",
    background: "#0a0a0a",
    backgroundDark: "#0a0a0a",
    foreground: "#e5e7eb",
    foregroundDark: "#e5e7eb",
  },
} as const;

/**
 * Look up a preset by name. Returns a fresh `ButtercutThemeTokens`
 * object so callers can spread extra overrides on top without
 * mutating the shared source:
 *
 * ```ts
 * brand: {
 *   theme: { ...buttercutPreset("sunset"), accent: "#ff3366" },
 * }
 * ```
 */
export function buttercutPreset(name: ButtercutPresetName): ButtercutThemeTokens {
  return { ...BUTTERCUT_THEME_PRESETS[name] };
}

export function listButtercutPresets(): ButtercutPresetName[] {
  return Object.keys(BUTTERCUT_THEME_PRESETS) as ButtercutPresetName[];
}
