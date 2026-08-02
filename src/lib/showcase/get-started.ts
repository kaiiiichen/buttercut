/** Get Started page — steps, config reference, and AI starter prompts. */

export type GetStartedStep = {
  title: string;
  body: string;
  touch: string;
  aiPrompt: string;
};

export const GET_STARTED_STEPS: GetStartedStep[] = [
  {
    title: "Clone or deploy",
    body: "Fork the repo or use the Vercel deploy button in the README. Run npm install && npm run dev — the site works with no .env file.",
    touch: "Repo root · README",
    aiPrompt:
      "I forked Buttercut (github.com/kaiiiichen/buttercut). Help me run npm install && npm run dev, confirm localhost:3000 loads, and summarize which folders I'll edit first.",
  },
  {
    title: "Configure site.config.ts",
    body: "Set title, URL, nav, home blocks, brand, and integrations. Override only what differs from src/lib/config/defaults.ts.",
    touch: "site.config.ts",
    aiPrompt:
      "Update site.config.ts for my site: [title, description, siteUrl, nav links, home.blocks order]. Match Buttercut types in src/lib/config/types.ts. Show the diff before applying.",
  },
  {
    title: "Replace content",
    body: "Hero copy: content/demo/intro.md. Page JSON (about, projects, misc) under content/demo/ — wire into routes you add under src/app/. No React needed for text changes.",
    touch: "content/demo/",
    aiPrompt:
      "Rewrite Buttercut content for [describe your site]. Edit content/demo/intro.md and the JSON files under content/demo/. Keep existing schemas — do not invent new fields.",
  },
  {
    title: "Enable integrations (optional)",
    body: "Toggle integrations.* in site.config.ts. Add env vars from .env.example. Preview live widgets on /sandbox.",
    touch: "site.config.ts · .env · /sandbox",
    aiPrompt:
      "Enable [GitHub / weather / Last.fm] in my Buttercut fork. Update site.config.ts integrations, list required .env vars from .env.example, and tell me what I should see on /sandbox.",
  },
  {
    title: "Customize blocks (optional)",
    body: "Swap or add home sections via src/custom/register.ts. See src/custom/blocks/MyHero.tsx for the override pattern.",
    touch: "src/custom/",
    aiPrompt:
      "Add a custom Buttercut home block for [describe section]. Follow MyHero.tsx, register in src/custom/register.ts, and add { id, enabled: true } to home.blocks.",
  },
  {
    title: "Deploy",
    body: "Push to GitHub and connect Vercel. Set optional env vars in the dashboard. Missing credentials never break the build.",
    touch: "Vercel · .env.example",
    aiPrompt:
      "Prepare my Buttercut fork for Vercel: run npm run build, list env vars to set, and confirm site.config.ts siteUrl matches my production domain.",
  },
];

export const GET_STARTED_CONFIG: { name: string; desc: string }[] = [
  { name: "site.title / description / siteUrl", desc: "Metadata, nav brand, Open Graph" },
  { name: "nav[]", desc: "Header links — internal paths or external URLs" },
  { name: "home.heroLayout", desc: '"product" for docs sites; "personal" for avatar + greeting' },
  { name: "home.blocks[]", desc: "Home section order and visibility" },
  { name: "brand.avatar / theme / attribution", desc: "Hero portrait, CSS tokens, footer credit" },
  { name: "integrations.*", desc: "GitHub, weather, Last.fm toggles and coordinates" },
];

export const GET_STARTED_AI_TIPS: string[] = [
  "Give the agent site.config.ts, content/demo/, and this Get Started page as context.",
  "Ask for content changes first, then config, then new routes or custom blocks.",
  "Point it at /design and /components on buttercut.kaichen.dev so it reuses existing UI.",
  "Keep theme-core edits in src/custom/ — easier to merge Buttercut updates.",
];

export const GET_STARTED_MASTER_PROMPT = `You are customizing Buttercut — a Next.js 16 theme (App Router, TypeScript, Tailwind 4).

Rules:
- Prefer site.config.ts and content/demo/ before editing React.
- New home sections: src/custom/blocks/ + src/custom/register.ts.
- Reuse src/components/ primitives (see buttercut.kaichen.dev/components).
- Integrations fail open — missing env vars must not break the build.

My site:
- Audience: [who visits]
- Pages: [home, about, product, …]
- Tone: [professional, playful, …]
- Brand: [colors, avatar, social links]
- Integrations: [GitHub, weather, none]

Start with a plan for site.config.ts and content/demo/intro.md, then implement step by step.`;
