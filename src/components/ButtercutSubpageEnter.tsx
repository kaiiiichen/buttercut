"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ButtercutPageToc } from "./ButtercutPageToc";

export function ButtercutSubpageEnter({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <>
        {children}
        <ButtercutPageToc />
      </>
    );
  }

  return (
    <div className="subpage-enter" key={pathname}>
      <div className="subpage-enter-inner relative z-[1]">{children}</div>
      <ButtercutPageToc />
    </div>
  );
}
