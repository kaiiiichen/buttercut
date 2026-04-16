import type { Metadata } from "next";
import Link from "next/link";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Notes — ${siteConfig.site.title}`,
  description: `Notes published on ${siteConfig.site.title}`,
};

export default async function NotesIndexPage() {
  const { notes } = await loadButtercutDemoContent();

  return (
    <div className="mx-auto max-w-[760px] px-4 py-16 md:px-8">
      <header className="mb-10">
        <p className="font-nunito text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Notes
        </p>
        <h1 className="mt-2 font-nunito text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100">
          Writing
        </h1>
        <p className="mt-3 max-w-xl font-serif text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          Plain markdown under{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-jetbrains-mono text-xs dark:bg-zinc-800">
            content/demo/notes/
          </code>
          . Each file supports optional frontmatter (title, summary, date).
        </p>
      </header>

      {notes.length === 0 ? (
        <p className="font-serif text-sm text-zinc-500 dark:text-zinc-400">
          No notes yet — add a markdown file under <code className="font-jetbrains-mono text-xs">content/demo/notes/</code>.
        </p>
      ) : (
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {notes.map((note) => (
            <li key={note.slug} className="py-5">
              <Link href={`/notes/${note.slug}`} className="group block no-underline">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-serif text-lg font-semibold italic text-zinc-900 transition-colors group-hover:text-[var(--accent)] dark:text-zinc-100">
                    {note.title}
                  </h2>
                  {note.date ? (
                    <span className="shrink-0 font-nunito text-xs text-zinc-400 dark:text-zinc-600">
                      {note.date}
                    </span>
                  ) : null}
                </div>
                {note.summary ? (
                  <p className="mt-1 font-serif text-sm text-zinc-500 dark:text-zinc-400">
                    {note.summary}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
