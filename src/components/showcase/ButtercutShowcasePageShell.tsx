import type { ReactNode } from "react";

type ButtercutShowcasePageHeaderProps = {
  title: string;
  lede: string;
  children?: ReactNode;
};

export function ButtercutShowcasePageHeader({
  title,
  lede,
  children,
}: ButtercutShowcasePageHeaderProps) {
  return (
    <header className="fade-up space-y-4" style={{ animationDelay: "0ms" }}>
      <h1 className="ui-title font-nunito text-[36px] font-light leading-[1.1] tracking-tight md:text-[48px]">
        {title}
      </h1>
      <p className="ui-lede max-w-2xl">{lede}</p>
      {children}
    </header>
  );
}

/** @deprecated Prefer ButtercutShowcaseSectionBlock — label outside the card. */
export function ButtercutShowcaseSection({
  label,
  children,
  delayMs = 60,
}: {
  label: string;
  children: ReactNode;
  delayMs?: number;
}) {
  return (
    <section className="fade-up space-y-4" style={{ animationDelay: `${delayMs}ms` }}>
      <p className="mag-label">{label}</p>
      <div className="mag-card">{children}</div>
    </section>
  );
}

export function ButtercutShowcasePageShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1180px] space-y-14 px-4 py-16 md:px-12">
      {children}
    </div>
  );
}
