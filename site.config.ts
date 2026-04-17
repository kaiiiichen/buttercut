import { createSiteConfig } from "@/lib/config/create-site-config";
// import { buttercutPreset } from "@/lib/theme/presets";

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
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Notes", href: "/notes" },
    { label: "Guide", href: "/guide" },
  ],
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" },
    { id: "x", label: "X", href: "https://x.com" },
    { id: "email", label: "Email", href: "mailto:hello@example.com" },
    { id: "docs", label: "Docs", href: "https://nextjs.org" },
  ],
  // Pick a colour mood without writing CSS. Presets live in
  // `src/lib/theme/presets.ts` — spread one and override any token:
  //
  //   brand: {
  //     theme: { ...buttercutPreset("sunset"), accent: "#ff3366" },
  //   },
  //
  // Or define the token set inline:
  //
  //   brand: {
  //     theme: { accent: "#ff6f3c", accentDark: "#ffa07a" },
  //   },
});
