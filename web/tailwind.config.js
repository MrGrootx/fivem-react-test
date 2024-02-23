/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        background: '#282c34',
        button: '#1e90ff',
      },
    },
  },
  plugins: [],
}

