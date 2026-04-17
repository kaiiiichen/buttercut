import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `.mdx` under `src/app` becomes a route alongside `.ts/.tsx/.js/.jsx`.
  // We intentionally omit `.md` so plain markdown stays content-only and
  // is rendered through `marked` from `content/demo/`.
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

// Heading `id`s for `h2` / `h3` come from `ButtercutMdxH2` / `ButtercutMdxH3`
// in `mdx-components.tsx` (github-slugger). We avoid `rehype-slug` here
// because Turbopack requires serializable MDX options — function plugins
// break the build (see kaichen.dev’s webpack-only MDX pipeline for the
// alternative).

const withMDX = createMDX({});

export default withMDX(nextConfig);
