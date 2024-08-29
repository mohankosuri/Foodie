/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenbg: '#003439',
        orangebg:'#fd7401'
      }
    },
  },
  plugins: [],
}