/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#09070F',       // Very dark purple-black matching reference
        darkCard: '#130F1F',     // Cards matching deep glassmorphism
        cyberPurple: '#A855F7',  // Main vibrant purple/violet
        cyberViolet: '#7C3AED',  // Deep violet
        cyberPink: '#EC4899',    // Hot pink highlights
        textMuted: '#94A3B8',    // Muted text
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple': '0 0 15px rgba(168, 85, 247, 0.4)',
        'neon-violet': '0 0 15px rgba(124, 58, 237, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
