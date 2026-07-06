import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/sandbox/integrations", destination: "/sandbox", permanent: true },
    ];
  },
};

export default nextConfig;
