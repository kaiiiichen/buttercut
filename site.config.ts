import { createSiteConfig } from "@/lib/config/create-site-config";

/**
 * Buttercut theme configuration.
 * Override fields here; defaults are defined in `src/lib/config/defaults.ts`.
 */
export const siteConfig = createSiteConfig({
  site: {
    title: "Your Name",
    description:
      "A short tagline for your site — edit site.config.ts and content/demo/ to make this yours.",
    siteUrl: "https://example.com",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Misc", href: "/misc" },
  ],
  socials: [
    { id: "email", label: "Email", href: "mailto:hello@example.com" },
    { id: "github", label: "GitHub", href: "https://github.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" },
  ],
  brand: {
    showGwwcBadge: false,
    contactGuidanceTip: "Info — edit social links and this tooltip in site.config.ts.",
  },
  integrations: {
    weather: {
      enabled: false,
      lat: 40.7128,
      lon: -74.006,
      label: "Your city",
      timezone: "America/New_York",
    },
  },
});
