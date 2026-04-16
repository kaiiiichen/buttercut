const WMO: Record<number, { emoji: string; condition: string }> = {
  0: { emoji: "☀️", condition: "Clear" },
  1: { emoji: "🌤️", condition: "Mainly clear" },
  2: { emoji: "⛅", condition: "Partly cloudy" },
  3: { emoji: "☁️", condition: "Overcast" },
  45: { emoji: "🌫️", condition: "Fog" },
  48: { emoji: "🌫️", condition: "Icy fog" },
  51: { emoji: "🌦️", condition: "Light drizzle" },
  53: { emoji: "🌦️", condition: "Drizzle" },
  55: { emoji: "🌦️", condition: "Heavy drizzle" },
  61: { emoji: "🌧️", condition: "Light rain" },
  63: { emoji: "🌧️", condition: "Rain" },
  65: { emoji: "🌧️", condition: "Heavy rain" },
  71: { emoji: "🌨️", condition: "Light snow" },
  73: { emoji: "🌨️", condition: "Snow" },
  75: { emoji: "🌨️", condition: "Heavy snow" },
  80: { emoji: "🌧️", condition: "Rain showers" },
  81: { emoji: "🌧️", condition: "Rain showers" },
  82: { emoji: "⛈️", condition: "Violent showers" },
  95: { emoji: "⛈️", condition: "Thunderstorm" },
  96: { emoji: "⛈️", condition: "Thunderstorm" },
  99: { emoji: "⛈️", condition: "Thunderstorm" },
};

export type ButtercutOpenMeteoPayload = {
  current: { temperature_2m: number; weathercode: number };
  hourly: {
    time: string[];
    precipitation_probability: (number | null)[];
  };
};

export type ButtercutWeatherForecast = {
  temperature: number;
  weatherCode: number;
  emoji: string;
  condition: string;
  rainChance: number;
};

export function parseButtercutOpenMeteo(
  data: ButtercutOpenMeteoPayload,
  now: Date = new Date(),
): ButtercutWeatherForecast {
  const temperature = Math.round(data.current.temperature_2m);
  const weatherCode = data.current.weathercode;
  const { emoji, condition } =
    WMO[weatherCode] ?? { emoji: "🌡️", condition: "Unknown" };

  const nowHour = now.toISOString().slice(0, 13);
  const times = data.hourly.time;
  const probs = data.hourly.precipitation_probability;
  const idx = times.findIndex((t) => t.startsWith(nowHour));
  const windowProbs = idx >= 0 ? probs.slice(idx, idx + 3) : probs.slice(0, 3);
  const rainChance = Math.max(0, ...windowProbs.map((p) => p ?? 0));

  return { temperature, weatherCode, emoji, condition, rainChance };
}

/**
 * Fetch current weather + next-3-hour rain chance from Open-Meteo.
 * Returns `null` if coords are missing or the request fails.
 */
export async function fetchButtercutWeather(opts: {
  lat: number | undefined;
  lon: number | undefined;
  timezone?: string;
}): Promise<ButtercutWeatherForecast | null> {
  if (opts.lat === undefined || opts.lon === undefined) return null;
  const tz = opts.timezone ?? "auto";
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${opts.lat}` +
    `&longitude=${opts.lon}` +
    "&current=temperature_2m,weathercode" +
    "&hourly=precipitation_probability" +
    "&temperature_unit=celsius" +
    `&timezone=${encodeURIComponent(tz)}` +
    "&forecast_days=1";

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    const data = (await res.json()) as ButtercutOpenMeteoPayload;
    return parseButtercutOpenMeteo(data);
  } catch {
    return null;
  }
}
