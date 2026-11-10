import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#062C30",
        teal: {
          DEFAULT: "#0E6B6B",
          deep: "#0A4A4C",
          soft: "#1F8A86",
        },
        marigold: {
          DEFAULT: "#E8A317",
          lt: "#F6C65B",
          soft: "#F6E3B4",
        },
        clay: "#C8553D",
        ivory: "#FBF6EC",
        blush: "#F3DCD2",
        charcoal: "#1C1917",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-body)", "Satoshi", "var(--font-jakarta)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Satoshi", "var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        arch: "999px 999px 0 0",
        card: "24px",
        pill: "999px",
      },
      boxShadow: {
        teal: "0 30px 60px -20px rgba(6,44,48,0.35)",
        soft: "0 12px 32px -8px rgba(6,44,48,0.12)",
        glow: "0 0 25px rgba(232,163,23,0.35)",
      },
      maxWidth: {
        layout: "1440px",
      },
      letterSpacing: {
        tightest: "-0.01em",
        eyebrow: "0.22em",
        button: "0.12em",
      },
    },
  },
  plugins: [],
};
export default config;
