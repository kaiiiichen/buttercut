import type { ButtercutSiteConfig } from "./types";

export const BUTTERCUT_DEFAULT_SITE_CONFIG: ButtercutSiteConfig = {
  site: {
    title: "Buttercut",
    description:
      "A configurable Next.js theme — ship a polished site without hardcoding content.",
    siteUrl: "http://localhost:3000",
  },
  nav: [{ label: "Home", href: "/" }],
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com",
    },
  ],
  home: {
    blocks: [
      { id: "hero", enabled: true },
      { id: "demo_projects", enabled: true },
      { id: "integrations", enabled: true },
    ],
  },
  brand: {
    avatar: "/avatar-placeholder.svg",
    og: {
      defaultImagePath: "/og-default.svg",
    },
  },
  integrations: {
    lastfm: { enabled: false },
    github: { enabled: false },
    supabase: { enabled: false },
    sentry: { enabled: false },
    weather: { enabled: false },
  },
};
