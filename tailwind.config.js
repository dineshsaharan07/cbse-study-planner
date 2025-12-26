module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
module.exports = {
  darkMode: 'class', // ✅ important
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#6366f1', // primary
          600: '#4f46e5',
        },
        ink: {
          900: '#0b1021',
          700: '#1a2036',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.08)',
        glow: '0 8px 30px rgba(99,102,241,0.25)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
};
