import type { MDXComponents } from "mdx/types";
import { ButtercutProse } from "@/components/ButtercutProse";

/**
 * Root-level MDX components mapping. Next.js imports this file
 * automatically when it renders any `.mdx` page under `src/app`.
 *
 * We wrap the document body in `ButtercutProse` so MDX inherits
 * the theme's typography without the author having to opt in.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }) => <ButtercutProse>{children}</ButtercutProse>,
  };
}
