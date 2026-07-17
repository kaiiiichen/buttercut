/** Static catalog for the Buttercut showcase site — Design and Components pages. */

export type CatalogEntry = { name: string; desc: string };

export const DESIGN_PRINCIPLES: CatalogEntry[] = [
  {
    name: "Editorial minimalism",
    desc: "White/black surfaces, cool-blue structure, warm-orange hover states, and generous whitespace.",
  },
  {
    name: "Content-first hierarchy",
    desc: "Nunito for UI copy at readable sizes. Geist for chrome. Section labels anchor the eye without shouting.",
  },
  {
    name: "Considered motion",
    desc: "Instant navigation, JumpText greetings, hover tooltips, and reduced-motion fallbacks.",
  },
  {
    name: "Adaptive identity row",
    desc: "Hero grid syncs avatar size, intro spacing, and social links on desktop.",
  },
  {
    name: "Config over code",
    desc: "site.config.ts and content/ drive nav, blocks, brand, and integrations. Fork without layout surgery.",
  },
  {
    name: "Integrations fail open",
    desc: "GitHub, weather, and Spotify degrade to placeholders when credentials are missing.",
  },
];

export const DESIGN_TYPOGRAPHY: CatalogEntry[] = [
  { name: "Display / UI", desc: "Nunito 300–600 — hero title 32–42px, body 15–17px / 1.75" },
  { name: "Section labels", desc: ".mag-label — 11px uppercase, zinc-400, tracking-wide" },
  { name: "System", desc: "Geist Sans + Geist Mono for layout chrome" },
  { name: "Code paths", desc: "JetBrains Mono — inline code, config field names" },
];

export const DESIGN_TOKENS: CatalogEntry[] = [
  { name: "--background / --foreground", desc: "Page surface and default text" },
  { name: "--link-color", desc: "Resting links, nav, TOC, and structural blue" },
  { name: "--link-hover-color / --accent", desc: "Hover, focus, and action orange" },
  { name: "--font-ui-en", desc: "Nunito stack for English UI copy" },
  { name: "--color-border-primary … tertiary", desc: "Three-step border hierarchy for .mag-card" },
  { name: "--mag-card-radius", desc: "6px corner radius on cards" },
  { name: "--contribution-l1 … l4", desc: "GitHub activity heatmap ramp" },
  { name: "brand.theme in site.config.ts", desc: "Override any token; presets: sunset, ocean, terminal" },
];

export const DESIGN_LAYOUT: CatalogEntry[] = [
  {
    name: "Identity row",
    desc: "36% portrait column + intro column. ResizeObserver aligns avatar and copy height.",
  },
  { name: ".mag-card", desc: "Primary content surface — Listening, Projects, about sections" },
  { name: ".mag-card-inset", desc: "Nested list surface inside a parent card" },
  { name: ".mag-chip", desc: "Pill links and buttons with optional arrow suffix" },
  { name: ".nav-link", desc: "Fixed header links using the shared site link palette" },
  { name: "Page TOC", desc: "Floating right-rail navigator on subpages" },
  { name: "max-w-[1180px]", desc: "Shared content width across all routes" },
];

export const DESIGN_MOTION: CatalogEntry[] = [
  { name: ".fade-up", desc: "Structural TOC anchor; navigation intentionally has no entry delay" },
  { name: ".jump-letter", desc: "iMessage-style wave on hero greeting" },
  { name: "Hover link row", desc: "Leading ↗ + trailing Label ↗ on .group hover" },
  { name: ".hover-tip-bubble", desc: "Portal tooltip with fade + slide" },
  { name: "Theme toggle", desc: "Light default; localStorage buttercut-theme" },
];

export const SANDBOX_WIDGETS: CatalogEntry[] = [
  {
    name: "Listening",
    desc: "Now playing + last month top tracks. Enable integrations.lastfm; Spotify UI uses /api/spotify/* routes.",
  },
  {
    name: "Location / Weather",
    desc: "Open-Meteo weather card with local time. Set integrations.weather (lat, lon, label, timezone) in site.config.ts.",
  },
  {
    name: "GitHub Activity",
    desc: "Contribution heatmap. integrations.github.enabled; optional GITHUB_TOKEN for higher rate limits.",
  },
  {
    name: "Integration status",
    desc: "Table of configured vs ready integrations. Add block id integrations to home.blocks.",
  },
];

export const COMPONENT_CATALOG: { group: string; items: CatalogEntry[] }[] = [
  {
    group: "Layout & shell",
    items: [
      { name: ".mag-card", desc: "Primary surface — every major section. Lifts on hover with accent border." },
      { name: ".mag-card-inset", desc: "Nested list surface inside a parent card — same hover, lighter shadow." },
      { name: ".mag-label", desc: "11px uppercase section title above card content" },
      { name: "ButtercutNav", desc: "Fixed header, mobile menu, theme toggle" },
      { name: "ButtercutSiteFooter", desc: "Copyright footer with optional attribution link" },
      { name: "ButtercutPageToc", desc: "Floating section navigator (portal)" },
      { name: "ButtercutTocSection", desc: "Explicit scroll target for TOC" },
      { name: "ButtercutIdentityRow", desc: "Hero grid with adaptive avatar sizing" },
      { name: "ButtercutSubpageEnter", desc: "Instant subpage wrapper and TOC mount" },
      { name: "ButtercutThemeProvider", desc: "Light / dark / system theme context" },
      { name: "ButtercutThemeToggle", desc: "Nav sun/moon control" },
    ],
  },
  {
    group: "Typography & links",
    items: [
      { name: "ButtercutJumpText", desc: "Animated greeting letters" },
      { name: "ButtercutHoverLinkArrow", desc: "Leading ↗ on row hover" },
      { name: "ButtercutHoverLinkDestinationHint", desc: "Trailing destination label + ↗" },
      { name: "ButtercutHoverLinkHint", desc: "Trailing custom hint text" },
      { name: "ButtercutHoverTip", desc: "Tooltip bubble — hover or tap-to-toggle" },
      { name: "ButtercutMagChip", desc: "Pill link, button, or span with optional arrows" },
    ],
  },
  {
    group: "Hero & identity",
    items: [
      { name: "ButtercutHero", desc: "Home identity — product (title + intro) or personal (avatar + greeting)" },
      { name: "ButtercutAvatarCard", desc: "Next/Image portrait fill" },
      { name: "ButtercutSocialIcons", desc: "Shared-palette social row with subtle hover lift" },
      { name: "ButtercutGwwcBadge", desc: "Optional pledge badge beside title" },
    ],
  },
  {
    group: "Home blocks",
    items: [
      { name: "ButtercutStatusRow", desc: "Listening + Location side-by-side" },
      { name: "ButtercutNowPlayingBlock", desc: "Listening card wrapper" },
      { name: "ButtercutWeatherBlock", desc: "Location card with SSR weather" },
      { name: "ButtercutDemoProjects", desc: "Projects mag-card on home" },
      { name: "ButtercutIntegrationsPanel", desc: "Env / config status table" },
    ],
  },
  {
    group: "Projects & lists",
    items: [
      { name: "ButtercutProjectsSplit", desc: "Featured + personal project columns" },
      { name: "ButtercutPinnedProjectLink", desc: "GitHub repo row or card" },
      { name: "ButtercutCourseProjectLink", desc: "Featured / course project card" },
      { name: "ButtercutProjectStars", desc: "Star count + archived badge" },
      { name: "ButtercutGitHubActivity", desc: "Contribution heatmap" },
    ],
  },
  {
    group: "Integrations",
    items: [
      { name: "ButtercutListeningCard", desc: "Now playing + last month top tracks" },
      { name: "ButtercutListeningTrackRow", desc: "Single track with hover hints" },
      { name: "ButtercutWeatherCard", desc: "Weather illustration + local time" },
      { name: "ButtercutWeatherIllustration", desc: "SVG weather state art" },
      { name: "ButtercutLocalTime", desc: "Live clock for a timezone" },
    ],
  },
];
