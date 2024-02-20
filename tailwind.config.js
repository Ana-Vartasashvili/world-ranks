/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'wr-grey-300': '#6C727F',
        'wr-grey-400': '#D2D5DA',
        'wr-grey-500': '#282B30',
        'wr-grey-600': '#1B1D1F',
        'wr-blue-200': '#4E80EE',
      },
      fontSize: {
        xxs: '10px',
      },
      fontFamily: {
        'vietnam-pro': ['Be Vietnam Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
