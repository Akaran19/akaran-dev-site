/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['var(--font-display)', 'Oswald', 'sans-serif'],
        body: ['var(--font-body)', 'Outfit', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        accent: '#3b82f6', // blue-500
        wc: {
          navy: '#0A1128',
          deep: '#0F1A36',
          blue: '#1B2D5B',
          royal: '#1E3A8A',
          gold: '#D4A843',
          'gold-light': '#E8C86A',
          'gold-bright': '#FFD700',
          cream: '#F5F0E1',
          pitch: '#2D6A2E',
          'pitch-light': '#3A8A3C',
          white: '#FAFAF8',
          muted: '#8B9DC3',
          red: '#C41E3A',
        },
      },
      boxShadow: {
        gold: '0 0 24px rgba(212, 168, 67, 0.35)',
        'gold-lg': '0 0 48px rgba(212, 168, 67, 0.45)',
        card: '0 10px 40px rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        'spin-wheel': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(var(--spin-end, 1440deg))' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 168, 67, 0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 168, 67, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '60%': { opacity: '1', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'spin-wheel': 'spin-wheel 3s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pop-in': 'pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
    },
  },
  plugins: [],
}