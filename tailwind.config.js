/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

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
        gray: {
          500: "hsla(224, 8%, 46%, 1)",
          700: "hsla(217, 19%, 27%, 1)",
          900: "hsla(221, 39%, 11%, 1)",
        },
        danger: {
          1: "hsla(349, 86%, 47%, 1)",
        },
        custom: {
          black: "hsla(0, 0%, 20%, 1)",
        },
      },
      container: {
        center: true,
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")(),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".h-app": {
          height: "calc(100vh - 100px)",
        },
        ".min-h-app": {
          minHeight: "calc(100vh - 100px)",
        },
        /** for gradient borders: https://gist.github.com/stereokai/36dc0095b9d24ce93b045e2ddc60d7a0
         * ```tsx
         * <Component className="border gradient-borders--v1 rounded-md"/>
         * ```
         */
        ".gradient-borders--v1": {
          borderColor: "transparent",
          backgroundImage:
            "linear-gradient(#fff, #fff), linear-gradient(84.77deg, #5724eb 17.18%, #620b63 44.94%, #ffb66d 66.36%, #e4601f 93.32%), radial-gradient(circle at top left, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15))",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        },
      });
    }),
  ],
};
