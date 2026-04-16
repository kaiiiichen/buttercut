import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Renders trusted, author-owned markdown to HTML.
 * Do **not** use this for untrusted input — we do not sanitize.
 */
export function renderButtercutMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}
