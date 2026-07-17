import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const statePath = resolve(repoRoot, ".kaichen-sync.json");

function parseArgs(argv) {
  const options = {
    source: resolve(repoRoot, "../kaichen.dev"),
    check: false,
    record: false,
    jsonOutput: null,
    markdownOutput: null,
    githubOutput: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--source") options.source = resolve(argv[++i]);
    else if (arg === "--check") options.check = true;
    else if (arg === "--record") options.record = true;
    else if (arg === "--json-output") options.jsonOutput = resolve(argv[++i]);
    else if (arg === "--markdown-output") options.markdownOutput = resolve(argv[++i]);
    else if (arg === "--github-output") options.githubOutput = resolve(argv[++i]);
    else if (arg === "--help") {
      console.log(`Usage: node scripts/sync-kaichen.mjs [options]

  --source PATH            kaichen.dev checkout (default: ../kaichen.dev)
  --check                  exit 1 when watched upstream files changed
  --record                 record current upstream HEAD after a completed sync
  --json-output PATH       also write the machine-readable report
  --markdown-output PATH   also write the human-readable report
  --github-output PATH     append pending/base/head outputs for GitHub Actions`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

function git(source, args, { allowFailure = false } = {}) {
  try {
    return execFileSync("git", ["-C", source, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", allowFailure ? "ignore" : "pipe"],
    }).trim();
  } catch (error) {
    if (allowFailure) return null;
    const detail = error.stderr?.toString().trim();
    throw new Error(detail || `git ${args.join(" ")} failed in ${source}`);
  }
}

function isAncestor(source, commit, head) {
  return git(source, ["merge-base", "--is-ancestor", commit, head], {
    allowFailure: true,
  }) !== null;
}

function selectBaseline(source, head, state) {
  const candidates = [state.source.syncedCommit, ...(state.source.reviewedCommits ?? [])];
  const usable = candidates.filter((commit) => {
    const exists = git(source, ["cat-file", "-e", `${commit}^{commit}`], {
      allowFailure: true,
    }) !== null;
    return exists && isAncestor(source, commit, head);
  });
  if (usable.length === 0) {
    throw new Error(`None of the recorded sync commits is an ancestor of ${head}.`);
  }
  return usable.sort((a, b) => {
    const aDistance = Number(git(source, ["rev-list", "--count", `${a}..${head}`]));
    const bDistance = Number(git(source, ["rev-list", "--count", `${b}..${head}`]));
    return aDistance - bDistance;
  })[0];
}

function parseNameStatus(output, watchedBySource) {
  if (!output) return [];
  return output.split("\n").flatMap((line) => {
    const fields = line.split("\t");
    const status = fields[0];
    const sourcePath = fields.at(-1);
    const mapping = watchedBySource.get(sourcePath);
    return mapping ? [{ status, ...mapping }] : [];
  });
}

function parseWorkingTree(output, watchedBySource) {
  if (!output) return [];
  return output.split("\n").flatMap((line) => {
    const status = line.slice(0, 2).trim() || "M";
    const sourcePath = line.slice(3).split(" -> ").at(-1);
    const mapping = watchedBySource.get(sourcePath);
    return mapping ? [{ status: `WT:${status}`, ...mapping }] : [];
  });
}

function uniqueChanges(changes) {
  const byPath = new Map();
  for (const change of changes) byPath.set(change.source, change);
  return [...byPath.values()].sort((a, b) => a.source.localeCompare(b.source));
}

function renderMarkdown(report, state) {
  const lines = [
    "# kaichen.dev → Buttercut sync report",
    "",
    `- Upstream: \`${state.source.repository}@${state.source.branch}\``,
    `- Compared: \`${report.base}\` → \`${report.head}\``,
    `- Status: **${report.pending ? "review required" : "in sync"}**`,
    "",
  ];

  if (report.changes.length === 0) {
    lines.push("No watched upstream files changed.", "");
  } else {
    lines.push("| Status | Upstream source | Buttercut target | Area |", "| --- | --- | --- | --- |");
    for (const change of report.changes) {
      lines.push(
        `| \`${change.status}\` | \`${change.source}\` | \`${change.target}\` | ${change.category} |`,
      );
    }
    lines.push(
      "",
      "## Sync checklist",
      "",
      "- [ ] Review the upstream diff and port reusable design/behaviour changes only.",
      "- [ ] Keep personal copy, secrets, and app-specific routes out of Buttercut.",
      "- [ ] Run `npm run lint && npm run typecheck && npm run test && npm run build`.",
      "- [ ] Run `npm run sync:kaichen:record` after the port is complete.",
      "",
    );
  }
  lines.push(
    "Generated by `scripts/sync-kaichen.mjs`; do not close this issue until the recorded baseline is updated.",
    "",
  );
  return lines.join("\n");
}

const options = parseArgs(process.argv.slice(2));
const state = JSON.parse(readFileSync(statePath, "utf8"));
const watchedBySource = new Map(state.watched.map((entry) => [entry.source, entry]));
const watchedPaths = [...watchedBySource.keys()];

git(options.source, ["rev-parse", "--git-dir"]);
const head = git(options.source, ["rev-parse", "HEAD"]);
const branch = git(options.source, ["branch", "--show-current"]);
const base = selectBaseline(options.source, head, state);
const committed = parseNameStatus(
  git(options.source, ["diff", "--name-status", base, head, "--", ...watchedPaths]),
  watchedBySource,
);
const workingTree = parseWorkingTree(
  git(options.source, ["status", "--short", "--", ...watchedPaths]),
  watchedBySource,
);
const changes = uniqueChanges([...committed, ...workingTree]);
const report = { pending: changes.length > 0, base, head, branch, changes };

if (options.record) {
  if (workingTree.length > 0) {
    throw new Error("Refusing to record a sync baseline while watched upstream files are dirty.");
  }
  state.source.syncedCommit = head;
  state.source.reviewedCommits = [];
  state.source.syncedAt = new Date().toISOString();
  writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
}

const markdown = renderMarkdown(report, state);
const json = `${JSON.stringify(report, null, 2)}\n`;
console.log(markdown);
if (options.jsonOutput) writeFileSync(options.jsonOutput, json);
if (options.markdownOutput) writeFileSync(options.markdownOutput, markdown);
if (options.githubOutput) {
  appendFileSync(options.githubOutput, `pending=${report.pending}\nbase=${base}\nhead=${head}\n`);
}
if (options.check && report.pending && !options.record) process.exitCode = 1;
