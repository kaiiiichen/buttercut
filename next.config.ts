import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow `.mdx` files under `src/app` to be rendered as routes.
  // Keep `md` out of pageExtensions so that plain markdown stays
  // content-only (we render those through `marked`).
  pageExtensions: ["ts", "tsx", "mdx"],
};

// No remark/rehype plugins here — keeps the config serializable so
// Turbopack can cache it. Users who need GFM etc. can add plugins
// in their own fork.
const withMDX = createMDX({});

export default withMDX(nextConfig);
