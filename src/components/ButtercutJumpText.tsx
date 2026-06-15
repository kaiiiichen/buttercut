type ButtercutJumpTextProps = {
  text: string;
  /** Delay between letters; controls how fast the wave sweeps left → right */
  staggerMs?: number;
};

/**
 * iMessage-style wave: letters hop up one after another, left to right,
 * then rest until the next cycle (see `.jump-letter` in globals.css).
 */
export function ButtercutJumpText({
  text,
  staggerMs = 80,
}: ButtercutJumpTextProps) {
  return (
    <span aria-label={text}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="jump-letter"
          style={{ animationDelay: `${i * staggerMs}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
