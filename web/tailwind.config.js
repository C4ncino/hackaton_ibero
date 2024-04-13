/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavanda: "#CDCDF4",
        columbia: "#B5D0E8",
        platinum: "#E0E0E0",
        darkLavanda: "#ABABED"
      }
    },
  },
  plugins: [],
}