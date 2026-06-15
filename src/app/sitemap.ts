import type { MetadataRoute } from "next";
import { siteConfig } from "../../site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.site.siteUrl.replace(/\/$/, "");
  const routes = ["/", "/about", "/projects", "/misc"];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
