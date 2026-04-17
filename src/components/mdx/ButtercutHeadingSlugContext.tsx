"use client";

import GithubSlugger from "github-slugger"; // default class: unique slugs per document
import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

const HeadingSlugContext = createContext<GithubSlugger | null>(null);

export function ButtercutHeadingSlugProvider({
  children,
}: {
  children: ReactNode;
}) {
  const slugger = useMemo(() => new GithubSlugger(), []);
  return (
    <HeadingSlugContext.Provider value={slugger}>
      {children}
    </HeadingSlugContext.Provider>
  );
}

export function useButtercutHeadingSlugger(): GithubSlugger | null {
  return useContext(HeadingSlugContext);
}
