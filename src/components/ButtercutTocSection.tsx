import type { HTMLAttributes, ReactNode } from "react";

export function buttercutTocId(label: string): string {
  return label
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type ButtercutTocSectionProps = {
  label: string;
  level?: 0 | 1;
  id?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "id">;

/** Optional explicit scroll target — PageToc also auto-discovers `.mag-label` sections. */
export function ButtercutTocSection({
  label,
  level = 0,
  id,
  className,
  children,
  style,
  ...rest
}: ButtercutTocSectionProps) {
  const sectionId = id ?? buttercutTocId(label);

  return (
    <div
      id={sectionId}
      data-toc-item
      data-toc-label={label}
      data-toc-level={String(level)}
      className={className}
      style={{ scrollMarginTop: "5rem", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
