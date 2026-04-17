import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs/promises";
import path from "node:path";
import { ButtercutProse } from "@/components/ButtercutProse";
import {
  BUTTERCUT_SLUG_RE,
  loadButtercutDemoNote,
} from "@/lib/demo/load-demo-content";
import { loadButtercutMdxNote, listButtercutMdxNoteSlugs } from "@/lib/demo/mdx-notes";
import { renderButtercutInlineMarkdown } from "@/lib/markdown/inline";
import { renderButtercutMarkdown } from "@/lib/markdown/render";
import { siteConfig } from "../../../../site.config";

// Only pre-rendered slugs are valid; anything else 404s immediately
// rather than falling back to on-demand file reads.
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const mdDir = path.join(process.cwd(), "content/demo/notes");
  const slugs = new Set<string>();

  try {
    const files = await fs.readdir(mdDir);
    for (const f of files) {
      if (f.endsWith(".md")) slugs.add(f.replace(/\.md$/, ""));
    }
  } catch {
    // No markdown directory — MDX registry may still contribute slugs.
  }

  for (const slug of listButtercutMdxNoteSlugs()) {
    if (BUTTERCUT_SLUG_RE.test(slug)) slugs.add(slug);
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

type NoteView = {
  title: string;
  summary?: string;
  date?: string;
  body: React.ReactNode;
};

async function loadNoteView(slug: string): Promise<NoteView | null> {
  // MDX takes precedence — it is the only path that supports JSX.
  const mdxMod = await loadButtercutMdxNote(slug);
  if (mdxMod) {
    const Content = mdxMod.default;
    const fm = mdxMod.frontmatter ?? {};
    return {
      title: fm.title ?? slug,
      summary: fm.summary,
      date: fm.date,
      body: (
        <ButtercutProse>
          <Content />
        </ButtercutProse>
      ),
    };
  }

  const md = await loadButtercutDemoNote(slug);
  if (!md) return null;
  const html = renderButtercutMarkdown(md.body);
  return {
    title: md.frontmatter.title ?? slug,
    summary: md.frontmatter.summary,
    date: md.frontmatter.date,
    body: <ButtercutProse html={html} />,
  };
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const note = await loadNoteView(slug);
  if (!note) return { title: `Note — ${siteConfig.site.title}` };
  return {
    title: `${note.title} — ${siteConfig.site.title}`,
    description: note.summary,
  };
}

export default async function NotePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const note = await loadNoteView(slug);
  if (!note) notFound();

  return (
    <article className="mx-auto max-w-[1180px] px-4 py-16 md:px-12">
      <div className="mb-12 fade-up" style={{ animationDelay: "0ms" }}>
        <div className="mb-5">
          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)] px-3 py-1 font-nunito text-[0.8rem] text-[var(--accent)] transition-colors duration-150 hover:bg-[var(--accent)] hover:text-white dark:hover:text-zinc-900"
          >
            <span aria-hidden="true">←</span>
            <span>Notes</span>
          </Link>
        </div>

        {note.date ? (
          <div className="mb-2.5 flex items-center gap-2.5">
            <span className="font-nunito text-sm font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
              {note.date}
            </span>
          </div>
        ) : null}

        <h1 className="font-serif text-[2.5rem] font-semibold leading-[1.15] tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">
          {note.title}
        </h1>

        {note.summary ? (
          <p className="mt-3 font-serif text-[0.9rem] leading-[1.8] text-zinc-400 dark:text-zinc-600">
            {renderButtercutInlineMarkdown(note.summary, {
              allowedLinkSchemes: siteConfig.content.allowedLinkSchemes,
            })}
          </p>
        ) : null}

        <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="fade-up" style={{ animationDelay: "60ms" }}>
        <div className="mx-auto max-w-[760px]">{note.body}</div>
      </div>
    </article>
  );
}
