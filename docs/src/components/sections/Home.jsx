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
      <section className="py-16 md:py-28 bg-gradient-to-br from-primary/90 via-blue-600 to-indigo-700 text-white overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div className="section-container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="text-center"
          >
            <motion.div
              variants={fadeIn}
              className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-6 border border-white/20"
            >
              Visualizing Global Happiness Data from 2015-2024
            </motion.div>
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="block">Discover What Makes</span>
              <span className="text-blue-200">The World Happy</span>
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-50 leading-relaxed"
            >
              Exploring the multidimensional nature of global happiness through
              <span className="font-semibold text-white"> interactive visual analysis</span>
            </motion.p>
            <motion.div variants={fadeIn} className="space-x-4 flex flex-wrap justify-center gap-4">
              <Link 
                to="/map" 
                className="bg-white text-primary !text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all duration-300 inline-flex items-center group no-dark-override"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span>Explore Data</span>
              </Link>
              <Link 
                to="/about" 
                className="bg-white/10 backdrop-blur-sm border-2 border-white/60 !text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 hover:border-white transition-all duration-300 inline-flex items-center no-dark-override"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Learn More</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Insights Preview */}
      <section className="section-container py-16 md:py-24">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-blue-50 text-primary px-4 py-1.5 rounded-full text-sm font-medium">Data-Driven Insights</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-text-color">Discover Key Happiness Trends</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Explore what our data reveals about global happiness patterns across regions, factors, and time</p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Insight Card 1 */}
          <motion.div 
            className="card bg-white border border-gray-100 shadow-xl rounded-2xl p-8 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -12, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Global Trends</h3>
            <p className="text-gray-600 mb-6 text-center">
              Discover how global happiness has evolved over the past decade, revealing surprising patterns and geographic variations.
            </p>
            <div className="text-center mt-auto">
              <Link to="/map" className="inline-flex items-center justify-center w-full px-5 py-3 text-primary !text-blue-600 bg-blue-50 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-100 hover:shadow-md group no-dark-override">
                <span>View Interactive Map</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Insight Card 2 */}
          <motion.div 
            className="card bg-white border border-gray-100 shadow-xl rounded-2xl p-8 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -12, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Happiness Factors</h3>
            <p className="text-gray-600 mb-6 text-center">
              Explore which factors contribute most significantly to happiness across different regions, cultures, and income levels.
            </p>
            <div className="text-center mt-auto">
              <Link to="/factors" className="inline-flex items-center justify-center w-full px-5 py-3 !text-green-700 bg-green-50 rounded-lg font-semibold transition-all duration-300 hover:bg-green-100 hover:shadow-md group no-dark-override">
                <span>Analyze Factors</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Insight Card 3 */}
          <motion.div 
            className="card bg-white border border-gray-100 shadow-xl rounded-2xl p-8 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -12, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-amber-100 p-4 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Country Comparisons</h3>
            <p className="text-gray-600 mb-6 text-center">
              Compare happiness metrics between countries and uncover unique patterns across different regions and development levels.
            </p>
            <div className="text-center mt-auto">
              <Link to="/compare" className="inline-flex items-center justify-center w-full px-5 py-3 !text-amber-700 bg-amber-50 rounded-lg font-semibold transition-all duration-300 hover:bg-amber-100 hover:shadow-md group no-dark-override">
                <span>Compare Countries</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Visualization */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 transition-colors duration-200 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-100 rounded-full opacity-50 filter blur-3xl"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium">Interactive Visualization</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-800">Global Happiness Map</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Explore happiness trends across the globe with our interactive visualization tools</p>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 rounded-xl flex items-center justify-center overflow-hidden shadow-inner mb-8 relative group">
              <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex flex-col items-center relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-primary opacity-90 mb-6 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h3 className="text-primary font-bold text-2xl mb-2 drop-shadow-sm">Interactive Global Happiness Map</h3>
                <p className="text-gray-700 text-lg mb-6 max-w-lg text-center">Discover how happiness varies across continents and countries</p>
                <Link 
                  to="/map" 
                  className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 inline-flex items-center group shadow-lg hover:shadow-xl"
                >
                  <span>Explore the Map</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center p-4 rounded-lg bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 className="font-semibold text-gray-800 mb-1">10 Years of Data</h4>
                <p className="text-gray-600 text-sm text-center">Track happiness changes from 2015-2024</p>
              </div>
              
              <div className="flex flex-col items-center p-4 rounded-lg bg-green-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <h4 className="font-semibold text-gray-800 mb-1">Multiple Factors</h4>
                <p className="text-gray-600 text-sm text-center">Compare 6 happiness indicators</p>
              </div>
              
              <div className="flex flex-col items-center p-4 rounded-lg bg-amber-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                <h4 className="font-semibold text-gray-800 mb-1">Regional Analysis</h4>
                <p className="text-gray-600 text-sm text-center">Explore continental and regional patterns</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Project Preview */}
      <section className="py-16 md:py-24 bg-white transition-colors duration-200">
        <div className="section-container">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-blue-50 text-primary px-4 py-1.5 rounded-full text-sm font-medium">About the Project</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-800">Exploring Happiness Data</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Learn more about our methodology and the data behind the visualizations</p>
            </motion.div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-50 transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full opacity-50 transform -translate-x-8 translate-y-8"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-white p-3 rounded-xl shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">HappiScope Project</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    HappiScope is a data visualization project created for the COM-480 Data Visualization 
                    course at EPFL. We transform complex happiness data from the World Happiness Report 
                    into intuitive visual insights that reveal patterns in global well-being.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">10 years of World Happiness Report data</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Analysis of 6 key happiness factors</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Interactive visualizations and comparisons</span>
                    </li>
                  </ul>
                  
                  <Link 
                    to="/about" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 group"
                  >
                    <span>Learn More About HappiScope</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Data Sources</h3>
                  <p className="text-gray-600 text-sm">World Happiness Report data from 2015-2024 with rich metrics on happiness factors</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-green-50 p-3 rounded-lg inline-block mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Visualization Tools</h3>
                  <p className="text-gray-600 text-sm">Built with React, Nivo charts, and D3.js for powerful interactive visualizations</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-amber-50 p-3 rounded-lg inline-block mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Methodology</h3>
                  <p className="text-gray-600 text-sm">Rigorous analysis using statistical methods to uncover patterns and relationships</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-indigo-50 p-3 rounded-lg inline-block mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Team Project</h3>
                  <p className="text-gray-600 text-sm">Created by EPFL students as part of the COM-480 Data Visualization course</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gradient-to-br from-primary/90 via-blue-600 to-indigo-700 py-16 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div className="section-container relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore Global Happiness Data?</h2>
            <p className="text-xl text-blue-50 mb-8">Dive into our interactive visualizations and discover what makes the world happy</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/map" 
                className="bg-white text-primary !text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all duration-300 inline-flex items-center group no-dark-override"
              >
                <span>Start Exploring</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link 
                to="/methodology" 
                className="bg-white/10 backdrop-blur-sm border-2 border-white/60 !text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 hover:border-white transition-all duration-300 inline-flex items-center no-dark-override"
              >
                <span>View Methodology</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home