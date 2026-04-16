import fs from "node:fs/promises";
import path from "node:path";

export type ButtercutDemoProject = {
  name: string;
  description: string;
  href: string;
  tags: string[];
  /** Optional "owner/name" for GitHub integration */
  repo?: string;
};

export type ButtercutDemoNoteSummary = {
  slug: string;
  title: string;
  summary?: string;
  date?: string;
};

export type ButtercutDemoContent = {
  tagline: string;
  intro: string;
  about: string;
  projects: ButtercutDemoProject[];
  notes: ButtercutDemoNoteSummary[];
};

type ProjectsFile = {
  tagline: string;
  projects: ButtercutDemoProject[];
};

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
  const aboutPath = path.join(root, "content/demo/about.md");
  const notesDir = path.join(root, "content/demo/notes");

  const [projectsRaw, introRaw, aboutRaw] = await Promise.all([
    fs.readFile(projectsPath, "utf8"),
    fs.readFile(introPath, "utf8"),
    safeRead(aboutPath),
  ]);

  const parsed = JSON.parse(projectsRaw) as ProjectsFile;

  let notes: ButtercutDemoNoteSummary[] = [];
  try {
    const files = await fs.readdir(notesDir);
    const summaries = await Promise.all(
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
          };
        }),
    );
    notes = summaries.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  } catch {
    notes = [];
  }

  return {
    tagline: parsed.tagline,
    intro: introRaw.trim(),
    about: aboutRaw.trim(),
    projects: parsed.projects,
    notes,
  };
}

export async function loadButtercutDemoNote(
  slug: string,
): Promise<{ frontmatter: NoteFrontmatter; body: string } | null> {
  const notesDir = path.join(process.cwd(), "content/demo/notes");
  const file = path.join(notesDir, `${slug}.md`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = parseFrontmatter(raw);
    return { frontmatter: data, body: content };
  } catch {
    return null;
  }
}
