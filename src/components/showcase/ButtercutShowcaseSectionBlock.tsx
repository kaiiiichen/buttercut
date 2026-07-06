import type { ReactNode } from "react";

/** Showcase section — same pattern as Sandbox: mag-label, hint, then live content. */
export function ButtercutShowcaseSectionBlock({
  label,
  hint,
  children,
  id,
}: {
  label: string;
  hint: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="fade-up space-y-4">
      <div>
        <p className="mag-label">{label}</p>
        <p className="ui-hint mt-2">{hint}</p>
      </div>
      {children}
    </section>
  );
}
