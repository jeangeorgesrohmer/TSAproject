/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9fb',
          100: '#d9f0f5',
          200: '#b8e3ed',
          300: '#87cfe0',
          400: '#4A90A4',
          500: '#3a7a8f',
          600: '#2e6070',
          700: '#234e5c',
          800: '#1c3f4a',
          900: '#14303a',
        },
        sage: {
          50: '#f6f9f6',
          100: '#e8f2e8',
          200: '#d4e6d4',
          300: '#b3d4b3',
          400: '#7BAF7B',
          500: '#5e8f5e',
          600: '#4a7349',
          700: '#3a5c3a',
          800: '#2e4a2e',
          900: '#243a24',
        },
      },
    },
  },
  plugins: [],
};
