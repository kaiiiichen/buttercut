"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ButtercutNavItem, ButtercutSiteConfig } from "@/lib/config/types";
import { ButtercutThemeToggle } from "./ButtercutThemeToggle";

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Active nav stays in the shared link palette; hover is handled globally. */
function navLinkClassName(active: boolean) {
  const base = "nav-link text-sm";
  if (active) {
    return `${base} nav-link--active`;
  }
  return base;
}

function NavLink({
  item,
  pathname,
  onClick,
  className,
  style,
}: {
  item: ButtercutNavItem;
  pathname: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const active = !isExternal(item.href) && isNavActive(pathname, item.href);
  const cls = className ?? navLinkClassName(active);

  if (isExternal(item.href)) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={cls}
        style={style}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} onClick={onClick} className={cls} style={style}>
      {item.label}
    </Link>
  );
}

export function ButtercutNav({ config }: { config: ButtercutSiteConfig }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-[var(--background)]"
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="site-logo text-base tracking-tight"
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 600 }}
        >
          {config.site.title}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-5">
            {config.nav.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                pathname={pathname}
                style={{ fontFamily: "var(--font-ui-en)", fontWeight: 600 }}
              />
            ))}
          </div>
          <ButtercutThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ButtercutThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="inline-flex size-8 shrink-0 items-center justify-center text-xl leading-none text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span
              className="inline-block transition-transform duration-200 ease-in-out"
              style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {isOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-[var(--background)] transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "max-h-64 border-t border-zinc-200 opacity-100 dark:border-zinc-800"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-4 py-3">
          {config.nav.map((item, i) => {
            const active =
              !isExternal(item.href) && isNavActive(pathname, item.href);
            const linkClass = `${navLinkClassName(active)} py-2 transition-[opacity,transform] duration-200 ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`;
            return (
              <NavLink
                key={item.href}
                item={item}
                pathname={pathname}
                onClick={() => setIsOpen(false)}
                className={linkClass}
                style={{
                  fontFamily: "var(--font-ui-en)",
                  fontWeight: 600,
                  transitionDelay: isOpen ? `${60 + i * 40}ms` : "0ms",
                }}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}
