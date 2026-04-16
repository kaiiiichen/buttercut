import Image from "next/image";
import type { ButtercutSiteConfig } from "@/lib/config/types";
import type { ButtercutDemoContent } from "@/lib/demo/load-demo-content";
import type { ReactNode } from "react";

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
}: {
  config: ButtercutSiteConfig;
  demo: ButtercutDemoContent;
}) {
  const paragraphs = splitIntroParagraphs(demo.intro);

  return (
    <section className="grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
      <div className="mag-card mx-auto w-full max-w-[280px] shrink-0 overflow-hidden p-0 md:mx-0">
        <Image
          src={config.brand.avatar}
          alt=""
          width={512}
          height={512}
          className="h-auto w-full"
          priority
          unoptimized
        />
      </div>

      <div className="min-w-0 space-y-4">
        <h1 className="text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 md:text-5xl">
          {config.site.title}
        </h1>
        <p className="text-sm uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {demo.tagline}
        </p>
        <div className="space-y-3 font-serif text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{renderInlineMarkdown(p)}</p>
          ))}
        </div>
        <div className="socials flex flex-wrap gap-4 pt-2">
          {config.socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
