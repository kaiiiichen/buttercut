import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ButtercutHero } from "./ButtercutHero";
import { BUTTERCUT_DEFAULT_SITE_CONFIG } from "@/lib/config/defaults";
import type { ButtercutDemoContent } from "@/lib/demo/load-demo-content";

const demo: ButtercutDemoContent = {
  tagline: "Demo tagline",
  intro:
    "Buttercut is a **theme-first** Next.js starter: one typed `site.config.ts`, " +
    "demo content under `content/demo/`, and [integrations](https://example.com) " +
    "that stay off until you configure them.",
  about: {
    intro: "",
    education: [],
    experience: [],
    volunteering: [],
    focus: [],
  },
  projects: [],
  notes: [],
};

/**
 * Snapshot-lock: the hero renders `site.config.ts` as a real `<code>` chip
 * from inline markdown in `content/demo/intro.md`. If this test ever fails
 * it means a future refactor either stopped running the hero body through
 * `renderButtercutInlineMarkdown` or accidentally removed the demo phrase.
 */
describe("ButtercutHero — inline markdown snapshot lock", () => {
  const html = renderToStaticMarkup(
    <ButtercutHero config={BUTTERCUT_DEFAULT_SITE_CONFIG} demo={demo} />,
  );

  it("renders a <code> chip for `site.config.ts`", () => {
    expect(html).toMatch(/<code[^>]*>site\.config\.ts</);
  });

  it("renders <strong> for **theme-first**", () => {
    expect(html).toMatch(/<strong[^>]*>theme-first<\/strong>/);
  });

  it("renders <a href=…> for markdown links", () => {
    expect(html).toMatch(
      /<a[^>]*href="https:\/\/example\.com"[^>]*>integrations<\/a>/,
    );
  });

  it("does not leak raw backticks into the output", () => {
    expect(html).not.toMatch(/`site\.config\.ts`/);
  });
});
