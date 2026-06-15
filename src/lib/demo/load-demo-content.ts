import fs from "node:fs/promises";
import path from "node:path";

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
  greeting: string;
  subtitles: string[];
  intro: string;
  about: ButtercutDemoAbout;
  projects: ButtercutDemoProject[];
};

type ProjectsFile = {
  tagline: string;
  greeting?: string;
  subtitles?: string[];
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

  return {
    tagline: parsed.tagline,
    greeting: typeof parsed.greeting === "string" ? parsed.greeting.trim() : "Hello :)",
    subtitles: Array.isArray(parsed.subtitles)
      ? parsed.subtitles.filter((line): line is string => typeof line === "string")
      : [],
    intro: introRaw.trim(),
    about,
    projects: parsed.projects.map(normaliseButtercutProject),
  };
}
