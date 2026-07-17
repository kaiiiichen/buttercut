import type { ReactNode } from "react";
import { ButtercutGwwcBadge } from "@/components/ButtercutGwwcBadge";
import { ButtercutIdentityRow } from "@/components/ButtercutIdentityRow";
import { ButtercutJumpText } from "@/components/ButtercutJumpText";
import { ButtercutSocialIcons } from "@/components/ButtercutSocialIcons";
import { ButtercutTocSection } from "@/components/ButtercutTocSection";
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

function ButtercutPersonalHero({
  config,
  demo,
  slots,
}: ButtercutBlockProps & { slots?: ButtercutHeroSlots }) {
  const paragraphs = splitIntroParagraphs(demo.intro);
  const subtitles = demo.subtitles.length > 0 ? demo.subtitles : [demo.tagline].filter(Boolean);
  const showGreeting = Boolean(slots?.greeting ?? demo.greeting.trim());

  return (
    <ButtercutIdentityRow
      nameSectionLabel={config.site.title}
      avatar={slots?.avatar}
      socials={slots?.socials}
      avatarSrc={config.brand.avatar}
      socialsConfig={config.socials}
      contactGuidanceTip={config.brand.contactGuidanceTip}
    >
      <ButtercutTocSection label={config.site.title}>
        {slots?.title ?? (
          <h1 className="ui-title font-nunito text-[32px] font-light leading-[1.1] tracking-tight md:text-[42px]">
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
          <div className="ui-tagline mt-2">
            {subtitles.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
      </ButtercutTocSection>

      {showGreeting ? (
        <ButtercutTocSection label="Greeting">
          {slots?.body ?? (
            <div className="ui-body-lg space-y-4">
              <p className="inline-flex flex-wrap items-center gap-y-1">
                <span className="ui-greeting text-[26px] leading-none tracking-tight md:text-[28px]">
                  {slots?.greeting ?? (
                    <ButtercutJumpText text={demo.greeting} staggerMs={72} />
                  )}
                </span>
              </p>
              {paragraphs.map((p, idx) => (
                <p key={idx}>
                  {renderButtercutInlineMarkdown(p, {
                    allowedLinkSchemes: config.content.allowedLinkSchemes,
                  })}
                </p>
              ))}
            </div>
          )}
        </ButtercutTocSection>
      ) : (
        <ButtercutTocSection label="Intro">
          {slots?.body ?? (
            <div className="ui-body-lg space-y-4">
              {paragraphs.map((p, idx) => (
                <p key={idx}>
                  {renderButtercutInlineMarkdown(p, {
                    allowedLinkSchemes: config.content.allowedLinkSchemes,
                  })}
                </p>
              ))}
            </div>
          )}
        </ButtercutTocSection>
      )}
    </ButtercutIdentityRow>
  );
}

/** Theme/docs home — no avatar, greeting, or personal-site chrome. */
function ButtercutProductHero({
  config,
  demo,
  slots,
}: ButtercutBlockProps & { slots?: ButtercutHeroSlots }) {
  const paragraphs = splitIntroParagraphs(demo.intro);
  const subtitles = demo.subtitles.length > 0 ? demo.subtitles : [demo.tagline].filter(Boolean);

  return (
    <section className="max-w-3xl space-y-6">
      {slots?.title ?? (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <h1 className="ui-title font-nunito text-[32px] font-light leading-[1.1] tracking-tight md:text-[42px]">
            {config.site.title}
          </h1>
          {slots?.socials ??
            (config.socials.length > 0 || config.brand.contactGuidanceTip ? (
              <ButtercutSocialIcons
                socials={config.socials}
                contactGuidanceTip={config.brand.contactGuidanceTip}
                inline
                className="shrink-0"
              />
            ) : null)}
        </div>
      )}
      {slots?.subtitles ?? (
        <div className="ui-tagline">
          {subtitles.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
      {slots?.body ?? (
        <div className="ui-body-lg space-y-4">
          {paragraphs.map((p, idx) => (
            <p key={idx}>
              {renderButtercutInlineMarkdown(p, {
                allowedLinkSchemes: config.content.allowedLinkSchemes,
              })}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}

export function ButtercutHero({
  config,
  demo,
  slots,
}: ButtercutBlockProps & { slots?: ButtercutHeroSlots }) {
  if (config.home.heroLayout === "product") {
    return <ButtercutProductHero config={config} demo={demo} slots={slots} />;
  }
  return <ButtercutPersonalHero config={config} demo={demo} slots={slots} />;
}
