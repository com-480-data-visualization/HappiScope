/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6',
        'secondary': '#10B981',
        'accent': '#F59E0B',
        'background': '#F3F4F6',
        'text-color': '#1F2937',
        'card': '#FFFFFF',
      },
    },
  },
  plugins: [],
}