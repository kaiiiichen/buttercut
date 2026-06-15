import Link from "next/link";
import type { ButtercutSiteConfig } from "@/lib/config/types";

export function ButtercutSiteFooter({ config }: { config: ButtercutSiteConfig }) {
  return (
    <footer className="fade-up mt-auto" style={{ animationDelay: "180ms" }}>
      <div className="mx-auto max-w-[1180px] px-4 pb-16 pt-8 md:px-12">
        <p
          className="font-nunito text-[15px] leading-[1.7] text-zinc-300 dark:text-zinc-700"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          © {new Date().getFullYear()}{" "}
          <Link
            href="/"
            className="text-zinc-300 no-underline transition-colors duration-150 hover:text-[#C4894F] dark:text-zinc-700 dark:hover:text-[#D9A870]"
          >
            {config.site.title}
          </Link>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
