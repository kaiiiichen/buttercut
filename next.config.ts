import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `.mdx` under `src/app` becomes a route alongside `.ts/.tsx/.js/.jsx`.
  // We intentionally omit `.md` so plain markdown stays content-only and
  // is rendered through `marked` from `content/demo/`.
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

// No remark/rehype plugins here — keeps the config serializable so
// Turbopack can cache it. Users who need GFM etc. can add plugins
// in their own fork.
const withMDX = createMDX({});

export default withMDX(nextConfig);
