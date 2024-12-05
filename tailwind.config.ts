import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor:{
        appGreen:"#81c577"
      },
      backgroundColor:{
        appGreen:"#81c577"
      },
      ringColor:{
        appGreen:"#81c577"
      },
      borderColor:{
        appGreen:"#81c577"
      }
      
    },
  },
  plugins: [require('flowbite/plugin')],
};
export default config;
