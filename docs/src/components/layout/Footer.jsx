import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import happiscope from '../../assets/happiscope.svg' // Import the logo directly

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white transition-colors duration-200 relative overflow-hidden">
      {/* Decorative elements - similar to the header's subtle styling */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Logo and about section */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <img 
                  src={happiscope} 
                  alt="HappiScope Logo" 
                  className="h-10" 
                />
                <span className="text-2xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Happi
                  </span>
                  <span className="text-white">Scope</span>
                </span>
              </Link>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-lg">
                Exploring the multidimensional nature of global happiness through 
                sophisticated visual analysis of World Happiness Report data from 2015-2024.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  href="https://github.com/com-480-data-visualization/HappiScope" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition duration-300"
                  aria-label="GitHub Repository"
                  whileHover={{ 
                    scale: 1.1, 
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://www.epfl.ch"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition duration-300"
                  aria-label="EPFL Website"
                  whileHover={{ 
                    scale: 1.1, 
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition duration-200 flex items-center group">
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Home
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/map" className="text-gray-300 hover:text-white transition duration-200 flex items-center group">
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Interactive Map
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/factors" className="text-gray-300 hover:text-white transition duration-200 flex items-center group">
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Factor Analysis
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/compare" className="text-gray-300 hover:text-white transition duration-200 flex items-center group">
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Country Comparison
                    </motion.span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* About */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">About</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition duration-200 flex items-center group">
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      About the Project
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <Link to="/methodology" className="text-gray-300 hover:text-white transition duration-200 flex items-center group">
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Methodology
                    </motion.span>
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://github.com/com-480-data-visualization" 
                    className="text-gray-300 hover:text-white transition duration-200 flex items-center group" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      COM-480 Course
                    </motion.span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Data sources */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Data Sources</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://worldhappiness.report/" 
                    className="text-gray-300 hover:text-white transition duration-200 flex items-center group" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      World Happiness Report
                    </motion.span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://hdr.undp.org/data-center" 
                    className="text-gray-300 hover:text-white transition duration-200 flex items-center group" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Human Development Index
                    </motion.span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.kaggle.com/datasets/kaggle/world-development-indicators" 
                    className="text-gray-300 hover:text-white transition duration-200 flex items-center group" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      World Development Indicators
                    </motion.span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        {/* Simplified Footer - Copyright information only */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} HappiScope | Created for COM-480 Data Visualization at EPFL
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer