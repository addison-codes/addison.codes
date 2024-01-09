/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--spaceMono-font)', ...fontFamily.mono],
        display: ['var(--spaceGrotesk-font)', ...fontFamily.mono],
      },
    },
    colors: {
      white: '#E8E9EB',
      black: '#202020',
      primary: '#E4B363',
      secondary: '#667766',
      accent: '#BB4430',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
