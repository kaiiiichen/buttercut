import { describe, expect, it } from "vitest";
import { __buttercutGenerateSyntheticWeeks as generate } from "./ButtercutGitHubActivity";

const FIXED_NOW = new Date("2026-04-16T12:00:00Z");

describe("ButtercutGitHubActivity — synthetic data generator", () => {
  it("returns the requested number of weeks × 7 days", () => {
    const { weeks } = generate(52, 0x1f3b5c9a, FIXED_NOW);
    expect(weeks).toHaveLength(52);
    for (const week of weeks) {
      expect(week).toHaveLength(7);
    }
  });

  it("is deterministic for a given seed + anchor date", () => {
    const a = generate(52, 0x1f3b5c9a, FIXED_NOW);
    const b = generate(52, 0x1f3b5c9a, FIXED_NOW);
    expect(a.total).toBe(b.total);
    expect(a.weeks.map((w) => w.map((d) => d.count))).toEqual(
      b.weeks.map((w) => w.map((d) => d.count)),
    );
  });

  it("changes when the seed changes", () => {
    const a = generate(52, 1, FIXED_NOW);
    const b = generate(52, 2, FIXED_NOW);
    expect(a.total).not.toBe(b.total);
  });

  it("ends on the Saturday of the current week", () => {
    const { weeks } = generate(52, 0x1f3b5c9a, FIXED_NOW);
    const lastDay = weeks[weeks.length - 1]![6]!;
    const parsed = new Date(lastDay.date + "T00:00:00Z");
    expect(parsed.getUTCDay()).toBe(6);
  });

  it("keeps every count in a reasonable range", () => {
    const { weeks } = generate(52, 0x1f3b5c9a, FIXED_NOW);
    for (const week of weeks) {
      for (const day of week) {
        expect(day.count).toBeGreaterThanOrEqual(0);
        expect(day.count).toBeLessThan(25);
      }
    }
  });

  it("produces different data on consecutive days when the seed rotates", () => {
    // Emulates the `seed="daily"` code path: derive a seed from the
    // UTC date, generate, then roll the date forward one day and check
    // the resulting grids are not identical.
    const dateToSeed = (d: Date) =>
      d
        .toISOString()
        .slice(0, 10)
        .split("-")
        .reduce((acc, p) => acc * 31 + Number(p), 0) >>> 0;

    const today = FIXED_NOW;
    const tomorrow = new Date(FIXED_NOW);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const a = generate(52, dateToSeed(today), today);
    const b = generate(52, dateToSeed(tomorrow), tomorrow);

    const flat = (x: typeof a) => x.weeks.flatMap((w) => w.map((d) => d.count));
    expect(flat(a)).not.toEqual(flat(b));
  });
});
