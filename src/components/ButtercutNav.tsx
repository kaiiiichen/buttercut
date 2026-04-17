"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ButtercutNavItem, ButtercutSiteConfig } from "@/lib/config/types";
import { ButtercutThemeToggle } from "./ButtercutThemeToggle";

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function NavLink({
  item,
  onClick,
  className,
  style,
}: {
  item: ButtercutNavItem;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (isExternal(item.href)) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
        style={style}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} onClick={onClick} className={className} style={style}>
      {item.label}
    </Link>
  );
}

export function ButtercutNav({ config }: { config: ButtercutSiteConfig }) {
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

  const desktopLinkCls =
    "nav-wave font-nunito text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-[var(--background)]"
    >
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-nunito text-base font-light tracking-tight hover:opacity-70 transition-opacity"
        >
          {config.site.title}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-5">
            {config.nav.map((item) => (
              <NavLink key={item.href} item={item} className={desktopLinkCls} />
            ))}
          </div>
          <ButtercutThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <ButtercutThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 text-xl leading-none p-1"
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

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden bg-[var(--background)] transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-64 opacity-100 border-t border-zinc-200 dark:border-zinc-800"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-3 flex flex-col gap-1">
          {config.nav.map((item, i) => (
            <NavLink
              key={item.href}
              item={item}
              onClick={() => setIsOpen(false)}
              className={`font-nunito text-base text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 py-2 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              }`}
              style={{ transitionDelay: isOpen ? `${60 + i * 40}ms` : "0ms" }}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
