import { register } from "module";
import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  // output: "export",
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
