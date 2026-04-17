import type { ReactNode } from "react";

/**
 * Wraps rendered MDX with Buttercut's long-form typography
 * (`.buttercut-prose`). Mirrors the kaichen.dev note scale — sans
 * (Nunito) body, serif (Bitter) headings, section rule under h2.
 */
export function ButtercutProse({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const classes = [
    "buttercut-prose text-zinc-700 dark:text-zinc-300",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
