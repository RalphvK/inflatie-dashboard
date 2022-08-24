/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
      'serif': ['Bitter', 'serif']
    }
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-/,
    },
    {
      pattern: /text-/,
    },
  ]
}
