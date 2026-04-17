"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type Day = { date: string; count: number };

type Props = {
  /**
   * Deterministic seed for the PRNG. Changing it reshuffles the whole
   * year of synthetic data.
   *
   * - A number is used directly.
   * - `"daily"` (default) derives a new seed from today's UTC date, so
   *   the heatmap rotates once per calendar day without ever leaving
   *   the client — zero keys, zero network, zero bot.
   * - `"fixed"` pins every visitor to the same stable seed forever.
   */
  seed?: number | "daily" | "fixed";
  /** Number of weekly columns — GitHub itself shows 52 + a partial current week. */
  weeks?: number;
  /**
   * When provided, uses this as "today" instead of `new Date()`. Mostly
   * useful for tests so the most-recent date of the grid is predictable.
   */
  now?: Date;
};

const FIXED_SEED = 0x1f3b5c9a;

/**
 * Turn an ISO date like `2026-04-17` into a stable 32-bit integer. The
 * three digit groups (year / month / day) are folded with a 31× rolling
 * multiply, so neighbouring days land far apart in seed-space and the
 * whole heatmap reshuffles rather than only changing a column.
 */
function dailySeedFromDate(d: Date): number {
  const iso = new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  )
    .toISOString()
    .slice(0, 10);
  return iso.split("-").reduce((acc, part) => acc * 31 + Number(part), 0) >>> 0;
}

function resolveSeed(seed: Props["seed"], now: Date): number {
  if (typeof seed === "number") return seed >>> 0;
  if (seed === "fixed") return FIXED_SEED;
  return dailySeedFromDate(now);
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const CELL = 16;
const GAP = 3;
const STEP = CELL + GAP;

/**
 * Deterministic 32-bit PRNG — small, allocation-free, and good enough
 * to fake a year of contributions with a stable seed.
 */
function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getColor(count: number): string {
  if (count === 0) return "var(--contribution-empty)";
  if (count <= 2) return "var(--contribution-l1)";
  if (count <= 5) return "var(--contribution-l2)";
  if (count <= 9) return "var(--contribution-l3)";
  return "var(--contribution-l4)";
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Generate a realistic-looking year of contributions. The distribution
 * favours quiet days with occasional high-activity bursts, and weekends
 * are quieter than weekdays — matches roughly how a working developer's
 * GitHub graph looks without pretending to be any specific person.
 */
function generateSyntheticWeeks(
  totalWeeks: number,
  seed: number,
  now: Date,
): { weeks: Day[][]; total: number } {
  const rng = mulberry32(seed);

  const end = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
    ),
  );
  // Anchor the grid so the final column ends on Saturday of the current week.
  const weekday = end.getUTCDay();
  end.setUTCDate(end.getUTCDate() + (6 - weekday));

  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (totalWeeks * 7 - 1));

  const weeks: Day[][] = [];
  let total = 0;

  for (let w = 0; w < totalWeeks; w++) {
    const week: Day[] = [];
    for (let d = 0; d < 7; d++) {
      const cursor = new Date(start);
      cursor.setUTCDate(cursor.getUTCDate() + w * 7 + d);

      const wd = cursor.getUTCDay();
      const isWeekend = wd === 0 || wd === 6;
      const r = rng();

      let count = 0;
      if (isWeekend) {
        if (r < 0.75) count = 0;
        else if (r < 0.92) count = 1 + Math.floor(rng() * 2);
        else count = 3 + Math.floor(rng() * 4);
      } else if (r < 0.28) {
        count = 0;
      } else if (r < 0.55) {
        count = 1 + Math.floor(rng() * 2);
      } else if (r < 0.82) {
        count = 3 + Math.floor(rng() * 4);
      } else if (r < 0.96) {
        count = 6 + Math.floor(rng() * 5);
      } else {
        count = 10 + Math.floor(rng() * 8);
      }

      total += count;
      week.push({ date: isoDate(cursor), count });
    }
    weeks.push(week);
  }

  return { weeks, total };
}

function getMonthLabels(
  weeks: Day[][],
): { label: string; col: number }[] {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    if (!week[0]) return;
    const month = new Date(week[0].date).getUTCMonth();
    if (month !== lastMonth) {
      if (i > 0) labels.push({ label: MONTHS[month], col: i });
      lastMonth = month;
    }
  });
  return labels;
}

/**
 * Client-only heatmap that mirrors `kaichen.dev`'s GitHub Activity
 * widget, but with seeded synthetic data instead of a live GitHub
 * query — so a fresh clone of Buttercut shows something interesting
 * immediately, with zero API keys and zero network calls.
 *
 * @see https://buttercut.kaichen.dev/guide#integrations for how to
 * swap this for a real contributions API when you're ready.
 */
// Subscribe to nothing; the snapshot mismatch between server ("false") and
// client ("true") is exactly how we flip on the client-only render path
// without touching state inside an effect.
const NOOP_SUBSCRIBE = () => () => {};
const CLIENT_SNAPSHOT = () => true;
const SERVER_SNAPSHOT = () => false;

export function ButtercutGitHubActivity({
  seed = "daily",
  weeks: weekCount = 52,
  now,
}: Props) {
  const mounted = useSyncExternalStore(
    NOOP_SUBSCRIBE,
    CLIENT_SNAPSHOT,
    SERVER_SNAPSHOT,
  );
  const [hoveredInfo, setHoveredInfo] = useState<{
    date: string;
    count: number;
    rect: DOMRect;
  } | null>(null);

  const { weeks, total } = useMemo(() => {
    const anchor = now ?? new Date();
    return generateSyntheticWeeks(weekCount, resolveSeed(seed, anchor), anchor);
  }, [weekCount, seed, now]);

  useEffect(() => {
    const clear = () => setHoveredInfo(null);
    window.addEventListener("scroll", clear, true);
    window.addEventListener("resize", clear);
    return () => {
      window.removeEventListener("scroll", clear, true);
      window.removeEventListener("resize", clear);
    };
  }, []);

  if (!mounted) {
    // Reserve vertical space so the page layout doesn't jump when the grid mounts.
    return <div style={{ height: 7 * STEP + 22 }} aria-hidden />;
  }

  const monthLabels = getMonthLabels(weeks);

  return (
    <div style={{ display: "inline-block" }}>
      <div className="relative" style={{ height: 14, marginBottom: 4 }}>
        {monthLabels.map(({ label, col }) => (
          <span
            key={`${label}-${col}`}
            className="absolute font-jetbrains-mono text-zinc-400 dark:text-zinc-600"
            style={{ fontSize: 9, left: col * STEP, lineHeight: "14px" }}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex" style={{ gap: GAP }}>
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
            {week.map((day) => {
              const isHovered = hoveredInfo?.date === day.date;
              return (
                <div
                  key={day.date}
                  style={{ position: "relative" }}
                  onMouseEnter={(e) => {
                    const rect = (
                      e.currentTarget as HTMLElement
                    ).getBoundingClientRect();
                    setHoveredInfo({ date: day.date, count: day.count, rect });
                  }}
                  onMouseLeave={() => setHoveredInfo(null)}
                >
                  <div
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: 2,
                      backgroundColor: getColor(day.count),
                      transform: isHovered ? "scale(1.8)" : "scale(1)",
                      transition: "transform 150ms ease",
                      position: "relative",
                      zIndex: isHovered ? 10 : 0,
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {hoveredInfo && typeof document !== "undefined"
        ? createPortal(
            <div
              style={{
                position: "fixed",
                top: hoveredInfo.rect.top - 44 - 8,
                left: hoveredInfo.rect.left + hoveredInfo.rect.width / 2,
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.82)",
                color: "#fff",
                fontSize: 12,
                lineHeight: "1.4",
                padding: "4px 8px",
                borderRadius: 4,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 9999,
                textAlign: "center",
              }}
            >
              <div>{formatDate(hoveredInfo.date)}</div>
              <div>
                {hoveredInfo.count === 0
                  ? "No contributions"
                  : `${hoveredInfo.count} contribution${hoveredInfo.count === 1 ? "" : "s"}`}
              </div>
            </div>,
            document.body,
          )
        : null}

      <p
        className="mt-2 font-jetbrains-mono text-zinc-400 dark:text-zinc-600"
        style={{ fontSize: 11 }}
      >
        {total.toLocaleString()} synthetic contributions in the last year ·{" "}
        <span className="text-zinc-300 dark:text-zinc-700">
          {seed === "fixed"
            ? "demo data"
            : typeof seed === "number"
              ? "demo data · custom seed"
              : "demo data · reshuffles daily"}
        </span>
      </p>
    </div>
  );
}

// Exposed for unit tests and anyone who wants to generate the same
// heatmap server-side (e.g. for an OG image).
export const __buttercutGenerateSyntheticWeeks = generateSyntheticWeeks;
