/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        souklou: {
          primary: {
            50: "#9DBCF5",
            100: "#7CA5F0",
            200: "#5B8DEB",
            300: "#3B76E4",
            400: "#2061D9",
            500: "#1D53B6",
            600: "#194493",
            700: "#163775",
            800: "#122A58",
            900: "#0D1D3B",
            950: "#070F1F",
          },
        },
      },
    },
  },
  plugins: [],
}