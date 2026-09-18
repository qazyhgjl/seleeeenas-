/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#030712',
          card: 'rgba(15, 23, 42, 0.75)',
          cyan: '#00f0ff',
          neon: '#39ff14',
          pink: '#ff007f',
          gold: '#ffb700',
          red: '#ff0033',
          purple: '#9d00ff',
          border: 'rgba(0, 240, 255, 0.25)',
        }
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.4)',
        'glow-pink': '0 0 20px rgba(255, 0, 127, 0.4)',
        'glow-gold': '0 0 20px rgba(255, 183, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
