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
    "Buttercut is a **theme-first** Next.js starter: one typed `site.config.ts`, demo content under `content/demo/`, and optional integrations that stay off until you configure them.\n\n" +
    "I like building things for humans, and I enjoy shipping small tools that actually work.\n\n" +
    "Most days I'm tinkering with interfaces, automation, and whatever problem feels interesting this week.\n\n" +
    "This paragraph ships with the repo as sample copy — replace it with your own story.",
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
    expect(html).toContain("theme-first");
    expect(html).toContain("building things for humans");
    expect(html).toContain("replace it with your own story");
  });

  it("renders a <code> chip for inline markdown paths", () => {
    expect(html).toMatch(/<code[^>]*>site\.config\.ts</);
  });
});
