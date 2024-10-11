module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      body: ["Poppins", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: "#f18f2d",
            },
          },
        },
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        gray: {
          littil: "#acacac",
        },
        yellow: {
          50: "#efa55c",
          100: "#f18f2d",
          200: "#e57200",
        },
        blue: {
          100: "#a1c5ea",
          200: "#2d2e83",
          300: "#5f60b5",
        },
        lightblue: {
          100: "#adc7e9",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
