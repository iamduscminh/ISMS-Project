/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "10px": ["10px", "15px"],
        "15px": ["15px", "23px"],
      },
    },
  },
  plugins: [],
};
