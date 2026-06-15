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
    fontSize: 20,
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
          <span className="shrink-0 -translate-x-1 text-xs text-[#C4894F] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 dark:text-[#D9A870]">
            ↗
          </span>
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
              lineHeight: 1.7,
            }}
            className="mb-3 pl-4 text-zinc-500 dark:text-zinc-500"
          >
            {desc}
          </p>
        ) : null}

        <div className="flex items-center justify-between pl-4">
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
          <span
            style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 11 }}
            className="ml-2 shrink-0 text-zinc-300 transition-colors duration-150 group-hover:text-[#C4894F] dark:text-zinc-700 dark:group-hover:text-[#D9A870]"
          >
            GitHub ↗
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group -mx-2 block rounded-sm px-2 py-3 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="shrink-0 -translate-x-1 text-xs text-[#C4894F] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
          ↗
        </span>
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
