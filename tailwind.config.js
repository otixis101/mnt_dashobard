/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsla(255, 83%, 53%, 1)",
        midpup: "hsla(254, 85%, 92%, 1)",

        mnt: {
          green: "hsla(140, 60%, 50%, 1)",
          orange: "hsla(20, 78%, 51%, 1)",
          white: "hsla(0, 0%, 95%, 1)",
        },
        pale: {
          purple: "hsla(249, 27%, 61%, 1)",
          orange: "hsla(30, 100%, 71%, 1)",
          yellow: "hsla(53, 75%, 94%, 1)",
          black: "hsla(0, 0%, 37%, 1)",
        },
        danger: {
          1: "hsla(349, 86%, 47%, 1)",
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
};
