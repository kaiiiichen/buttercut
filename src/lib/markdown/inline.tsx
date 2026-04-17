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
 */
const TOKEN_RE =
  /(\*\*[^*\n]+\*\*)|(`[^`\n]+`)|(\[[^\]\n]+\]\([^)\s]+\))/g;

/**
 * Allow relative paths (`/foo`, `#bar`, `foo.html`), mailto:, and http(s).
 * Reject anything that looks like a script-capable URL scheme
 * (`javascript:`, `data:`, `vbscript:`, `file:`, unknown custom schemes).
 * When a link fails the check we fall back to emitting the raw markdown
 * text, which is visually obvious ("oh, my link didn't render") and
 * impossible to exploit.
 */
function isSafeHref(href: string): boolean {
  const trimmed = href.trim();
  if (trimmed.length === 0) return false;
  // Schemeless → treat as a relative/fragment URL, always safe.
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return true;
  return /^(https?|mailto):/i.test(trimmed);
}

function renderToken(raw: string, key: number): ReactNode {
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
    if (!isSafeHref(href)) {
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

export function renderButtercutInlineMarkdown(text: string): ReactNode[] {
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
    nodes.push(renderToken(match[0], key++));
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<span key={`t${key++}`}>{text.slice(lastIndex)}</span>);
  }

  return nodes;
}
