import Image from "next/image";
import type { ReactNode } from "react";
import { ButtercutSocialIcons } from "@/components/ButtercutSocialIcons";
import type { ButtercutBlockProps } from "@/lib/blocks/registry";

export type ButtercutHeroSlots = {
  avatar?: ReactNode;
  title?: ReactNode;
  tagline?: ReactNode;
  body?: ReactNode;
  socials?: ReactNode;
};

function splitIntroParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-zinc-900 dark:text-zinc-100">
          {bold[1]}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ButtercutHero({
  config,
  demo,
  slots,
}: ButtercutBlockProps & { slots?: ButtercutHeroSlots }) {
  const paragraphs = splitIntroParagraphs(demo.intro);

  return (
    <section className="grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
      <div className="mag-card mx-auto w-full max-w-[280px] shrink-0 overflow-hidden p-0 md:mx-0">
        {slots?.avatar ?? (
          <Image
            src={config.brand.avatar}
            alt=""
            width={512}
            height={512}
            className="h-auto w-full"
            priority
            unoptimized
          />
        )}
      </div>

      <div className="min-w-0 space-y-4">
        {slots?.title ?? (
          <h1 className="font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[48px]">
            {config.site.title}
          </h1>
        )}
        {slots?.tagline ?? (
          <p className="font-nunito text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {demo.tagline}
          </p>
        )}
        {slots?.body ?? (
          <div className="space-y-3 font-serif text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{renderInlineMarkdown(p)}</p>
            ))}
          </div>
        )}
        {slots?.socials ?? <ButtercutSocialIcons socials={config.socials} />}
      </div>
    </section>
  );
}
