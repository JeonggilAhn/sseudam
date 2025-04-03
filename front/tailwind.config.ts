import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ssd-b1": "#2b88d9",
        "ssd-b2": "#99d0f2",
        "ssd-b3": "#BDE3F2",
        "ssd-o1": "#F2B705",
        "ssd-o2": "#F29F05",
        "ssd-g1": "#7B7B7B",
        "ssd-g2": "#C7C7C7",
      },
    },
  },
  plugins: [],
};

export default config;
