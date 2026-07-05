import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MagChipSize = "sm" | "md";

const sizeClass: Record<MagChipSize, string> = {
  md: "mag-chip-md",
  sm: "mag-chip-sm",
};

type MagChipBaseProps = {
  children: ReactNode;
  arrow?: "left" | "right" | "external";
  size?: MagChipSize;
  className?: string;
};

type MagChipAsLink = MagChipBaseProps &
  { as?: "link" } & Omit<ComponentPropsWithoutRef<typeof Link>, keyof MagChipBaseProps>;

type MagChipAsButton = MagChipBaseProps &
  { as: "button" } & Omit<ComponentPropsWithoutRef<"button">, keyof MagChipBaseProps>;

type MagChipAsSpan = MagChipBaseProps &
  { as: "span" } & Omit<ComponentPropsWithoutRef<"span">, keyof MagChipBaseProps>;

export type ButtercutMagChipProps = MagChipAsLink | MagChipAsButton | MagChipAsSpan;

function MagChipContent({
  children,
  arrow,
}: Pick<MagChipBaseProps, "children" | "arrow">) {
  return (
    <>
      {arrow === "left" ? (
        <span className="mag-chip-arrow" aria-hidden>
          ←
        </span>
      ) : null}
      {children ? <span>{children}</span> : null}
      {arrow === "right" ? (
        <span className="mag-chip-arrow" aria-hidden>
          →
        </span>
      ) : null}
      {arrow === "external" ? (
        <span className="mag-chip-arrow" aria-hidden>
          ↗
        </span>
      ) : null}
    </>
  );
}

export function ButtercutMagChip(props: ButtercutMagChipProps) {
  const {
    children,
    arrow,
    size = "md",
    className = "",
    as = "link",
    ...rest
  } = props;

  const classes = ["mag-chip", sizeClass[size], className].filter(Boolean).join(" ");

  if (as === "button") {
    const { ...buttonRest } = rest as Omit<MagChipAsButton, keyof MagChipBaseProps | "as">;
    return (
      <button type="button" className={classes} {...buttonRest}>
        <MagChipContent arrow={arrow}>{children}</MagChipContent>
      </button>
    );
  }

  if (as === "span") {
    const { ...spanRest } = rest as Omit<MagChipAsSpan, keyof MagChipBaseProps | "as">;
    return (
      <span className={classes} {...spanRest}>
        <MagChipContent arrow={arrow}>{children}</MagChipContent>
      </span>
    );
  }

  const { ...linkRest } = rest as Omit<MagChipAsLink, keyof MagChipBaseProps | "as">;
  return (
    <Link className={classes} {...linkRest}>
      <MagChipContent arrow={arrow}>{children}</MagChipContent>
    </Link>
  );
}
