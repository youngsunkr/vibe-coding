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
        // Modern Gradient Palette
        "gradient-start": "#667eea",
        "gradient-end": "#764ba2",
        // Glassmorphism colors
        "glass-light": "rgba(255, 255, 255, 0.1)",
        "glass-border": "rgba(255, 255, 255, 0.18)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        // Modern gradients
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg, var(--tw-gradient-from), var(--tw-gradient-to))",
      },
    },
  },
  plugins: [],
};
export default config;
