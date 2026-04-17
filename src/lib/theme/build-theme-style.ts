import type { ButtercutThemeTokens } from "@/lib/config/types";

/** Reject characters that would let a token escape the CSS string context. */
const SAFE_COLOR = /^[#A-Za-z0-9.,%()/ \-+*_]+$/;

function sanitize(value: string | undefined): string | null {
  if (!value) return null;
  const v = value.trim();
  if (v.length === 0 || v.length > 80) return null;
  if (!SAFE_COLOR.test(v)) return null;
  return v;
}

type CssDeclaration = { variable: string; value: string };

/**
 * Build a small `<style>` body that overrides the CSS custom properties
 * from `src/app/globals.css`. Returns an empty string when nothing is
 * overridden so there is no stylesheet noise.
 */
export function buildButtercutThemeStyle(
  theme: ButtercutThemeTokens | undefined,
): string {
  if (!theme) return "";

  const root: CssDeclaration[] = [];
  const dark: CssDeclaration[] = [];

  const accent = sanitize(theme.accent);
  if (accent) root.push({ variable: "--accent", value: accent });

  const accentDark = sanitize(theme.accentDark);
  if (accentDark) dark.push({ variable: "--accent", value: accentDark });

  const background = sanitize(theme.background);
  if (background) root.push({ variable: "--background", value: background });

  const backgroundDark = sanitize(theme.backgroundDark);
  if (backgroundDark) dark.push({ variable: "--background", value: backgroundDark });

  const foreground = sanitize(theme.foreground);
  if (foreground) root.push({ variable: "--foreground", value: foreground });

  const foregroundDark = sanitize(theme.foregroundDark);
  if (foregroundDark) dark.push({ variable: "--foreground", value: foregroundDark });

  const sections: string[] = [];
  if (root.length > 0) {
    sections.push(
      `:root{${root.map((d) => `${d.variable}:${d.value};`).join("")}}`,
    );
  }
  if (dark.length > 0) {
    sections.push(
      `.dark{${dark.map((d) => `${d.variable}:${d.value};`).join("")}}`,
    );
  }
  return sections.join("");
}
