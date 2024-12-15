/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae2ff',
          300: '#7cc7ff',
          400: '#36a9ff',
          500: '#0090ff',
          600: '#0077ff',
          700: '#0059d1',
          800: '#004baf',
          900: '#003c8c',
        },
        dark: {
          100: '#1e1e1e',
          200: '#2d2d2d',
          300: '#3d3d3d',
          400: '#4d4d4d',
          500: '#5d5d5d',
        }
      },
    },
  },
  plugins: [],
}