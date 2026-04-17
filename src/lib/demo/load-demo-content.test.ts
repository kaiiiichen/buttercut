import { describe, expect, it } from "vitest";
import {
  BUTTERCUT_SLUG_RE,
  normaliseButtercutProject,
} from "./load-demo-content";

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

describe("normaliseButtercutProject", () => {
  it("keeps an explicit href", () => {
    const p = normaliseButtercutProject({
      name: "x",
      description: "",
      tags: [],
      href: "https://example.com",
      repo: "owner/name",
    });
    expect(p.href).toBe("https://example.com");
  });

  it("auto-links to github.com/<repo> when href is missing", () => {
    const p = normaliseButtercutProject({
      name: "buttercut",
      description: "",
      tags: [],
      repo: "kaiiiichen/buttercut",
    });
    expect(p.href).toBe("https://github.com/kaiiiichen/buttercut");
  });

  it("falls back to '#' when neither href nor a valid repo is provided", () => {
    const p = normaliseButtercutProject({
      name: "x",
      description: "",
      tags: [],
    });
    expect(p.href).toBe("#");
  });

  it("rejects malformed repo strings and falls back to '#'", () => {
    const p = normaliseButtercutProject({
      name: "x",
      description: "",
      tags: [],
      repo: "not a repo",
    });
    expect(p.href).toBe("#");
  });
});
