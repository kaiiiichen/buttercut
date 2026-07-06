import type { Metadata } from "next";
import { ButtercutComponentHighlights } from "@/components/showcase/ButtercutComponentHighlights";
import { ButtercutCatalogList } from "@/components/showcase/ButtercutCatalogList";
import { ButtercutShowcaseReference } from "@/components/showcase/ButtercutShowcaseReference";
import {
  ButtercutShowcasePageHeader,
  ButtercutShowcasePageShell,
} from "@/components/showcase/ButtercutShowcasePageShell";
import { COMPONENT_CATALOG } from "@/lib/showcase/catalog";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Components — ${siteConfig.site.title}`,
  description:
    "Interactive component portfolio — start with magazine cards, then link rows, greetings, and tooltips.",
};

export default function ComponentsPage() {
  return (
    <ButtercutShowcasePageShell>
      <ButtercutShowcasePageHeader
        title="Components"
        lede="Buttercut is built on one idea: list everything in magazine cards. Hover the first example below — then explore link rows, greetings, and the rest."
      />

      <section className="fade-up" style={{ animationDelay: "30ms" }}>
        <ButtercutComponentHighlights />
      </section>

      <ButtercutShowcaseReference delayMs={120}>
        {COMPONENT_CATALOG.map((section) => (
          <div key={section.group}>
            <p className="mag-label">{section.group}</p>
            <ButtercutCatalogList items={section.items} />
          </div>
        ))}
      </ButtercutShowcaseReference>
    </ButtercutShowcasePageShell>
  );
}
