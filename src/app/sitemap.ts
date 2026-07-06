import type { MetadataRoute } from "next";
import { siteConfig } from "../../site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.site.siteUrl.replace(/\/$/, "");
  const routes = ["/", "/design", "/components", "/sandbox", "/get-started"];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
