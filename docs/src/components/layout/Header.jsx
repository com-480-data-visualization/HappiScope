import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import happiscope from '../../assets/happiscope.svg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/map', label: 'Map' },
    { to: '/factors', label: 'Factors' },
    { to: '/compare', label: 'Compare' },
    { to: '/about', label: 'About' },
    { to: '/methodology', label: 'Methodology' }
  ];
  
  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-6' : 'bg-transparent py-8'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center group">
                <motion.img 
                  src={happiscope} 
                  alt="HappiScope Logo" 
                  className="h-15 w-auto mr-3"
                  whileHover={{ scale: 2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <span className="relative">
                  <motion.span
                    className={`text-3xl font-semibold ${scrolled ? 'text-primary' : 'text-gray-800'}`}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                      Happi
                    </span>
                    <span className="text-gray-800">Scope</span>
                  </motion.span>
                  <motion.div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  />
                </span>
              </Link>
            </motion.div>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  transition-all duration-200 relative py-3 px-4 rounded-md
                  ${isActive 
                    ? 'text-primary bg-blue-50 font-extrabold border-primary shadow-sm' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50 font-normal'}
                `}
                style={({ isActive }) => isActive ? { fontWeight: 700 } : {}}
              >
                {({ isActive }) => (
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className={isActive ? 'font-bold' : 'font-normal'}>
                      {link.label}
                    </span>
                    {isActive ? (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-1.5 bg-primary rounded-full"
                        layoutId="navIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-300 rounded-full opacity-0"
                        initial={{ width: 0, opacity: 0 }}
                        whileHover={{ width: '100%', opacity: 0.6 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
            
            {/* GitHub Link */}
            <motion.a
              href="https://github.com/com-480-data-visualization/HappiScope"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors duration-200 p-3 rounded-full hover:bg-gray-100"
              aria-label="GitHub Repository"
              whileHover={{ 
                scale: 1.1, 
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </motion.a>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${scrolled ? 'text-gray-800' : 'text-gray-800'} focus:outline-none p-3`}
              aria-label="Toggle mobile menu"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-5 flex flex-col justify-between"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 },
                  }}
                  className="w-6 h-0.5 bg-current block transform origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="w-6 h-0.5 bg-current block"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 },
                  }}
                  className="w-6 h-0.5 bg-current block transform origin-center"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="py-4 px-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-3 px-4 rounded-md transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-primary font-extrabold border-l-4 border-primary'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary font-normal hover:border-l-4 hover:border-gray-300'
                      }`
                    }
                    style={({ isActive }) => isActive ? { fontWeight: 700 } : {}}
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={({ isActive }) => isActive ? "block font-bold" : "block"}
                    >
                      {link.label}
                    </motion.span>
                  </NavLink>
                ))}
                
                {/* GitHub Link (Mobile) */}
                <motion.a
                  href="https://github.com/com-480-data-visualization/HappiScope"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center py-3 px-4 font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 mr-2"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub
                </motion.a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    <div className="h-32 md:h-28"></div> {/* Add spacing equal to header height */}
  </>
);
};

export default Header;