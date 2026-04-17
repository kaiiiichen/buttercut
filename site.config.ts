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
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Notes", href: "/notes" },
    { label: "MDX", href: "/mdx-demo" },
  ],
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com" },
    { id: "x", label: "X", href: "https://x.com" },
    { id: "email", label: "Email", href: "mailto:hello@example.com" },
    { id: "docs", label: "Docs", href: "https://nextjs.org" },
  ],
  // Uncomment to colour-theme your site without touching CSS:
  // brand: {
  //   theme: {
  //     accent: "#ff6f3c",
  //     accentDark: "#ffa07a",
  //   },
  // },
});
