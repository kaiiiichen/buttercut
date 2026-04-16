import Link from "next/link";
import type { ButtercutSiteConfig } from "@/lib/config/types";

export function ButtercutNav({ config }: { config: ButtercutSiteConfig }) {
  return (
    <header className="border-b border-zinc-200 bg-[var(--background)]/90 backdrop-blur dark:border-zinc-800">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-4 py-4 md:px-12">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          {config.site.title}
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          {config.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
