import type { ReactNode } from "react";

/**
 * Wraps `/guide/page.mdx` in the same editorial shell as `/notes`,
 * `/about`, and `/projects`: a `max-w-[1360px]` container with a
 * `fade-up` header, a serif subtitle, and a divider. The MDX content
 * itself is still constrained to a comfortable reading column by the
 * global MDX wrapper in `mdx-components.tsx`.
 */
export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto max-w-[1360px] px-4 pt-16 md:px-8">
      <div className="mb-2 fade-up" style={{ animationDelay: "0ms" }}>
        <div className="mb-1.5 flex items-center gap-2">
          <span className="font-nunito text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
            Tutorial
          </span>
        </div>
        <h1 className="font-serif text-[2.5rem] font-semibold leading-[1.15] tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">
          Guide
        </h1>
        <p className="mt-3 max-w-[52rem] font-nunito text-[16px] leading-[1.65] text-zinc-500 dark:text-zinc-400">
          Turn Buttercut into your personal site in about thirty minutes.
          Every step has a stable anchor so READMEs, commit messages, and
          JSDoc can link straight to the relevant walkthrough.
        </p>
        <div className="mt-5 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="fade-up" style={{ animationDelay: "60ms" }}>
        {children}
      </div>
    </article>
  );
}
