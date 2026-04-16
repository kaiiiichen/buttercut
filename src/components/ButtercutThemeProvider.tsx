"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ButtercutTheme = "light" | "dark" | "system";

const STORAGE_KEY = "buttercut-theme";

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyResolved(resolved: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
}

type ButtercutThemeContextValue = {
  theme: ButtercutTheme;
  setTheme: (t: ButtercutTheme) => void;
  resolvedTheme: "light" | "dark";
};

const ButtercutThemeContext = createContext<ButtercutThemeContextValue | null>(null);

export function ButtercutThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ButtercutTheme>("system");

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const s = localStorage.getItem(STORAGE_KEY) as ButtercutTheme | null;
        if (s === "light" || s === "dark" || s === "system") {
          setThemeState(s);
        }
      } catch {
        /* ignore */
      }
    });
  }, []);

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? getSystemTheme() : theme;

  useEffect(() => {
    applyResolved(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyResolved(getSystemTheme());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((t: ButtercutTheme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
    applyResolved(t === "system" ? getSystemTheme() : t);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme],
  );

  return (
    <ButtercutThemeContext.Provider value={value}>
      {children}
    </ButtercutThemeContext.Provider>
  );
}

export function useButtercutTheme(): ButtercutThemeContextValue {
  const ctx = useContext(ButtercutThemeContext);
  if (!ctx) {
    throw new Error("useButtercutTheme must be used within ButtercutThemeProvider");
  }
  return ctx;
}
