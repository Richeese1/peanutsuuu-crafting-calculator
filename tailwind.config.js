/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        albion: {
          gold: '#FFD700',
          silver: '#C0C0C0',
          dark: '#1a1a2e',
          darker: '#16213e',
          accent: '#e94560',
        }
      }
    },
  },
  plugins: [],
}
