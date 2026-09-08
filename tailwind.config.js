/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      colors: {
        sand: {
          50: '#faf8f5', 100: '#f5f0ea', 200: '#ebe3d8', 300: '#ddd0bf',
          400: '#c4b39e', 500: '#a8957c', 600: '#8a7560', 700: '#6d5b4a',
          800: '#4f4236', 900: '#322a23', 950: '#1f1813',
        },
        clay: {
          50: '#faf6f2', 100: '#f2e8df', 200: '#e4d0c0', 300: '#d0b09a',
          400: '#b88c6f', 500: '#a07053', 600: '#835842', 700: '#654435',
          800: '#483228', 900: '#2c201a',
        },
        sage: { 50: '#f4f5f1', 100: '#e5e8dc', 500: '#7d8c6e' },
        accent: { 400: '#c9a96a', 500: '#b8964f', 600: '#9c7d3e' },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.22,1,0.36,1)',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.22,1,0.36,1)',
        'slide-in-left': 'slideInLeft 0.35s cubic-bezier(0.22,1,0.36,1)',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        slideInLeft: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
