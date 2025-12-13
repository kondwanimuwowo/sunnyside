/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#32cd32",
          light: "#4ade80",
          dark: "#22a722",
        },
        secondary: {
          DEFAULT: "#efe82a",
          light: "#fef08a",
          dark: "#d4c920",
        },
        accent: {
          DEFAULT: "#4318dd",
          light: "#6366f1",
          dark: "#3311bb",
        },
      },
    },
  },
  plugins: [],
};
