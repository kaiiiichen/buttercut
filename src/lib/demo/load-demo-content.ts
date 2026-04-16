import fs from "node:fs/promises";
import path from "node:path";

export type ButtercutDemoProject = {
  name: string;
  description: string;
  href: string;
  tags: string[];
};

export type ButtercutDemoContent = {
  tagline: string;
  intro: string;
  projects: ButtercutDemoProject[];
};

type ProjectsFile = {
  tagline: string;
  projects: ButtercutDemoProject[];
};

export async function loadButtercutDemoContent(): Promise<ButtercutDemoContent> {
  const root = process.cwd();
  const projectsPath = path.join(root, "content/demo/projects.json");
  const introPath = path.join(root, "content/demo/intro.md");

  const [projectsRaw, introRaw] = await Promise.all([
    fs.readFile(projectsPath, "utf8"),
    fs.readFile(introPath, "utf8"),
  ]);

  const parsed = JSON.parse(projectsRaw) as ProjectsFile;

  return {
    tagline: parsed.tagline,
    intro: introRaw.trim(),
    projects: parsed.projects,
  };
}
