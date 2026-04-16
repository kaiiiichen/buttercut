import { createSiteConfig } from "@/lib/config/create-site-config";

/**
 * Buttercut theme configuration.
 * Override fields here; defaults are defined in `src/lib/config/defaults.ts`.
 */
export const siteConfig = createSiteConfig({
  site: {
    title: "Buttercut",
    description:
      "Demo preview — configure `site.config.ts` and `content/demo/` for your site.",
    siteUrl: "http://localhost:3000",
  },
});
