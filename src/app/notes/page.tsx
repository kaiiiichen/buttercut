import type { Metadata } from "next";
import Link from "next/link";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { renderButtercutInlineMarkdown } from "@/lib/markdown/inline";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Notes — ${siteConfig.site.title}`,
  description: `Notes published on ${siteConfig.site.title}`,
};

export default async function NotesIndexPage() {
  const { notes } = await loadButtercutDemoContent();
  const inlineOpts = {
    allowedLinkSchemes: siteConfig.content.allowedLinkSchemes,
  };

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-16 md:px-12">
      {/* Header — mirrors kaichen.dev /notes */}
      <div
        className="mb-10 fade-up"
        style={{ animationDelay: "0ms" }}
      >
        <h1
          className="font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[44px]"
        >
          Notes
        </h1>
        <p
          className="mt-3 font-serif text-sm leading-[1.8] text-zinc-400 dark:text-zinc-600"
        >
          Plain markdown under <code className="font-jetbrains-mono text-xs">content/demo/notes/</code>. Drop in your
          own and the list rebuilds.
        </p>
        <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {notes.length === 0 ? (
        <p className="font-serif text-sm text-zinc-500 dark:text-zinc-400 fade-up" style={{ animationDelay: "60ms" }}>
          No notes yet — add an `.mdx` file under{" "}
          <code className="font-jetbrains-mono text-xs">content/demo/notes/</code>
          {" "}and register it in{" "}
          <code className="font-jetbrains-mono text-xs">src/lib/demo/mdx-notes.ts</code>.
        </p>
      ) : (
        <div
          className="flex flex-col gap-4 fade-up"
          style={{ animationDelay: "60ms" }}
        >
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="mag-card group block no-underline"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  {note.date ? (
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="font-nunito text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
                        {note.date}
                      </span>
                    </div>
                  ) : null}
                  <p
                    className="font-serif text-base italic text-zinc-700 transition-colors duration-150 group-hover:text-[var(--accent)] dark:text-zinc-300"
                    style={{ fontWeight: 400 }}
                  >
                    {note.title}
                  </p>
                  {note.summary ? (
                    <p className="mt-1 font-serif text-sm text-zinc-500 dark:text-zinc-500">
                      {renderButtercutInlineMarkdown(note.summary, inlineOpts)}
                    </p>
                  ) : null}
                </div>
                <div className="shrink-0 self-center">
                  <span className="font-nunito text-[11px] text-zinc-300 transition-colors group-hover:text-[var(--accent)]/60 dark:text-zinc-700">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
