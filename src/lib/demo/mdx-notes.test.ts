import { describe, expect, it } from "vitest";
import {
  BUTTERCUT_MDX_NOTES,
  listButtercutMdxNoteSlugs,
  loadButtercutMdxNote,
} from "./mdx-notes";

describe("MDX notes registry", () => {
  it("exposes every registered slug", () => {
    const slugs = listButtercutMdxNoteSlugs();
    expect(slugs).toEqual(Object.keys(BUTTERCUT_MDX_NOTES));
  });

  it("ships a welcome-mdx demo entry", () => {
    expect(listButtercutMdxNoteSlugs()).toContain("welcome-mdx");
  });

  it("returns null for unknown slugs without touching loaders", async () => {
    const result = await loadButtercutMdxNote("does-not-exist");
    expect(result).toBeNull();
  });
});
