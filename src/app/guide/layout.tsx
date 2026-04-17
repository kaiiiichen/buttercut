import type { ReactNode } from "react";

/**
 * Wraps `/guide/page.mdx` in the same editorial shell as `/notes`,
 * `/about`, and `/projects`: a `max-w-[1180px]` container with a
 * `fade-up` header, a serif subtitle, and a divider. The MDX content
 * itself is still constrained to a comfortable reading column by the
 * global MDX wrapper in `mdx-components.tsx`.
 */
export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto max-w-[1180px] px-4 pt-16 md:px-12">
      <div className="mb-2 fade-up" style={{ animationDelay: "0ms" }}>
        <p className="font-nunito text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
          Tutorial
        </p>
        <h1 className="mt-2 font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[48px]">
          Guide
        </h1>
        <p className="mt-3 max-w-2xl font-serif text-sm leading-[1.8] text-zinc-400 dark:text-zinc-600">
          Turn Buttercut into your personal site in about thirty minutes.
          Every step has a stable anchor so READMEs, commit messages, and
          JSDoc can link straight to the relevant walkthrough.
        </p>
        <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <div className="fade-up" style={{ animationDelay: "60ms" }}>
        {children}
      </div>
    </article>
  );
}
