import { describe, expect, it } from "vitest";
import { buildButtercutThemeStyle } from "./build-theme-style";

describe("buildButtercutThemeStyle", () => {
  it("returns empty string when theme is undefined", () => {
    expect(buildButtercutThemeStyle(undefined)).toBe("");
  });

  it("returns empty string when theme has no valid tokens", () => {
    expect(buildButtercutThemeStyle({})).toBe("");
  });

  it("emits :root declarations for light-mode tokens", () => {
    const css = buildButtercutThemeStyle({
      accent: "#FF6600",
      foreground: "rgb(20, 20, 20)",
    });
    expect(css).toContain(":root{");
    expect(css).toContain("--accent:#FF6600;");
    expect(css).toContain("--foreground:rgb(20, 20, 20);");
    expect(css).not.toContain(".dark{");
  });

  it("emits .dark declarations for dark-mode tokens", () => {
    const css = buildButtercutThemeStyle({
      accentDark: "#FFAA66",
      backgroundDark: "#111",
    });
    expect(css).toContain(".dark{");
    expect(css).toContain("--accent:#FFAA66;");
    expect(css).toContain("--background:#111;");
  });

  it("rejects values with suspicious characters", () => {
    const css = buildButtercutThemeStyle({
      accent: "red;}body{background:url(javascript:...)",
    });
    expect(css).toBe("");
  });

  it("rejects overly long values", () => {
    const css = buildButtercutThemeStyle({
      accent: "a".repeat(120),
    });
    expect(css).toBe("");
  });
});
