import type { Metadata } from "next";
import { ButtercutMagChip } from "@/components/ButtercutMagChip";
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

  const renderRoleGroup = (
    groups: typeof about.experience,
    keyPrefix: string,
  ) =>
    groups.map(({ org, meta: orgMeta, roles }, groupIndex) => (
      <div
        key={`${keyPrefix}-${org}`}
        className="border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60 md:py-3"
      >
        <p
          className="font-nunito text-[17px] font-semibold leading-[1.4] text-zinc-800 dark:text-zinc-200"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          {md(org)}
        </p>
        {orgMeta ? (
          <p
            className="mt-1 font-nunito text-[11px] tracking-[0.04em] text-zinc-400 dark:text-zinc-600"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            {orgMeta}
          </p>
        ) : null}
        <div className={roles.length > 1 ? "mt-3 space-y-0" : "mt-2.5"}>
          {roles.map((roleItem, roleIndex) => (
            <div
              key={`${groupIndex}-${roleIndex}`}
              className={
                roleIndex > 0
                  ? "mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800/60"
                  : undefined
              }
            >
              <p
                className="font-nunito text-[17px] font-semibold leading-[1.4] text-[#C4894F] dark:text-[#D9A870]"
                style={{ fontFamily: "var(--font-ui-en)" }}
              >
                {md(roleItem.role)}
              </p>
              <span
                className="mt-1 block font-nunito text-[11px] tracking-[0.04em] text-zinc-400 dark:text-zinc-600"
                style={{ fontFamily: "var(--font-ui-en)" }}
              >
                {roleItem.years}
              </span>
              {roleItem.desc ? (
                <p
                  className="mt-1.5 font-nunito text-[15px] leading-[1.5] text-zinc-500 dark:text-zinc-500"
                  style={{ fontFamily: "var(--font-ui-en)" }}
                >
                  {md(roleItem.desc)}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    ));

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
            className="mt-3 font-nunito text-[17px] leading-[1.75] text-zinc-400 dark:text-zinc-600"
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

      {hasEducation || hasRightColumn || hasFocus ? (
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
                    {about.education.map((e, i) => {
                      const subtitle = e.sub ?? e.subtitle;
                      const detail = [e.content, e.grade, e.activities]
                        .filter(Boolean)
                        .join(" · ");
                      return (
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
                            className="font-nunito text-[17px] font-semibold leading-[1.6] text-zinc-800 dark:text-zinc-200"
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
                          {subtitle ? (
                            <p
                              className="mt-0.5 font-nunito text-[17px] font-semibold leading-[1.4] text-[#C4894F] dark:text-[#D9A870]"
                              style={{ fontFamily: "var(--font-ui-en)" }}
                            >
                              {md(subtitle)}
                            </p>
                          ) : null}
                          {detail ? (
                            <p
                              className="mt-0.5 font-nunito text-base leading-[1.5] text-[#C4894F] dark:text-[#D9A870]"
                              style={{ fontFamily: "var(--font-ui-en)" }}
                            >
                              {md(detail)}
                            </p>
                          ) : null}
                          {e.projectHref ? (
                            <ButtercutMagChip
                              href={e.projectHref}
                              arrow="external"
                              className="mt-2"
                            >
                              {e.projectLinkLabel ?? "View projects"}
                            </ButtercutMagChip>
                          ) : null}
                        </div>
                      );
                    })}
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
                  <div className="flex flex-col">{renderRoleGroup(about.experience, "exp")}</div>
                </div>
              ) : null}

              {hasVolunteering ? (
                <div className="mag-card shrink-0">
                  <div className="mag-label">Volunteering</div>
                  <div className="flex flex-col">
                    {renderRoleGroup(about.volunteering, "vol")}
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
          <code className="font-jetbrains-mono text-xs">content/demo/about.json</code> to fill
          this page in.
        </p>
      ) : null}
    </div>
  );
}
