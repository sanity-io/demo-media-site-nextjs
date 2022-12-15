/** @type {import('tailwindcss').Config} */

const {theme} = require('@sanity/demo/tailwind')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme,
  plugins: [require('@tailwindcss/typography')],
}
