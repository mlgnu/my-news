/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    upanimation: {
      moveUp: "moveUp 0.65s ease forwards",
    },
    extend: {
      animation: {
        reveal: "moveUp 0.65s ease forwards",
      },
      keyframes: {
        moveUp: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
      },
      colors: {
        primary: {
          0: "#e7f5ff",
          1: "#d0ebff",
          2: "#a5d8ff",
          3: "#74c0fc",
          4: "#4dabf7",
          5: "#339af0",
          6: "#228be6",
          7: "#1c7ed6",
          8: "#1971c2",
          9: "#1864ab",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
