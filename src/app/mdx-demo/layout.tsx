import type { ReactNode } from "react";

/**
 * `/mdx-demo` is a "drop-in example" route for theme users — a plain
 * narrow reading column with nothing special. The global MDX wrapper
 * used to provide this container, but notes and the guide need full
 * width, so it moved here.
 */
export default function MdxDemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[760px] px-4 py-16 md:px-8">{children}</div>
  );
}
