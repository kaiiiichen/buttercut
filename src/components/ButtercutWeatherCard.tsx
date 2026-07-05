"use client";

import { useEffect, useState } from "react";
import type { ButtercutWeatherForecast } from "@/lib/integrations/weather";
import { ButtercutLocalTime } from "./ButtercutLocalTime";
import { ButtercutWeatherIllustration } from "./ButtercutWeatherIllustration";

type ButtercutWeatherCardProps = {
  locationLabel: string;
  locationSuffix?: string;
  timezone: string;
  initialWeather?: ButtercutWeatherForecast | null;
};

export function ButtercutWeatherCard({
  locationLabel,
  locationSuffix,
  timezone,
  initialWeather = null,
}: ButtercutWeatherCardProps) {
  const [w, setW] = useState<ButtercutWeatherForecast | null>(initialWeather);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (initialWeather) return;
    fetch("/api/weather")
      .then((r) => (r.ok ? r.json() : null))
      .then(setW)
      .catch(() => {});
  }, [initialWeather]);

  const displayTemp = w
    ? isCelsius
      ? `${w.temperature}°C`
      : `${Math.round((w.temperature * 9) / 5 + 32)}°F`
    : "—°";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p
          style={{
            fontFamily: "var(--font-ui-en)",
            fontWeight: 400,
            fontSize: 14,
            letterSpacing: "0.02em",
          }}
          className="leading-[1.1] text-zinc-600 dark:text-zinc-400"
        >
          {locationLabel}{" "}
          {locationSuffix ? (
            <span className="text-zinc-400 dark:text-zinc-600">{locationSuffix}</span>
          ) : null}
        </p>
        <p
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 14 }}
          className="leading-none text-zinc-300 dark:text-zinc-600"
        >
          <ButtercutLocalTime timezone={timezone} />
        </p>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex items-start">
          <div style={{ width: 110, flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => setIsCelsius((v) => !v)}
              style={{
                fontFamily: "var(--font-ui-en)",
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: "-0.01em",
              }}
              className="cursor-pointer border-none bg-transparent p-0 text-left leading-none text-zinc-800 transition-colors duration-150 hover:text-[#C4894F] dark:text-zinc-200 dark:hover:text-[#D9A870]"
              aria-label={`Switch to ${isCelsius ? "Fahrenheit" : "Celsius"}`}
            >
              {displayTemp}
            </button>
          </div>
          <div className="flex flex-col gap-0" style={{ marginLeft: 6, marginTop: 2 }}>
            <p
              style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 18 }}
              className="leading-none text-zinc-400 dark:text-zinc-500"
            >
              {w ? w.condition : "—"}
            </p>
          </div>
        </div>
        <div
          style={{ width: 84, height: 58, flexShrink: 0 }}
          className="text-zinc-400 dark:text-zinc-600"
        >
          <ButtercutWeatherIllustration weatherCode={w?.weatherCode ?? 3} />
        </div>
      </div>

      <div className="flex min-w-0 items-center">
        <span
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 14 }}
          className="truncate leading-none tracking-[0.08em] text-zinc-400 dark:text-zinc-600"
        >
          {w
            ? `feels ${isCelsius ? `${w.feelsLike}°C` : `${Math.round((w.feelsLike * 9) / 5 + 32)}°F`} · humidity ${w.humidity}% · rain ${w.rainChance}%`
            : "Feels — · Humidity — · Rain —"}
        </span>
      </div>
    </div>
  );
}
