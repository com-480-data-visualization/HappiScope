import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/map', label: 'Interactive Map' },
    { to: '/factors', label: 'Factor Analysis' },
    { to: '/compare', label: 'Country Comparison' },
    { to: '/about', label: 'About' },
    { to: '/methodology', label: 'Methodology' }
  ]

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary dark:text-blue-400"
            >
              <NavLink to="/">HappiScope</NavLink>
            </motion.div>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary dark:text-blue-400 border-b-2 border-primary dark:border-blue-400'
                      : 'text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button placeholder - will implement later */}
            <button className="text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400">
              Menu
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header