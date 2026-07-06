import { ButtercutMagChip } from "@/components/ButtercutMagChip";
import type { ButtercutBlockProps } from "@/lib/blocks/registry";

const FEATURES = [
  {
    title: "Config-first",
    body: "One typed `site.config.ts` drives navigation, brand tokens, home blocks, and integrations. Override only what differs — defaults fill the rest.",
  },
  {
    title: "Block-composed home",
    body: "The landing page is a stack of registered blocks — hero, status widgets, projects, or your own. Reorder with `{ id, enabled }` entries. No layout surgery.",
  },
  {
    title: "Content where writers expect it",
    body: "Hero intro, about sections, and project lists live under `content/demo/` as Markdown and JSON. Designers edit copy without touching React.",
  },
  {
    title: "Integrations that fail open",
    body: "GitHub activity, weather, and Spotify routes degrade to placeholders when credentials are missing. The site never breaks on a rate limit.",
  },
] as const;

export function ButtercutShowcaseFeatures(_props: ButtercutBlockProps) {
  return (
    <section className="space-y-4">
      <p className="mag-label">Why Buttercut</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="mag-card">
            <p
              className="font-nunito text-[17px] font-semibold leading-[1.4] text-zinc-800 dark:text-zinc-200"
              style={{ fontFamily: "var(--font-ui-en)" }}
            >
              {f.title}
            </p>
            <p className="ui-hint mt-2">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ButtercutShowcaseUseCases(_props: ButtercutBlockProps) {
  const cases = [
    {
      label: "Personal site",
      desc: "Portfolio, CV, and project pages — hero, about cards, and GitHub activity.",
      href: "/components",
    },
    {
      label: "Product landing",
      desc: "Hero, feature lists, and pricing cards from JSON — no custom React required.",
      href: "/components",
    },
    {
      label: "Studio or agency",
      desc: "Projects grid, team timeline, and resource lists — all driven by content files.",
      href: "/design",
    },
    {
      label: "Company page",
      desc: "Mission, services, and contact links — extend with custom blocks in src/custom/.",
      href: "/get-started",
    },
  ] as const;

  return (
    <section className="space-y-4">
      <div>
        <p className="mag-label">What you can build</p>
        <p className="ui-hint mt-2">
          The same layout system works for side projects, SaaS teasers, research labs, and small
          businesses.
        </p>
      </div>
      <div className="mag-card">
        <ul className="space-y-4">
          {cases.map((c) => (
            <li
              key={c.label}
              className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="ui-heading font-nunito text-[17px] font-semibold">
                  {c.label}
                </p>
                <p className="ui-hint mt-1">{c.desc}</p>
              </div>
              <ButtercutMagChip href={c.href} arrow="right" size="sm" className="shrink-0">
                Explore
              </ButtercutMagChip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ButtercutShowcaseCta(_props: ButtercutBlockProps) {
  return (
    <section className="mag-card">
      <div className="mag-label">Next steps</div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2
            className="font-nunito text-[28px] font-light leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[32px]"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            Ready to ship something?
          </h2>
          <p className="ui-hint mt-3">
            Browse the design system, inspect live components, then follow the Get Started guide —
            including tips for working with AI agents on your fork.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtercutMagChip href="/get-started" arrow="right">
            Get Started
          </ButtercutMagChip>
          <ButtercutMagChip href="/components" arrow="right">
            Components
          </ButtercutMagChip>
          <ButtercutMagChip href="/sandbox" arrow="right">
            Sandbox
          </ButtercutMagChip>
        </div>
      </div>
    </section>
  );
}
