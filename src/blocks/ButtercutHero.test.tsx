import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ButtercutHero } from "./ButtercutHero";
import { BUTTERCUT_DEFAULT_SITE_CONFIG } from "@/lib/config/defaults";
import type { ButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { renderButtercutInlineMarkdown } from "@/lib/markdown/inline";

const demo: ButtercutDemoContent = {
  tagline: "Demo tagline",
  greeting: "Hello :)",
  subtitles: ["Subtitle one", "Subtitle two"],
  intro:
    "This is a **configurable** personal-site theme on Next.js. Site-wide settings live in `site.config.ts`; page copy lives under `content/demo/`.\n\n" +
    "The hero supports inline markdown — **bold**, `code`, and [links](https://example.com). Add or remove paragraphs freely; replace everything here with your own introduction.",
  about: {
    intro: "",
    education: [],
    experience: [],
    volunteering: [],
    focus: [],
  },
  projects: [],
  courseProjects: [],
  misc: {
    watching: [],
    remembrance: [],
    thingGroups: [],
    resources: [],
  },
};

describe("ButtercutHero — intro rendering", () => {
  const html = renderToStaticMarkup(
    <ButtercutHero config={BUTTERCUT_DEFAULT_SITE_CONFIG} demo={demo} />,
  );

  it("renders intro paragraphs from demo.intro", () => {
    expect(html).toContain("configurable");
    expect(html).toContain("content/demo/");
    expect(html).toContain("your own introduction");
  });

  it("renders bold-wrapped nav links from intro.md", () => {
    const navIntro =
      "**[Design](/design)** — principles, typography, tokens, layout. **[Components](/components)** — full component catalog.";
    const html = renderToStaticMarkup(
      <>{renderButtercutInlineMarkdown(navIntro)}</>,
    );
    expect(html).toContain('href="/design"');
    expect(html).toContain('href="/components"');
    expect(html).not.toContain("[Design](/design)");
  });

  it("renders a <code> chip for inline markdown paths", () => {
    expect(html).toMatch(/<code[^>]*>site\.config\.ts</);
  });
});

describe("ButtercutHero — product layout", () => {
  const productConfig = {
    ...BUTTERCUT_DEFAULT_SITE_CONFIG,
    home: { ...BUTTERCUT_DEFAULT_SITE_CONFIG.home, heroLayout: "product" as const },
  };

  it("omits avatar column and identity row", () => {
    const html = renderToStaticMarkup(
      <ButtercutHero config={productConfig} demo={demo} />,
    );
    expect(html).not.toContain("data-identity-row");
    expect(html).not.toContain("avatar-placeholder");
    expect(html).not.toContain("jump-letter");
  });

  it("renders intro copy and social links", () => {
    const html = renderToStaticMarkup(
      <ButtercutHero config={productConfig} demo={demo} />,
    );
    expect(html).toContain("configurable");
    expect(html).toContain("GitHub");
  });
});
