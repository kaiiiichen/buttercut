"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type ButtercutHoverTipProps = {
  tip: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom";
  align?: "center" | "end";
  interactive?: boolean;
  portal?: boolean;
  className?: string;
  tipClassName?: string;
};

const TIP_BASE_CLASS =
  "rounded-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#252019] px-2.5 py-1.5 text-center text-[11px] leading-snug text-zinc-600 dark:text-zinc-300 shadow-[3px_3px_0_0_var(--color-border-tertiary)] transition-all duration-150";

function tipVisibilityClass(open: boolean) {
  return open
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "opacity-0 translate-y-0.5 pointer-events-none";
}

function portalFixedStyle(
  coords: DOMRect,
  placement: "top" | "bottom",
  align: "center" | "end",
): CSSProperties {
  const gap = 8;
  const base: CSSProperties = {
    position: "fixed",
    zIndex: 99999,
    fontFamily: "var(--font-ui-en)",
    fontWeight: 400,
  };

  if (placement === "top" && align === "end") {
    return {
      ...base,
      top: coords.top - gap,
      right: window.innerWidth - coords.right,
      transform: "translateY(-100%)",
    };
  }
  if (placement === "top" && align === "center") {
    return {
      ...base,
      top: coords.top - gap,
      left: coords.left + coords.width / 2,
      transform: "translate(-50%, -100%)",
    };
  }
  if (placement === "bottom" && align === "end") {
    return {
      ...base,
      top: coords.bottom + gap,
      right: window.innerWidth - coords.right,
    };
  }
  return {
    ...base,
    top: coords.bottom + gap,
    left: coords.left + coords.width / 2,
    transform: "translateX(-50%)",
  };
}

export function ButtercutHoverTip({
  tip,
  children,
  placement = "top",
  align = "center",
  interactive = false,
  portal = false,
  className = "",
  tipClassName = "",
}: ButtercutHoverTipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<DOMRect | null>(null);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const syncCoords = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    setCoords(el.getBoundingClientRect());
  }, []);

  const show = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    syncCoords();
    setOpen(true);
  }, [syncCoords]);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const scheduleHide = useCallback(() => {
    if (!interactive) {
      hide();
      return;
    }
    hideTimerRef.current = setTimeout(hide, 120);
  }, [hide, interactive]);

  useEffect(() => {
    if (!open || !portal) return;
    const onUpdate = () => syncCoords();
    window.addEventListener("scroll", onUpdate, true);
    window.addEventListener("resize", onUpdate);
    return () => {
      window.removeEventListener("scroll", onUpdate, true);
      window.removeEventListener("resize", onUpdate);
    };
  }, [open, portal, syncCoords]);

  useEffect(
    () => () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    },
    [],
  );

  if (portal && mounted) {
    const fixedStyle = coords
      ? portalFixedStyle(coords, placement, align)
      : { position: "fixed" as const, visibility: "hidden" as const };

    return (
      <>
        <span
          ref={triggerRef}
          className={`inline-flex ${className}`}
          onMouseEnter={show}
          onMouseLeave={scheduleHide}
          onFocus={show}
          onBlur={scheduleHide}
        >
          {children}
        </span>
        {createPortal(
          <span
            role="tooltip"
            style={fixedStyle}
            className={`${TIP_BASE_CLASS} w-max max-w-[220px] ${tipVisibilityClass(open)} ${tipClassName}`}
            onMouseEnter={interactive ? show : undefined}
            onMouseLeave={interactive ? scheduleHide : undefined}
          >
            {tip}
          </span>,
          document.body,
        )}
      </>
    );
  }

  const position =
    placement === "top"
      ? align === "end"
        ? "bottom-full right-0 mb-2"
        : "bottom-full left-1/2 -translate-x-1/2 mb-2"
      : align === "end"
        ? "top-full right-0 mt-2"
        : "top-full left-1/2 -translate-x-1/2 mt-2";

  return (
    <span className={`group/hover-tip relative inline-flex ${className}`}>
      {children}
      <span
        role="tooltip"
        className={`absolute ${position} z-50 w-max max-w-[220px] ${TIP_BASE_CLASS} translate-y-0.5 opacity-0 group-hover/hover-tip:translate-y-0 group-hover/hover-tip:opacity-100 group-focus-within/hover-tip:translate-y-0 group-focus-within/hover-tip:opacity-100 ${
          interactive ? "pointer-events-auto" : "pointer-events-none"
        } ${tipClassName}`}
        style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400 }}
      >
        {tip}
      </span>
    </span>
  );
}
