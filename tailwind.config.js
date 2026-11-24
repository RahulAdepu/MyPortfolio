/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ebebea",
        ink: "#111111",
        accent: {
          DEFAULT: "#5fb57a",
          foreground: "#111111",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Archivo Black"', '"Arial Black"', "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px #111111",
        "brutal-dark": "4px 4px 0px #5fb57a",
        "brutal-accent": "4px 4px 0px #5fb57a",
        "brutal-lg": "6px 6px 0px #111111",
      },
    },
  },
  plugins: [],
}
