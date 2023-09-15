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
        "gradient-primary": "#e6e9f0",
        "gradient-secondary": "#eef1f5",
        "gray-500": "##212121",
        "gray-300": "#7c7c7c",
        "btn-weather": "#fef0ea",
        "txt-btn-weather": "#deac95",
        "btn-weather-hover": "#f4ad96",
        "purple-300": "#c0c0f6",
        "purple- 500": "#9384f9",
        "btn-cep-hover": "#9384f9",
        "bg-weather": "#f6f6f6",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
