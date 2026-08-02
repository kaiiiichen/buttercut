import type { Metadata } from "next";
import { ButtercutDesignHighlights } from "@/components/showcase/ButtercutDesignHighlights";
import { ButtercutCatalogList } from "@/components/showcase/ButtercutCatalogList";
import { ButtercutShowcaseReference } from "@/components/showcase/ButtercutShowcaseReference";
import {
  ButtercutShowcasePageHeader,
  ButtercutShowcasePageShell,
} from "@/components/showcase/ButtercutShowcasePageShell";
import {
  DESIGN_LAYOUT,
  DESIGN_MOTION,
  DESIGN_PRINCIPLES,
  DESIGN_TOKENS,
  DESIGN_TYPOGRAPHY,
} from "@/lib/showcase/catalog";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Design — ${siteConfig.site.title}`,
  description:
    "See the Buttercut design system — themes, typography, cards, and motion — before opening the token reference.",
};

export default function DesignPage() {
  return (
    <ButtercutShowcasePageShell>
      <ButtercutShowcasePageHeader
        title="Design"
        lede="Warm editorial minimalism. Hover the cards first — lift, shadow, accent border — then switch palettes and read the type scale."
      />

      <section className="fade-up" style={{ animationDelay: "30ms" }}>
        <ButtercutDesignHighlights />
      </section>

      <ButtercutShowcaseReference delayMs={120}>
        <div>
          <p className="mag-label">Principles</p>
          <ButtercutCatalogList items={DESIGN_PRINCIPLES} />
        </div>
        <div>
          <p className="mag-label">Typography</p>
          <ButtercutCatalogList items={DESIGN_TYPOGRAPHY} />
        </div>
        <div>
          <p className="mag-label">Color & tokens</p>
          <ButtercutCatalogList items={DESIGN_TOKENS} />
        </div>
        <div>
          <p className="mag-label">Layout</p>
          <ButtercutCatalogList items={DESIGN_LAYOUT} />
        </div>
        <div>
          <p className="mag-label">Motion & interaction</p>
          <ButtercutCatalogList items={DESIGN_MOTION} />
        </div>
      </ButtercutShowcaseReference>
    </ButtercutShowcasePageShell>
  );
}
