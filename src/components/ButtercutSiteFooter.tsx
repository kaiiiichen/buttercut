import Link from "next/link";
import type { ButtercutSiteConfig } from "@/lib/config/types";

export function ButtercutSiteFooter({ config }: { config: ButtercutSiteConfig }) {
  const attribution = config.brand.attribution;

  return (
    <footer className="site-footer fade-up mt-auto shrink-0" style={{ animationDelay: "180ms" }}>
      <div className="site-footer-inner mx-auto max-w-[1180px] px-4 pb-16 pt-8 md:px-12">
        <p className="ui-footer">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className="ui-footer-link">
            {config.site.title}
          </Link>
          . All rights reserved.
          {attribution ? (
            <>
              {" "}
              {attribution.prefix}
              <a
                href={attribution.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-footer-link"
              >
                {attribution.label}
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    </footer>
  );
}
