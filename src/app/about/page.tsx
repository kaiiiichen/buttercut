import type { Metadata } from "next";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { renderButtercutInlineMarkdown } from "@/lib/markdown/inline";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.site.title}`,
  description: `About ${siteConfig.site.title}`,
};

export default async function AboutPage() {
  const { about } = await loadButtercutDemoContent();
  const inlineOpts = {
    allowedLinkSchemes: siteConfig.content.allowedLinkSchemes,
  };
  const md = (s: string | null | undefined) =>
    s ? renderButtercutInlineMarkdown(s, inlineOpts) : null;

  const hasEducation = about.education.length > 0;
  const hasExperience = about.experience.length > 0;
  const hasVolunteering = about.volunteering.length > 0;
  const hasFocus = about.focus.length > 0;
  const hasRightColumn = hasExperience || hasVolunteering;

  return (
    <div className="mx-auto max-w-[1180px] space-y-8 px-4 py-16 md:px-12">
      <div className="fade-up" style={{ animationDelay: "0ms" }}>
        <h1
          className="font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[48px]"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          About
        </h1>
      </div>

      {about.intro ? (
        <div className="fade-up" style={{ animationDelay: "30ms" }}>
          <div
            className="mt-3 font-nunito text-[17px] leading-[1.9] text-zinc-400 dark:text-zinc-600"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            {about.intro
              .split(/\n\s*\n/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i} className={i > 0 ? "mt-1" : undefined}>
                  {md(paragraph)}
                </p>
              ))}
          </div>
        </div>
      ) : null}

      {(hasEducation || hasRightColumn || hasFocus) ? (
        <div
          className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch"
          style={{ animationDelay: "60ms" }}
        >
          {hasEducation || hasFocus ? (
            <div className="flex flex-col gap-6 md:h-full">
              {hasEducation ? (
                <div className="mag-card flex flex-col md:flex-1">
                  <div className="mag-label">Education</div>
                  <div className="flex flex-col md:flex-1 md:justify-between">
                    {about.education.map((e, i) => (
                      <div
                        key={`${e.institution}-${i}`}
                        className="border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60 md:py-3"
                      >
                        <span
                          className="mb-2 block font-nunito text-[11px] tracking-[0.04em] text-zinc-400 dark:text-zinc-600"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {e.years}
                        </span>
                        <p
                          className="font-nunito text-[17px] font-semibold leading-[1.7] text-zinc-800 dark:text-zinc-200"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {md(e.institution)}
                        </p>
                        <p
                          className="mt-1 font-nunito text-[17px] font-semibold leading-[1.4] text-[#C4894F] dark:text-[#D9A870]"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {md(e.role)}
                        </p>
                        {e.sub ? (
                          <p
                            className="mt-0.5 font-nunito text-base leading-[1.5] text-[#C4894F] dark:text-[#D9A870]"
                            style={{ fontFamily: "var(--font-ui-en)" }}
                          >
                            {md(e.sub)}
                          </p>
                        ) : null}
                        {e.activities ? (
                          <p
                            className="mt-2 font-nunito text-[13px] leading-[1.9] text-zinc-400 dark:text-zinc-600"
                            style={{ fontFamily: "var(--font-ui-en)" }}
                          >
                            {md(e.activities)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {hasFocus ? (
                <div className="mag-card shrink-0">
                  <div className="mag-label">Focus</div>
                  <div>
                    {about.focus.map((f, i) => (
                      <div
                        key={`${f.code}-${i}`}
                        className="border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60"
                      >
                        <span
                          className="mb-1 block font-nunito text-[11px] tracking-[0.04em] text-zinc-400 dark:text-zinc-600"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {f.term}
                        </span>
                        <p
                          className="font-nunito text-[17px] font-semibold leading-[1.4] text-zinc-800 dark:text-zinc-200"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {f.code}
                        </p>
                        {f.name ? (
                          <p
                            className="mt-0.5 font-nunito text-base leading-[1.5] text-[#C4894F] dark:text-[#D9A870]"
                            style={{ fontFamily: "var(--font-ui-en)" }}
                          >
                            {md(f.name)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {hasRightColumn ? (
            <div className="flex flex-col gap-6 md:h-full">
              {hasExperience ? (
                <div className="mag-card flex flex-col md:flex-1">
                  <div className="mag-label">Experience</div>
                  <div className="flex flex-col md:flex-1 md:justify-between">
                    {about.experience.map((x, i) => (
                      <div
                        key={`${x.org}-${i}`}
                        className="border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60 md:py-3"
                      >
                        <div className="mb-1 flex flex-wrap items-baseline gap-2">
                          <span
                            className="font-nunito text-[11px] tracking-[0.04em] text-zinc-400 dark:text-zinc-600"
                            style={{ fontFamily: "var(--font-ui-en)" }}
                          >
                            {x.years}
                          </span>
                          {x.meta ? (
                            <span
                              className="font-nunito text-[11px] text-zinc-300 dark:text-zinc-700"
                              style={{ fontFamily: "var(--font-ui-en)" }}
                            >
                              · {x.meta}
                            </span>
                          ) : null}
                        </div>
                        <p
                          className="font-nunito text-[17px] font-semibold leading-[1.4] text-zinc-800 dark:text-zinc-200"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {md(x.role)}
                        </p>
                        <p
                          className="mt-0.5 font-nunito text-base leading-[1.5] text-[#C4894F] dark:text-[#D9A870]"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {md(x.org)}
                        </p>
                        {x.desc ? (
                          <p
                            className="mt-1.5 font-nunito text-sm leading-[1.7] text-zinc-500 dark:text-zinc-500"
                            style={{ fontFamily: "var(--font-ui-en)" }}
                          >
                            {md(x.desc)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {hasVolunteering ? (
                <div className="mag-card shrink-0">
                  <div className="mag-label">Volunteering</div>
                  <div>
                    {about.volunteering.map((v, i) => (
                      <div
                        key={`${v.org}-${i}`}
                        className="border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60"
                      >
                        <span
                          className="mb-1 block font-nunito text-[11px] tracking-[0.04em] text-zinc-400 dark:text-zinc-600"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {v.years}
                        </span>
                        <p
                          className="font-nunito text-[17px] font-semibold leading-[1.4] text-zinc-800 dark:text-zinc-200"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {md(v.role)}
                        </p>
                        <p
                          className="mt-0.5 font-nunito text-base leading-[1.5] text-[#C4894F] dark:text-[#D9A870]"
                          style={{ fontFamily: "var(--font-ui-en)" }}
                        >
                          {md(v.org)}
                        </p>
                        {v.desc ? (
                          <p
                            className="mt-1.5 font-nunito text-sm leading-[1.7] text-zinc-500 dark:text-zinc-500"
                            style={{ fontFamily: "var(--font-ui-en)" }}
                          >
                            {md(v.desc)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {!about.intro &&
      !hasEducation &&
      !hasExperience &&
      !hasVolunteering &&
      !hasFocus ? (
        <p
          className="fade-up font-nunito text-sm text-zinc-500 dark:text-zinc-400"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          No about content yet — edit{" "}
          <code className="font-jetbrains-mono text-xs">
            content/demo/about.json
          </code>{" "}
          to fill this page in.
        </p>
      ) : null}
    </div>
  );
}
