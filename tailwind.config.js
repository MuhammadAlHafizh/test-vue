/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'typo-color': '#00303F',
            'sidebar-color': '#0F2553',
            'neutral-color-20': '#F3F3F3',
            'neutral-color-70': '#7B7B7B',
            'background-3-color': '#F3F2EF',
        }
    },
  },
  plugins: [],
}
