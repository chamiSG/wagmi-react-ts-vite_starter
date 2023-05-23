/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.css",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#E9E3FF",
          200: "#422AFB",
          300: "#422AFB",
          400: "#7551FF",
          500: "#422AFB",
          600: "#3311DB",
          700: "#02044A",
          800: "#190793",
          900: "#11047A",
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}