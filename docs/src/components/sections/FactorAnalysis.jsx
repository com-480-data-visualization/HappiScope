import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scaleLinear } from 'd3-scale'
// Import from the core packages to ensure proper module loading
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import correlationsData from '../../data/correlations.json'
import happinessData from '../../data/happiness_data.json'
import summaryByContinent from '../../data/summary_by_continent.json'

const FactorAnalysis = () => {
  // Map from readable factor names to data keys
  const factorMap = {
    'GDP per Capita': 'gdp_per_capita',
    'Social Support': 'social_support',
    'Life Expectancy': 'life_expectancy',
    'Freedom': 'freedom',
    'Generosity': 'generosity',
    'Corruption': 'corruption'
  }

  const factorDescriptions = {
    'GDP per Capita': 'Measures the economic strength of a country divided by its population. Higher GDP generally correlates with better living standards.',
    'Social Support': 'Indicates whether people have someone to count on in times of trouble. Strong social networks significantly contribute to wellbeing.',
    'Life Expectancy': 'Reflects healthy life expectancy and the overall quality of healthcare systems in a country.',
    'Freedom': 'Measures the degree to which people feel they have freedom to make life choices. Personal autonomy is central to happiness.',
    'Generosity': 'Reflects the prevalence of charitable donations and helping behaviors in society. Giving has benefits both for recipients and givers.',
    'Corruption': 'Measures perception of corruption in government and business. Higher values indicate lower corruption levels (more trust), which is associated with higher life satisfaction.'
  }

  const [selectedFactor, setSelectedFactor] = useState('GDP per Capita')
  const [isLoading, setIsLoading] = useState(true)
  const [factorCorrelation, setFactorCorrelation] = useState(0)
  const [factorRegionalData, setFactorRegionalData] = useState([])
  const [factorTimeData, setFactorTimeData] = useState([])
  const [factorImpactData, setFactorImpactData] = useState([])
  const [error, setError] = useState(null)
  
  const factors = [
    'GDP per Capita',
    'Social Support',
    'Life Expectancy',
    'Freedom',
    'Generosity',
    'Corruption'
  ]

  // Get data and calculate statistics when selected factor changes
  useEffect(() => {
    try {
      setIsLoading(true)
      
      // Get factor correlation from correlations.json
      const factorKey = factorMap[selectedFactor]
      const corrIndex = correlationsData.columns.indexOf(factorKey)
      const scoreIndex = correlationsData.columns.indexOf('score')
      
      if (corrIndex !== -1 && scoreIndex !== -1) {
        // Get the correlation with happiness score
        const correlation = correlationsData.data[scoreIndex][corrIndex]
        setFactorCorrelation(Math.abs(correlation).toFixed(2))
      }
      
      // Calculate regional averages for the factor
      // Group by continent first since the data is an array of objects
      const continentGroups = {}
      summaryByContinent.forEach(item => {
        if (!continentGroups[item.continent]) {
          continentGroups[item.continent] = []
        }
        continentGroups[item.continent].push(item)
      })
      
      const continents = Object.keys(continentGroups)
      const regionalData = continents.map(continent => {
        const continentData = continentGroups[continent]
        // Average across all years
        const factorValues = continentData.map(d => d[factorKey]).filter(v => v !== undefined && !isNaN(v))
        const avg = factorValues.length > 0 
          ? factorValues.reduce((sum, val) => sum + val, 0) / factorValues.length 
          : 0
        
        return {
          continent: continent,
          value: avg
        }
      }).filter(d => d.value > 0)
      
      setFactorRegionalData(regionalData)
      
      // Calculate time trends (global average by year)
      const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
      const timeData = years.map(year => {
        const yearData = happinessData.filter(d => d.year === year)
        const factorValues = yearData.map(d => d[factorKey]).filter(v => v !== undefined && !isNaN(v))
        const avg = factorValues.length > 0 
          ? factorValues.reduce((sum, val) => sum + val, 0) / factorValues.length 
          : 0
        
        // Calculate for all continents
        const continentData = {}
        const allContinents = ['Europe', 'Africa', 'Asia', 'North America', 'South America']
        
        allContinents.forEach(continent => {
          const continentYearData = yearData.filter(d => d.continent === continent)
          const continentAvg = continentYearData.length > 0
            ? continentYearData.map(d => d[factorKey]).filter(v => v !== undefined && !isNaN(v))
                .reduce((sum, val) => sum + val, 0) / continentYearData.length
            : 0
          continentData[continent.toLowerCase().replace(' ', '_')] = continentAvg
        })
        
        return {
          year: year,
          global: avg,
          ...continentData
        }
      })
      
      setFactorTimeData(timeData)
      
      // Calculate the impact by income group
      const incomeGroups = ['Very High', 'High', 'Medium', 'Low']
      const impactData = incomeGroups.map(group => {
        const groupData = happinessData.filter(d => d.development_category === group)
        const factorValues = groupData.map(d => d[factorKey]).filter(v => v !== undefined && !isNaN(v))
        const avg = factorValues.length > 0 
          ? factorValues.reduce((sum, val) => sum + val, 0) / factorValues.length 
          : 0
        
        // Calculate the proportion of total happiness this factor represents
        const scoreValues = groupData.map(d => d.score).filter(v => v !== undefined && !isNaN(v))
        const avgScore = scoreValues.length > 0 
          ? scoreValues.reduce((sum, val) => sum + val, 0) / scoreValues.length 
          : 0
          
        const proportion = avgScore > 0 ? (avg / avgScore) * 100 : 0
        
        return {
          group: group,
          average: avg,
          proportion: Math.min(proportion, 100) // Cap at 100% for display
        }
      })
      
      setFactorImpactData(impactData)
      
      // Simulate a shorter loading time
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    } catch (err) {
      console.error("Error processing data for factor analysis:", err)
      setError(err.message)
      setIsLoading(false)
    }
  }, [selectedFactor])

  const LoadingPlaceholder = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 text-sm">Loading visualization data...</p>
      <p className="text-gray-400 text-xs mt-1">Analyzing {selectedFactor} patterns</p>
    </div>
  )

  // Color handling functions
  const getColorScale = (min = 0, max = 10) => {
    return scaleLinear()
      .domain([min, min + (max - min) * 0.25, min + (max - min) * 0.5, min + (max - min) * 0.75, max])
      .range(["#053061", "#2166ac", "#92c5de", "#66bd63", "#1a9850"])  // Blue to green gradient
      .clamp(true);
  }
  
  const getNegativeColorScale = (min = 0, max = 1) => {
    return scaleLinear()
      .domain([min, min + (max - min) * 0.25, min + (max - min) * 0.5, min + (max - min) * 0.75, max])
      .range(["#1a9850", "#91cf60", "#fee08b", "#fc8d59", "#d73027"])  // Green to red gradient (inverted)
      .clamp(true);
  }
  
  // Get factor-specific color based on the selected factor
  const getFactorColor = (factor) => {
    const colorMap = {
      'GDP per Capita': '#3949ab', // Indigo
      'Social Support': '#00897b', // Teal
      'Life Expectancy': '#43a047', // Green
      'Freedom': '#7cb342', // Light Green
      'Generosity': '#ffb300', // Amber
      'Corruption': '#e53935'  // Red
    };
    return colorMap[factor] || '#3B82F6'; // Default to blue
  }
  
  // Prepare scatter plot data
  const getScatterPlotData = useCallback(() => {
    const factorKey = factorMap[selectedFactor]
    
    // Filter only valid data points and exclude those with null continent
    const validData = happinessData.filter(d => 
      d[factorKey] !== undefined && 
      d.score !== undefined && 
      !isNaN(d[factorKey]) && 
      !isNaN(d.score) &&
      d.continent && d.continent !== null // Exclude data points with null continent
    )
    
    // Create series by continent for better visualization
    const continentMap = {}
    validData.forEach(d => {
      if (!continentMap[d.continent]) {
        continentMap[d.continent] = []
      }
      continentMap[d.continent].push({
        x: d[factorKey],
        y: d.score,
        country: d.country,
        continent: d.continent,
        year: d.year,
        size: d.population > 50000 ? 12 : 
              d.population > 10000 ? 8 : 
              d.population > 1000 ? 6 : 4,
        population: d.population
      })
    })
    
    // Convert to array format for Nivo
    return Object.keys(continentMap).map(continent => ({
      id: continent,
      data: continentMap[continent]
    }))
  }, [selectedFactor, factorMap])
  
  // Custom tooltip for scatter plot
  const ScatterTooltip = ({ node }) => (
    <div
      className="bg-gray-800 text-white p-2 text-xs rounded shadow-lg"
      style={{ maxWidth: '200px' }}
    >
      <div className="font-bold">{node.data.country}</div>
      <div>{node.data.continent} ({node.data.year})</div>
      <div className="flex justify-between mt-1">
        <span>{selectedFactor}:</span> 
        <span className="font-medium">{node.data.x.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Happiness Score:</span> 
        <span className="font-medium">{node.data.y.toFixed(2)}</span>
      </div>
    </div>
  )
  
  // Prepare regional data for bar chart
  const getRegionalBarData = useCallback(() => {
    return factorRegionalData.map(d => ({
      continent: d.continent,
      value: d.value,
      color: getColorScale(0, Math.max(...factorRegionalData.map(r => r.value)))(d.value)
    }))
  }, [factorRegionalData, selectedFactor])
  
  // Prepare time trend data for line chart
  const getTimeLineData = useCallback(() => {
    // Define continent colors for consistent color scheme
    const continentColors = {
      'global': '#3B82F6', // Blue
      'europe': '#10B981', // Green
      'asia': '#8B5CF6',   // Purple
      'africa': '#F59E0B', // Amber
      'north_america': '#EC4899', // Pink
      'south_america': '#F97316', // Orange
      'oceania': '#06B6D4'  // Cyan
    };
    
    // Create data series for all available continents
    const availableSeries = ['global'];
    const continentKeys = ['europe', 'asia', 'africa', 'north_america', 'south_america', 'oceania'];
    
    // Only include continents that have data
    continentKeys.forEach(key => {
      if (factorTimeData.length > 0 && factorTimeData[0][key] !== undefined) {
        availableSeries.push(key);
      }
    });
    
    return availableSeries.map(key => ({
      id: key === 'global' ? 'Global' : 
          key === 'europe' ? 'Europe' : 
          key === 'asia' ? 'Asia' : 
          key === 'africa' ? 'Africa' :
          key === 'north_america' ? 'North America' :
          key === 'south_america' ? 'South America' :
          'Oceania',
      color: continentColors[key],
      data: factorTimeData.map(d => ({ 
        x: d.year, 
        y: d[key] 
      }))
    }));
  }, [factorTimeData])
  
  // Prepare development impact data for horizontal bars
  const getImpactBarData = useCallback(() => {
    return factorImpactData.map(d => ({
      group: d.group,
      value: d.proportion,
      color: "#3B82F6"
    }))
  }, [factorImpactData])
  
  // Custom tooltip for time trend
  const TimeTooltip = ({ point }) => (
    <div className="bg-gray-800 text-white p-2 text-xs rounded shadow-lg">
      <div className="font-bold">{point.serieId} - {point.data.x}</div>
      <div className="flex justify-between mt-1">
        <span>{selectedFactor}:</span> 
        <span className="font-medium">{point.data.y.toFixed(2)}</span>
      </div>
    </div>
  )

  if (error) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-red-600">
          <h2 className="text-xl font-bold mb-2">Error Loading Factor Analysis</h2>
          <p>{error}</p>
          <p className="mt-4 text-gray-600">Please check the console for more details.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <section className="section-container py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center">Happiness Factor Analysis</h1>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Explore the relationship between happiness scores and various contributing factors
            across different regions and time periods. Compare how each factor impacts overall happiness.
          </p>
        </motion.div>

        {/* Factor Selection - Moved above banner & redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-xl p-4 max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {factors.map(factor => (
                <button
                  key={factor}
                  onClick={() => setSelectedFactor(factor)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md ${
                    selectedFactor === factor
                      ? `${
                          factor === 'GDP per Capita' ? 'bg-indigo-500 text-white' :
                          factor === 'Social Support' ? 'bg-teal-500 text-white' :
                          factor === 'Life Expectancy' ? 'bg-green-500 text-white' :
                          factor === 'Freedom' ? 'bg-lightGreen-500 text-white' :
                          factor === 'Generosity' ? 'bg-amber-500 text-white' :
                          'bg-red-500 text-white'
                        } shadow-md ring-2 ring-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="flex items-center">
                    {factor === 'GDP per Capita' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {factor === 'Social Support' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    )}
                    {factor === 'Life Expectancy' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                    {factor === 'Freedom' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                    )}
                    {factor === 'Generosity' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    )}
                    {factor === 'Corruption' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    {factor}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Factor Summary Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-4 mb-8 text-white">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center mb-2 md:mb-0">
                {selectedFactor === 'GDP per Capita' && (
                  <div className="bg-white/20 p-2.5 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                {selectedFactor === 'Social Support' && (
                  <div className="bg-white/20 p-2.5 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
                {selectedFactor === 'Life Expectancy' && (
                  <div className="bg-white/20 p-2.5 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                )}
                {selectedFactor === 'Freedom' && (
                  <div className="bg-white/20 p-2.5 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                )}
                {selectedFactor === 'Generosity' && (
                  <div className="bg-white/20 p-2.5 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                )}
                {selectedFactor === 'Corruption' && (
                  <div className="bg-white/20 p-2.5 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                )}
                <h2 className="text-xl font-bold">{selectedFactor} Analysis</h2>
              </div>
              <div className="text-white flex items-center">
                <div className="mr-6">
                  <p className="text-xs opacity-80">Correlation with Happiness</p>
                  <p className="text-xl font-bold">{factorCorrelation}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xs opacity-80 mr-2">Significance</p>
                  {parseFloat(factorCorrelation) > 0.6 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Strong
                    </span>
                  ) : parseFloat(factorCorrelation) > 0.3 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                      </svg>
                      Moderate
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-800">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Weak
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Factor Definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8"
        >
          <div className={`bg-white shadow-md rounded-lg p-6 border-l-4 ${
            selectedFactor === 'GDP per Capita' ? 'border-indigo-500' :
            selectedFactor === 'Social Support' ? 'border-teal-500' :
            selectedFactor === 'Life Expectancy' ? 'border-green-500' :
            selectedFactor === 'Freedom' ? 'border-lightGreen-500' :
            selectedFactor === 'Generosity' ? 'border-amber-500' :
            'border-red-500'
          }`}>
            <div className="flex items-start">
              {selectedFactor === 'GDP per Capita' && (
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              {selectedFactor === 'Social Support' && (
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              )}
              {selectedFactor === 'Life Expectancy' && (
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              )}
              {selectedFactor === 'Freedom' && (
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
              )}
              {selectedFactor === 'Generosity' && (
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              )}
              {selectedFactor === 'Corruption' && (
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              )}
              <div>
                <h3 className={`text-lg font-medium mb-2 ${
                  selectedFactor === 'GDP per Capita' ? 'text-indigo-700' :
                  selectedFactor === 'Social Support' ? 'text-teal-700' :
                  selectedFactor === 'Life Expectancy' ? 'text-green-700' :
                  selectedFactor === 'Freedom' ? 'text-green-700' :
                  selectedFactor === 'Generosity' ? 'text-amber-700' :
                  'text-red-700'
                }`}>What is {selectedFactor}?</h3>
                <p className="text-gray-700 leading-relaxed">
                  {factorDescriptions[selectedFactor]}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Correlation Scatter Plot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Correlation with Happiness Score
            </h3>
            <div className="bg-gray-100 rounded-md h-80 mb-4 relative overflow-hidden">
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <ResponsiveScatterPlot
                  data={getScatterPlotData()}
                  margin={{ top: 20, right: 120, bottom: 50, left: 60 }}
                  xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                  blendMode="multiply"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: selectedFactor,
                    legendPosition: 'middle',
                    legendOffset: 40,
                    tickLine: { stroke: '#dddddd' }
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Happiness Score',
                    legendPosition: 'middle',
                    legendOffset: -50,
                    tickLine: { stroke: '#dddddd' }
                  }}
                  colors={{ scheme: 'category10' }}
                  nodeSize={({ data }) => data.size}
                  nodeBorderWidth={0.5}
                  nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
                  nodeOpacity={0.3}
                  enableGridX={true}
                  enableGridY={true}
                  gridXValues={5}
                  gridYValues={5}
                  gridOpacity={0.2}
                  isInteractive={true}
                  useMesh={true}
                  animate={true}
                  motionConfig="gentle"
                  legends={[
                    {
                      anchor: 'top-right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 5,
                      itemDirection: 'left-to-right',
                      itemWidth: 100,
                      itemHeight: 12,
                      itemOpacity: 0.8,
                      symbolSize: 10,
                      symbolShape: 'circle',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemOpacity: 1,
                            symbolSize: 12
                          }
                        }
                      ]
                    }
                  ]}
                  tooltip={({ node }) => (
                    <div className="bg-gray-800 text-white p-3 text-xs rounded-md shadow-xl"
                        style={{
                          position: 'relative',
                          transform: 'translate(-50%, -100%)',
                          maxWidth: '250px',
                          zIndex: 10
                        }}>
                      <div className="font-bold text-sm mb-1">{node.data.country}</div>
                      <div>{node.data.continent} ({node.data.year})</div>
                      <div className="flex justify-between mt-2 text-xs">
                        <span>{selectedFactor}:</span> 
                        <span className="font-medium">{node.data.x.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Happiness Score:</span> 
                        <span className="font-medium">{node.data.y.toFixed(2)}</span>
                      </div>
                      {node.data.population && (
                        <div className="flex justify-between text-xs">
                          <span>Population:</span> 
                          <span className="font-medium">{(node.data.population / 1000000).toFixed(1)} M</span>
                        </div>
                      )}
                      <div className="mt-2 pt-1 border-t border-gray-700 text-xs text-gray-300">
                        Bubble size represents population
                      </div>
                    </div>
                  )}
                  theme={{
                    tooltip: {
                      container: {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: 0
                      }
                    },
                    axis: {
                      legend: {
                        text: {
                          fontSize: 12,
                          fontWeight: 'bold',
                          fill: '#555555'
                        }
                      }
                    },
                    grid: {
                      line: {
                        stroke: '#dddddd',
                        strokeWidth: 1
                      }
                    }
                  }}
                  layers={["grid", "axes", "nodes", "markers", "mesh", "legends", "annotations"]}
                />
              )}
            </div>
            <p className="text-gray-600">
              This scatter plot shows the correlation between {selectedFactor.toLowerCase()} and
              overall happiness scores across countries. Each bubble represents a country, with
              size indicating population and colors showing different continents. The correlation coefficient is {factorCorrelation}.
            </p>
          </motion.div>

          {/* Regional Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Regional Comparison
            </h3>
            <div className="bg-gray-100 rounded-md h-80 mb-4 relative overflow-hidden">
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <ResponsiveBar
                  data={getRegionalBarData()}
                  keys={['value']}
                  indexBy="continent"
                  margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={({ data }) => data.color}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                  borderWidth={1}
                  borderRadius={2}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Continent',
                    legendPosition: 'middle',
                    legendOffset: 40,
                    tickLine: { stroke: '#dddddd' }
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: `${selectedFactor} Score`,
                    legendPosition: 'middle',
                    legendOffset: -50,
                    tickLine: { stroke: '#dddddd' }
                  }}
                  enableGridY={true}
                  gridYValues={5}
                  gridOpacity={0.15}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: 'color', modifiers: [['darker', 2.4]] }}
                  animate={true}
                  motionConfig="gentle"
                  tooltip={({ value, indexValue }) => (
                    <div className="bg-gray-800 text-white p-2 text-xs rounded shadow-lg">
                      <div className="font-bold">{indexValue}</div>
                      <div className="flex justify-between mt-1">
                        <span>{selectedFactor}:</span> 
                        <span className="font-medium">{value.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                  theme={{
                    tooltip: {
                      container: {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: 0
                      }
                    },
                    axis: {
                      legend: {
                        text: {
                          fontSize: 12,
                          fontWeight: 'bold',
                          fill: '#555555'
                        }
                      }
                    },
                    grid: {
                      line: {
                        stroke: '#dddddd',
                        strokeWidth: 1
                      }
                    }
                  }}
                />
              )}
            </div>
            <p className="text-gray-600">
              This bar chart compares {selectedFactor.toLowerCase()} across different continents,
              highlighting regional variations. {selectedFactor === 'Corruption' ? 'Higher values indicate lower corruption (better outcomes)' : 'Higher scores indicate better outcomes'} for this metric.
            </p>
          </motion.div>

          {/* Time Trend Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Trend Over Time (2015-2024)
            </h3>
            <div className="bg-gray-100 rounded-md h-80 mb-4 relative overflow-hidden">
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <ResponsiveLine
                  data={getTimeLineData()}
                  margin={{ top: 20, right: 120, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ 
                    type: 'linear', 
                    min: 'auto', 
                    max: 'auto',
                    stacked: false, 
                    reverse: false 
                  }}
                  curve="monotoneX"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Year',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    tickLine: { stroke: '#dddddd' }
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: `${selectedFactor} Score`,
                    legendOffset: -50,
                    legendPosition: 'middle',
                    tickLine: { stroke: '#dddddd' }
                  }}
                  enableGridY={true}
                  gridYValues={5}
                  gridOpacity={0.15}
                  colors={{ datum: 'color' }}
                  lineWidth={3}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  enableArea={true}
                  areaOpacity={0.1}
                  enableCrosshair={true}
                  crosshairType="bottom"
                  useMesh={true}
                  animate={true}
                  motionConfig="gentle"
                  legends={[
                    {
                      anchor: 'right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 8,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.8,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                          }
                        }
                      ]
                    }
                  ]}
                  tooltip={TimeTooltip}
                  theme={{
                    tooltip: {
                      container: {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: 0
                      }
                    },
                    axis: {
                      legend: {
                        text: {
                          fontSize: 12,
                          fontWeight: 'bold',
                          fill: '#555555'
                        }
                      }
                    },
                    grid: {
                      line: {
                        stroke: '#dddddd',
                        strokeWidth: 1
                      }
                    }
                  }}
                  enableSlices="x"
                />
              )}
            </div>
            <p className="text-gray-600">
              This line chart tracks {selectedFactor.toLowerCase()} trends over the past decade across all continents.
              {factorTimeData.length > 0 && (() => {
                // Find continents with most significant changes
                const firstYear = factorTimeData[0];
                const lastYear = factorTimeData[factorTimeData.length - 1];
                const continentKeys = ['europe', 'asia', 'africa', 'north_america', 'south_america', 'oceania'];
                
                let maxIncrease = { key: '', change: 0 };
                let maxDecrease = { key: '', change: 0 };
                
                continentKeys.forEach(key => {
                  if (firstYear[key] && lastYear[key]) {
                    const change = ((lastYear[key] - firstYear[key]) / firstYear[key]) * 100;
                    if (change > maxIncrease.change) {
                      maxIncrease = { key, change };
                    }
                    if (change < maxDecrease.change) {
                      maxDecrease = { key, change };
                    }
                  }
                });
                
                const formattedRegion = (key) => 
                  key === 'europe' ? 'Europe' : 
                  key === 'asia' ? 'Asia' : 
                  key === 'africa' ? 'Africa' :
                  key === 'north_america' ? 'North America' :
                  key === 'south_america' ? 'South America' :
                  'Oceania';
                
                if (maxIncrease.key && Math.abs(maxIncrease.change) > 5) {
                  return ` ${formattedRegion(maxIncrease.key)} shows the most improvement (+${maxIncrease.change.toFixed(1)}%)${maxDecrease.key ? `, while ${formattedRegion(maxDecrease.key)} shows the greatest decline (${maxDecrease.change.toFixed(1)}%)` : ''}.`;
                } else if (maxDecrease.key && Math.abs(maxDecrease.change) > 5) {
                  return ` ${formattedRegion(maxDecrease.key)} shows the greatest decline (${maxDecrease.change.toFixed(1)}%).`;
                } else {
                  return ' Most regions show relatively stable patterns over time.';
                }
              })()}
            </p>
          </motion.div>

          {/* Factor Impact Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Impact by Development Level
            </h3>
            <div className="bg-gray-100 rounded-md h-80 mb-4 relative overflow-hidden">
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <ResponsiveBar
                  data={getImpactBarData()}
                  keys={['value']}
                  indexBy="group"
                  margin={{ top: 20, right: 20, bottom: 50, left: 120 }}
                  padding={0.3}
                  layout="horizontal"
                  colors={({ data, index }) => {
                    // Create a gradient effect based on development level
                    const developmentColors = ['#3949ab', '#5e72e4', '#7795f8', '#9ebbff'];
                    return developmentColors[index];
                  }}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.6]] }}
                  borderWidth={1}
                  borderRadius={4}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Relative Importance (%)',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    tickLine: { stroke: '#dddddd' }
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Development Category',
                    legendPosition: 'middle',
                    legendOffset: -90,
                    tickLine: { stroke: '#dddddd' }
                  }}
                  enableGridX={true}
                  gridXValues={5}
                  gridOpacity={0.15}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor="#ffffff"
                  labelFormat={value => `${value.toFixed(1)}%`}
                  animate={true}
                  motionConfig="gentle"
                  tooltip={({ value, indexValue }) => (
                    <div className="bg-gray-800 text-white p-2 text-xs rounded shadow-lg">
                      <div className="font-bold">{indexValue}</div>
                      <div className="flex justify-between mt-1">
                        <span>Relative Importance:</span> 
                        <span className="font-medium">{value.toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                  theme={{
                    tooltip: {
                      container: {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: 0
                      }
                    },
                    axis: {
                      legend: {
                        text: {
                          fontSize: 12,
                          fontWeight: 'bold',
                          fill: '#555555'
                        }
                      }
                    },
                    grid: {
                      line: {
                        stroke: '#dddddd',
                        strokeWidth: 1
                      }
                    }
                  }}
                />
              )}
            </div>
            <p className="text-gray-600">
              This visualization shows how the contribution of {selectedFactor.toLowerCase()} to happiness
              varies across different development categories. 
              {factorImpactData.length > 0 && 
                (factorImpactData[0].proportion > factorImpactData[factorImpactData.length-1].proportion ? 
                  ` Note how this factor is more influential in ${factorImpactData[0].group} development countries compared to ${factorImpactData[factorImpactData.length-1].group} development countries.` : 
                  ` Note how this factor is more influential in ${factorImpactData[factorImpactData.length-1].group} development countries compared to ${factorImpactData[0].group} development countries.`)}
            </p>
          </motion.div>
        </div>

        {/* Key Findings - Enhanced with more beautiful design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Key Findings About {selectedFactor}</h2>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Finding cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Finding 1: Statistical Relationship */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    selectedFactor === 'GDP per Capita' ? 'bg-indigo-100 text-indigo-600' :
                    selectedFactor === 'Social Support' ? 'bg-teal-100 text-teal-600' :
                    selectedFactor === 'Life Expectancy' ? 'bg-green-100 text-green-600' :
                    selectedFactor === 'Freedom' ? 'bg-lightGreen-100 text-green-600' :
                    selectedFactor === 'Generosity' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Statistical Relationship</h4>
                </div>
                
                <div className="ml-13 pl-0">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 rounded-lg px-3 py-1 text-blue-700 font-semibold text-sm mr-2">
                      r = {factorCorrelation}
                    </div>
                    <div className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                      parseFloat(factorCorrelation) > 0.6 ? 'bg-green-50 text-green-700' : 
                      parseFloat(factorCorrelation) > 0.3 ? 'bg-yellow-50 text-yellow-700' : 
                      'bg-red-50 text-red-700'
                    }`}>
                      {parseFloat(factorCorrelation) > 0.6 ? 'Strong' : 
                       parseFloat(factorCorrelation) > 0.3 ? 'Moderate' : 
                       'Weak'} correlation
                    </div>
                  </div>
                  
                  {selectedFactor === 'GDP per Capita' && (
                    <p className="text-gray-600 leading-relaxed">
                      GDP per capita shows a strong correlation with happiness but exhibits 
                      <span className="font-medium"> diminishing returns</span>. Data reveals a logarithmic relationship where each additional $10,000 yields progressively smaller happiness gains beyond $40,000 per capita.
                    </p>
                  )}
                  {selectedFactor === 'Social Support' && (
                    <p className="text-gray-600 leading-relaxed">
                      Social support is among the most consistent predictors of happiness globally. Quantitative analysis shows that a 
                      <span className="font-medium"> 0.1-point increase in social support</span> correlates with a 0.3-0.5 point increase in happiness scores, regardless of economic development.
                    </p>
                  )}
                  {selectedFactor === 'Life Expectancy' && (
                    <p className="text-gray-600 leading-relaxed">
                      Health demonstrates a powerful correlation with happiness. Data analysis reveals that 
                      <span className="font-medium"> each additional year of healthy life expectancy</span> correlates with approximately a 0.029-point increase in happiness scores across nations.
                    </p>
                  )}
                  {selectedFactor === 'Freedom' && (
                    <p className="text-gray-600 leading-relaxed">
                      Freedom to make life choices shows a significant correlation with happiness. Statistical analysis reveals that freedom scores explain approximately 
                      <span className="font-medium"> {(parseFloat(factorCorrelation) * parseFloat(factorCorrelation) * 100).toFixed(1)}% of variation</span> in happiness levels globally, with particularly strong effects in democratic societies.
                    </p>
                  )}
                  {selectedFactor === 'Generosity' && (
                    <p className="text-gray-600 leading-relaxed">
                      Generosity exhibits a more modest correlation with national happiness. Data analysis shows that while generosity's direct effect appears limited, it has 
                      <span className="font-medium"> indirect benefits</span> through strengthening social capital and community resilience.
                    </p>
                  )}
                  {selectedFactor === 'Corruption' && (
                    <p className="text-gray-600 leading-relaxed">
                      Perception of corruption shows a significant correlation with happiness. Regression analysis indicates that each 
                      <span className="font-medium"> 0.1-point improvement</span> in corruption scores (indicating lower corruption) correlates with approximately a 0.2-0.3 point increase in happiness.
                    </p>
                  )}
                </div>
              </div>
              
              {/* Finding 2: Geographic Distribution */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    selectedFactor === 'GDP per Capita' ? 'bg-indigo-100 text-indigo-600' :
                    selectedFactor === 'Social Support' ? 'bg-teal-100 text-teal-600' :
                    selectedFactor === 'Life Expectancy' ? 'bg-green-100 text-green-600' :
                    selectedFactor === 'Freedom' ? 'bg-lightGreen-100 text-green-600' :
                    selectedFactor === 'Generosity' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Geographic Distribution</h4>
                </div>

                {factorRegionalData.length > 0 && (() => {
                  // Find highest and lowest regions
                  const sortedRegions = [...factorRegionalData].sort((a, b) => 
                    selectedFactor === 'Corruption' ? a.value - b.value : b.value - a.value
                  )
                  const highest = sortedRegions[0]
                  const lowest = sortedRegions[sortedRegions.length - 1]
                  const values = factorRegionalData.map(d => d.value)
                  const avg = values.reduce((sum, val) => sum + val, 0) / values.length
                  const highestDiff = (((highest.value - avg) / avg) * 100).toFixed(1)
                  const lowestDiff = (((lowest.value - avg) / avg) * 100).toFixed(1)
                  
                  return (
                    <div className="ml-13 pl-0">
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="bg-green-50 rounded-lg px-3 py-1 text-green-700 text-sm font-semibold flex items-center">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                          Highest: {highest.continent}
                        </div>
                        <div className="bg-red-50 rounded-lg px-3 py-1 text-red-700 text-sm font-semibold flex items-center">
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                          Lowest: {lowest.continent}
                        </div>
                        <div className="bg-gray-50 rounded-lg px-3 py-1 text-gray-700 text-sm font-semibold">
                          Gap: {Math.abs(highest.value - lowest.value).toFixed(2)} points
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        Regional data reveals significant disparities in {selectedFactor.toLowerCase()} levels. {highest.continent} leads with 
                        <span className="font-medium"> {highest.value.toFixed(2)} ({highestDiff}% above average)</span>, while {lowest.continent} records 
                        <span className="font-medium"> {lowest.value.toFixed(2)} ({Math.abs(parseFloat(lowestDiff))}% {parseFloat(lowestDiff) > 0 ? 'above' : 'below'} average)</span>. 
                        This gap highlights regional differences in
                        {selectedFactor === 'GDP per Capita' ? ' economic development.' : 
                         selectedFactor === 'Social Support' ? ' social structures and community support.' :
                         selectedFactor === 'Life Expectancy' ? ' healthcare infrastructure and public health policies.' :
                         selectedFactor === 'Freedom' ? ' political systems and civic freedoms.' :
                         selectedFactor === 'Generosity' ? ' cultural values and charitable behaviors.' :
                         ' governance quality and institutional frameworks.'}
                      </p>
                    </div>
                  )
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-t border-gray-200">
              {/* Finding 3: Temporal Trends */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    selectedFactor === 'GDP per Capita' ? 'bg-indigo-100 text-indigo-600' :
                    selectedFactor === 'Social Support' ? 'bg-teal-100 text-teal-600' :
                    selectedFactor === 'Life Expectancy' ? 'bg-green-100 text-green-600' :
                    selectedFactor === 'Freedom' ? 'bg-lightGreen-100 text-green-600' :
                    selectedFactor === 'Generosity' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Temporal Trends</h4>
                </div>
                
                {factorTimeData.length > 1 && (() => {
                  const firstYear = factorTimeData[0];
                  const lastYear = factorTimeData[factorTimeData.length - 1];
                  const globalChange = ((lastYear.global - firstYear.global) / firstYear.global) * 100;
                  
                  const continentKeys = ['europe', 'asia', 'africa', 'north_america', 'south_america', 'oceania'];
                  let maxIncrease = { key: '', change: 0 };
                  let maxDecrease = { key: '', change: 0 };
                  
                  continentKeys.forEach(key => {
                    if (firstYear[key] && lastYear[key]) {
                      const change = ((lastYear[key] - firstYear[key]) / firstYear[key]) * 100;
                      if (change > maxIncrease.change) {
                        maxIncrease = { key, change };
                      }
                      if (change < maxDecrease.change) {
                        maxDecrease = { key, change };
                      }
                    }
                  });
                  
                  const formattedRegion = (key) => 
                    key === 'europe' ? 'Europe' : 
                    key === 'asia' ? 'Asia' : 
                    key === 'africa' ? 'Africa' :
                    key === 'north_america' ? 'North America' :
                    key === 'south_america' ? 'South America' :
                    'Oceania';
                  
                  return (
                    <div className="ml-13 pl-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className={`rounded-lg px-3 py-1 text-sm font-semibold ${
                          Math.abs(globalChange) < 5 ? 'bg-gray-50 text-gray-700' : 
                          globalChange > 0 ? 'bg-green-50 text-green-700' : 
                          'bg-red-50 text-red-700'
                        }`}>
                          Global: {Math.abs(globalChange) < 5 ? 'Stable' : 
                                  globalChange > 0 ? `+${globalChange.toFixed(1)}%` : 
                                  `${globalChange.toFixed(1)}%`}
                        </div>
                        
                        {maxIncrease.key && Math.abs(maxIncrease.change) > 5 && (
                          <div className="bg-green-50 rounded-lg px-3 py-1 text-green-700 text-sm font-semibold">
                            ↑ {formattedRegion(maxIncrease.key)}: +{maxIncrease.change.toFixed(1)}%
                          </div>
                        )}
                        
                        {maxDecrease.key && Math.abs(maxDecrease.change) > 5 && (
                          <div className="bg-red-50 rounded-lg px-3 py-1 text-red-700 text-sm font-semibold">
                            ↓ {formattedRegion(maxDecrease.key)}: {maxDecrease.change.toFixed(1)}%
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        Time series analysis (2015-2024) shows that global {selectedFactor.toLowerCase()} has
                        <span className="font-medium"> {
                          Math.abs(globalChange) < 5 ? 'remained relatively stable' : 
                          globalChange > 0 ? `increased by ${globalChange.toFixed(1)}%` : 
                          `decreased by ${Math.abs(globalChange).toFixed(1)}%`
                        }</span>.
                        {(maxIncrease.key && Math.abs(maxIncrease.change) > 5) || (maxDecrease.key && Math.abs(maxDecrease.change) > 5) ? 
                          ` Regional variations are significant, with` : 
                          ''
                        }
                        {maxIncrease.key && Math.abs(maxIncrease.change) > 5 ?
                          ` notable improvements in ${formattedRegion(maxIncrease.key)}` : 
                          ''
                        }
                        {maxDecrease.key && Math.abs(maxDecrease.change) > 5 ? 
                          `${maxIncrease.key && Math.abs(maxIncrease.change) > 5 ? ' and' : ''} declines in ${formattedRegion(maxDecrease.key)}` : 
                          ''
                        }.
                      </p>
                    </div>
                  )
                })()}
              </div>
              
              {/* Finding 4: Development Context */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    selectedFactor === 'GDP per Capita' ? 'bg-indigo-100 text-indigo-600' :
                    selectedFactor === 'Social Support' ? 'bg-teal-100 text-teal-600' :
                    selectedFactor === 'Life Expectancy' ? 'bg-green-100 text-green-600' :
                    selectedFactor === 'Freedom' ? 'bg-lightGreen-100 text-green-600' :
                    selectedFactor === 'Generosity' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">Development Context</h4>
                </div>
                
                {factorImpactData.length > 0 && (() => {
                  // Analyze by development category
                  const veryHigh = factorImpactData.find(d => d.group === 'Very High')
                  const high = factorImpactData.find(d => d.group === 'High')
                  const medium = factorImpactData.find(d => d.group === 'Medium')
                  const low = factorImpactData.find(d => d.group === 'Low')
                  
                  let trend = '';
                  if (veryHigh && high && medium && low) {
                    const values = [veryHigh.proportion, high.proportion, medium.proportion, low.proportion];
                    // Check if values mostly increase or decrease as development increases
                    let increases = 0;
                    let decreases = 0;
                    for (let i = 0; i < values.length - 1; i++) {
                      if (values[i] > values[i+1]) increases++;
                      else if (values[i] < values[i+1]) decreases++;
                    }
                    
                    if (increases > decreases) {
                      trend = 'decreases as development level decreases';
                    } else if (decreases > increases) {
                      trend = 'increases as development level decreases';
                    } else {
                      trend = 'shows a non-linear relationship with development level';
                    }
                  }
                  
                  if (veryHigh && low) {
                    const difference = Math.abs(veryHigh.proportion - low.proportion).toFixed(1)
                    const higherIn = veryHigh.proportion > low.proportion ? 'very high' : 'low'
                    
                    return (
                      <div className="ml-13 pl-0">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <div className="bg-blue-50 rounded-lg px-3 py-1 text-blue-700 text-sm font-semibold whitespace-nowrap">
                            Difference: {difference}%
                          </div>
                          <div className="bg-purple-50 rounded-lg px-3 py-1 text-purple-700 text-sm font-semibold whitespace-nowrap">
                            Higher in: {higherIn} development
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed">
                          Analysis across development categories reveals that {selectedFactor.toLowerCase()}'s contribution to happiness 
                          <span className="font-medium"> {trend}</span>. Data shows a 
                          <span className="font-medium"> {difference}% difference</span> between very high and low development countries.
                          {selectedFactor === 'GDP per Capita' ? ' Once basic economic needs are met, other factors become increasingly important for well-being.' : 
                           selectedFactor === 'Social Support' ? ' Support systems remain vital regardless of economic development, though their character may change with prosperity.' :
                           selectedFactor === 'Life Expectancy' ? ' Healthcare priorities shift as nations develop, with basic health becoming a baseline expectation in advanced economies.' :
                           selectedFactor === 'Freedom' ? ' Perceptions of freedom and autonomy vary widely across development contexts and cultural frameworks.' :
                           selectedFactor === 'Generosity' ? ' Prosocial behaviors are differently motivated based on resource availability and cultural norms.' :
                           ' Governance quality becomes increasingly essential as societies develop more complex institutional structures.'}
                        </p>
                      </div>
                    )
                  } else {
                    return (
                      <div className="ml-13 pl-0">
                        <p className="text-gray-600">
                          Countries with balanced development across all happiness factors tend to show more consistent happiness scores over time.
                        </p>
                      </div>
                    )
                  }
                })()}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default FactorAnalysis