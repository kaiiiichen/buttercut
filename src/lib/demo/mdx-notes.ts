import type { ComponentType } from "react";

export type ButtercutMdxFrontmatter = {
  title?: string;
  summary?: string;
  date?: string;
};

export type ButtercutMdxNoteModule = {
  default: ComponentType;
  frontmatter?: ButtercutMdxFrontmatter;
};

export type ButtercutMdxNoteLoader = () => Promise<ButtercutMdxNoteModule>;

/**
 * MDX notes registry. Register one entry per `.mdx` file under
 * `content/demo/notes/`. The key becomes the URL slug.
 *
 * Why an explicit registry? Next.js/Turbopack cannot statically analyse
 * `import(\`./\${slug}.mdx\`)`, so we keep every import literal. Adding
 * a note is a one-liner:
 *
 * ```ts
 * "my-essay": () => import("../../../content/demo/notes/my-essay.mdx"),
 * ```
 *
 * Frontmatter is read from `export const frontmatter = {…}` inside the
 * MDX file. Anything missing is gracefully omitted.
 */
export const BUTTERCUT_MDX_NOTES: Record<string, ButtercutMdxNoteLoader> = {
  "welcome-mdx": () =>
    import("../../../content/demo/notes/welcome-mdx.mdx") as Promise<ButtercutMdxNoteModule>,
};

export function listButtercutMdxNoteSlugs(): string[] {
  return Object.keys(BUTTERCUT_MDX_NOTES);
}

export async function loadButtercutMdxNote(
  slug: string,
): Promise<ButtercutMdxNoteModule | null> {
  const loader = BUTTERCUT_MDX_NOTES[slug];
  if (!loader) return null;
  try {
    return await loader();
  } catch {
    return null;
  }
}
