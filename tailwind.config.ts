import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-root": "#0E0E0E",
        "bg-card": "#141414",
        "bg-elevated": "#1A1A1A",
        "bg-surface": "#1E1E1E",
        border: "#2A2A2A",
        "border-hover": "#333333",
        primary: "#BB4A1E",
        "primary-dim": "#A3411A",
        "text-1": "#F0EDE8",
        "text-2": "#A09890",
        "text-3": "#605850",
        success: "#4CAF72",
        danger: "#E05C5C",
        "code-bg": "#111111",
        easy: "#4CAF72",
        medium: "#BB4A1E",
        hard: "#E05C5C",
      },
      fontFamily: {
        rubik: ["var(--font-rubik)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
