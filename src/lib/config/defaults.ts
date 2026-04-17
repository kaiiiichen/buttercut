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
    { id: "github", label: "GitHub", href: "https://github.com" },
  ],
  home: {
    blocks: [
      { id: "hero", enabled: true },
      { id: "status", enabled: true },
      { id: "demo_projects", enabled: true },
      { id: "integrations", enabled: true },
    ],
  },
  brand: {
    avatar: "/avatar-placeholder.svg",
    og: {
      defaultImagePath: "/og-default.svg",
    },
    theme: {},
  },
  integrations: {
    // GitHub stars use the public API (unauthenticated, 60 req/hr/IP, cached
    // for an hour). Safe to keep on by default: every fetch has a null
    // fallback, so a rate limit or outage never breaks a page.
    github: { enabled: true },
    lastfm: { enabled: false },
    supabase: { enabled: false },
    sentry: { enabled: false },
    weather: { enabled: false },
  },
  content: {
    // Inline markdown helper only emits <a href> for these schemes (plus
    // any schemeless/relative/fragment URL). See `src/lib/markdown/inline.tsx`.
    allowedLinkSchemes: ["http", "https", "mailto"],
  },
};
