import Link from "next/link";
import {
  ButtercutHoverLinkArrow,
  ButtercutHoverLinkDestinationHint,
} from "./ButtercutHoverLinkHint";
import type { ButtercutDemoCourseProject } from "@/lib/demo/load-demo-content";
import { ButtercutProjectStars } from "./ButtercutProjectStars";

type ButtercutCourseProjectLinkProps = {
  entry: ButtercutDemoCourseProject;
  variant?: "list" | "card";
};

export function ButtercutCourseProjectLink({
  entry,
  variant = "list",
}: ButtercutCourseProjectLinkProps) {
  const { href, institution, title, grade, summary, tags, external, hintLabel, stars } = entry;

  const nameStyle = {
    fontFamily: "var(--font-ui-en)",
    fontWeight: 600,
    fontSize: variant === "list" ? 18 : 20,
    fontStyle: "italic" as const,
  };

  const nameClass =
    "text-zinc-800 transition-colors duration-150 group-hover:text-black dark:text-zinc-200 dark:group-hover:text-white";

  const linkProps = external
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href };

  const titleRow = (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      <ButtercutHoverLinkArrow />
      <p style={nameStyle} className={nameClass}>
        {title}
      </p>
      <ButtercutProjectStars stars={stars} />
      {grade ? (
        <span
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 10 }}
          className="rounded-sm bg-zinc-100 px-1.5 py-0.5 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
        >
          {grade}
        </span>
      ) : null}
    </div>
  );

  const tagsRow =
    tags.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 10 }}
            className="rounded-sm bg-zinc-100 px-1.5 py-0.5 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    ) : null;

  if (variant === "card") {
    const className = "mag-card project-card-theme group block no-underline";
    const content = (
      <>
        <div className="mb-2">{titleRow}</div>
        {institution ? (
          <p
            style={{ fontFamily: "var(--font-ui-en)", fontWeight: 600, fontSize: 13, lineHeight: 1.5 }}
            className="mb-1 pl-4 text-zinc-600 dark:text-zinc-400"
          >
            {institution}
          </p>
        ) : null}
        <p
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 13, lineHeight: 1.6 }}
          className="mb-3 pl-4 text-zinc-500 dark:text-zinc-500"
        >
          {summary}
        </p>
        <div className="flex items-center justify-between gap-3 pl-4">
          {tagsRow}
          <ButtercutHoverLinkDestinationHint href={href} label={hintLabel} />
        </div>
      </>
    );

    if (external) {
      return (
        <a {...linkProps} className={className} style={{ textDecoration: "none" }}>
          {content}
        </a>
      );
    }

    return (
      <Link {...linkProps} className={className} style={{ textDecoration: "none" }}>
        {content}
      </Link>
    );
  }

  const listClassName =
    "group block py-2 -mx-2 px-2 rounded-sm hover:bg-[#e8f0f4] dark:hover:bg-[#243640] transition-all duration-150 no-underline";

  const listContent = (
    <>
      <div className="flex items-center justify-between gap-3">
        {titleRow}
        <ButtercutHoverLinkDestinationHint href={href} label={hintLabel} />
      </div>
      {institution ? (
        <p
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 600, fontSize: 12, lineHeight: 1.5 }}
          className="mt-0.5 pl-4 text-zinc-600 dark:text-zinc-400"
        >
          {institution}
        </p>
      ) : null}
      <p
        style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 12, lineHeight: 1.5 }}
        className="mt-0.5 pl-4 text-zinc-400 dark:text-zinc-500"
      >
        {summary}
      </p>
      {tags.length > 0 ? <div className="mt-1.5 flex flex-wrap gap-1 pl-4">{tagsRow}</div> : null}
    </>
  );

  if (external) {
    return (
      <a {...linkProps} className={listClassName} style={{ textDecoration: "none" }}>
        {listContent}
      </a>
    );
  }

  return (
    <Link {...linkProps} className={listClassName} style={{ textDecoration: "none" }}>
      {listContent}
    </Link>
  );
}
