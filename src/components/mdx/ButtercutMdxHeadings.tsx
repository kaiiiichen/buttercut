"use client";

import { plainTextFromNode } from "@/lib/mdx/plain-text-from-node";
import type { ComponentPropsWithoutRef } from "react";
import { useButtercutHeadingSlugger } from "./ButtercutHeadingSlugContext";

function idForHeading(
  slugger: ReturnType<typeof useButtercutHeadingSlugger>,
  children: ComponentPropsWithoutRef<"h2">["children"],
): string {
  const raw = plainTextFromNode(children).trim() || "section";
  return slugger?.slug(raw) ?? raw.toLowerCase().replace(/\s+/g, "-");
}

export function ButtercutMdxH2({
  children,
  id: idProp,
  className,
  ...rest
}: ComponentPropsWithoutRef<"h2">) {
  const slugger = useButtercutHeadingSlugger();
  const id = idProp ?? idForHeading(slugger, children);
  return (
    <h2 id={id} className={className} {...rest}>
      {children}
    </h2>
  );
}

export function ButtercutMdxH3({
  children,
  id: idProp,
  className,
  ...rest
}: ComponentPropsWithoutRef<"h3">) {
  const slugger = useButtercutHeadingSlugger();
  const id = idProp ?? idForHeading(slugger, children);
  return (
    <h3 id={id} className={className} {...rest}>
      {children}
    </h3>
  );
}
