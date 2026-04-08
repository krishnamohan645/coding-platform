/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Ensure it scans the right files
  safelist: [
    {
      // pattern: /(from|to|border|hover:border)-(yellow|blue|red|purple|emerald|orange)-(400|500|600|700|800)/,
    }
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
