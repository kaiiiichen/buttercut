"use client";

import { ButtercutCourseProjectLink } from "@/components/ButtercutCourseProjectLink";
import { ButtercutListLinkRow } from "@/components/ButtercutListLinkRow";
import { ButtercutPinnedProjectLink } from "@/components/ButtercutPinnedProjectLink";

const SAMPLE_PINNED = {
  name: "buttercut",
  desc: "Configurable Next.js theme for personal sites and portfolios.",
  href: "https://github.com/kaiiiichen/buttercut",
  stack: ["Next.js", "TypeScript"],
  stars: 128,
  archived: false,
};

const SAMPLE_FEATURED = {
  id: "showcase-featured",
  href: "https://github.com/kaiiiichen/buttercut",
  title: "Featured release",
  institution: "Open source",
  summary: "Card variant with tags and trailing destination hint.",
  tags: ["Theme"],
  external: true,
  hintLabel: "GitHub",
};

type ButtercutHoverLinkHintDemosProps = {
  compact?: boolean;
  projectsOnly?: boolean;
};

export function ButtercutHoverLinkHintDemos({
  compact = false,
  projectsOnly = false,
}: ButtercutHoverLinkHintDemosProps) {
  if (projectsOnly) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="mag-card-inset">
          <div className="mag-label">List row</div>
          <ButtercutPinnedProjectLink {...SAMPLE_PINNED} variant="list" />
        </div>
        <div>
          <div className="mag-label mb-4">Card</div>
          <ButtercutPinnedProjectLink {...SAMPLE_PINNED} variant="card" />
          <div className="mt-6">
            <div className="mag-label mb-4">Featured card</div>
            <ButtercutCourseProjectLink entry={SAMPLE_FEATURED} variant="card" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-8"}>
      <div className="mag-card-inset">
        <div className="mag-label">Internal & external links</div>
        <ButtercutListLinkRow title="Design system" subtitle="Internal route" href="/design" />
        <ButtercutListLinkRow
          title="buttercut on GitHub"
          subtitle="External · label resolves to GitHub"
          href="https://github.com/kaiiiichen/buttercut"
          hintLabel="GitHub"
          external
        />
      </div>

      {!compact ? (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="mag-card-inset">
              <div className="mag-label">PinnedProjectLink · list</div>
              <ButtercutPinnedProjectLink {...SAMPLE_PINNED} variant="list" />
            </div>
            <div>
              <div className="mag-label mb-4">PinnedProjectLink · card</div>
              <ButtercutPinnedProjectLink {...SAMPLE_PINNED} variant="card" />
            </div>
          </div>

          <div className="max-w-md">
            <div className="mag-label mb-4">CourseProjectLink · card</div>
            <ButtercutCourseProjectLink entry={SAMPLE_FEATURED} variant="card" />
          </div>
        </>
      ) : null}
    </div>
  );
}
