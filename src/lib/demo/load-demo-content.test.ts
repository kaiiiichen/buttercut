import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "./load-demo-content";

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
