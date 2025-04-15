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
        'primary-dark': '#2563EB',
        'secondary': '#10B981',
        'accent': '#F59E0B',
        'background': '#F3F4F6',
        'text-color': '#1F2937', // renamed from 'text' to 'text-color'
      },
    },
  },
  plugins: [],
}