import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: '"DM Sans", sans-serif',
      },
      colors: {
        gray: colors.neutral,
      },
    },
  },
  plugins: [],
} satisfies Config;
