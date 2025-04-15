import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen transition-colors duration-200">
      <section className="section-container py-12 px-4 md:px-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-text-color dark:text-text-color-dark"
        >
          About HappiScope
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto"
        >
          Exploring the multidimensional nature of global happiness through sophisticated visual analysis
        </motion.p>

        {/* Project Overview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card mb-8 max-w-5xl mx-auto bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Project Overview</h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              HappiScope is an interactive visualization platform developed for the COM-480 Data Visualization course at EPFL. 
              Our mission is to transform complex happiness data from the World Happiness Report and supplementary datasets into 
              intuitive visual insights that reveal patterns and relationships in global well-being.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              In today's data-driven world, understanding the factors that contribute to societal happiness is increasingly important 
              for policymakers, researchers, educators, and the general public. HappiScope addresses this need by providing accessible 
              tools to explore what truly makes societies happy beyond traditional economic metrics.
            </p>
          </div>
          
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
              Through an explorative approach, HappiScope allows users to investigate key research questions:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
              <li>How has global happiness changed over the past decade (2015-2024)?</li>
              <li>What regional patterns emerge in happiness distribution?</li>
              <li>Which factors correlate most strongly with happiness across different regions?</li>
              <li>How do economic metrics compare to social support metrics in predicting happiness?</li>
              <li>What differences exist in happiness determinants between high and low-income countries?</li>
            </ul>
          </div>
        </motion.div>

        {/* Project Goals and Impact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card mb-8 max-w-5xl mx-auto bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Project Goals and Impact</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            HappiScope aims to democratize access to happiness data by presenting complex information in visually engaging 
            and intuitive ways. Our key goals include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary dark:text-blue-400 mb-2">Educational Impact</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Providing tools for educators, students, and researchers to explore and understand the multidimensional nature 
                of happiness and its relationship to social, economic, and cultural factors.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary dark:text-blue-400 mb-2">Policy Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Offering data-driven insights that can inform policy decisions aimed at improving societal well-being 
                by revealing which factors have the strongest impact on happiness across different contexts.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary dark:text-blue-400 mb-2">Cultural Understanding</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Highlighting cultural and regional differences in happiness determinants to foster greater cross-cultural 
                understanding and appreciation of diverse approaches to well-being.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-primary dark:text-blue-400 mb-2">Public Awareness</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Raising awareness about the importance of non-economic factors in determining happiness, challenging 
                common assumptions about the relationship between wealth and well-being.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Members Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card mb-8 max-w-5xl mx-auto bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-300">[Photo]</span>
              </div>
              <h3 className="text-xl font-medium text-text-color dark:text-text-color-dark">Chang Jin</h3>
              <p className="text-gray-600 dark:text-gray-300">SCIPER: 403930</p>
              <p className="text-gray-600 dark:text-gray-300">Data Processing & Analysis</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Specializes in transforming raw data into structured insights, focusing on statistical analysis and data patterns identification.</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-300">[Photo]</span>
              </div>
              <h3 className="text-xl font-medium text-text-color dark:text-text-color-dark">Rizhong Lin</h3>
              <p className="text-gray-600 dark:text-gray-300">SCIPER: 366842</p>
              <p className="text-gray-600 dark:text-gray-300">Visualization Development</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Leads the development of interactive visualizations, implementing D3.js and Three.js components to reveal data insights.</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-300">[Photo]</span>
              </div>
              <h3 className="text-xl font-medium text-text-color dark:text-text-color-dark">Anlan Wang</h3>
              <p className="text-gray-600 dark:text-gray-300">SCIPER: 403909</p>
              <p className="text-gray-600 dark:text-gray-300">UI/UX & Interaction Design</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Designs the user experience and interface elements, ensuring intuitive interaction and accessibility across the platform.</p>
            </div>
          </div>
        </motion.div>

        {/* Course Context Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card mb-8 max-w-5xl mx-auto bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Course Context</h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              This project was developed as part of the <strong>COM-480 Data Visualization</strong> course 
              at École Polytechnique Fédérale de Lausanne (EPFL), taught by Professor Laurent Vuillon.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              The course focuses on the theory, design principles, and techniques for effective data visualization,
              encouraging students to apply these concepts to real-world datasets through hands-on projects.
            </p>
          </div>
          
          <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
              Through this project, we've applied key visualization principles including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-300">Gestalt principles of visual perception</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-300">Effective use of color, shape, and position</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-300">Interactive techniques for data exploration</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-300">Narrative visualization approaches</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-100 dark:border-gray-600">
                <p className="text-gray-600 dark:text-gray-300">Ethical considerations in data representation</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Implementation Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card mb-8 max-w-5xl mx-auto bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Technical Implementation</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            HappiScope is built using modern web technologies to deliver an interactive and responsive user experience:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-primary dark:text-blue-400 mb-2">Frontend Framework</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                <li><span className="font-medium">React with Vite</span>: Fast and efficient component-based architecture</li>
                <li><span className="font-medium">Tailwind CSS</span>: Responsive and customizable styling</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium text-primary dark:text-blue-400 mb-2">Visualization Technologies</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
                <li><span className="font-medium">D3.js</span>: Data-driven visualizations with dynamic responses</li>
                <li><span className="font-medium">Three.js</span>: Immersive 3D data representations</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium text-primary dark:text-blue-400 mb-2">User Experience</h3>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
              <li><span className="font-medium">Framer Motion</span>: Smooth animations and transitions for enhanced interaction</li>
              <li><span className="font-medium">Responsive Design</span>: Ensures accessibility across all device sizes</li>
              <li><span className="font-medium">Interactive Elements</span>: Tooltips, filters, and dynamic updates for intuitive data exploration</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <Link to="/methodology" className="text-primary dark:text-blue-400 hover:underline font-medium">
              Learn more about our methodology →
            </Link>
          </div>
        </motion.div>

        {/* Acknowledgments Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card max-w-5xl mx-auto bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Acknowledgments</h2>
          <div className="space-y-4 mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              We would like to thank Professor Laurent Vuillon and the teaching assistants of the COM-480 Data Visualization 
              course for their guidance and feedback throughout the development of this project.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We also acknowledge the World Happiness Report, the United Nations Development Programme, and the World Bank 
              for making their valuable datasets publicly available for research and educational purposes.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Special thanks to the open-source communities behind React, D3.js, Three.js, and other libraries that made this project possible.
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <a 
              href="https://github.com/com-480-data-visualization/HappiScope" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clipRule="evenodd"></path>
              </svg>
              View on GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default About