"use client";

import { useCallback, useRef, useState } from "react";

type ButtercutCopyBlockProps = {
  text: string;
  label?: string;
  className?: string;
};

export function ButtercutCopyBlock({
  text,
  label,
  className = "",
}: ButtercutCopyBlockProps) {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      setCopied(true);
      buttonRef.current?.blur();
      copyTimerRef.current = setTimeout(() => {
        setCopied(false);
        copyTimerRef.current = null;
      }, 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  }, [text]);

  return (
    <div className={className}>
      {label ? (
        <p className="ui-hint mb-1.5 text-[11px] uppercase tracking-[0.08em] text-zinc-400">
          {label}
        </p>
      ) : null}
      <div className="copy-block group relative rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60">
        <button
          ref={buttonRef}
          type="button"
          onClick={copy}
          className={`copy-block__btn mag-chip mag-chip-sm absolute top-2 right-2 z-10 min-w-[4.5rem] justify-center ${
            copied ? "copy-block__btn--copied" : ""
          }`}
          aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
        <pre className="max-h-[420px] overflow-x-auto overflow-y-auto whitespace-pre-wrap px-3 py-2.5 font-jetbrains-mono text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {text}
        </pre>
      </div>
    </div>
  );
}
