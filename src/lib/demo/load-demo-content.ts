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

export type ButtercutDemoProjectInput = Omit<ButtercutDemoProject, "href"> & {
  href?: string;
};

export type ButtercutDemoCourseProject = {
  id: string;
  href: string;
  title: string;
  institution?: string;
  grade?: string;
  summary: string;
  tags: string[];
  external?: boolean;
  hintLabel?: string;
};

export type ButtercutDemoExperienceRole = {
  years: string;
  role: string;
  desc?: string | null;
};

export type ButtercutDemoExperienceGroup = {
  org: string;
  meta?: string | null;
  roles: ButtercutDemoExperienceRole[];
};

export type ButtercutDemoExperienceFlat = {
  years: string;
  meta?: string | null;
  role: string;
  org: string;
  desc?: string | null;
};

export type ButtercutDemoExperienceInput =
  | ButtercutDemoExperienceFlat
  | ButtercutDemoExperienceGroup;

export type ButtercutDemoVolunteeringInput =
  | Omit<ButtercutDemoExperienceFlat, "meta">
  | ButtercutDemoExperienceGroup;

export type ButtercutDemoEducation = {
  years: string;
  institution: string;
  role: string;
  sub?: string | null;
  subtitle?: string | null;
  grade?: string | null;
  content?: string | null;
  activities?: string | null;
  projectHref?: string | null;
  projectLinkLabel?: string | null;
};

export type ButtercutDemoFocus = {
  term: string;
  code: string;
  name?: string;
};

export type ButtercutDemoAbout = {
  intro: string;
  education: ButtercutDemoEducation[];
  experience: ButtercutDemoExperienceGroup[];
  volunteering: ButtercutDemoExperienceGroup[];
  focus: ButtercutDemoFocus[];
};

export type ButtercutDemoMiscLink = { name: string; href: string };

export type ButtercutDemoMisc = {
  intro?: string;
  watching: Array<{ title: string; href: string; source: string; date: string }>;
  remembrance: Array<{ name: string; href: string; note: string }>;
  thingGroups: Array<{ category: string; rows: ButtercutDemoMiscLink[][] }>;
  resources: Array<{ name: string; href: string; hintLabel?: string }>;
};

export type ButtercutDemoContent = {
  tagline: string;
  greeting: string;
  subtitles: string[];
  intro: string;
  about: ButtercutDemoAbout;
  projects: ButtercutDemoProject[];
  courseProjects: ButtercutDemoCourseProject[];
  misc: ButtercutDemoMisc;
};

type ProjectsFile = {
  tagline: string;
  greeting?: string;
  subtitles?: string[];
  projects: ButtercutDemoProjectInput[];
};

type AboutFile = {
  intro?: string;
  education?: ButtercutDemoEducation[];
  experience?: ButtercutDemoExperienceInput[];
  volunteering?: ButtercutDemoVolunteeringInput[];
  focus?: ButtercutDemoFocus[];
};

const EMPTY_MISC: ButtercutDemoMisc = {
  watching: [],
  remembrance: [],
  thingGroups: [],
  resources: [],
};

const EMPTY_ABOUT: ButtercutDemoAbout = {
  intro: "",
  education: [],
  experience: [],
  volunteering: [],
  focus: [],
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

function isExperienceGroup(
  entry: ButtercutDemoExperienceInput | ButtercutDemoVolunteeringInput,
): entry is ButtercutDemoExperienceGroup {
  return Array.isArray((entry as ButtercutDemoExperienceGroup).roles);
}

function normaliseExperienceGroup(
  entry: ButtercutDemoExperienceInput | ButtercutDemoVolunteeringInput,
): ButtercutDemoExperienceGroup {
  if (isExperienceGroup(entry)) return entry;
  return {
    org: entry.org,
    meta: "meta" in entry ? entry.meta : undefined,
    roles: [{ years: entry.years, role: entry.role, desc: entry.desc }],
  };
}

function normaliseAbout(raw: AboutFile | null): ButtercutDemoAbout {
  if (!raw) return EMPTY_ABOUT;
  return {
    intro: typeof raw.intro === "string" ? raw.intro.trim() : "",
    education: Array.isArray(raw.education) ? raw.education : [],
    experience: Array.isArray(raw.experience)
      ? raw.experience.map(normaliseExperienceGroup)
      : [],
    volunteering: Array.isArray(raw.volunteering)
      ? raw.volunteering.map(normaliseExperienceGroup)
      : [],
    focus: Array.isArray(raw.focus) ? raw.focus : [],
  };
}

function normaliseMisc(raw: Partial<ButtercutDemoMisc> | null): ButtercutDemoMisc {
  if (!raw) return EMPTY_MISC;
  return {
    intro: typeof raw.intro === "string" ? raw.intro.trim() : undefined,
    watching: Array.isArray(raw.watching) ? raw.watching : [],
    remembrance: Array.isArray(raw.remembrance) ? raw.remembrance : [],
    thingGroups: Array.isArray(raw.thingGroups) ? raw.thingGroups : [],
    resources: Array.isArray(raw.resources) ? raw.resources : [],
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
  const courseProjectsPath = path.join(root, "content/demo/course-projects.json");
  const miscPath = path.join(root, "content/demo/misc.json");

  const [projectsRaw, introRaw, aboutRaw, courseProjectsRaw, miscRaw] =
    await Promise.all([
      fs.readFile(projectsPath, "utf8"),
      fs.readFile(introPath, "utf8"),
      safeRead(aboutPath),
      safeRead(courseProjectsPath),
      safeRead(miscPath),
    ]);

  const parsed = JSON.parse(projectsRaw) as ProjectsFile;

  let about: ButtercutDemoAbout;
  try {
    about = normaliseAbout(aboutRaw ? (JSON.parse(aboutRaw) as AboutFile) : null);
  } catch {
    about = EMPTY_ABOUT;
  }

  let courseProjects: ButtercutDemoCourseProject[] = [];
  try {
    const courseParsed = courseProjectsRaw
      ? (JSON.parse(courseProjectsRaw) as { projects?: ButtercutDemoCourseProject[] })
      : null;
    courseProjects = Array.isArray(courseParsed?.projects) ? courseParsed.projects : [];
  } catch {
    courseProjects = [];
  }

  let misc: ButtercutDemoMisc;
  try {
    misc = normaliseMisc(miscRaw ? (JSON.parse(miscRaw) as Partial<ButtercutDemoMisc>) : null);
  } catch {
    misc = EMPTY_MISC;
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
    courseProjects,
    misc,
  };
}
