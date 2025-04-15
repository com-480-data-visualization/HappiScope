import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="bg-background transition-colors duration-200">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-br from-primary to-blue-700 text-white">
        <div className="section-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center"
          >
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              HappiScope
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Exploring the multidimensional nature of global happiness through sophisticated visual analysis
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link 
                to="/map" 
                className="bg-white text-primary font-medium px-6 py-3 rounded-md shadow-lg hover:bg-gray-100 transition duration-300 mr-4"
              >
                Explore Data
              </Link>
              <Link 
                to="/about" 
                className="bg-transparent border-2 border-white text-white font-medium px-6 py-3 rounded-md hover:bg-white hover:text-primary transition duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Insights Preview */}
      <section className="section-container py-16">
        <h2 className="section-title text-center text-text-color">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Insight Card 1 */}
          <motion.div 
            className="card bg-card shadow-md rounded-lg p-6 transition-colors duration-200"
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center text-text-color">Global Trends</h3>
            <p className="text-gray-600 mb-4 text-center">
              Discover how global happiness has evolved over the past decade, revealing surprising patterns and shifts.
            </p>
            <div className="text-center">
              <Link to="/map" className="text-primary hover:underline font-medium inline-flex items-center">
                View Interactive Map
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Insight Card 2 */}
          <motion.div 
            className="card bg-card shadow-md rounded-lg p-6 transition-colors duration-200"
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center text-text-color">Happiness Factors</h3>
            <p className="text-gray-600 mb-4 text-center">
              Explore which factors contribute most significantly to happiness across different regions and cultures.
            </p>
            <div className="text-center">
              <Link to="/factors" className="text-primary hover:underline font-medium inline-flex items-center">
                Analyze Factors
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Insight Card 3 */}
          <motion.div 
            className="card bg-card shadow-md rounded-lg p-6 transition-colors duration-200"
            whileHover={{ y: -10 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center text-text-color">Country Comparisons</h3>
            <p className="text-gray-600 mb-4 text-center">
              Compare happiness metrics between countries and uncover unique patterns across different regions.
            </p>
            <div className="text-center">
              <Link to="/compare" className="text-primary hover:underline font-medium inline-flex items-center">
                Compare Countries
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Visualization */}
      <section className="bg-gray-100 py-16 transition-colors duration-200">
        <div className="section-container">
          <h2 className="section-title text-center text-text-color">Featured Visualization</h2>
          <div className="bg-card rounded-lg shadow-lg p-6 mt-8 transition-colors duration-200">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md flex items-center justify-center h-80 mb-6">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-gray-500 text-xl">Interactive Global Happiness Map</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4 text-center max-w-3xl mx-auto">
              Our interactive visualization shows global happiness scores across different years (2015-2024), 
              allowing you to explore geographic patterns, regional trends, and changes over time.
            </p>
            <div className="flex justify-center">
              <Link to="/map" className="bg-primary text-white hover:bg-blue-700 px-6 py-3 rounded-md font-medium transition duration-300 inline-flex items-center">
                Explore Full Map
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Project Preview */}
      <section className="section-container py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="section-title text-text-color">About HappiScope</h2>
            <p className="text-gray-600 mb-6">
              HappiScope is a data visualization project created for the COM-480 Data Visualization 
              course at EPFL. It aims to transform complex happiness data from the World Happiness Report 
              and supplementary datasets into intuitive visual insights that reveal patterns in global well-being.
            </p>
            <Link 
              to="/about" 
              className="bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-primary-dark transition duration-300 inline-flex items-center"
            >
              About the Project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
          </div>
          <div className="md:w-1/2 bg-gray-200 rounded-md flex items-center justify-center h-64 transition-colors duration-200">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-gray-500">Exploring Global Happiness Data</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home