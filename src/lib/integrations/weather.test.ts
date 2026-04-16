import { describe, expect, it } from "vitest";
import { parseButtercutOpenMeteo } from "./weather";

describe("parseButtercutOpenMeteo", () => {
  it("maps weathercode and max rain chance over the next 3h", () => {
    const parsed = parseButtercutOpenMeteo(
      {
        current: { temperature_2m: 18.3, weathercode: 3 },
        hourly: {
          time: [
            "2026-04-16T12:00",
            "2026-04-16T13:00",
            "2026-04-16T14:00",
            "2026-04-16T15:00",
          ],
          precipitation_probability: [10, 40, 70, 20],
        },
      },
      new Date("2026-04-16T12:30:00Z"),
    );
    expect(parsed.temperature).toBe(18);
    expect(parsed.condition).toBe("Overcast");
    expect(parsed.rainChance).toBe(70);
  });

  it("handles nulls in probability array", () => {
    const parsed = parseButtercutOpenMeteo(
      {
        current: { temperature_2m: 20, weathercode: 99999 },
        hourly: {
          time: ["2026-04-16T12:00"],
          precipitation_probability: [null],
        },
      },
      new Date("2026-04-16T12:00:00Z"),
    );
    expect(parsed.condition).toBe("Unknown");
    expect(parsed.rainChance).toBe(0);
  });
});
