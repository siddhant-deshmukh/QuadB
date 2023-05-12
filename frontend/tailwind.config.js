/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'cu1' : '576px',
        'cu1.5' : '768px',
        'cu2' : '800px',
        'cu3' : '960px'
      },
      textColor : {
        'cyan' : '#6ccacb'
      },
      colors : {
        'cyan' : '#3dc6c1'
      }
    },
  },
  plugins: [],
}

