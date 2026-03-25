import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "rgb(var(--brand-primary) / <alpha-value>)",
        "brand-primary-dark": "rgb(var(--brand-primary-dark) / <alpha-value>)",
        "brand-primary-light": "rgb(var(--brand-primary-light) / <alpha-value>)",
        "brand-accent": "rgb(var(--brand-accent) / <alpha-value>)",
        "brand-cta": "rgb(var(--brand-cta) / <alpha-value>)",
        "brand-cta-hover": "rgb(var(--brand-cta-hover) / <alpha-value>)",

        "neutral-950": "rgb(var(--neutral-950) / <alpha-value>)",
        "neutral-900": "rgb(var(--neutral-900) / <alpha-value>)",
        "neutral-50": "rgb(var(--neutral-50) / <alpha-value>)",
        "neutral-600": "rgb(var(--neutral-600) / <alpha-value>)",
        "neutral-500": "rgb(var(--neutral-500) / <alpha-value>)",
        "neutral-400": "rgb(var(--neutral-400) / <alpha-value>)",
        "neutral-300": "rgb(var(--neutral-300) / <alpha-value>)",
        "neutral-200": "rgb(var(--neutral-200) / <alpha-value>)",

        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",

        "ssl-dv-bg": "rgb(var(--ssl-dv-bg) / <alpha-value>)",
        "ssl-dv-text": "rgb(var(--ssl-dv-text) / <alpha-value>)",
        "ssl-ov-bg": "rgb(var(--ssl-ov-bg) / <alpha-value>)",
        "ssl-ov-text": "rgb(var(--ssl-ov-text) / <alpha-value>)",
        "ssl-ev-bg": "rgb(var(--ssl-ev-bg) / <alpha-value>)",
        "ssl-ev-text": "rgb(var(--ssl-ev-text) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

