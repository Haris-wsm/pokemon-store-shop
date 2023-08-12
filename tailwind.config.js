/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-dark": "#1E1E1E",
        "background-light": "#b24900",
        main: "#ff6900",
      },
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
      },
      keyframes: {
        marqueeLine: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },

      animation: {
        textRun: "marqueeLine 15s ease-in-out infinite 1s",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
