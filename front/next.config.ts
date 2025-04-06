import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({ dest: "public" });

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  output: 'export'
};

export default withPWA(nextConfig);
