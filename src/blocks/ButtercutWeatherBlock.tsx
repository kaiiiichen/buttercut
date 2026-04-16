import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { fetchButtercutWeather } from "@/lib/integrations/weather";

function Placeholder({ reason }: { reason: string }) {
  return (
    <section className="mag-card">
      <div className="mag-label">Location</div>
      <p className="font-serif text-sm text-zinc-400 dark:text-zinc-600">{reason}</p>
    </section>
  );
}

export async function ButtercutWeatherBlock({ config }: ButtercutBlockProps) {
  const integration = config.integrations.weather;

  if (!integration.enabled) {
    return <Placeholder reason="Weather integration disabled in site.config.ts." />;
  }
  if (integration.lat === undefined || integration.lon === undefined) {
    return (
      <Placeholder reason="Add integrations.weather.lat and .lon in site.config.ts to enable the forecast." />
    );
  }

  const forecast = await fetchButtercutWeather({
    lat: integration.lat,
    lon: integration.lon,
    timezone: integration.timezone,
  });

  if (!forecast) {
    return <Placeholder reason="Weather service is unavailable right now." />;
  }

  return (
    <section className="mag-card">
      <div className="mag-label">Location</div>
      <div className="flex items-center gap-4">
        <span className="text-4xl leading-none" aria-hidden="true">
          {forecast.emoji}
        </span>
        <div className="min-w-0">
          <p className="font-serif text-base font-semibold italic text-zinc-900 dark:text-zinc-100">
            {forecast.temperature}°C · {forecast.condition}
          </p>
          <p className="font-serif text-sm text-zinc-500 dark:text-zinc-400">
            {integration.label ?? `${integration.lat.toFixed(2)}, ${integration.lon.toFixed(2)}`}
            {" · "}
            {forecast.rainChance}% rain next 3h
          </p>
        </div>
      </div>
    </section>
  );
}
