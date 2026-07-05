import type { ReactNode } from "react";

/** Resolve a short destination label from a URL or site path (for hover hints). */
export function buttercutLinkDestinationLabel(href: string): string {
  if (href.startsWith("/")) {
    if (href.startsWith("/projects")) return "Projects";
    if (href.startsWith("/about")) return "About";
    if (href.startsWith("/misc")) return "Misc";
    return "Site";
  }

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "github.com") return "GitHub";
    if (host === "open.spotify.com" || host === "spotify.com") return "Spotify";
    if (host === "mapbox.com") return "Mapbox";
    if (host.endsWith("wikipedia.org")) return "Wikipedia";
    if (host === "youtube.com" || host === "youtu.be") return "YouTube";
    if (host.endsWith("bilibili.com")) return "Bilibili";
    if (host === "cursor.com") return "Cursor";
    if (host === "arc.net") return "Arc";
    if (host === "raycast.com") return "Raycast";
    if (host === "iterm2.com") return "iTerm2";
    if (host === "flighty.com") return "Flighty";
    if (host === "tryalcove.com") return "Alcove";
    if (host === "wisprflow.ai") return "Wispr Flow";
    if (host === "berkeleyside.org") return "Berkeleyside";
    if (host.endsWith("notion.site")) return "Notion";
    if (host === "anthropic.com") return "Anthropic";
    if (host === "developer.apple.com") return "Apple Developer";
    if (host === "bluedot.org") return "BlueDot";
    if (host === "redis.io") return "Redis";

    const brand = host.split(".")[0];
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  } catch {
    return "Link";
  }
}

export function buttercutDestinationHint(href: string, override?: string): string {
  return `${override ?? buttercutLinkDestinationLabel(href)} ↗`;
}

const HINT_ACCENT = "text-[#C4894F] dark:text-[#D9A870]";
const HINT_MOTION = "transition-all duration-150";

/** Leading ↗ — fades + slides in from the left on parent `.group` hover. */
export function ButtercutHoverLinkArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`opacity-0 group-hover:opacity-100 ${HINT_ACCENT} -translate-x-1 group-hover:translate-x-0 ${HINT_MOTION} text-xs shrink-0 ${className}`}
    >
      ↗
    </span>
  );
}

/** Trailing hint text — fades + slides in from the right. */
export function ButtercutHoverLinkHint({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 11 }}
      className={`opacity-0 group-hover:opacity-100 ${HINT_ACCENT} translate-x-1 group-hover:translate-x-0 ${HINT_MOTION} shrink-0 ${className}`}
    >
      {children}
    </span>
  );
}

/** Trailing hint — `{label} ↗` with label + arrow sliding in from the right. */
export function ButtercutHoverLinkDestinationHint({
  href,
  label,
  className = "",
}: {
  href: string;
  label?: string;
  className?: string;
}) {
  const text = label ?? buttercutLinkDestinationLabel(href);

  return (
    <span
      style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 11 }}
      className={`inline-flex items-center gap-1 shrink-0 ${className}`}
    >
      <span
        className={`opacity-0 group-hover:opacity-100 ${HINT_ACCENT} translate-x-2 group-hover:translate-x-0 ${HINT_MOTION}`}
      >
        {text}
      </span>
      <span
        aria-hidden
        className={`opacity-0 group-hover:opacity-100 ${HINT_ACCENT} translate-x-1 group-hover:translate-x-0 ${HINT_MOTION} text-xs leading-none`}
      >
        ↗
      </span>
    </span>
  );
}
