import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { BUTTERCUT_GUIDE_ANCHOR_IDS } from "@/lib/guide/anchors";

const GUIDE_HTML_PATH = path.join(
  process.cwd(),
  ".next",
  "server",
  "app",
  "guide.html",
);

/**
 * This suite runs against the production build artifact, so a fresh
 * checkout (or a pre-build CI step) won't have the file yet. We skip
 * rather than fail — CI runs a dedicated `test:smoke` step after
 * `npm run build` where the file is guaranteed to exist.
 */
const hasBuild = fs.existsSync(GUIDE_HTML_PATH);

describe.skipIf(!hasBuild)("/guide anchor smoke test", () => {
  const html = hasBuild ? fs.readFileSync(GUIDE_HTML_PATH, "utf8") : "";

  it("renders the 'On this page' TOC", () => {
    expect(html).toContain("On this page");
  });

  for (const id of BUTTERCUT_GUIDE_ANCHOR_IDS) {
    it(`emits <section id="${id}"> in the prerendered guide`, () => {
      const sectionRe = new RegExp(`<section[^>]*\\sid="${id}"`);
      expect(html).toMatch(sectionRe);
    });

    it(`links #${id} from at least the TOC and a section permalink`, () => {
      const hrefRe = new RegExp(`href="#${id}"`, "g");
      const count = (html.match(hrefRe) ?? []).length;
      // One from the TOC + one permalink = minimum two occurrences.
      expect(count).toBeGreaterThanOrEqual(2);
    });
  }
});
