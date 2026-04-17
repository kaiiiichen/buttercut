import { describe, expect, it } from "vitest";
import { registerButtercutDefaultBlocks } from "./register-defaults";
import { getButtercutBlock, listButtercutBlocks } from "./registry";

describe("registerButtercutDefaultBlocks", () => {
  it("registers every built-in block id synchronously", () => {
    registerButtercutDefaultBlocks();
    for (const id of [
      "hero",
      "status",
      "demo_projects",
      "integrations",
      "now_playing",
      "weather",
    ]) {
      expect(getButtercutBlock(id)).toBeDefined();
    }
    expect(listButtercutBlocks().length).toBeGreaterThanOrEqual(6);
  });

  it("is idempotent", () => {
    const before = listButtercutBlocks().length;
    registerButtercutDefaultBlocks();
    registerButtercutDefaultBlocks();
    expect(listButtercutBlocks().length).toBe(before);
  });
});
