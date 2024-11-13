/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      poppins: ["poppins"],
      noNotoSerif: ["Noto Serif Thai"],
      madimi: ["Madimi One"],
      robotoSlab: ["Roboto Slab", "serif"],
    },
    extend: {
      colors: {
        primary: "#FB452D",
      },
      gridTemplateColumns: {
        custom: "0.5fr 2fr 1fr 1fr 1fr 1fr",
        lg: "0.5fr 3fr 0.5fr 0.5fr 0.5fr 0.5fr",
        md: "0.5fr 3fr 0.5fr",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
