/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0055D4', // Electric Blue
          dark: '#003E9B',
          light: '#337FE6',
        },
        secondary: '#F5F7FA', // Light Gray background
        text: {
          main: '#111111',
          sub: '#666666',
        }
      },
      borderRadius: {
        '3xl': '1.5rem', // Pill-like
        '4xl': '2rem',
        'pill': '9999px',
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '"Noto Sans JP"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
