import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import happinessData from '../../data/happiness_data.json'

const CountryComparison = () => {
  const [selectedCountries, setSelectedCountries] = useState(['Finland', 'United States of America', 'Switzerland', 'China'])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
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
    
    // Get all countries for the latest year to find maximum values
    const allCountriesForYear = happinessData.filter(d => d.year === latestYear)
    
    // Find maximum values for each factor to normalize
    const maxValues = {
      gdp_per_capita: Math.max(...allCountriesForYear.map(d => d.gdp_per_capita || 0)),
      social_support: Math.max(...allCountriesForYear.map(d => d.social_support || 0)),
      life_expectancy: Math.max(...allCountriesForYear.map(d => d.life_expectancy || 0)),
      freedom: Math.max(...allCountriesForYear.map(d => d.freedom || 0)),
      generosity: Math.max(...allCountriesForYear.map(d => d.generosity || 0)),
      corruption: Math.max(...allCountriesForYear.map(d => d.corruption || 0))
    }
    
    // Define the factors to include in the radar chart
    const factors = [
      { key: 'gdp_per_capita', name: 'GDP' },
      { key: 'social_support', name: 'Social Support' },
      { key: 'life_expectancy', name: 'Health' },
      { key: 'freedom', name: 'Freedom' },
      { key: 'generosity', name: 'Generosity' },
      { key: 'corruption', name: 'Trust' }
    ]
    
    // For each factor, create a data point with normalized values for each country
    return factors.map(factor => {
      const dataPoint = { factor: factor.name }
      
      selectedCountries.forEach(country => {
        const countryData = happinessData.find(d => 
          d.country === country && d.year === latestYear
        )
        
        // Normalize values to 0-100 range based on maximum value for that factor
        if (countryData && countryData[factor.key] && maxValues[factor.key]) {
          dataPoint[country] = (countryData[factor.key] / maxValues[factor.key]) * 100
        } else {
          dataPoint[country] = 0
        }
      })
      
      return dataPoint
    })
  }, [selectedCountries])
  
  // Prepare table data for selected countries with normalized values
  const tableData = useMemo(() => {
    if (selectedCountries.length === 0) return []
    
    const latestYear = Math.max(...happinessData.map(d => d.year))
    
    // Get all countries for the latest year to calculate ranks and find max values
    const allCountriesForYear = happinessData.filter(d => d.year === latestYear)
    
    // Sort by happiness score to determine ranks
    const rankedData = [...allCountriesForYear]
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .map((countryData, index) => ({
        ...countryData,
        calculatedRank: index + 1
      }))
    
    // Find maximum values for each metric to normalize the display
    const maxValues = {
      score: Math.max(...allCountriesForYear.map(d => d.score || 0)),
      gdp_per_capita: Math.max(...allCountriesForYear.map(d => d.gdp_per_capita || 0)),
      social_support: Math.max(...allCountriesForYear.map(d => d.social_support || 0)),
      life_expectancy: Math.max(...allCountriesForYear.map(d => d.life_expectancy || 0)),
      freedom: Math.max(...allCountriesForYear.map(d => d.freedom || 0)),
      generosity: Math.max(...allCountriesForYear.map(d => d.generosity || 0)),
      corruption: Math.max(...allCountriesForYear.map(d => d.corruption || 0))
    }
    
    return selectedCountries.map(country => {
      const countryData = rankedData.find(d => d.country === country) || {}
      
      return {
        country,
        score: countryData.score,
        gdp_per_capita: countryData.gdp_per_capita,
        social_support: countryData.social_support,
        life_expectancy: countryData.life_expectancy,
        freedom: countryData.freedom,
        generosity: countryData.generosity,
        corruption: countryData.corruption,
        rank: countryData.calculatedRank || '-',
        // Add normalized values (as percentages) for visualization
        normalizedValues: {
          score: maxValues.score ? (countryData.score || 0) / maxValues.score * 100 : 0,
          gdp_per_capita: maxValues.gdp_per_capita ? (countryData.gdp_per_capita || 0) / maxValues.gdp_per_capita * 100 : 0,
          social_support: maxValues.social_support ? (countryData.social_support || 0) / maxValues.social_support * 100 : 0,
          life_expectancy: maxValues.life_expectancy ? (countryData.life_expectancy || 0) / maxValues.life_expectancy * 100 : 0,
          freedom: maxValues.freedom ? (countryData.freedom || 0) / maxValues.freedom * 100 : 0,
          generosity: maxValues.generosity ? (countryData.generosity || 0) / maxValues.generosity * 100 : 0,
          corruption: maxValues.corruption ? (countryData.corruption || 0) / maxValues.corruption * 100 : 0
        }
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
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 text-sm">Loading comparison data...</p>
      <p className="text-gray-400 text-xs mt-1">Analyzing country patterns</p>
    </div>
  )

  // Custom tooltip for the line chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-3 text-xs rounded-md shadow-xl">
          <div className="font-bold text-sm mb-1">Year: {label}</div>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between gap-4 mt-1">
              <span style={{ color: entry.color }}>{entry.name}:</span> 
              <span className="font-medium">{entry.value?.toFixed(2) || 'No data'}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Custom tooltip for the radar chart
  const RadarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-3 text-xs rounded-md shadow-xl">
          <div className="font-bold text-sm mb-1">{payload[0].payload.factor}</div>
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between gap-4 mt-1">
              <span style={{ color: entry.color }}>{entry.name}:</span> 
              <span className="font-medium">{(entry.value / 50).toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-background min-h-screen">
      <section className="section-container py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center">Country Comparison</h1>
          <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Compare happiness metrics between countries to uncover unique patterns and insights across different regions and cultures.
          </p>
        </motion.div>
        
        {/* Country Selection - Redesigned with smart dropdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-xl p-5 max-w-5xl mx-auto border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {selectedCountries.map((country, index) => (
                <button
                  key={country}
                  onClick={() => handleCountryToggle(country)}
                  className="px-3 py-1.5 rounded-full text-white font-medium flex items-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  style={{ backgroundColor: countryColors[index % countryColors.length] }}
                >
                  {country} 
                  <span className="ml-2 bg-white bg-opacity-20 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ×
                  </span>
                </button>
              ))}
              {selectedCountries.length === 0 && (
                <p className="text-sm text-gray-500 italic">No countries selected. Please select countries below.</p>
              )}
            </div>
            
            {/* Smart Dropdown Country Selector */}
            <div className="relative z-10">
              <div className="flex items-center border border-gray-200 rounded-lg bg-white/80 pr-2">
                <input
                  type="text"
                  placeholder="Search for a country..."
                  className="w-full p-2.5 pl-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-transparent flex-grow"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                />
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>{selectedCountries.length}</span>
                  <span>/</span>
                  <span>5</span>
                </div>
              </div>
              
              {isDropdownOpen && (
                <>
                  <div 
                    className="absolute w-full mt-1 max-h-60 overflow-y-auto border border-gray-200 rounded-lg shadow-lg bg-white"
                  >
                    {filteredCountries.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5 p-1">
                        {filteredCountries.map(country => (
                          <button
                            key={country}
                            onClick={() => {
                              handleCountryToggle(country);
                              // Keep dropdown open unless we're at the limit
                              if (selectedCountries.length >= 4) {
                                setIsDropdownOpen(false);
                              }
                            }}
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
                  <div 
                    onClick={() => setIsDropdownOpen(false)}
                    className="fixed inset-0 bg-transparent z-0" 
                  />
                </>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Summary Banner - New Addition */}
        {selectedCountries.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-4 text-white">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                  <div className="bg-white/20 p-2.5 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold">Comparing {selectedCountries.length} {selectedCountries.length === 1 ? 'Country' : 'Countries'}</h2>
                </div>
                
                <div className="text-white flex items-center">
                  {tableData.length > 0 && (
                    <div>
                      <p className="text-xs opacity-80">Highest Ranked</p>
                      <p className="text-xl font-bold">{tableData.sort((a, b) => (a.rank === '-' ? 999 : a.rank) - (b.rank === '-' ? 999 : b.rank))[0]?.country}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Comparison Visualizations */}
        {selectedCountries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Visualization Grid - 2 column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Happiness Score Comparison */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Happiness Score Trends (2015-2024)</h3>
                <div className="bg-gray-100 rounded-md h-80 mb-4 relative overflow-hidden shadow-inner">
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
                            strokeWidth={2.5}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 7, strokeWidth: 1 }}
                            connectNulls
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <p className="text-gray-600">
                  This chart shows how happiness scores have changed over time for the selected countries.
                  {selectedCountries.length > 1 ? " Notice how trends converge or diverge at different historical periods." : " Track how this country's happiness has evolved over the past decade."}
                </p>
              </motion.div>
              
              {/* Factor Breakdown */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Factor Comparison (2024)</h3>
                <div className="bg-gray-100 rounded-md h-80 mb-4 relative overflow-hidden shadow-inner">
                  {isLoading ? (
                    <LoadingPlaceholder />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius="70%" data={radarData}>
                        <PolarGrid gridType="polygon" />
                        <PolarAngleAxis dataKey="factor" tick={{ fill: '#4B5563', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} />
                        {selectedCountries.map((country, index) => (
                          <Radar
                            key={country}
                            name={country}
                            dataKey={country}
                            stroke={countryColors[index % countryColors.length]}
                            fill={countryColors[index % countryColors.length]}
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                        ))}
                        <Legend formatter={(value) => <span style={{ color: '#4B5563', fontSize: 12 }}>{value}</span>} />
                        <Tooltip content={<RadarTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <p className="text-gray-600">
                  This radar chart compares the six main happiness factors across 
                  {selectedCountries.length > 1 ? " the selected countries" : " this country"}, 
                  highlighting {selectedCountries.length > 1 ? "their" : "its"} relative strengths and weaknesses. Factors closer to the outer edge represent higher scores.
                </p>
              </motion.div>
            </div>
            
            {/* Detailed Metrics Comparison - Beautiful Table */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 bg-white shadow-md rounded-lg p-6 overflow-hidden"
            >
              <h3 className="text-xl font-semibold mb-4">Country Metrics Comparison (2024)</h3>
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                        {selectedCountries.map((country, index) => (
                          <th key={country} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center">
                              <span className="inline-block w-3 h-3 rounded-full mr-2" 
                                    style={{backgroundColor: countryColors[index % countryColors.length]}}></span>
                              {country}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Global Rank</td>
                        {tableData.map((country) => (
                          <td key={`${country.country}-rank`} className="px-6 py-4 whitespace-nowrap">
                            {country.rank !== '-' ? (
                              <div className="flex items-center">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                                  #{country.rank}
                                </span>
                                {country.rank <= 10 && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                )}
                              </div>
                            ) : 'N/A'}
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Happiness Score</td>
                        {tableData.map((country, index) => (
                          <td key={`${country.country}-score`} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div 
                                  className="h-2.5 rounded-full" 
                                  style={{
                                    width: `${country.normalizedValues.score}%`,
                                    backgroundColor: countryColors[index % countryColors.length]
                                  }}
                                ></div>
                              </div>
                              <span className="text-gray-600">{country.score?.toFixed(2) || 'N/A'}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">GDP per Capita</td>
                        {tableData.map((country) => (
                          <td key={`${country.country}-gdp`} className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="h-2 rounded-full bg-blue-400" 
                                  style={{width: `${country.normalizedValues.gdp_per_capita}%`}}
                                ></div>
                              </div>
                              <span>{country.gdp_per_capita?.toFixed(3) || 'N/A'}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Social Support</td>
                        {tableData.map((country) => (
                          <td key={`${country.country}-support`} className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="h-2 rounded-full bg-green-400" 
                                  style={{width: `${country.normalizedValues.social_support}%`}}
                                ></div>
                              </div>
                              <span>{country.social_support?.toFixed(3) || 'N/A'}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Life Expectancy</td>
                        {tableData.map((country) => (
                          <td key={`${country.country}-life`} className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="h-2 rounded-full bg-purple-400" 
                                  style={{width: `${country.normalizedValues.life_expectancy}%`}}
                                ></div>
                              </div>
                              <span>{country.life_expectancy?.toFixed(3) || 'N/A'}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Freedom</td>
                        {tableData.map((country) => (
                          <td key={`${country.country}-freedom`} className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="h-2 rounded-full bg-indigo-400" 
                                  style={{width: `${country.normalizedValues.freedom}%`}}
                                ></div>
                              </div>
                              <span>{country.freedom?.toFixed(3) || 'N/A'}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Generosity</td>
                        {tableData.map((country, index) => (
                          <td key={`${country.country}-generosity`} className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="h-2 rounded-full bg-amber-400" 
                                  style={{width: `${country.normalizedValues.generosity}%`}}
                                ></div>
                              </div>
                              <span>{country.generosity?.toFixed(3) || 'N/A'}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">Trust (Low Corruption)</td>
                        {tableData.map((country) => (
                          <td key={`${country.country}-corruption`} className="px-6 py-4 whitespace-nowrap text-gray-600">
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="h-2 rounded-full bg-red-400" 
                                  style={{width: `${country.normalizedValues.corruption}%`}}
                                ></div>
                              </div>
                              <span>{country.corruption?.toFixed(3) || 'N/A'}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <p className="text-gray-600 mt-4">
                This table provides detailed metrics for {selectedCountries.length > 1 ? "all selected countries" : "the selected country"}.
                Data shown is for the most recent year (2024). Higher values indicate better outcomes for all metrics.
              </p>
            </motion.div>
            
            {/* Key Insights - Card Grid Layout */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center">Key Comparison Insights</h2>
              
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                  {/* Insight 1: Happiness Leaders */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">Happiness Leaders</h4>
                    </div>
                    
                    <div className="ml-13 pl-0">
                      <p className="text-gray-600 leading-relaxed">
                        {selectedCountries.length > 1 ? (
                          <>
                            Nordic countries consistently rank highest in happiness scores, with a balanced performance across all contributing factors. 
                            <span className="font-medium"> {tableData.sort((a, b) => (b.score || 0) - (a.score || 0))[0]?.country}</span> leads 
                            with a happiness score of <span className="font-medium">{tableData.sort((a, b) => (b.score || 0) - (a.score || 0))[0]?.score?.toFixed(2)}</span>.
                          </>
                        ) : (
                          <>
                            {tableData[0]?.country} is currently ranked <span className="font-medium">#{tableData[0]?.rank}</span> globally with a happiness 
                            score of <span className="font-medium">{tableData[0]?.score?.toFixed(2)}</span>. 
                            This {tableData[0]?.rank <= 20 ? 'places it among the happiest countries in the world' : 'suggests opportunities for improvement in national wellbeing'}.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {/* Insight 2: Factor Balance */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">Factor Balance</h4>
                    </div>

                    <div className="ml-13 pl-0">
                      <p className="text-gray-600 leading-relaxed">
                        {selectedCountries.length > 1 ? (
                          <>
                            Countries with the highest happiness scores typically show balance across all factors.
                            While some nations excel in economic metrics (GDP), they often lag in social support or 
                            freedom factors. <span className="font-medium">Trust</span> shows the widest variation 
                            among the selected countries.
                          </>
                        ) : (
                          <>
                            {tableData[0]?.country}'s strongest happiness factor is 
                            <span className="font-medium"> {
                              ['gdp_per_capita', 'social_support', 'life_expectancy', 'freedom', 'generosity', 'corruption']
                                .sort((a, b) => (tableData[0]?.[b] || 0) - (tableData[0]?.[a] || 0))[0]
                                .replace('gdp_per_capita', 'GDP per Capita')
                                .replace('social_support', 'Social Support')
                                .replace('life_expectancy', 'Life Expectancy')
                                .replace('corruption', 'Trust (Low Corruption)')
                            }</span>, 
                            while its most significant opportunity area is
                            <span className="font-medium"> {
                              ['gdp_per_capita', 'social_support', 'life_expectancy', 'freedom', 'generosity', 'corruption']
                                .sort((a, b) => (tableData[0]?.[a] || 0) - (tableData[0]?.[b] || 0))[0]
                                .replace('gdp_per_capita', 'GDP per Capita')
                                .replace('social_support', 'Social Support')
                                .replace('life_expectancy', 'Life Expectancy')
                                .replace('corruption', 'Trust (Low Corruption)')
                            }</span>.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-t border-gray-200">
                  {/* Insight 3: Time Trends */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">Time Trends</h4>
                    </div>
                    
                    <div className="ml-13 pl-0">
                      <p className="text-gray-600 leading-relaxed">
                        {selectedCountries.length > 1 ? (
                          <>
                            Happiness trends over time show most variation during global events like the 2020 pandemic.
                            {(() => {
                              if (timeSeriesData.length > 1) {
                                // Find which country had the most positive trend
                                const firstYear = timeSeriesData[0];
                                const lastYear = timeSeriesData[timeSeriesData.length - 1];
                                
                                let bestTrend = { country: '', change: -999 };
                                
                                selectedCountries.forEach(country => {
                                  if (firstYear[country] && lastYear[country]) {
                                    const change = lastYear[country] - firstYear[country];
                                    if (change > bestTrend.change) {
                                      bestTrend = { country, change };
                                    }
                                  }
                                });
                                
                                if (bestTrend.country) {
                                  return (
                                    <>
                                      <span className="font-medium"> {bestTrend.country}</span> shows the most positive trend, improving by 
                                      <span className="font-medium"> {bestTrend.change.toFixed(2)}</span> points since 2015.
                                    </>
                                  );
                                }
                                return '';
                              }
                              return '';
                            })()}
                          </>
                        ) : (
                          <>
                            {tableData[0]?.country}'s happiness score has
                            {(() => {
                              if (timeSeriesData.length > 1) {
                                const firstYear = timeSeriesData[0];
                                const lastYear = timeSeriesData[timeSeriesData.length - 1];
                                const country = tableData[0]?.country;
                                
                                if (firstYear[country] && lastYear[country]) {
                                  const change = lastYear[country] - firstYear[country];
                                  if (Math.abs(change) < 0.2) {
                                    return ' remained relatively stable';
                                  } else if (change > 0) {
                                    return <span className="font-medium"> improved by {change.toFixed(2)} points</span>;
                                  } else {
                                    return <span className="font-medium"> decreased by {Math.abs(change).toFixed(2)} points</span>;
                                  }
                                }
                                return '';
                              }
                              return '';
                            })()}
                            over the past decade. This trend suggests 
                            {(() => {
                              const country = tableData[0]?.country;
                              if (timeSeriesData.length > 1) {
                                const firstYear = timeSeriesData[0];
                                const lastYear = timeSeriesData[timeSeriesData.length - 1];
                                
                                if (firstYear[country] && lastYear[country]) {
                                  const change = lastYear[country] - firstYear[country];
                                  if (Math.abs(change) < 0.2) {
                                    return ' consistent societal wellbeing.';
                                  } else if (change > 0) {
                                    return ' positive developments in quality of life factors.';
                                  } else {
                                    return ' challenges in maintaining wellbeing standards.';
                                  }
                                }
                              }
                              return ' varying patterns of wellbeing over time.';
                            })()}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {/* Insight 4: Geographic Context */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">Geographic Context</h4>
                    </div>
                    
                    <div className="ml-13 pl-0">
                      <p className="text-gray-600 leading-relaxed">
                        {selectedCountries.length > 1 ? (
                          <>
                            Regional patterns strongly influence happiness metrics. Nordic and Western European countries typically 
                            lead in overall scores, followed by North American and Oceanic nations. 
                            <span className="font-medium"> GDP per capita</span> shows less variation among developed nations, while
                            <span className="font-medium"> Trust and Freedom</span> metrics reveal more significant regional differences.
                          </>
                        ) : (
                          <>
                            {(() => {
                              const country = tableData[0]?.country;
                              const continentData = happinessData.find(d => d.country === country)?.continent;
                              
                              if (continentData) {
                                return (
                                  <>
                                    As a {continentData} nation, {country}'s happiness profile aligns with regional patterns.
                                    {continentData === 'Europe' && ' European countries typically score highest in social support and trust metrics.'}
                                    {continentData === 'North America' && ' North American countries often score well on GDP and freedom metrics.'}
                                    {continentData === 'Asia' && ' Asian countries show diverse happiness patterns, with strong economic growth but varying social factors.'}
                                    {continentData === 'Africa' && ' African countries are working to improve overall happiness scores, with social support often ranking as a relative strength.'}
                                    {continentData === 'South America' && ' South American countries typically show strong social bonds but face challenges in trust and governance metrics.'}
                                    {continentData === 'Oceania' && ' Oceanic countries consistently rank among the happiest, with balanced performance across most factors.'}
                                  </>
                                );
                              }
                              return `${country}'s happiness profile reflects specific regional and cultural contexts that influence wellbeing measurements.`;
                            })()}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {selectedCountries.length === 0 && (
          <div className="bg-white/80 p-8 rounded-lg shadow-md text-center">
            <svg className="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-700 mb-4 font-medium">
              Please select at least one country to display comparison visualizations.
            </p>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              You can select up to 5 countries to compare their happiness metrics across different dimensions. 
              Countries are ranked dynamically based on their happiness scores.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default CountryComparison