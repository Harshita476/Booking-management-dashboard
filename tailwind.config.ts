import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a1c2b",
        "ink-deep": "#06121c",
        "ink-soft": "#102b40",
        brass: "#c9974d",
        "brass-dim": "#8c6a33",
        parchment: "#f2ebda",
        "parchment-dim": "#cfc6ae",
        teal: "#3e6e68",
        "text-dim": "#9fb3c2",
        coral: "#d2694c",
        line: "rgba(201,151,77,0.25)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      maxWidth: {
        site: "1180px",
      },
      borderRadius: {
        site: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
