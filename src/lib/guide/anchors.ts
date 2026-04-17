/**
 * Canonical list of `/guide` section anchors — the single source of
 * truth for deep-links from README, CHANGELOG, JSDoc, and commit
 * messages.
 *
 * Consumers:
 * - `src/app/guide/page.mdx` — the "On this page" TOC maps over this
 *   array so the in-app table of contents can't drift out of sync
 *   with the rendered steps.
 * - `src/app/guide/guide-anchors.smoke.test.ts` — post-build smoke
 *   test asserting every id below actually appears in
 *   `.next/server/app/guide.html`.
 * - `src/lib/guide/anchors-refs.test.ts` — scans README, CHANGELOG,
 *   and source files for `/guide#<id>` references and fails on any
 *   id that isn't in this list (catches typos like
 *   `/guide#side-config`).
 *
 * To add a new Step:
 * 1. Append an entry here.
 * 2. Drop `<Step n={N} id="..." title="..." />` into `page.mdx`.
 * 3. Run `npm run build && npm run test:smoke` — the smoke test will
 *    fail loudly if the rendered HTML doesn't match.
 */
export type ButtercutGuideAnchor = {
  /** Kebab-case slug, used as both the section `id` and the URL fragment. */
  id: string;
  /** One-line label used in the in-app TOC and docs cross-refs. */
  title: string;
  /** 1-based step number, displayed before the title in the TOC. */
  stepNumber: number;
};

export const BUTTERCUT_GUIDE_ANCHORS: readonly ButtercutGuideAnchor[] = [
  { id: "clone-and-run", title: "Clone and run", stepNumber: 1 },
  { id: "site-config", title: "Fill in site.config.ts", stepNumber: 2 },
  {
    id: "content",
    title: "Swap the content in content/demo/",
    stepNumber: 3,
  },
  { id: "short-copy", title: "Authoring short copy", stepNumber: 4 },
  { id: "theme", title: "Pick a colour mood", stepNumber: 5 },
  { id: "home-blocks", title: "Reorder or hide home blocks", stepNumber: 6 },
  { id: "blocks", title: "Add or override a block", stepNumber: 7 },
  { id: "notes", title: "Write notes in MDX", stepNumber: 8 },
  {
    id: "integrations",
    title: "Turn on optional integrations",
    stepNumber: 9,
  },
  { id: "deploy", title: "Deploy", stepNumber: 10 },
];

/** Convenience view — just the ids, in step order. */
export const BUTTERCUT_GUIDE_ANCHOR_IDS: readonly string[] =
  BUTTERCUT_GUIDE_ANCHORS.map((a) => a.id);
