/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A020F0', // Purple/Magenta
        glassWhite: 'rgba(255,255,255,0.15)',
        glassDark: 'rgba(0,0,0,0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
