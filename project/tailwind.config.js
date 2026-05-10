/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nude: {
          50: '#fdf8f5',
          100: '#f9efe6',
          200: '#f2ddd0',
          300: '#e8c5b0',
          400: '#dba88a',
          500: '#cc8a68',
          600: '#b8714f',
          700: '#9a5c40',
          800: '#7d4c37',
          900: '#673f30',
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0d0',
          200: '#f4dfa0',
          300: '#eeca6a',
          400: '#e8b53e',
          500: '#d4982a',
          600: '#b87820',
          700: '#935c1c',
          800: '#78491d',
          900: '#643d1c',
        },
        pink: {
          50: '#fff5f7',
          100: '#ffe8ed',
          200: '#ffd0db',
          300: '#ffaabf',
          400: '#ff7a9e',
          500: '#f84f80',
          600: '#e52c62',
          700: '#c21f50',
          800: '#a21d47',
          900: '#8a1c41',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in-slow': 'fadeIn 1.4s ease forwards',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4982a 0%, #f4dfa0 50%, #d4982a 100%)',
        'nude-gradient': 'linear-gradient(135deg, #fdf8f5 0%, #f2ddd0 100%)',
      },
    },
  },
  plugins: [],
};
