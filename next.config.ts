import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/VANE",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
