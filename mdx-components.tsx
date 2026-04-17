import type { MDXComponents } from "mdx/types";
import { ButtercutProse } from "@/components/ButtercutProse";

/**
 * Root-level MDX components mapping. Next.js imports this file
 * automatically when it renders any `.mdx` page under `src/app`.
 *
 * The wrapper gives MDX pages the same reading container and long-form
 * typography as `/about` and `/notes` — authors can still override any
 * component by passing their own `components` to `<MDXContent />`.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }) => (
      <div className="mx-auto max-w-[760px] px-4 py-16 md:px-8">
        <ButtercutProse>{children}</ButtercutProse>
      </div>
    ),
  };
}
