/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // For the best performance and to avoid false positives,
    // be as specific as possible with your content configuration.
  ],
  theme: {
    extend: {
      fontFamily: {
        railway: ['Railway', 'sans-serif'],
      },
    },
    screens: {
      md: '481px',
      lg: '769px',
      xl: '1025px',
    },
  },
  plugins: [],
};
