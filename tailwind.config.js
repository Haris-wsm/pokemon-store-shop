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
    },

    // screens: {
    //   tablet: "640px",
    //   // => @media (min-width: 640px) { ... }

    //   laptop: "1024px",
    //   // => @media (min-width: 1024px) { ... }

    //   desktop: "1280px",
    //   // => @media (min-width: 1280px) { ... }
    // },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
