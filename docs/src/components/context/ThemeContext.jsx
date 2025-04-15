import { createContext, useState, useEffect, useContext } from 'react'

// Create a context for theme management
export const ThemeContext = createContext()

// Theme provider component that will wrap the app
export function ThemeProvider({ children }) {
  // Check if user has already set a preference in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    } else {
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  })

  // Update the HTML class when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  // Provide the theme state and toggle function to children
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for easy theme access
export function useTheme() {
  return useContext(ThemeContext)
}