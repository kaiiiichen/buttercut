import Link from "next/link";
import {
  ButtercutHoverLinkArrow,
  ButtercutHoverLinkDestinationHint,
} from "@/components/ButtercutHoverLinkHint";

const LIST_LINK_TITLE_STYLE = {
  fontFamily: "var(--font-ui-en)",
  fontWeight: 600,
  fontSize: 18,
  fontStyle: "italic" as const,
  color: "var(--text-heading)",
};

const LIST_LINK_SUBTITLE_STYLE = {
  fontFamily: "var(--font-ui-en)",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.6,
  color: "var(--text-body-secondary)",
};

const LIST_LINK_TITLE_CLASS =
  "transition-colors duration-150 group-hover:text-[#C4894F] dark:group-hover:text-[#D9A870]";

const LIST_LINK_SUBTITLE_CLASS = "mt-0.5 pl-4";

const LIST_ROW_CLASS =
  "group -mx-2 block rounded-sm px-2 py-2 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 no-underline";

export type ButtercutListLinkRowProps = {
  title: string;
  subtitle?: string;
  href: string;
  hintLabel?: string;
  external?: boolean;
};

export function ButtercutListLinkRow({
  title,
  subtitle,
  href,
  hintLabel,
  external,
}: ButtercutListLinkRowProps) {
  const className = LIST_ROW_CLASS;
  const inner = (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <ButtercutHoverLinkArrow />
          <p style={LIST_LINK_TITLE_STYLE} className={LIST_LINK_TITLE_CLASS}>
            {title}
          </p>
        </div>
        <ButtercutHoverLinkDestinationHint href={href} label={hintLabel} />
      </div>
      {subtitle ? (
        <p style={LIST_LINK_SUBTITLE_STYLE} className={LIST_LINK_SUBTITLE_CLASS}>
          {subtitle}
        </p>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={{ textDecoration: "none" }}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  );
}
