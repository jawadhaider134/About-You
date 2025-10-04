/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container : {
        center : true , 
        padding : {
          DEFAULT: "1rem",
          "sm" : "2rem",
          "lg" : "3rem",
          "xl" : "4rem"
        },
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        spreadOut: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(1.2)", opacity: 0 },
        },
      },
      animation: {
        slideDown: "slideDown 0.5s ease-out",
        spreadOut: "spreadOut 0.5s ease-in forwards",
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

