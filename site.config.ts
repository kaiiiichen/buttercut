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
    { id: "signal", label: "Signal", href: "https://signal.me" },
    { id: "github", label: "GitHub", href: "https://github.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" },
    { id: "spotify", label: "Spotify", href: "https://open.spotify.com" },
  ],
  brand: {
    showGwwcBadge: false,
  },
  integrations: {
    weather: {
      enabled: false,
      lat: 37.8716,
      lon: -122.2728,
      label: "San Francisco",
      timezone: "America/Los_Angeles",
    },
  },
});
