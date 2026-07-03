import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1F3630",
        parchment: "#EFE6D4",
        gold: "#C99A3B",
        paprika: "#A8452F",
        charcoal: "#2B2724",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      backgroundImage: {
        corkboard:
          "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
