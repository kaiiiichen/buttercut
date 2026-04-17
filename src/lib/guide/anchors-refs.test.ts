import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { BUTTERCUT_GUIDE_ANCHOR_IDS } from "./anchors";

/**
 * Walks a directory recursively and returns every file whose extension
 * matches the allow list. Kept tiny on purpose — this test runs on every
 * `npm test` and shouldn't pull in a glob dep.
 */
function walk(dir: string, exts: readonly string[]): string[] {
  const out: string[] = [];
  const queue: string[] = [dir];
  while (queue.length > 0) {
    const current = queue.pop();
    if (current === undefined) break;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git" ||
        entry.name.startsWith(".")
      ) {
        continue;
      }
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(full);
      } else if (exts.some((ext) => entry.name.endsWith(ext))) {
        out.push(full);
      }
    }
  }
  return out;
}

const ROOT = path.resolve(__dirname, "..", "..", "..");

const DOC_FILES: readonly string[] = [
  path.join(ROOT, "README.md"),
  path.join(ROOT, "CHANGELOG.md"),
  path.join(ROOT, "CONTRIBUTING.md"),
].filter((p) => fs.existsSync(p));

const SOURCE_FILES: readonly string[] = walk(path.join(ROOT, "src"), [
  ".ts",
  ".tsx",
  ".mdx",
]);

/**
 * Matches `/guide#foo-bar` or `guide#foo-bar` (inside strings, markdown
 * links, JSDoc `@see` lines, etc.). We only care about the id half, so
 * the leading slash is optional — this way a doc writer who types
 * `See guide#short-copy` is still caught.
 */
const GUIDE_REF_RE = /\/?guide#([a-z][a-z0-9-]*)\b/g;

type Ref = { file: string; id: string };

function collectRefs(files: readonly string[]): Ref[] {
  const refs: Ref[] = [];
  for (const file of files) {
    const contents = fs.readFileSync(file, "utf8");
    for (const match of contents.matchAll(GUIDE_REF_RE)) {
      refs.push({ file: path.relative(ROOT, file), id: match[1] });
    }
  }
  return refs;
}

describe("/guide cross-reference integrity", () => {
  const knownIds = new Set(BUTTERCUT_GUIDE_ANCHOR_IDS);

  const docRefs = collectRefs(DOC_FILES);
  const sourceRefs = collectRefs(SOURCE_FILES).filter(
    // Skip the anchors source file (contains ids as data, not refs)
    // and this test file (it describes the regex in comments / test
    // names, both of which would match it against itself).
    (ref) =>
      !ref.file.endsWith("src/lib/guide/anchors.ts") &&
      !ref.file.endsWith("src/lib/guide/anchors-refs.test.ts"),
  );

  it("every /guide#id in docs (README / CHANGELOG / CONTRIBUTING) is a known anchor", () => {
    const bad = docRefs.filter((ref) => !knownIds.has(ref.id));
    expect(
      bad,
      `Unknown /guide anchor(s) referenced from docs:\n${bad
        .map((b) => `  - ${b.file} → #${b.id}`)
        .join("\n")}\nKnown ids: ${[...knownIds].join(", ")}`,
    ).toEqual([]);
  });

  it("every /guide#id in source files is a known anchor", () => {
    const bad = sourceRefs.filter((ref) => !knownIds.has(ref.id));
    expect(
      bad,
      `Unknown /guide anchor(s) referenced from source:\n${bad
        .map((b) => `  - ${b.file} → #${b.id}`)
        .join("\n")}\nKnown ids: ${[...knownIds].join(", ")}`,
    ).toEqual([]);
  });

  it("at least one cross-reference exists (sanity check — the loop isn't empty)", () => {
    // Guards against a future rename that drops all references
    // silently — catches "test is green because it has nothing to
    // check" regressions.
    expect(docRefs.length + sourceRefs.length).toBeGreaterThan(0);
  });
});
