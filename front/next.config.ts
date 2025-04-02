import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({ dest: "public" });

const nextConfig: NextConfig = {
  devIndicators: false,
};

export default withPWA(nextConfig);
