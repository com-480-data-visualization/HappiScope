/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6',
        'primary-dark': '#2563EB',
        'secondary': '#10B981',
        'accent': '#F59E0B',
        'background': '#F3F4F6',
        'background-dark': '#1F2937',
        'text-color': '#1F2937',
        'text-color-dark': '#F9FAFB',
        'card': '#FFFFFF',
        'card-dark': '#374151',
      },
    },
  },
  plugins: [],
}