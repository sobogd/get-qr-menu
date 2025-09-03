import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        indeterminate: {
          "0%": { left: "-30%" },
          "50%": { left: "50%" },
          "100%": { left: "110%" },
        },
      },
      animation: {
        indeterminate: "indeterminate 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
