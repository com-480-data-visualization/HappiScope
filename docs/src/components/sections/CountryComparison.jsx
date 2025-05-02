import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import happinessData from '../../data/happiness_data.json'

const CountryComparison = () => {
  const [selectedCountries, setSelectedCountries] = useState(['Finland', 'Denmark', 'United States of America', 'Switzerland'])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // Generate a list of all available countries from the data
  const availableCountries = useMemo(() => {
    const uniqueCountries = [...new Set(happinessData.map(d => d.country))].sort()
    return uniqueCountries
  }, [])

  // Create colors for each country
  const countryColors = [
    '#4F46E5', // indigo
    '#10B981', // emerald
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6'  // purple
  ]
  
  // Prepare time series data for the selected countries
  const timeSeriesData = useMemo(() => {
    if (selectedCountries.length === 0) return []
    
    // Get all years
    const years = [...new Set(happinessData.map(d => d.year))].sort()
    
    return years.map(year => {
      const dataForYear = { year }
      
      selectedCountries.forEach(country => {
        const countryData = happinessData.find(d => d.country === country && d.year === year)
        dataForYear[country] = countryData?.score || null
      })
      
      return dataForYear
    })
  }, [selectedCountries])
  
  // Prepare radar chart data for selected countries
  const radarData = useMemo(() => {
    if (selectedCountries.length === 0) return []
    
    const latestYear = Math.max(...happinessData.map(d => d.year))
    
    // Define the factors to include in the radar chart
    const factors = [
      { key: 'gdp_per_capita', name: 'GDP' },
      { key: 'social_support', name: 'Social Support' },
      { key: 'life_expectancy', name: 'Health' },
      { key: 'freedom', name: 'Freedom' },
      { key: 'generosity', name: 'Generosity' },
      { key: 'corruption', name: 'Trust' }
    ]
    
    // For each factor, create a data point with values for each country
    return factors.map(factor => {
      const dataPoint = { factor: factor.name }
      
      selectedCountries.forEach(country => {
        const countryData = happinessData.find(d => 
          d.country === country && d.year === latestYear
        )
        // Scale all values to 0-100 range for better radar visualization
        // Most happiness factors are in 0-2 range in the data
        dataPoint[country] = countryData?.[factor.key] 
          ? Math.min(100, countryData[factor.key] * 50)
          : 0
      })
      
      return dataPoint
    })
  }, [selectedCountries])
  
  // Prepare table data for selected countries
  const tableData = useMemo(() => {
    if (selectedCountries.length === 0) return []
    
    const latestYear = Math.max(...happinessData.map(d => d.year))
    
    return selectedCountries.map(country => {
      const countryData = happinessData.find(d => 
        d.country === country && d.year === latestYear
      ) || {}
      
      return {
        country,
        score: countryData.score,
        gdp_per_capita: countryData.gdp_per_capita,
        social_support: countryData.social_support,
        life_expectancy: countryData.life_expectancy,
        freedom: countryData.freedom,
        generosity: countryData.generosity,
        corruption: countryData.corruption,
        rank: countryData.rank || '-'
      }
    })
  }, [selectedCountries])
  
  // Simulate loading delay for data preparation
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [selectedCountries])
  
  const handleCountryToggle = (country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country))
    } else if (selectedCountries.length < 5) {
      setSelectedCountries([...selectedCountries, country])
    }
  }
  
  const filteredCountries = availableCountries
    .filter(country => !selectedCountries.includes(country))
    .filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
  
  const LoadingPlaceholder = () => (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-gray-500 text-sm">Loading comparison data...</p>
    </div>
  )

  // Custom tooltip for the line chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-gray-800">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value?.toFixed(2) || 'No data'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-background min-h-screen">
      <section className="section-container py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title text-center"
        >
          Country Comparison
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
        >
          Compare happiness metrics between countries to uncover unique patterns and insights across different regions and cultures.
        </motion.p>
        
        {/* Country Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Select Countries to Compare (max 5):</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCountries.map((country, index) => (
                <button
                  key={country}
                  onClick={() => handleCountryToggle(country)}
                  className="px-4 py-2 rounded-md text-white font-medium flex items-center shadow-md hover:opacity-90 transition duration-200"
                  style={{ backgroundColor: countryColors[index % countryColors.length] }}
                >
                  {country} 
                  <span className="ml-2 bg-white bg-opacity-20 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ×
                  </span>
                </button>
              ))}
              {selectedCountries.length === 0 && (
                <p className="text-sm text-gray-500 italic">No countries selected. Please select at least one country below.</p>
              )}
            </div>
            
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search for a country..."
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                {filteredCountries.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
                    {filteredCountries.map(country => (
                      <button
                        key={country}
                        onClick={() => handleCountryToggle(country)}
                        className={`px-3 py-2 text-left text-sm rounded-md hover:bg-gray-100 transition duration-200 ${
                          selectedCountries.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={selectedCountries.length >= 5}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {searchTerm ? "No countries match your search" : "No more countries available to select"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Comparison Visualizations */}
        {selectedCountries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Happiness Score Comparison */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white shadow-md rounded-lg p-6 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Happiness Score Comparison (2015-2024)</h3>
              <div className="bg-gray-50 rounded-md h-80 flex items-center justify-center mb-4 overflow-hidden relative">
                {isLoading ? (
                  <LoadingPlaceholder />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timeSeriesData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="year" 
                        label={{ 
                          value: 'Year', 
                          position: 'insideBottomRight', 
                          offset: -10 
                        }} 
                      />
                      <YAxis 
                        domain={[3, 8]} 
                        label={{ 
                          value: 'Happiness Score', 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { textAnchor: 'middle' }
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      {selectedCountries.map((country, index) => (
                        <Line
                          key={country}
                          type="monotone"
                          dataKey={country}
                          stroke={countryColors[index % countryColors.length]}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          connectNulls
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
              <p className="text-gray-600 text-sm">
                This chart shows how happiness scores have changed over time for the selected countries,
                allowing you to compare trends and identify diverging or converging patterns. Notice how Nordic 
                countries consistently maintain higher happiness levels, while others show more variation.
              </p>
            </motion.div>
            
            {/* Factor Breakdown */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white shadow-md rounded-lg p-6 mb-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Factor Breakdown (2024)</h3>
              <div className="bg-gray-50 rounded-md h-80 flex items-center justify-center mb-4 overflow-hidden relative">
                {isLoading ? (
                  <LoadingPlaceholder />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius="70%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="factor" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      {selectedCountries.map((country, index) => (
                        <Radar
                          key={country}
                          name={country}
                          dataKey={country}
                          stroke={countryColors[index % countryColors.length]}
                          fill={countryColors[index % countryColors.length]}
                          fillOpacity={0.2}
                        />
                      ))}
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <p className="text-gray-600 text-sm">
                This radar chart compares the six main factors that contribute to happiness across
                the selected countries, highlighting their relative strengths and weaknesses. Nordic countries typically
                show balanced performance across all factors, while other regions may have more uneven profiles.
              </p>
            </motion.div>
            
            {/* Detailed Metrics Comparison */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Detailed Metrics (2024)</h3>
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left text-gray-700">Metric</th>
                        {selectedCountries.map((country, index) => (
                          <th key={country} className="p-3 text-left text-gray-700">
                            <span className="inline-block w-2 h-2 rounded-full mr-2" 
                                  style={{backgroundColor: countryColors[index % countryColors.length]}}></span>
                            {country}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Happiness Score</td>
                        {tableData.map((country) => (
                          <td key={country.country} className="p-3 border-t text-gray-600">
                            {country.score?.toFixed(2) || 'N/A'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">GDP per Capita</td>
                        {tableData.map((country) => (
                          <td key={country.country} className="p-3 border-t text-gray-600">
                            {country.gdp_per_capita?.toFixed(2) || 'N/A'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Social Support</td>
                        {tableData.map((country) => (
                          <td key={country.country} className="p-3 border-t text-gray-600">
                            {country.social_support?.toFixed(2) || 'N/A'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Life Expectancy</td>
                        {tableData.map((country) => (
                          <td key={country.country} className="p-3 border-t text-gray-600">
                            {country.life_expectancy?.toFixed(2) || 'N/A'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Freedom</td>
                        {tableData.map((country) => (
                          <td key={country.country} className="p-3 border-t text-gray-600">
                            {country.freedom?.toFixed(2) || 'N/A'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Generosity</td>
                        {tableData.map((country) => (
                          <td key={country.country} className="p-3 border-t text-gray-600">
                            {country.generosity?.toFixed(2) || 'N/A'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Trust (Low Corruption)</td>
                        {tableData.map((country) => (
                          <td key={country.country} className="p-3 border-t text-gray-600">
                            {country.corruption?.toFixed(2) || 'N/A'}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <p className="text-gray-600 mt-4 text-sm">
                This table provides a detailed breakdown of all happiness factors for each selected country.
                Data shown is for the most recent year (2024). All scores are normalized for comparison.
              </p>
            </motion.div>
            
            {/* Key Findings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 bg-white shadow-md rounded-lg p-6 border-l-4 border-primary"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Key Comparison Insights</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Nordic countries consistently rank highest in happiness scores, with a balanced performance across all contributing factors.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>While some countries may excel in economic metrics (GDP), they often lag in social support or freedom factors, resulting in lower overall happiness.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Happiness trends over time show most variation during global events like the 2020 pandemic, with some countries demonstrating greater resilience than others.</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
        
        {selectedCountries.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-600 mb-4">
              Please select at least one country to display comparison visualizations.
            </p>
            <p className="text-sm text-gray-500">
              You can select up to 5 countries to compare their happiness metrics across different dimensions.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default CountryComparison