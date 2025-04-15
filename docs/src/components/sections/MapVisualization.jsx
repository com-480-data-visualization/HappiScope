import { useState } from 'react'
import { motion } from 'framer-motion'

const MapVisualization = () => {
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedMetric, setSelectedMetric] = useState('Happiness Score')
  const [isLoading, setIsLoading] = useState(true)
  
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  const metrics = [
    'Happiness Score', 
    'GDP per Capita', 
    'Social Support', 
    'Life Expectancy', 
    'Freedom', 
    'Generosity', 
    'Corruption'
  ]
  
  // Simulate loading time for placeholders
  setTimeout(() => {
    setIsLoading(false)
  }, 1500)
  
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen transition-colors duration-200">
      <section className="section-container py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center text-text-color dark:text-text-color-dark">Global Happiness Map</h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Explore global happiness scores across different years. The interactive map visualizes happiness levels around the world.
          </p>
        </motion.div>
        
        {/* Year Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 transition-colors duration-200">
            <h3 className="text-lg font-medium mb-3 text-text-color dark:text-text-color-dark">Select Year:</h3>
            <div className="flex flex-wrap gap-2">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-md ${
                    selectedYear === year 
                      ? 'bg-primary dark:bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                  } transition duration-200`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card dark:bg-card-dark rounded-lg shadow-lg p-6 transition-colors duration-200"
        >
          <div className="bg-gray-100 dark:bg-gray-700 rounded-md h-96 flex items-center justify-center mb-6 overflow-hidden relative transition-colors duration-200">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-primary dark:border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 dark:text-gray-300">Loading visualization...</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-gray-500 dark:text-gray-300 text-xl mb-4">[Placeholder for World Map Visualization]</p>
                <div className="w-3/4 max-w-lg space-y-3">
                  <div className="h-2 bg-primary/10 dark:bg-blue-500/20 rounded flex items-center">
                    <div className="h-full bg-primary dark:bg-blue-500 rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Lower {selectedMetric}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Higher {selectedMetric}</span>
                  </div>
                </div>
              </div>
            )}
            <div className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded text-sm text-text-color dark:text-text-color-dark">
              Data for {selectedYear}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-300">
                Displaying happiness data for year: <span className="font-semibold">{selectedYear}</span>
              </p>
            </div>
            
            <div>
              <select 
                className="bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2 border border-gray-300 dark:border-gray-600 text-text-color dark:text-text-color-dark"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                {metrics.map(metric => (
                  <option key={metric} value={metric}>{metric}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* Legend and Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Color Legend</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <div className="w-8 h-4 bg-green-600 rounded-sm mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Very Happy (8-10)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-green-400 rounded-sm mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Happy (7-8)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-yellow-400 rounded-sm mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Moderately Happy (6-7)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-orange-400 rounded-sm mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Less Happy (5-6)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-red-400 rounded-sm mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Unhappy (4-5)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-red-600 rounded-sm mr-2"></div>
                <span className="text-gray-700 dark:text-gray-200">Very Unhappy (&lt; 4)</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Selected Region Insights</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Click on a country or region to see detailed information and insights about happiness factors.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">No country selected. Click on the map to view country details.</p>
              <div className="mt-3 space-y-2">
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="card bg-card dark:bg-card-dark shadow-md rounded-lg p-6 transition-colors duration-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-text-color dark:text-text-color-dark">Data Completeness</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Information about the completeness and quality of data for the selected year.
            </p>
            <div className="mb-3">
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div className="bg-primary dark:bg-blue-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">85% of countries have complete data for {selectedYear}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
              <h4 className="font-medium text-sm mb-2 text-text-color dark:text-gray-200">Top 3 Missing Data Regions</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Sub-Saharan Africa (8 countries)</li>
                <li>• Southeast Asia (3 countries)</li>
                <li>• Caribbean (2 countries)</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-text-color dark:text-text-color-dark">Key Global Insights for {selectedYear}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card dark:bg-card-dark rounded-lg shadow p-5 border-t-4 border-green-500 transition-colors duration-200">
              <h3 className="font-medium mb-2 text-text-color dark:text-text-color-dark">Happiest Regions</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Northern Europe continues to dominate the top happiness rankings, with 7 out of 10 happiest countries.
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sm">2.3% increase in regional average</span>
              </div>
            </div>
            
            <div className="bg-card dark:bg-card-dark rounded-lg shadow p-5 border-t-4 border-yellow-500 transition-colors duration-200">
              <h3 className="font-medium mb-2 text-text-color dark:text-text-color-dark">Top Improving Countries</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Eastern European nations show the fastest happiness growth, with 5 countries improving by over 0.5 points.
              </p>
              <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sm">Notable social support improvements</span>
              </div>
            </div>
            
            <div className="bg-card dark:bg-card-dark rounded-lg shadow p-5 border-t-4 border-red-500 transition-colors duration-200">
              <h3 className="font-medium mb-2 text-text-color dark:text-text-color-dark">Areas of Concern</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Middle Eastern and North African regions experienced declining happiness scores associated with instability.
              </p>
              <div className="flex items-center text-red-600 dark:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sm">0.8 point average regional decrease</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default MapVisualization