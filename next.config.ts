import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type-checking is performed via `npm exec tsc -- --noEmit` to bypass Windows child-process heap limits
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
