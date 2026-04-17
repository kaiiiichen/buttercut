import { describe, expect, it } from "vitest";
import { BUTTERCUT_SLUG_RE, loadButtercutDemoNote, parseFrontmatter } from "./load-demo-content";

describe("parseFrontmatter", () => {
  it("returns empty data when no frontmatter", () => {
    const result = parseFrontmatter("# Hello\n\nBody");
    expect(result.data).toEqual({});
    expect(result.content).toContain("# Hello");
  });

  it("parses key/value pairs and strips quotes", () => {
    const raw = `---\ntitle: "My note"\nsummary: short\ndate: 2026-04-10\n---\n# Body\n`;
    const result = parseFrontmatter(raw);
    expect(result.data).toEqual({
      title: "My note",
      summary: "short",
      date: "2026-04-10",
    });
    expect(result.content.trim()).toBe("# Body");
  });
});

describe("BUTTERCUT_SLUG_RE", () => {
  it("accepts simple slugs", () => {
    expect(BUTTERCUT_SLUG_RE.test("hello-world_01")).toBe(true);
  });

  it("rejects traversal and path separators", () => {
    for (const bad of ["../secret", "a/b", "a\\b", "a..b", "a.md", ""]) {
      expect(BUTTERCUT_SLUG_RE.test(bad)).toBe(false);
    }
  });
});

describe("loadButtercutDemoNote", () => {
  it("returns null for slugs that fail validation", async () => {
    expect(await loadButtercutDemoNote("../../package")).toBeNull();
    expect(await loadButtercutDemoNote("a/b")).toBeNull();
  });

  it("returns content for a legitimate slug", async () => {
    const note = await loadButtercutDemoNote("getting-started");
    expect(note).not.toBeNull();
    expect(note?.body.length).toBeGreaterThan(0);
  });
});
