type ButtercutProjectStarsProps = {
  stars?: number;
  archived?: boolean;
};

export function ButtercutProjectStars({ stars, archived }: ButtercutProjectStarsProps) {
  if (typeof stars !== "number") return null;

  const badgeClass =
    "rounded-sm bg-zinc-100 px-1.5 py-0.5 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500";

  return (
    <>
      {archived ? (
        <span
          style={{ fontFamily: "var(--font-ui-en)", fontWeight: 400, fontSize: 10 }}
          className={badgeClass}
        >
          archived
        </span>
      ) : null}
      <span className="inline-flex items-center gap-0.5 text-zinc-400 dark:text-zinc-600">
        <span style={{ fontSize: 17, lineHeight: 1 }}>★</span>
        <span className="font-jetbrains-mono text-[11px]">{stars}</span>
      </span>
    </>
  );
}
