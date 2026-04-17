import { describe, expect, it } from "vitest";
import { buildButtercutThemeStyle } from "./build-theme-style";
import {
  BUTTERCUT_THEME_PRESETS,
  buttercutPreset,
  listButtercutPresets,
} from "./presets";

describe("buttercutPreset", () => {
  it("exposes sunset / ocean / terminal", () => {
    expect(listButtercutPresets().sort()).toEqual(
      ["ocean", "sunset", "terminal"].sort(),
    );
  });

  it("returns a fresh object so overrides don't mutate the shared source", () => {
    const a = buttercutPreset("sunset");
    a.accent = "#000000";
    const b = buttercutPreset("sunset");
    expect(b.accent).toBe(BUTTERCUT_THEME_PRESETS.sunset.accent);
  });

  it("each preset defines every token buildButtercutThemeStyle reads", () => {
    const requiredKeys = [
      "accent",
      "accentDark",
      "background",
      "backgroundDark",
      "foreground",
      "foregroundDark",
    ] as const;
    for (const name of listButtercutPresets()) {
      const p = BUTTERCUT_THEME_PRESETS[name];
      for (const k of requiredKeys) {
        expect(p[k], `${name}.${k}`).toBeTypeOf("string");
        expect(p[k].length, `${name}.${k}`).toBeGreaterThan(0);
      }
    }
  });

  it("produces a non-empty stylesheet when fed to the builder", () => {
    for (const name of listButtercutPresets()) {
      const css = buildButtercutThemeStyle(buttercutPreset(name));
      expect(css).toContain(":root{");
      expect(css).toContain(".dark{");
      expect(css).toContain("--accent:");
      expect(css).toContain("--background:");
    }
  });
});
