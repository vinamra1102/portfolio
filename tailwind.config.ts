import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* var-backed so the accent can shift subtly per section on scroll */
        primary: {
          DEFAULT: "var(--red)",
          active: "var(--red-active)",
        },
        accent: "#FFD700",
        body: "#969696",
        muted: "#666666",
        hairline: {
          DEFAULT: "#303030",
          light: "#d2d2d2",
        },
        canvas: {
          DEFAULT: "#181818",
          elevated: "#303030",
          dark: "#111111",
          light: "#ffffff",
        },
        surface: {
          soft: "#f7f7f7",
        },
        "on-light": "#181818",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        bob: {
          "0%, 100%": { transform: "translate(-50%, 0)" },
          "50%": { transform: "translate(-50%, 6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        bob: "bob 2s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
