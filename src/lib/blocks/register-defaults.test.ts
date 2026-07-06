import { describe, expect, it } from "vitest";
import { registerButtercutDefaultBlocks } from "./register-defaults";
import { getButtercutBlock, listButtercutBlocks } from "./registry";

describe("registerButtercutDefaultBlocks", () => {
  it("registers every built-in block id synchronously", () => {
    registerButtercutDefaultBlocks();
    for (const id of [
      "hero",
      "showcase_explore",
      "status",
      "demo_projects",
      "integrations",
      "now_playing",
      "weather",
      "showcase_features",
      "showcase_block_previews",
      "showcase_use_cases",
      "showcase_cta",
    ]) {
      expect(getButtercutBlock(id)).toBeDefined();
    }
    expect(listButtercutBlocks().length).toBeGreaterThanOrEqual(10);
  });

  it("is idempotent", () => {
    const before = listButtercutBlocks().length;
    registerButtercutDefaultBlocks();
    registerButtercutDefaultBlocks();
    expect(listButtercutBlocks().length).toBe(before);
  });
});
