import { NextResponse } from "next/server";
import { siteConfig } from "../../../../site.config";
import { parseButtercutOpenMeteo } from "@/lib/integrations/weather";

export const revalidate = 600;

export async function GET() {
  const integration = siteConfig.integrations.weather;
  if (
    !integration.enabled ||
    integration.lat === undefined ||
    integration.lon === undefined
  ) {
    return NextResponse.json({ error: "Weather disabled" }, { status: 404 });
  }

  const tz = integration.timezone ?? "auto";
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${integration.lat}` +
    `&longitude=${integration.lon}` +
    "&current=temperature_2m,weathercode,apparent_temperature,relative_humidity_2m" +
    "&hourly=precipitation_probability" +
    "&temperature_unit=celsius" +
    `&timezone=${encodeURIComponent(tz)}` +
    "&forecast_days=1";

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) {
    return NextResponse.json({ error: "weather fetch failed" }, { status: 502 });
  }

  const data = await res.json();
  const payload = parseButtercutOpenMeteo(data);
  return NextResponse.json(payload);
}
