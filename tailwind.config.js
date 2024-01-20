/** @type {import('tailwindcss').Config} */
//include anything inside of content-script
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./content-script/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom width and height
      width: {
        300: "300px",
      },
      height: {
        500: "500px",
      },
      colors: {
        gpt: {
          grey: "#343541",
        },
      },
    },
  },
  plugins: [],
};
