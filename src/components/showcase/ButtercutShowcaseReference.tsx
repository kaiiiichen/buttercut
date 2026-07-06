import type { ReactNode } from "react";

export function ButtercutShowcaseReference({
  title = "Full reference",
  lede = "For developers — expand when you need names, paths, and config fields.",
  children,
  delayMs = 180,
}: {
  title?: string;
  lede?: string;
  children: ReactNode;
  delayMs?: number;
}) {
  return (
    <details
      className="fade-up mag-card group"
      style={{ animationDelay: `${delayMs}ms` }}
    >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[1.3rem] py-4 marker:content-none [&::-webkit-details-marker]:hidden">
        <div>
          <p className="ui-heading font-nunito text-[17px] font-semibold">{title}</p>
          <p className="ui-hint mt-1">{lede}</p>
        </div>
        <span
          className="ui-meta shrink-0 font-nunito text-[13px] transition-transform duration-200 group-open:rotate-180"
          aria-hidden
        >
          ↓
        </span>
      </summary>
      <div className="space-y-8 border-t border-zinc-100 px-[1.3rem] py-6 dark:border-zinc-800/60">
        {children}
      </div>
    </details>
  );
}
