/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'darkWhite':'#fafafa',
        'lightRed': '#ef4444',
        'darkRed': '#7f1d1d',
        'darkGray': '#181818'
      },
      
    },
  },
  plugins: [],
}

