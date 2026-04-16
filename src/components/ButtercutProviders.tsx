"use client";

import { useEffect, type ReactNode } from "react";
import { ButtercutThemeProvider } from "./ButtercutThemeProvider";

export function ButtercutProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return <ButtercutThemeProvider>{children}</ButtercutThemeProvider>;
}
