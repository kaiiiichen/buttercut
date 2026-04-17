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
    <div className="mx-auto max-w-[1360px] space-y-8 px-4 py-16 md:px-8">
      <div className="fade-up" style={{ animationDelay: "0ms" }}>
        <h1 className="font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[48px]">
          About
        </h1>
      </div>

      {about.intro ? (
        <div className="fade-up" style={{ animationDelay: "40ms" }}>
          <p className="font-serif text-[18px] leading-[1.9] text-zinc-700 dark:text-zinc-300">
            {md(about.intro)}
          </p>
        </div>
      ) : null}

      {(hasEducation || hasRightColumn) ? (
        <div
          className="fade-up grid grid-cols-1 gap-6 md:grid-cols-2"
          style={{ animationDelay: "60ms" }}
        >
          {hasEducation ? (
            <div className="mag-card">
              <div className="mag-label">Education</div>
              <div>
                {about.education.map((e, i) => (
                  <div
                    key={`${e.institution}-${i}`}
                    className="border-b border-zinc-100 py-6 last:border-0 dark:border-zinc-800/60"
                  >
                    <span className="mb-2 block font-nunito text-[11px] font-normal tracking-[0.04em] text-zinc-400 dark:text-zinc-600">
                      {e.years}
                    </span>
                    <p className="font-serif text-[17px] font-semibold leading-[1.7] text-zinc-800 dark:text-zinc-200">
                      {md(e.institution)}
                    </p>
                    <p className="mt-1 font-serif text-[16px] font-normal leading-[1.9] text-[var(--accent)]">
                      {md(e.role)}
                    </p>
                    {e.sub ? (
                      <p className="mt-1 font-serif text-[14px] font-normal leading-[1.9] text-zinc-500 dark:text-zinc-500">
                        {md(e.sub)}
                      </p>
                    ) : null}
                    {e.activities ? (
                      <p className="mt-2 font-nunito text-[13px] font-normal leading-[1.9] text-zinc-400 dark:text-zinc-600">
                        {md(e.activities)}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {hasRightColumn ? (
            <div className="flex flex-col gap-6">
              {hasExperience ? (
                <div className="mag-card">
                  <div className="mag-label">Experience</div>
                  <div>
                    {about.experience.map((x, i) => (
                      <div
                        key={`${x.org}-${i}`}
                        className="border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60"
                      >
                        <div className="mb-1 flex flex-wrap items-baseline gap-2">
                          <span className="font-nunito text-[11px] font-normal tracking-[0.04em] text-zinc-400 dark:text-zinc-600">
                            {x.years}
                          </span>
                          {x.meta ? (
                            <span className="font-nunito text-[11px] font-normal text-zinc-300 dark:text-zinc-700">
                              · {x.meta}
                            </span>
                          ) : null}
                        </div>
                        <p className="font-serif text-[17px] font-semibold leading-[1.4] text-zinc-800 dark:text-zinc-200">
                          {md(x.role)}
                        </p>
                        <p className="mt-0.5 font-serif text-[16px] font-normal leading-[1.5] text-[var(--accent)]">
                          {md(x.org)}
                        </p>
                        {x.desc ? (
                          <p className="mt-1.5 font-serif text-[14px] font-normal leading-[1.7] text-zinc-500 dark:text-zinc-500">
                            {md(x.desc)}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {hasVolunteering ? (
                <div className="mag-card">
                  <div className="mag-label">Volunteering</div>
                  <div>
                    {about.volunteering.map((v, i) => (
                      <div
                        key={`${v.org}-${i}`}
                        className="border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60"
                      >
                        <span className="mb-1 block font-nunito text-[11px] font-normal tracking-[0.04em] text-zinc-400 dark:text-zinc-600">
                          {v.years}
                        </span>
                        <p className="font-serif text-[17px] font-semibold leading-[1.4] text-zinc-800 dark:text-zinc-200">
                          {md(v.role)}
                        </p>
                        <p className="mt-0.5 font-serif text-[16px] font-normal leading-[1.5] text-[var(--accent)]">
                          {md(v.org)}
                        </p>
                        {v.desc ? (
                          <p className="mt-1.5 font-serif text-[14px] font-normal leading-[1.7] text-zinc-500 dark:text-zinc-500">
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

      {hasFocus ? (
        <div className="fade-up" style={{ animationDelay: "120ms" }}>
          <div className="mag-card">
            <div className="mag-label">Focus</div>
            <div className="flex flex-col md:flex-row">
              {about.focus.flatMap((f, i) => {
                const cell = (
                  <div key={`${f.code}-${i}`} className="flex-1 py-4">
                    <span className="mb-1 block font-nunito text-[11px] font-normal tracking-[0.04em] text-zinc-400 dark:text-zinc-600">
                      {f.term}
                    </span>
                    <p className="font-nunito text-[16px] font-semibold tracking-[0.05em] text-[var(--accent)]">
                      {f.code}
                    </p>
                    <p className="mt-0.5 font-serif text-[16px] font-normal leading-[1.6] text-zinc-500 dark:text-zinc-500">
                      {md(f.name)}
                    </p>
                  </div>
                );
                if (i === 0) return [cell];
                const divider = (
                  <div
                    key={`vdiv-${i}`}
                    className="my-1 h-px w-full bg-zinc-100 md:mx-6 md:my-0 md:h-auto md:w-px md:self-stretch dark:bg-zinc-800/60"
                  />
                );
                return [divider, cell];
              })}
            </div>
          </div>
        </div>
      ) : null}

      {!about.intro &&
      !hasEducation &&
      !hasExperience &&
      !hasVolunteering &&
      !hasFocus ? (
        <p className="fade-up font-serif text-sm text-zinc-500 dark:text-zinc-400">
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
