import {
  ButtercutHoverLinkArrow,
  ButtercutHoverLinkDestinationHint,
} from "./ButtercutHoverLinkHint";
import { ButtercutProjectStars } from "./ButtercutProjectStars";

export type ButtercutPinnedProjectLinkProps = {
  name: string;
  desc: string;
  href: string;
  stack: string[];
  stars?: number;
  archived?: boolean;
  variant?: "list" | "card";
};

export function ButtercutPinnedProjectLink({
  name,
  desc,
  href,
  stack,
  stars,
  archived,
  variant = "list",
}: ButtercutPinnedProjectLinkProps) {
  const nameClass =
    "text-zinc-800 transition-colors duration-150 group-hover:text-[#C4894F] dark:text-zinc-200 dark:group-hover:text-[#D9A870]";
  const nameStyle = {
    fontFamily: "var(--font-ui-en)",
    fontWeight: 600,
    fontSize: variant === "card" ? 20 : 18,
    fontStyle: "italic" as const,
  };

  if (variant === "card") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mag-card group block no-underline"
        style={{ textDecoration: "none" }}
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <ButtercutHoverLinkArrow />
          <p style={nameStyle} className={nameClass}>
            {name}
          </p>
          <ButtercutProjectStars stars={stars} archived={archived} />
        </div>

        {desc ? (
          <p
            style={{
              fontFamily: "var(--font-ui-en)",
              fontWeight: 400,
              fontSize: 13,
              lineHeight: 1.6,
            }}
            className="mb-3 pl-4 text-zinc-500 dark:text-zinc-500"
          >
            {desc}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-3 pl-4">
          <div className="flex flex-wrap gap-1">
            {stack.map((tag) => (
              <span
                key={tag}
                style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 10 }}
                className="rounded-sm bg-zinc-100 px-1.5 py-0.5 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <ButtercutHoverLinkDestinationHint href={href} label="GitHub" />
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group -mx-2 block rounded-sm px-2 py-2 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 no-underline"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <ButtercutHoverLinkArrow />
          <p style={nameStyle} className={nameClass}>
            {name}
          </p>
          <ButtercutProjectStars stars={stars} archived={archived} />
        </div>
        <ButtercutHoverLinkDestinationHint href={href} label="GitHub" />
      </div>
      {desc ? (
        <p
          style={{
            fontFamily: "var(--font-ui-en)",
            fontWeight: 400,
            fontSize: 11,
          }}
          className="mt-0.5 pl-4 leading-snug text-zinc-400 dark:text-zinc-500"
        >
          {desc}
        </p>
      ) : null}
      {stack.length > 0 ? (
        <div className="mt-1.5 flex flex-wrap gap-1 pl-4">
          {stack.map((tag) => (
            <span
              key={tag}
              style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 10 }}
              className="rounded-sm bg-zinc-100 px-1.5 py-0.5 text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </a>
  );
}
