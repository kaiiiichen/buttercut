/** User-facing highlight copy — portfolio-first, not developer docs. */

export type ShowcaseHighlight = {
  id: string;
  title: string;
  hint: string;
  wide?: boolean;
};

export const COMPONENT_HIGHLIGHTS: ShowcaseHighlight[] = [
  {
    id: "cards",
    title: "Everything is a card",
    hint: "Every section on a Buttercut site is a .mag-card. Hover any box below — it lifts, the shadow grows, and the bottom edge turns bronze.",
    wide: true,
  },
  {
    id: "links",
    title: "Link rows that guide you",
    hint: "Hover any row — a leading arrow slides in; the destination label appears on the right.",
    wide: true,
  },
  {
    id: "greeting",
    title: "Animated greeting",
    hint: "The hero wave you see on personal sites — letters hop one after another.",
  },
  {
    id: "tooltip",
    title: "Contextual tips",
    hint: "Hover or tap the help icon. Tooltips float above the page without shifting layout.",
  },
  {
    id: "projects",
    title: "Project cards",
    hint: "List rows for home pages; card grids for project galleries. Same hover language throughout.",
    wide: true,
  },
  {
    id: "chips",
    title: "Pill links & buttons",
    hint: "Compact actions with optional arrows — used in nav footers and education links.",
  },
  {
    id: "socials",
    title: "Social icons",
    hint: "Monochrome by default; each network gets its brand color on hover.",
  },
];

export const DESIGN_HIGHLIGHTS: ShowcaseHighlight[] = [
  {
    id: "cards",
    title: "Magazine cards",
    hint: "Hover any box below — lift, shadow, accent border. Same .mag-card used on the home page, sandbox, and every subpage.",
    wide: true,
  },
  {
    id: "themes",
    title: "Color presets",
    hint: "Tap a palette — the preview below updates instantly. Set brand.theme in site.config.ts on your fork.",
    wide: true,
  },
  {
    id: "type",
    title: "Typography",
    hint: "Nunito for readable UI copy at magazine scale — light display, comfortable body.",
  },
  {
    id: "motion",
    title: "Motion & hover",
    hint: "Entrance fades, jumping greetings, and link rows that respond when you point at them.",
    wide: true,
  },
];

export const SANDBOX_HIGHLIGHTS: ShowcaseHighlight[] = [
  {
    id: "status",
    title: "Home status row",
    hint: "Listening and location side-by-side — the live strip from a personal site home page.",
    wide: true,
  },
  {
    id: "github",
    title: "GitHub activity",
    hint: "Contribution heatmap — scroll horizontally on small screens.",
    wide: true,
  },
  {
    id: "integrations",
    title: "Integration status",
    hint: "See what's configured vs. waiting for API keys.",
  },
];
