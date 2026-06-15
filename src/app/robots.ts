import type { MetadataRoute } from "next";
import { siteConfig } from "../../site.config";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.site.siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
