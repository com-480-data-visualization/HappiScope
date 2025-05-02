import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WorldMap from '../visualizations/WorldMap'
import CountryDetails from '../visualizations/CountryDetails'
import happinessData from '../../data/happiness_data.json'

const MapVisualization = () => {
  const [selectedYear, setSelectedYear] = useState(2020)
  const [selectedMetric, setSelectedMetric] = useState('score')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [timelineAnimating, setTimelineAnimating] = useState(false)
  const [timelineInterval, setTimelineInterval] = useState(null)
  const [error, setError] = useState(null)
  
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  const metrics = [
    { id: 'score', label: 'Happiness Score' },
    { id: 'gdp_per_capita', label: 'GDP per Capita' },
    { id: 'social_support', label: 'Social Support' },
    { id: 'life_expectancy', label: 'Life Expectancy' },
    { id: 'freedom', label: 'Freedom' },
    { id: 'generosity', label: 'Generosity' },
    { id: 'corruption', label: 'Corruption' }
  ]
  
  // Load data and check for errors
  useEffect(() => {
    try {
      if (!happinessData || happinessData.length === 0) {
        setError("No happiness data available");
      } else {
        console.log(`Loaded ${happinessData.length} total data points`);
        // Validate that we have data for the selected year
        const yearData = happinessData.filter(d => d.year === selectedYear);
        if (yearData.length === 0) {
          console.warn(`No data found for year ${selectedYear}`);
        } else {
          console.log(`Found ${yearData.length} countries with data for ${selectedYear}`);
        }
      }
    } catch (err) {
      console.error("Error loading happiness data:", err);
      setError(err.message);
    }
    
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    // Cleanup any timeline animation on unmount
    return () => {
      if (timelineInterval) {
        clearInterval(timelineInterval)
      }
    }
  }, [])
  
  // Update selected country when year changes
  useEffect(() => {
    if (selectedCountry) {
      const updatedCountry = happinessData.find(d => 
        d.country_code === selectedCountry.country_code && d.year === selectedYear
      )
      setSelectedCountry(updatedCountry || null)
    }
  }, [selectedYear])
  
  // Handle timeline animation
  const toggleTimelineAnimation = () => {
    if (timelineAnimating) {
      // Stop animation
      if (timelineInterval) {
        clearInterval(timelineInterval)
        setTimelineInterval(null)
      }
      setTimelineAnimating(false)
    } else {
      // Start animation
      const interval = setInterval(() => {
        setSelectedYear(prevYear => {
          const yearIndex = years.indexOf(prevYear)
          // If we reached the end of the timeline, go back to the beginning
          if (yearIndex >= years.length - 1) {
            return years[0]
          }
          // Otherwise, move to the next year
          return years[yearIndex + 1]
        })
      }, 2000) // Change every 2 seconds
      
      setTimelineInterval(interval)
      setTimelineAnimating(true)
    }
  }
  
  if (error) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-red-600">
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p>{error}</p>
          <p className="mt-4 text-gray-600">Please check the console for more details.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-background min-h-screen">
      <section className="section-container py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center">Global Happiness Map</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Explore global happiness scores across different years. The interactive map visualizes happiness levels around the world.
          </p>
        </motion.div>
        
        {/* Controls Section - Time and Metric Selectors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Year Selector */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-800">Select Year:</h3>
                <button 
                  onClick={toggleTimelineAnimation}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    timelineAnimating 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  {timelineAnimating ? 'Stop Animation' : 'Play Timeline'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      selectedYear === year 
                        ? 'bg-primary text-white shadow-md ring-2 ring-primary/20' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={timelineAnimating}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Metric Selector */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Select Metric:</h3>
              <div className="flex flex-wrap gap-2">
                {metrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      selectedMetric === metric.id 
                        ? 'bg-primary text-white shadow-md ring-2 ring-primary/20' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="bg-gray-100 rounded-md h-96 flex items-center justify-center mb-6 overflow-hidden relative">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500">Loading visualization...</p>
              </div>
            ) : (
              <div className="w-full h-full">
                <WorldMap 
                  year={selectedYear} 
                  metric={selectedMetric} 
                  setSelectedCountry={setSelectedCountry} 
                />
              </div>
            )}
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded text-sm text-gray-800">
              Data for {selectedYear}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-gray-600">
                Displaying {metrics.find(m => m.id === selectedMetric)?.label} data for year: <span className="font-semibold">{selectedYear}</span>
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Details and Legend Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Color Legend</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <div className="w-8 h-4 bg-[#313695] rounded-sm mr-2"></div>
                <span className="text-gray-700">Very Happy (8-10)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-[#4575b4] rounded-sm mr-2"></div>
                <span className="text-gray-700">Happy (7-8)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-[#91bfdb] rounded-sm mr-2"></div>
                <span className="text-gray-700">Moderately Happy (6-7)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-[#fee090] rounded-sm mr-2"></div>
                <span className="text-gray-700">Less Happy (5-6)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-[#fc8d59] rounded-sm mr-2"></div>
                <span className="text-gray-700">Unhappy (4-5)</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-4 bg-[#d73027] rounded-sm mr-2"></div>
                <span className="text-gray-700">Very Unhappy (&lt; 4)</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Colors indicate happiness levels from lowest (red) to highest (deep blue).
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white shadow-md rounded-lg p-6 md:col-span-2"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Country Details</h3>
            <div className="h-[400px]">
              <CountryDetails country={selectedCountry} metric={selectedMetric} />
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
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Key Global Insights for {selectedYear}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-5 border-t-4 border-green-500">
              <h3 className="font-medium mb-2 text-gray-800">Happiest Regions</h3>
              <p className="text-gray-600 text-sm mb-3">
                Northern Europe continues to dominate the top happiness rankings, with 7 out of 10 happiest countries.
              </p>
              <div className="flex items-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sm">2.3% increase in regional average</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 border-t-4 border-yellow-500">
              <h3 className="font-medium mb-2 text-gray-800">Top Improving Countries</h3>
              <p className="text-gray-600 text-sm mb-3">
                Eastern European nations show the fastest happiness growth, with 5 countries improving by over 0.5 points.
              </p>
              <div className="flex items-center text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sm">Notable social support improvements</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5 border-t-4 border-red-500">
              <h3 className="font-medium mb-2 text-gray-800">Areas of Concern</h3>
              <p className="text-gray-600 text-sm mb-3">
                Middle Eastern and North African regions experienced declining happiness scores associated with instability.
              </p>
              <div className="flex items-center text-red-600">
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