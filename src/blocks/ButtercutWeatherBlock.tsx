import { ButtercutWeatherCard } from "@/components/ButtercutWeatherCard";
import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { fetchButtercutWeather } from "@/lib/integrations/weather";

export async function ButtercutWeatherBlock({ config }: ButtercutBlockProps) {
  const integration = config.integrations.weather;
  const enabled =
    integration.enabled &&
    integration.lat !== undefined &&
    integration.lon !== undefined;

  const label = integration.label ?? "San Francisco";
  const suffix = enabled ? "· CA" : "· —";
  const timezone = integration.timezone ?? "America/Los_Angeles";

  const initialWeather = enabled
    ? await fetchButtercutWeather({
        lat: integration.lat,
        lon: integration.lon,
        timezone: integration.timezone,
      })
    : null;

  return (
    <section className="mag-card">
      <div className="mag-label">Location</div>
      <ButtercutWeatherCard
        locationLabel={label}
        locationSuffix={suffix}
        timezone={timezone}
        initialWeather={initialWeather}
      />
    </section>
  );
}
