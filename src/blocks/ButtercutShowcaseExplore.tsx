import { ButtercutListLinkRow } from "@/components/ButtercutListLinkRow";
import { SHOWCASE_EXPLORE_LINKS } from "@/lib/showcase/home-explore";

/** Showcase home — explore link rows in a magazine card. */
export function ButtercutShowcaseExplore() {
  return (
    <section className="space-y-4">
      <div>
        <p className="mag-label">Explore</p>
        <p className="ui-hint mt-2">
          Design tokens, UI primitives, live widgets you can try in Sandbox, and a fork guide — everything
          on this site is about the theme, not a sample profile.
        </p>
      </div>
      <div className="mag-card space-y-1">
        {SHOWCASE_EXPLORE_LINKS.map((link) => (
          <ButtercutListLinkRow key={link.href} {...link} />
        ))}
      </div>
    </section>
  );
}
