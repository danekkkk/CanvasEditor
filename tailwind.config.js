/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary": {
        DEFAULT: '#7209B7',
        50: "#7209B780"
      },
      "black": {
        100: "#353535",
        75: "#676767",
        50: "#9B9B9B",
        25: "#CDCDCD"
      },
      white: {
        DEFAULT: "#FFF",
        98: "#FAFAFA",
        97: "#F7F7F8"
      }

    },
    fontSize: {
      display: "32px",
      body: "18px",
      button: "15px"
    },
    extend: {},
  },
  plugins: [],
}

