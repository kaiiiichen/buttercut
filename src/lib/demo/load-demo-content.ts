import fs from "node:fs/promises";
import path from "node:path";
import { BUTTERCUT_MDX_NOTES } from "./mdx-notes";

export type ButtercutDemoProject = {
  name: string;
  description: string;
  /** Public URL. When omitted, auto-derived from `repo` as github.com/<repo>. */
  href: string;
  tags: string[];
  /** Optional "owner/name" for GitHub integration */
  repo?: string;
};

/**
 * Accepts the raw shape from `content/demo/projects.json` where `href`
 * may be omitted if a `repo` is provided. We resolve the two so the
 * rendered type always has a concrete URL.
 */
export type ButtercutDemoProjectInput = Omit<ButtercutDemoProject, "href"> & {
  href?: string;
};

function resolveProjectHref(p: ButtercutDemoProjectInput): string {
  if (p.href && p.href.length > 0) return p.href;
  if (p.repo && /^[\w.-]+\/[\w.-]+$/.test(p.repo)) {
    return `https://github.com/${p.repo}`;
  }
  return "#";
}

export function normaliseButtercutProject(
  p: ButtercutDemoProjectInput,
): ButtercutDemoProject {
  return { ...p, href: resolveProjectHref(p) };
}

export type ButtercutDemoNoteSummary = {
  slug: string;
  title: string;
  summary?: string;
  date?: string;
  /** Which rendering path will serve this note. */
  kind: "md" | "mdx";
};

/**
 * Structured data for the /about page. Every section is optional — empty
 * arrays hide their card entirely, so authors can keep only the parts that
 * apply to them. Inline markdown is supported in every string field.
 */
export type ButtercutDemoAbout = {
  intro: string;
  education: ButtercutDemoEducation[];
  experience: ButtercutDemoExperience[];
  volunteering: ButtercutDemoVolunteering[];
  focus: ButtercutDemoFocus[];
};

export type ButtercutDemoEducation = {
  years: string;
  institution: string;
  role: string;
  sub?: string | null;
  activities?: string | null;
};

export type ButtercutDemoExperience = {
  years: string;
  meta?: string | null;
  role: string;
  org: string;
  desc?: string | null;
};

export type ButtercutDemoVolunteering = {
  years: string;
  role: string;
  org: string;
  desc?: string | null;
};

export type ButtercutDemoFocus = {
  term: string;
  code: string;
  name: string;
};

export type ButtercutDemoContent = {
  tagline: string;
  intro: string;
  about: ButtercutDemoAbout;
  projects: ButtercutDemoProject[];
  notes: ButtercutDemoNoteSummary[];
};

type ProjectsFile = {
  tagline: string;
  projects: ButtercutDemoProjectInput[];
};

type AboutFile = Partial<ButtercutDemoAbout>;

const EMPTY_ABOUT: ButtercutDemoAbout = {
  intro: "",
  education: [],
  experience: [],
  volunteering: [],
  focus: [],
};

function normaliseAbout(raw: AboutFile | null): ButtercutDemoAbout {
  if (!raw) return EMPTY_ABOUT;
  return {
    intro: typeof raw.intro === "string" ? raw.intro.trim() : "",
    education: Array.isArray(raw.education) ? raw.education : [],
    experience: Array.isArray(raw.experience) ? raw.experience : [],
    volunteering: Array.isArray(raw.volunteering) ? raw.volunteering : [],
    focus: Array.isArray(raw.focus) ? raw.focus : [],
  };
}

type NoteFrontmatter = {
  title?: string;
  summary?: string;
  date?: string;
};

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?/;

export function parseFrontmatter(raw: string): {
  data: NoteFrontmatter;
  content: string;
} {
  const m = raw.match(FRONTMATTER_RE);
  if (!m) return { data: {}, content: raw };
  const block = m[1];
  const data: Record<string, string> = {};
  for (const line of block.split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    data[k] = v.replace(/^['"]|['"]$/g, "").trim();
  }
  return { data, content: raw.slice(m[0].length) };
}

async function safeRead(p: string): Promise<string> {
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
}

export async function loadButtercutDemoContent(): Promise<ButtercutDemoContent> {
  const root = process.cwd();
  const projectsPath = path.join(root, "content/demo/projects.json");
  const introPath = path.join(root, "content/demo/intro.md");
  const aboutPath = path.join(root, "content/demo/about.json");
  const notesDir = path.join(root, "content/demo/notes");

  const [projectsRaw, introRaw, aboutRaw] = await Promise.all([
    fs.readFile(projectsPath, "utf8"),
    fs.readFile(introPath, "utf8"),
    safeRead(aboutPath),
  ]);

  const parsed = JSON.parse(projectsRaw) as ProjectsFile;

  let about: ButtercutDemoAbout;
  try {
    about = normaliseAbout(aboutRaw ? (JSON.parse(aboutRaw) as AboutFile) : null);
  } catch {
    about = EMPTY_ABOUT;
  }

  let notes: ButtercutDemoNoteSummary[] = [];
  try {
    const files = await fs.readdir(notesDir);
    const mdSummaries = await Promise.all(
      files
        .filter((f) => f.endsWith(".md"))
        .map(async (f): Promise<ButtercutDemoNoteSummary> => {
          const slug = f.replace(/\.md$/, "");
          const raw = await fs.readFile(path.join(notesDir, f), "utf8");
          const { data } = parseFrontmatter(raw);
          return {
            slug,
            title: data.title ?? slug,
            summary: data.summary,
            date: data.date,
            kind: "md",
          };
        }),
    );

    // MDX summaries come from the registry, not the filesystem — users stay
    // in control of which MDX files are published.
    const mdxSummaries = await Promise.all(
      Object.entries(BUTTERCUT_MDX_NOTES).map(
        async ([slug, load]): Promise<ButtercutDemoNoteSummary> => {
          try {
            const mod = await load();
            return {
              slug,
              title: mod.frontmatter?.title ?? slug,
              summary: mod.frontmatter?.summary,
              date: mod.frontmatter?.date,
              kind: "mdx",
            };
          } catch {
            return { slug, title: slug, kind: "mdx" };
          }
        },
      ),
    );

    // Prefer the MDX entry if a slug somehow appears in both registries.
    const byId = new Map<string, ButtercutDemoNoteSummary>();
    for (const n of mdSummaries) byId.set(n.slug, n);
    for (const n of mdxSummaries) byId.set(n.slug, n);
    notes = Array.from(byId.values()).sort((a, b) =>
      (b.date ?? "").localeCompare(a.date ?? ""),
    );
  } catch {
    notes = [];
  }

  return {
    tagline: parsed.tagline,
    intro: introRaw.trim(),
    about,
    projects: parsed.projects.map(normaliseButtercutProject),
    notes,
  };
}

/** Matches a single path segment — letters, digits, dash, underscore only. */
export const BUTTERCUT_SLUG_RE = /^[A-Za-z0-9_-]+$/;

export async function loadButtercutDemoNote(
  slug: string,
): Promise<{ frontmatter: NoteFrontmatter; body: string } | null> {
  if (!BUTTERCUT_SLUG_RE.test(slug)) return null;

  const notesDir = path.resolve(process.cwd(), "content/demo/notes");
  const file = path.resolve(notesDir, `${slug}.md`);
  // Belt + suspenders: reject anything that resolved outside the notes dir
  // even though the slug regex should already guarantee this.
  if (!file.startsWith(notesDir + path.sep)) return null;

  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = parseFrontmatter(raw);
    return { frontmatter: data, body: content };
  } catch {
    return null;
  }
}
