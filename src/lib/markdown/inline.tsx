import type { ReactNode } from "react";

/**
 * Render a small, deterministic subset of inline markdown to React
 * nodes — `**bold**`, `` `code` ``, and `[label](href)`. Anything else
 * is emitted verbatim as plain text.
 *
 * Why hand-rolled instead of pulling in `marked`?
 *   - Tailwind classes can be attached per token type without parsing
 *     the resulting HTML.
 *   - No `dangerouslySetInnerHTML` on short author strings that get
 *     spliced into custom layouts (hero body, card summaries).
 *   - Trivial to test and to audit.
 *
 * Intended for trusted, author-owned copy (e.g. `content/demo/*.md`).
 * Do **not** pass user-submitted content through here without escaping.
 *
 * @see {@link https://github.com/kaiiiichen/buttercut#inline-markdown-subset README — Inline markdown subset}
 * @see `/guide#short-copy` — the in-app tutorial has a live side-by-side
 *      demo of all three tokens, plus the `content.allowedLinkSchemes`
 *      knob for extending the URL whitelist.
 */
const TOKEN_RE =
  /(\*\*[^*\n]+\*\*)|(`[^`\n]+`)|(\[[^\]\n]+\]\([^)\s]+\))/g;

/** Schemes that are always rejected, even if the user lists them. */
const HARD_DENY_SCHEMES = new Set(["javascript", "data", "vbscript", "file"]);

export const BUTTERCUT_DEFAULT_LINK_SCHEMES: readonly string[] = [
  "http",
  "https",
  "mailto",
];

export type RenderInlineMarkdownOptions = {
  /**
   * URL schemes (without the trailing colon) to accept as safe. Defaults to
   * `BUTTERCUT_DEFAULT_LINK_SCHEMES`. The `HARD_DENY_SCHEMES` list always
   * takes precedence, so a misconfigured site can't accidentally opt into
   * `javascript:` or `data:`.
   */
  allowedLinkSchemes?: readonly string[];
};

/**
 * Allow relative paths (`/foo`, `#bar`, `foo.html`) unconditionally, and any
 * scheme explicitly listed in `allowedLinkSchemes` that isn't on the hard
 * deny list. Rejected links fall back to raw markdown text — visible to the
 * author, inert to the browser.
 */
function isSafeHref(href: string, allowed: readonly string[]): boolean {
  const trimmed = href.trim();
  if (trimmed.length === 0) return false;
  // Schemeless → treat as a relative/fragment URL, always safe.
  const schemeMatch = trimmed.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/);
  if (!schemeMatch) return true;
  const scheme = schemeMatch[1].toLowerCase();
  if (HARD_DENY_SCHEMES.has(scheme)) return false;
  return allowed.some((s) => s.toLowerCase() === scheme);
}

function renderToken(
  raw: string,
  key: number,
  allowed: readonly string[],
): ReactNode {
  const bold = raw.match(/^\*\*(.+)\*\*$/);
  if (bold) {
    return (
      <strong key={key} className="font-semibold text-zinc-900 dark:text-zinc-100">
        {bold[1]}
      </strong>
    );
  }

  const code = raw.match(/^`(.+)`$/);
  if (code) {
    return (
      <code
        key={key}
        className="rounded bg-zinc-100 px-1 py-0.5 font-jetbrains-mono text-[0.85em] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {code[1]}
      </code>
    );
  }

  const link = raw.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
  if (link) {
    const [, label, href] = link;
    if (!isSafeHref(href, allowed)) {
      // Fall through to raw text: better to show `[x](javascript:...)`
      // as literal characters than to emit an exploitable anchor.
      return raw;
    }
    const external = /^https?:\/\//i.test(href);
    return (
      <a
        key={key}
        href={href}
        className="underline decoration-[var(--accent)]/60 underline-offset-4 transition-colors hover:text-[var(--accent)]"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    );
  }

  return raw;
}

export function renderButtercutInlineMarkdown(
  text: string,
  options?: RenderInlineMarkdownOptions,
): ReactNode[] {
  const allowed = options?.allowedLinkSchemes ?? BUTTERCUT_DEFAULT_LINK_SCHEMES;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(TOKEN_RE)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      nodes.push(
        <span key={`t${key++}`}>{text.slice(lastIndex, start)}</span>,
      );
    }
    nodes.push(renderToken(match[0], key++, allowed));
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<span key={`t${key++}`}>{text.slice(lastIndex)}</span>);
  }

  return nodes;
}
