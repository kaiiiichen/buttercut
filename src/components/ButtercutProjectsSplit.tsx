import type { ReactNode } from "react";
import { ButtercutCourseProjectLink } from "./ButtercutCourseProjectLink";
import { ButtercutPinnedProjectLink } from "./ButtercutPinnedProjectLink";
import type { ButtercutDemoCourseProject } from "@/lib/demo/load-demo-content";
import type { ButtercutPinnedProject } from "@/lib/integrations/github-pinned";

type ButtercutProjectsSplitProps = {
  courseProjects: ButtercutDemoCourseProject[];
  personalProjects: ButtercutPinnedProject[];
  personalVariant?: "list" | "card";
  personalEmptyMessage?: string;
};

function NestedProjectsCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mag-card-inset">
      <div className="mag-label">{label}</div>
      {children}
    </div>
  );
}

export function ButtercutProjectsSplit({
  courseProjects,
  personalProjects,
  personalVariant = "list",
  personalEmptyMessage = "Pin repositories on your GitHub profile to show them here.",
}: ButtercutProjectsSplitProps) {
  return (
    <div className="space-y-5">
      {courseProjects.length > 0 ? (
        <NestedProjectsCard label="Featured">
          {courseProjects.map((entry) => (
            <ButtercutCourseProjectLink
              key={entry.id}
              entry={entry}
              variant={personalVariant === "card" ? "card" : "list"}
            />
          ))}
        </NestedProjectsCard>
      ) : null}

      <NestedProjectsCard label="Projects">
        {personalProjects.length === 0 ? (
          <p
            style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 14 }}
            className="py-1 text-zinc-400 dark:text-zinc-600"
          >
            {personalEmptyMessage}
          </p>
        ) : personalVariant === "card" ? (
          <div className="grid grid-cols-1 gap-4">
            {personalProjects.map((project) => (
              <ButtercutPinnedProjectLink key={project.repo ?? project.name} {...project} variant="card" />
            ))}
          </div>
        ) : (
          <div>
            {personalProjects.map((project) => (
              <ButtercutPinnedProjectLink key={project.repo ?? project.name} {...project} />
            ))}
          </div>
        )}
      </NestedProjectsCard>
    </div>
  );
}
