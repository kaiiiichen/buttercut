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
  align?: "center" | "end" | "start";
  interactive?: boolean;
  tapToToggle?: boolean;
  portal?: boolean;
  className?: string;
  tipClassName?: string;
};

const TIP_Z_INDEX = 40;

function usePrefersHover() {
  const [prefersHover, setPrefersHover] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setPrefersHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return prefersHover;
}

const TIP_BASE_CLASS =
  "rounded-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#1F1F23] px-2.5 py-1.5 text-center text-[11px] leading-snug text-zinc-600 dark:text-zinc-300 shadow-[3px_3px_0_0_var(--color-border-tertiary)]";

const SHOW_DELAY_MS = 70;

function tipBubbleClass(open: boolean, placement: "top" | "bottom") {
  return [
    "hover-tip-bubble block w-max max-w-[220px]",
    placement === "bottom" ? "hover-tip-bubble--bottom" : "",
    open ? "hover-tip-bubble--visible" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function portalFixedStyle(
  coords: DOMRect,
  placement: "top" | "bottom",
  align: "center" | "end" | "start",
): CSSProperties {
  const gap = 8;
  const base: CSSProperties = {
    position: "fixed",
    zIndex: TIP_Z_INDEX,
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
  if (placement === "top" && align === "start") {
    return {
      ...base,
      top: coords.top - gap,
      left: coords.left,
      transform: "translateY(-100%)",
    };
  }
  if (placement === "bottom" && align === "start") {
    return {
      ...base,
      top: coords.bottom + gap,
      left: coords.left,
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
  tapToToggle = false,
  portal = true,
  className = "",
  tipClassName = "",
}: ButtercutHoverTipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showRafRef = useRef<number | null>(null);
  const prefersHover = usePrefersHover();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [displayed, setDisplayed] = useState(false);
  const [coords, setCoords] = useState<DOMRect | null>(null);
  const touchToggle = tapToToggle || interactive;

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const syncCoords = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    setCoords(el.getBoundingClientRect());
  }, []);

  const show = useCallback(
    (immediate = false) => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      syncCoords();
      if (displayed && !open) {
        setOpen(true);
        return;
      }
      if (open) return;

      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
      showTimerRef.current = setTimeout(
        () => {
          setDisplayed(true);
          showRafRef.current = requestAnimationFrame(() => {
            showRafRef.current = null;
            setOpen(true);
          });
        },
        immediate ? 0 : SHOW_DELAY_MS,
      );
    },
    [syncCoords, open, displayed],
  );

  const hide = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (showRafRef.current !== null) {
      cancelAnimationFrame(showRafRef.current);
      showRafRef.current = null;
    }
    setOpen(false);
  }, []);

  const onBubbleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLSpanElement>) => {
      if (e.propertyName !== "opacity" || open) return;
      setDisplayed(false);
    },
    [open],
  );

  const scheduleHide = useCallback(() => {
    if (!interactive || !prefersHover) {
      hide();
      return;
    }
    hideTimerRef.current = setTimeout(hide, 120);
  }, [hide, interactive, prefersHover]);

  const toggle = useCallback(() => {
    if (open || displayed) hide();
    else show(true);
  }, [open, displayed, hide, show]);

  const onTriggerClick = useCallback(
    (e: React.MouseEvent) => {
      if (!touchToggle || prefersHover) return;
      e.preventDefault();
      e.stopPropagation();
      toggle();
    },
    [touchToggle, prefersHover, toggle],
  );

  useEffect(() => {
    if (!open || prefersHover || !touchToggle) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (tipRef.current?.contains(target)) return;
      hide();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, prefersHover, touchToggle, hide]);

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
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (showRafRef.current !== null) cancelAnimationFrame(showRafRef.current);
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
          onMouseEnter={prefersHover ? () => show() : undefined}
          onMouseLeave={prefersHover ? scheduleHide : undefined}
          onFocus={() => show(true)}
          onBlur={prefersHover ? scheduleHide : undefined}
          onClick={onTriggerClick}
        >
          {children}
        </span>
        {displayed &&
          createPortal(
            <span
              ref={tipRef}
              role="tooltip"
              aria-hidden={!open}
              style={fixedStyle}
              className="pointer-events-none"
              onMouseEnter={interactive && prefersHover ? () => show(true) : undefined}
              onMouseLeave={interactive && prefersHover ? scheduleHide : undefined}
            >
              <span
                className={`${TIP_BASE_CLASS} ${tipBubbleClass(open, placement)} ${tipClassName}`}
                style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400 }}
                onTransitionEnd={onBubbleTransitionEnd}
              >
                {tip}
              </span>
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
        : align === "start"
          ? "bottom-full left-0 mb-2"
          : "bottom-full left-1/2 -translate-x-1/2 mb-2"
      : align === "end"
        ? "top-full right-0 mt-2"
        : align === "start"
          ? "top-full left-0 mt-2"
          : "top-full left-1/2 -translate-x-1/2 mt-2";

  return (
    <span className={`relative inline-flex group/hover-tip ${className}`}>
      {children}
      <span role="tooltip" className={`absolute ${position} z-40 ${tipClassName}`}>
        <span
          className={`${TIP_BASE_CLASS} hover-tip-bubble ${
            placement === "bottom" ? "hover-tip-bubble--bottom" : ""
          } ${interactive ? "group-hover/hover-tip:pointer-events-auto group-focus-within/hover-tip:pointer-events-auto" : ""}`}
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400 }}
        >
          {tip}
        </span>
      </span>
    </span>
  );
}
