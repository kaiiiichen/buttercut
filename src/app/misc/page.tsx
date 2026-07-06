import type { Metadata } from "next";
import {
  ButtercutHoverLinkArrow,
  ButtercutHoverLinkDestinationHint,
} from "@/components/ButtercutHoverLinkHint";
import { loadButtercutDemoContent } from "@/lib/demo/load-demo-content";
import { siteConfig } from "../../../site.config";

export const metadata: Metadata = {
  title: `Misc — ${siteConfig.site.title}`,
  description: `Miscellaneous lists for ${siteConfig.site.title}`,
};

const LIST_LINK_TITLE_STYLE = {
  fontFamily: "var(--font-ui-en)",
  fontWeight: 600,
  fontSize: 18,
  fontStyle: "italic" as const,
};

const LIST_LINK_SUBTITLE_STYLE = {
  fontFamily: "var(--font-ui-en)",
  fontWeight: 400,
  fontSize: 12,
  lineHeight: 1.6,
};

const LIST_LINK_TITLE_CLASS =
  "text-zinc-800 dark:text-zinc-200 group-hover:text-[#C4894F] dark:group-hover:text-[#D9A870] transition-colors duration-150";

const LIST_LINK_SUBTITLE_CLASS = "text-zinc-400 dark:text-zinc-500 mt-0.5 pl-4";

function formatAttentionDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function MiscPage() {
  const { misc } = await loadButtercutDemoContent();
  const intro =
    misc.intro ??
    "Optional lists — empty sections are hidden automatically.";
  const favoritesLabel = misc.favoritesLabel ?? "Favorites";

  return (
    <div className="mx-auto max-w-[1180px] space-y-6 px-4 py-16 md:px-12">
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
          {intro}
        </p>
      </div>

      {misc.watching.length > 0 ? (
        <div className="fade-up" style={{ animationDelay: "30ms" }}>
          <div className="mag-card">
            <div className="mag-label">Watching</div>
            <div>
              {misc.watching.map(({ title, href, source, date }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-2 block rounded-sm px-2 py-2 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 no-underline"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <ButtercutHoverLinkArrow />
                      <p style={LIST_LINK_TITLE_STYLE} className={LIST_LINK_TITLE_CLASS}>
                        {title}
                      </p>
                    </div>
                    <ButtercutHoverLinkDestinationHint href={href} />
                  </div>
                  <p style={LIST_LINK_SUBTITLE_STYLE} className={LIST_LINK_SUBTITLE_CLASS}>
                    {source} · {formatAttentionDate(date)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {misc.remembrance.length > 0 ? (
        <div className="fade-up" style={{ animationDelay: "60ms" }}>
          <div className="mag-card">
            <div className="mag-label">Remembrance</div>
            <div>
              {misc.remembrance.map(({ name, href, note }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-2 block rounded-sm px-2 py-2 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 no-underline"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <ButtercutHoverLinkArrow />
                      <p style={LIST_LINK_TITLE_STYLE} className={LIST_LINK_TITLE_CLASS}>
                        {name}
                      </p>
                    </div>
                    <ButtercutHoverLinkDestinationHint href={href} />
                  </div>
                  <p style={LIST_LINK_SUBTITLE_STYLE} className={LIST_LINK_SUBTITLE_CLASS}>
                    {note}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {misc.thingGroups.some(({ rows }) => rows.some((row) => row.length > 0)) ? (
        <div className="fade-up" style={{ animationDelay: "90ms" }}>
          <div className="mag-card">
            <div className="mag-label">{favoritesLabel}</div>
            <div className="space-y-4">
              {misc.thingGroups
                .filter(({ rows }) => rows.some((row) => row.length > 0))
                .map(({ category, rows }) => (
                  <div key={category} className="mag-card-inset">
                    <div className="mag-label">{category}</div>
                    <div>
                      {rows.flat().map(({ name, href }) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group -mx-2 block rounded-sm px-2 py-2 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 no-underline"
                          style={{ textDecoration: "none" }}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2">
                              <ButtercutHoverLinkArrow />
                              <p style={LIST_LINK_TITLE_STYLE} className={LIST_LINK_TITLE_CLASS}>
                                {name}
                              </p>
                            </div>
                            <ButtercutHoverLinkDestinationHint href={href} />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : null}

      {misc.resources.length > 0 ? (
        <div className="fade-up" style={{ animationDelay: "120ms" }}>
          <div className="mag-card">
            <div className="mag-label">Resources</div>
            <div>
              {misc.resources.map(({ name, href, hintLabel }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-2 block rounded-sm px-2 py-2 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 no-underline"
                  style={{ textDecoration: "none" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <ButtercutHoverLinkArrow />
                      <p style={LIST_LINK_TITLE_STYLE} className={LIST_LINK_TITLE_CLASS}>
                        {name}
                      </p>
                    </div>
                    <ButtercutHoverLinkDestinationHint href={href} label={hintLabel} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
