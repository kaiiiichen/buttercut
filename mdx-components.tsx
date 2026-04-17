import type { MDXComponents } from "mdx/types";
import { ButtercutProse } from "@/components/ButtercutProse";

/**
 * Root-level MDX components mapping. Next.js imports this file
 * automatically when it renders any `.mdx` page under `src/app`.
 *
 * The wrapper applies long-form typography (`.buttercut-prose`) but
 * deliberately does **not** impose a container width. Each route owns
 * its own shell so:
 *
 * - `/notes/[slug]` flows full 1180px like `kaichen.dev` note pages
 * - `/guide` runs inside its editorial 1180px header shell
 * - `/mdx-demo` keeps a narrow 760px reading column via its own layout
 *
 * Authors can still override any component (including the wrapper)
 * by passing their own `components` prop to `<MDXContent />`.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }) => <ButtercutProse>{children}</ButtercutProse>,
  };
}
