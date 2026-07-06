import { describe, expect, it } from "vitest";
import { loadButtercutDemoContent } from "./load-demo-content";

describe("loadButtercutDemoContent", () => {
  it("loads showcase content from content/demo/", async () => {
    const demo = await loadButtercutDemoContent();
    expect(demo.intro).toContain("open-source");
    expect(demo.intro).toContain("documents the theme");
    expect(demo.greeting).toBe("");
  });
});
