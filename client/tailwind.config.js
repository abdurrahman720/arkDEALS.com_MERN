/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui:{
    themes: [
      {
        arkTheme:{
          primary: '#636365',
          secondary: '#89939E',
          accent: "#89939E",
          neutral: "#54B435",
          "base-100": "#FFFFFF",
        }
      }
    ]
  },
  theme: {
    fontFamily: {
      custom1: ["Custom-1", "sans-serif"],
      custom2: ["Custom-2", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}