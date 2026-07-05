"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { buttercutTocId } from "./ButtercutTocSection";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

type TocEntry = {
  id: string;
  label: string;
  level: number;
};

const SCROLL_OFFSET = 112;
const TOC_MIN_RIGHT_GUTTER = 28;

function findPageContentColumn(): HTMLElement | null {
  return document.querySelector<HTMLElement>('main [class*="max-w-"]');
}

function hasRoomForToc(): boolean {
  const content = findPageContentColumn();
  if (!content) return false;
  const gutter = window.innerWidth - content.getBoundingClientRect().right;
  return gutter >= TOC_MIN_RIGHT_GUTTER;
}

function getLabelText(el: HTMLElement): string {
  return el.textContent?.trim().replace(/\s+/g, " ") ?? "";
}

function resolveScrollTarget(labelEl: HTMLElement): HTMLElement | null {
  const inset = labelEl.closest<HTMLElement>(".mag-card-inset");
  if (inset) return inset;

  const card = labelEl.closest<HTMLElement>(".mag-card");
  if (card) return card;

  const section = labelEl.closest<HTMLElement>("section");
  if (section) return section;

  const fadeUp = labelEl.closest<HTMLElement>(".fade-up");
  if (fadeUp) return fadeUp;

  return labelEl.parentElement;
}

function ensureScrollTarget(el: HTMLElement, label: string): string {
  if (el.id) {
    el.style.scrollMarginTop = "5rem";
    return el.id;
  }

  let candidate = buttercutTocId(label);
  let suffix = 2;
  while (document.getElementById(candidate) && document.getElementById(candidate) !== el) {
    candidate = `${buttercutTocId(label)}-${suffix++}`;
  }

  el.id = candidate;
  el.style.scrollMarginTop = "5rem";
  return candidate;
}

function isInsideExplicitToc(el: HTMLElement): boolean {
  return Boolean(el.closest("[data-toc-item]"));
}

function compareDocumentOrder(a: HTMLElement, b: HTMLElement): number {
  if (a === b) return 0;
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
}

function scanTocItems(): TocEntry[] {
  const entries: { el: HTMLElement; label: string; level: number }[] = [];
  const claimed = new Set<HTMLElement>();

  const claim = (el: HTMLElement, label: string, level: number) => {
    if (!label || claimed.has(el)) return;
    claimed.add(el);
    entries.push({ el, label, level });
  };

  document.querySelectorAll<HTMLElement>("[data-toc-item]").forEach((el) => {
    const label = el.getAttribute("data-toc-label") ?? "";
    const level = Number(el.getAttribute("data-toc-level") ?? 0);
    if (label) claim(el, label, level);
  });

  document.querySelectorAll<HTMLElement>(".mag-label").forEach((labelEl) => {
    const target = resolveScrollTarget(labelEl);
    if (!target || isInsideExplicitToc(target)) return;

    const label = getLabelText(labelEl);
    const level = labelEl.closest(".mag-card-inset") ? 1 : 0;
    claim(target, label, level);
  });

  document.querySelectorAll<HTMLElement>(".mag-card h2, .mag-card h1").forEach((heading) => {
    const target =
      heading.closest<HTMLElement>(".fade-up") ?? heading.closest<HTMLElement>(".mag-card");
    if (!target || isInsideExplicitToc(target) || claimed.has(target)) return;

    const label = getLabelText(heading);
    claim(target, label, 0);
  });

  return entries
    .sort((a, b) => compareDocumentOrder(a.el, b.el))
    .map(({ el, label, level }) => ({
      id: ensureScrollTarget(el, label),
      label,
      level,
    }));
}

export function ButtercutPageToc() {
  const pathname = usePathname();
  const isClient = useIsClient();
  const [items, setItems] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [hasRoom, setHasRoom] = useState(false);

  useEffect(() => {
    const refresh = () => {
      const next = scanTocItems();
      setItems(next);
      setActiveId((prev) => {
        if (prev && next.some((item) => item.id === prev)) return prev;
        return next[0]?.id ?? null;
      });
    };

    refresh();
    const timer = window.setTimeout(refresh, 150);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const updateRoom = () => {
      setHasRoom(hasRoomForToc());
    };

    updateRoom();
    const timer = window.setTimeout(updateRoom, 150);
    window.addEventListener("resize", updateRoom);

    const content = findPageContentColumn();
    const observer = content ? new ResizeObserver(updateRoom) : null;
    if (content) observer?.observe(content);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", updateRoom);
      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (items.length === 0) return;

    const onScroll = () => {
      let current: string | null = items[0].id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SCROLL_OFFSET) {
          current = id;
        }
      }
      setActiveId(current);
    };

    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length < 2 || !isClient || !hasRoom) {
    return null;
  }

  return createPortal(
    <nav
      aria-label="On this page"
      className="page-toc page-toc--visible"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setExpanded(false);
        }
      }}
    >
      <div className="page-toc-rail" aria-hidden={expanded}>
        {items.map(({ id, level }) => (
          <span
            key={id}
            className={`page-toc-line page-toc-line--l${level}${activeId === id ? " page-toc-line--active" : ""}`}
          />
        ))}
      </div>

      <div
        className={`page-toc-panel${expanded ? " page-toc-panel--open" : ""}`}
        aria-hidden={!expanded}
      >
        <ul className="page-toc-list">
          {items.map(({ id, label, level }) => {
            const isActive = activeId === id;
            return (
              <li key={id} className={`page-toc-item page-toc-item--l${level}`}>
                <button
                  type="button"
                  className={`page-toc-link${isActive ? " page-toc-link--active" : ""}`}
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? "location" : undefined}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>,
    document.body,
  );
}
