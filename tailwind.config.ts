import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Make sure to include the correct path to your components and pages
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B92DB', // Custom primary color
        secondary: '#FF6F61', // Custom secondary color
        background: '#f7f7f7', // Background color for the body
        error: '#FF4F4F', // Red color for error messages
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
