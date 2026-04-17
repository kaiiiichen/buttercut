import type { ReactNode } from "react";

/**
 * Wraps rendered markdown / MDX with Buttercut's long-form typography.
 * Use with `dangerouslySetInnerHTML` (see /notes and /about routes) or
 * by passing formatted children.
 */
export function ButtercutProse({
  children,
  html,
  className,
}: {
  children?: ReactNode;
  html?: string;
  className?: string;
}) {
  const classes = [
    "buttercut-prose text-zinc-700 dark:text-zinc-300",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (html !== undefined) {
    return (
      <div
        className={classes}
        // Trusted author content only — see renderButtercutMarkdown doc.
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return <div className={classes}>{children}</div>;
}
