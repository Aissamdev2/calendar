import type { Config } from "tailwindcss";
import { SUBJECTS_COLORS_1, SUBJECT_BG_COLORS, SUBJECT_BORDER_COLORS } from "./app/lib/utils";
const plugin = require("tailwindcss/plugin")

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [Object.values(SUBJECTS_COLORS_1), Object.values(SUBJECT_BG_COLORS), Object.values(SUBJECT_BORDER_COLORS)].flat(),
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s linear infinite",
        "pulse-fast": "pulse 1s linear infinite",
      },
    
    },
  },
  plugins: [
    plugin(({ addUtilities }: { addUtilities: any }) => {
    addUtilities({
      /* Chrome, Safari and Opera */
      ".scrollbar-hidden::-webkit-scrollbar": {
        display: "none",
      },

      ".scrollbar-hidden": {
        "scrollbar-width": "none" /* Firefox */,
        "-ms-overflow-style": "none" /* IE and Edge */,
      },
    })
  }),],
};
export default config;
