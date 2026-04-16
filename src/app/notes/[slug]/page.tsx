import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";
import { ButtercutProse } from "@/components/ButtercutProse";
import { loadButtercutDemoNote } from "@/lib/demo/load-demo-content";
import { renderButtercutMarkdown } from "@/lib/markdown/render";
import { siteConfig } from "../../../../site.config";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const dir = path.join(process.cwd(), "content/demo/notes");
  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({ slug: f.replace(/\.md$/, "") }));
  } catch {
    return [];
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const note = await loadButtercutDemoNote(slug);
  if (!note) return { title: `Note — ${siteConfig.site.title}` };
  return {
    title: `${note.frontmatter.title ?? slug} — ${siteConfig.site.title}`,
    description: note.frontmatter.summary,
  };
}

export default async function NotePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const note = await loadButtercutDemoNote(slug);
  if (!note) notFound();

  const html = renderButtercutMarkdown(note.body);

  return (
    <article className="mx-auto max-w-[760px] px-4 py-16 md:px-8">
      <Link
        href="/notes"
        className="font-nunito text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        ← Notes
      </Link>
      <header className="mt-6 mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="font-nunito text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100">
          {note.frontmatter.title ?? slug}
        </h1>
        {note.frontmatter.date ? (
          <p className="mt-2 font-nunito text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {note.frontmatter.date}
          </p>
        ) : null}
        {note.frontmatter.summary ? (
          <p className="mt-3 max-w-xl font-serif text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {note.frontmatter.summary}
          </p>
        ) : null}
      </header>
      <ButtercutProse html={html} />
    </article>
  );
}
