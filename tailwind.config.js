/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: '480px',
      tabs: '768px',
      pc: '1024px',
      desktop: '1200px',
    },
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
      },
      keyframes: {
        titleSlideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        appear: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        }
      },
      animation: {
        slideInTitle: 'titleSlideIn 1s ease-in',
        itemAppear: 'appear 2s ease-in-out',
      },
    },
  },
  plugins: [],
}

