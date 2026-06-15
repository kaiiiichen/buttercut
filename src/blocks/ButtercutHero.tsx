import type { ReactNode } from "react";
import { ButtercutAvatarCard } from "@/components/ButtercutAvatarCard";
import { ButtercutGwwcBadge } from "@/components/ButtercutGwwcBadge";
import { ButtercutJumpText } from "@/components/ButtercutJumpText";
import { ButtercutSocialIcons } from "@/components/ButtercutSocialIcons";
import type { ButtercutBlockProps } from "@/lib/blocks/registry";
import { renderButtercutInlineMarkdown } from "@/lib/markdown/inline";

export type ButtercutHeroSlots = {
  avatar?: ReactNode;
  title?: ReactNode;
  subtitles?: ReactNode;
  greeting?: ReactNode;
  body?: ReactNode;
  socials?: ReactNode;
};

function splitIntroParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function ButtercutHero({
  config,
  demo,
  slots,
}: ButtercutBlockProps & { slots?: ButtercutHeroSlots }) {
  const paragraphs = splitIntroParagraphs(demo.intro);
  const subtitles = demo.subtitles.length > 0 ? demo.subtitles : [demo.tagline].filter(Boolean);

  return (
    <section className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-10">
      <div className="mx-auto flex w-full max-w-[320px] shrink-0 flex-col gap-4 md:mx-0 md:grid md:w-[36%] md:max-w-none md:grid-rows-[auto_1fr] md:gap-0">
        <div className="mag-card aspect-square w-full overflow-hidden" style={{ padding: 0 }}>
          {slots?.avatar ?? (
            <ButtercutAvatarCard
              src={config.brand.avatar}
              alt=""
              className="h-full w-full"
            />
          )}
        </div>

        {slots?.socials ?? <ButtercutSocialIcons socials={config.socials} />}

        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-700" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div>
          {slots?.title ?? (
            <h1
              className="font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[48px]"
              style={{ fontFamily: "var(--font-ui-en)" }}
            >
              {config.site.title}
              {config.brand.showGwwcBadge ? (
                <>
                  {" "}
                  <ButtercutGwwcBadge />
                </>
              ) : null}
            </h1>
          )}
          {slots?.subtitles ?? (
            <div
              className="mt-2 font-nunito text-[15px] leading-[1.9] tracking-[0.03em] text-zinc-500 dark:text-zinc-500"
              style={{ fontFamily: "var(--font-ui-en)" }}
            >
              {subtitles.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}
        </div>

        {slots?.body ?? (
          <div
            className="font-nunito text-[17px] leading-[1.9] text-zinc-700 dark:text-zinc-300"
            style={{ fontFamily: "var(--font-ui-en)" }}
          >
            <p className="inline-flex flex-wrap items-center gap-y-1">
              <span
                className="text-[26px] leading-none tracking-tight text-zinc-700 dark:text-zinc-300 md:text-[28px]"
                style={{ fontFamily: "var(--font-ui-en)", fontWeight: 300 }}
              >
                {slots?.greeting ?? (
                  <ButtercutJumpText text={demo.greeting} staggerMs={72} />
                )}
              </span>
            </p>
            {paragraphs.map((p, idx) => (
              <p key={idx} className={idx === 0 ? "mt-1" : "mt-1"}>
                {renderButtercutInlineMarkdown(p, {
                  allowedLinkSchemes: config.content.allowedLinkSchemes,
                })}
              </p>
            ))}
          </div>
        )}

        <div className="h-px w-full max-w-[630px] bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </section>
  );
}
