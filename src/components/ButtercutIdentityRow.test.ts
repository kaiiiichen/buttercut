import { describe, expect, it } from "vitest";
import {
  GRID_RULE_GAP_PX,
  INTRO_MID_GAP_PX,
  MIN_AVATAR_PX,
  MIN_ZONE_GAP_PX,
  computeRowLayout,
} from "./ButtercutIdentityRow";

describe("computeRowLayout", () => {
  it("uses full column width for avatar when intro is short", () => {
    const layout = computeRowLayout(80, 120, 48, 320);
    expect(layout.avatarPx).toBe(320);
  });

  it("caps avatar at column width even when intro content is very tall", () => {
    const layout = computeRowLayout(80, 600, 48, 320);
    expect(layout.avatarPx).toBe(320);
  });

  it("never shrinks avatar below MIN_AVATAR_PX", () => {
    const layout = computeRowLayout(40, 40, 80, 120);
    expect(layout.avatarPx).toBe(MIN_AVATAR_PX);
  });

  it("uses INTRO_MID_GAP_PX between name and greeting when intro drives height", () => {
    const nameHeight = 100;
    const greetingHeight = 100;
    const layout = computeRowLayout(nameHeight, greetingHeight, 48, 120);
    expect(layout.introGaps.mid).toBe(INTRO_MID_GAP_PX);
    expect(layout.introGaps.top).toBe(0);
    expect(layout.introGaps.bottom).toBe(0);
  });

  it("distributes extra vertical space evenly on intro when left column is taller", () => {
    const layout = computeRowLayout(80, 120, 48, 320);
    const { top, mid, bottom } = layout.introGaps;
    expect(top).toBeGreaterThan(0);
    expect(mid).toBeGreaterThan(INTRO_MID_GAP_PX);
    expect(bottom).toBeGreaterThan(0);
    expect(Math.abs(top - mid)).toBeLessThan(1);
    expect(Math.abs(mid - bottom)).toBeLessThan(1);
  });

  it("keeps left column zone gaps at MIN_ZONE_GAP_PX minimum", () => {
    const layout = computeRowLayout(80, 120, 48, 320);
    expect(layout.leftGaps.top).toBeGreaterThanOrEqual(MIN_ZONE_GAP_PX);
    expect(layout.leftGaps.mid).toBeGreaterThanOrEqual(MIN_ZONE_GAP_PX);
    expect(layout.leftGaps.bottom).toBeGreaterThanOrEqual(
      MIN_ZONE_GAP_PX - GRID_RULE_GAP_PX,
    );
  });
});
