import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ButtercutHero } from "./ButtercutHero";
import { BUTTERCUT_DEFAULT_SITE_CONFIG } from "@/lib/config/defaults";
import type { ButtercutDemoContent } from "@/lib/demo/load-demo-content";

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

  it("renders a <code> chip for inline markdown paths", () => {
    expect(html).toMatch(/<code[^>]*>site\.config\.ts</);
  });
});
