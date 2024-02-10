import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      figtree: ["Figtree", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
