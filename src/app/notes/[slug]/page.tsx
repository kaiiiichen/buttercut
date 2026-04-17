import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";
import { ButtercutProse } from "@/components/ButtercutProse";
import { loadButtercutDemoNote } from "@/lib/demo/load-demo-content";
import { renderButtercutMarkdown } from "@/lib/markdown/render";
import { siteConfig } from "../../../../site.config";

// Only pre-rendered slugs are valid; anything else 404s immediately
// rather than falling back to on-demand file reads.
export const dynamicParams = false;

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
    <article className="mx-auto max-w-[1180px] px-4 py-16 md:px-12">
      {/* Header — mirrors kaichen.dev /notes/cs61a */}
      <div className="mb-12 fade-up" style={{ animationDelay: "0ms" }}>
        {/* Pill back button — identical to kaichen.dev */}
        <div className="mb-5">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)] px-3 py-1 font-nunito text-[0.8rem] text-[var(--accent)] transition-colors duration-150 hover:bg-[var(--accent)] hover:text-white dark:hover:text-zinc-900"
          >
            <span aria-hidden="true">←</span>
            <span>Notes</span>
          </Link>
        </div>

        {note.frontmatter.date ? (
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="font-nunito text-sm font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
              {note.frontmatter.date}
            </span>
          </div>
        ) : null}

        <h1 className="font-serif text-[2.5rem] font-semibold leading-[1.15] tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">
          {note.frontmatter.title ?? slug}
        </h1>

        {note.frontmatter.summary ? (
          <p className="mt-3 font-serif text-[0.9rem] leading-[1.8] text-zinc-400 dark:text-zinc-600">
            {note.frontmatter.summary}
          </p>
        ) : null}

        <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Body — constrained reading width */}
      <div className="fade-up" style={{ animationDelay: "60ms" }}>
        <div className="mx-auto max-w-[760px]">
          <ButtercutProse html={html} />
        </div>
      </div>
    </article>
  );
}
