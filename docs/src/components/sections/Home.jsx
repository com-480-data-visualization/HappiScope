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
    <div className="bg-background">
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
        <h2 className="section-title text-center">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Insight Card 1 */}
          <motion.div 
            className="card"
            whileHover={{ y: -10 }}
          >
            <h3 className="text-xl font-semibold mb-4">Global Trends</h3>
            <p className="text-gray-600 mb-4">
              [Placeholder] Discover how global happiness has evolved over the past decade.
            </p>
            <Link to="/map" className="text-primary hover:underline font-medium">
              View Interactive Map →
            </Link>
          </motion.div>

          {/* Insight Card 2 */}
          <motion.div 
            className="card"
            whileHover={{ y: -10 }}
          >
            <h3 className="text-xl font-semibold mb-4">Happiness Factors</h3>
            <p className="text-gray-600 mb-4">
              [Placeholder] Explore which factors contribute most significantly to happiness across regions.
            </p>
            <Link to="/factors" className="text-primary hover:underline font-medium">
              Analyze Factors →
            </Link>
          </motion.div>

          {/* Insight Card 3 */}
          <motion.div 
            className="card"
            whileHover={{ y: -10 }}
          >
            <h3 className="text-xl font-semibold mb-4">Country Comparisons</h3>
            <p className="text-gray-600 mb-4">
              [Placeholder] Compare happiness metrics between countries and uncover unique patterns.
            </p>
            <Link to="/compare" className="text-primary hover:underline font-medium">
              Compare Countries →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Visualization */}
      <section className="bg-gray-100 py-16">
        <div className="section-container">
          <h2 className="section-title text-center">Featured Visualization</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md flex items-center justify-center h-80 mb-6">
              <p className="text-gray-500">[Placeholder for World Map Visualization]</p>
            </div>
            <p className="text-gray-600 mb-4">
              [Placeholder] Interactive visualization showing global happiness scores across different years.
            </p>
            <Link to="/map" className="text-primary hover:underline font-medium">
              Explore Full Map →
            </Link>
          </div>
        </div>
      </section>

      {/* About Project Preview */}
      <section className="section-container py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="section-title">About HappiScope</h2>
            <p className="text-gray-600 mb-6">
              [Placeholder] HappiScope is a data visualization project created for the COM-480 Data Visualization 
              course at EPFL. It aims to transform complex happiness data from the World Happiness Report 
              and supplementary datasets into intuitive visual insights.
            </p>
            <Link 
              to="/about" 
              className="bg-primary text-white font-medium px-6 py-3 rounded-md hover:bg-primary-dark transition duration-300"
            >
              About the Project
            </Link>
          </div>
          <div className="md:w-1/2 bg-gray-200 rounded-md flex items-center justify-center h-64">
            <p className="text-gray-500">[Placeholder for Project Image]</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home