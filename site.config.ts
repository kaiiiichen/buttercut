import { createSiteConfig } from "@/lib/config/create-site-config";

export const siteConfig = createSiteConfig({
  site: {
    title: "Buttercut",
    description:
      "A configurable Next.js theme — warm editorial layout, composable blocks, integrations that fail open.",
    siteUrl: "https://buttercut.kaichen.dev",
  },
  nav: [
    { label: "Design", href: "/design" },
    { label: "Components", href: "/components" },
    { label: "Sandbox", href: "/sandbox" },
    { label: "Get Started", href: "/get-started" },
  ],
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/kaiiiichen/buttercut",
      tip: "View source on GitHub",
    },
  ],
  home: {
    heroLayout: "product",
    blocks: [
      { id: "hero", enabled: true },
      { id: "showcase_explore", enabled: true },
    ],
  },
  brand: {
    showGwwcBadge: false,
    contactGuidanceTip: "Buttercut is open source (GPL-3.0). Fork, configure, and ship.",
    attribution: {
      href: "https://kaichen.dev",
      prefix: "Distilled from ",
      label: "kaichen.dev",
    },
  },
  integrations: {
    weather: { enabled: false },
  },
});
