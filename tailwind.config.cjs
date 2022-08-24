/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '2xl-c': '0 0px 50px -15px var(--tw-shadow-color)',
      }
    },
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
    {
      pattern: /shadow-/,
    }
  ]
}
