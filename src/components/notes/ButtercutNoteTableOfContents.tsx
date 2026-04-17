"use client";

// Ported from kaichen.dev `components/notes/TableOfContents.tsx` (feat/notes-toc).
// Place immediately after the hero block (back link + title + intro + divider)
// and before the first `##` section — not in a parent layout above the title.
//
// Buttercut’s `/notes/[slug]` route injects this component in `page.tsx` so
// demo notes don’t duplicate the hero inside every `.mdx` file. Forks that
// colocate hero + body in a single MDX file can render
// `<ButtercutNoteTableOfContents />` by hand in the same position.
//
// Accent colour uses `var(--accent)` so theme presets apply; structure and
// behaviour match the reference implementation.

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type HeadingItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

// kaichen.dev nested notes: /^\/notes\/[^/]+\/[^/]+/
// Buttercut flat slugs: /notes/welcome-mdx
const NOTE_PAGE_PATTERN = /^\/notes\/[^/]+$/;

const SCOPE_SELECTOR = "#note-content h2[id], #note-content h3[id]";
const MIN_HEADINGS = 2;

export function ButtercutNoteTableOfContents() {
  const pathname = usePathname();
  const [items, setItems] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const shouldScan = !!pathname && NOTE_PAGE_PATTERN.test(pathname);
      const next: HeadingItem[] = [];
      if (shouldScan) {
        const nodes = document.querySelectorAll<HTMLHeadingElement>(
          SCOPE_SELECTOR,
        );
        nodes.forEach((el) => {
          const tag = el.tagName.toLowerCase();
          if (tag !== "h2" && tag !== "h3") return;
          const text = el.textContent?.trim();
          if (!el.id || !text) return;
          next.push({ id: el.id, text, level: tag === "h2" ? 2 : 3 });
        });
      }
      setItems(next);
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < MIN_HEADINGS) return null;

  return (
    <details
      open
      className="note-toc not-prose mb-10 rounded-md border border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <summary
        className="cursor-pointer select-none list-none px-4 py-2.5 text-zinc-700 marker:hidden dark:text-zinc-300 [&::-webkit-details-marker]:hidden"
        style={{
          fontFamily: "'Nunito'",
          fontWeight: 600,
          fontSize: 12,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="text-[var(--accent)]"
            style={{ fontFamily: "'Bitter'", fontSize: 14, lineHeight: 1 }}
          >
            §
          </span>
          <span>Contents</span>
          <span
            className="ml-1 text-zinc-400 dark:text-zinc-600"
            style={{ fontFamily: "'Nunito'", fontWeight: 500 }}
          >
            · {items.length}
          </span>
        </span>
      </summary>
      <nav
        aria-label="Table of contents"
        className="border-t border-zinc-200/70 px-5 pb-4 pt-1 dark:border-zinc-800/70"
      >
        <ul
          className="mt-3 space-y-1.5"
          style={{ fontFamily: "'Nunito'", fontSize: "0.9rem", lineHeight: 1.55 }}
        >
          {items.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id} className={h.level === 3 ? "pl-5" : ""}>
                <a
                  href={`#${h.id}`}
                  className={[
                    "inline-block border-l-2 py-0.5 pl-2.5 transition-colors duration-150",
                    isActive
                      ? "border-[var(--accent)] font-medium text-[var(--accent)]"
                      : "border-transparent text-zinc-600 hover:border-zinc-300 hover:text-[var(--accent)] dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-[var(--accent)]",
                  ].join(" ")}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </details>
  );
}
