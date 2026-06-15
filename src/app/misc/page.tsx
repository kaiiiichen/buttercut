import type { Metadata } from "next";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Misc — ${siteConfig.site.title}`,
  description: `Miscellaneous lists for ${siteConfig.site.title}`,
};

const WATCHING = [
  {
    title: "Placeholder article or video title",
    href: "https://example.com",
    source: "Source Name",
    date: "2026-01-01",
  },
];

const REMEMBRANCE = [
  {
    name: "Placeholder remembrance entry",
    href: "https://example.com",
    note: "Location · Years",
  },
];

const THING_GROUPS = [
  {
    category: "Category One",
    rows: [[{ name: "Item A", href: "https://example.com" }, { name: "Item B", href: "https://example.com" }]],
  },
  {
    category: "Category Two",
    rows: [[{ name: "Item C", href: "https://example.com" }]],
  },
];

function formatAttentionDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function MiscPage() {
  return (
    <div className="mx-auto max-w-[1180px] space-y-8 px-4 py-16 md:px-12">
      <div className="fade-up" style={{ animationDelay: "0ms" }}>
        <h1
          className="font-nunito text-[36px] font-light leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 md:text-[48px]"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          Misc
        </h1>
        <p
          className="mt-3 font-nunito text-[17px] leading-[1.7] text-zinc-400 dark:text-zinc-600"
          style={{ fontFamily: "var(--font-ui-en)" }}
        >
          Lists on this page are sorted alphabetically — no order of preference implied.
        </p>
      </div>

      <div className="fade-up" style={{ animationDelay: "30ms" }}>
        <div className="mag-card">
          <div className="mag-label">Watching</div>
          <div>
            {WATCHING.map(({ title, href, source, date }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60"
              >
                <div className="flex items-center gap-2">
                  <span className="shrink-0 -translate-x-1 text-xs text-[#C4894F] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 dark:text-[#D9A870]">
                    ↗
                  </span>
                  <p
                    className="font-nunito text-[17px] font-semibold leading-[1.4] text-zinc-800 transition-colors duration-150 group-hover:text-[#C4894F] dark:text-zinc-200 dark:group-hover:text-[#D9A870]"
                    style={{ fontFamily: "var(--font-ui-en)" }}
                  >
                    {title}
                  </p>
                </div>
                <p
                  className="mt-0.5 pl-4 font-nunito text-base leading-[1.5] text-[#C4894F] dark:text-[#D9A870]"
                  style={{ fontFamily: "var(--font-ui-en)" }}
                >
                  {source} · {formatAttentionDate(date)}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="fade-up" style={{ animationDelay: "60ms" }}>
        <div className="mag-card">
          <div className="mag-label">Remembrance</div>
          <div>
            {REMEMBRANCE.map(({ name, href, note }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60"
              >
                <div className="flex items-center gap-2">
                  <span className="shrink-0 -translate-x-1 text-xs text-[#C4894F] opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 dark:text-[#D9A870]">
                    ↗
                  </span>
                  <p
                    className="font-nunito text-[17px] font-semibold leading-[1.4] text-zinc-800 transition-colors duration-150 group-hover:text-[#C4894F] dark:text-zinc-200 dark:group-hover:text-[#D9A870]"
                    style={{ fontFamily: "var(--font-ui-en)" }}
                  >
                    {name}
                  </p>
                </div>
                <p
                  className="mt-0.5 pl-4 font-nunito text-base leading-[1.5] text-[#C4894F] dark:text-[#D9A870]"
                  style={{ fontFamily: "var(--font-ui-en)" }}
                >
                  {note}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="fade-up" style={{ animationDelay: "90ms" }}>
        <div className="mag-card">
          <div className="mag-label">Things I Love</div>
          <div>
            {THING_GROUPS.filter(({ rows }) => rows.some((row) => row.length > 0)).map(({ category, rows }) => (
              <div
                key={category}
                className="border-b border-zinc-100 py-4 last:border-0 dark:border-zinc-800/60"
              >
                <p
                  className="font-nunito text-[17px] font-semibold leading-[1.4] text-zinc-800 dark:text-zinc-200"
                  style={{ fontFamily: "var(--font-ui-en)" }}
                >
                  {category}
                </p>
                {rows.map((row, rowIndex) => (
                  <p
                    key={rowIndex}
                    className="mt-0.5 font-nunito text-base font-semibold leading-[1.7]"
                    style={{ fontFamily: "var(--font-ui-en)" }}
                  >
                    {row.map(({ name, href }, i) => (
                      <span key={name}>
                        {i > 0 && (
                          <span className="mx-1.5 text-zinc-300 dark:text-zinc-700">·</span>
                        )}
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C4894F] underline decoration-zinc-200 underline-offset-2 transition-colors duration-150 hover:decoration-[#C4894F] dark:text-[#D9A870] dark:decoration-zinc-700 dark:hover:decoration-[#D9A870]"
                        >
                          {name}
                        </a>
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
