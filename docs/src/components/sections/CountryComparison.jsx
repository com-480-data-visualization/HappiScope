import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CountryComparison = () => {
  const [selectedCountries, setSelectedCountries] = useState(['Finland', 'Denmark', 'United States', 'Japan'])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // This would be replaced with actual data in the final implementation
  const availableCountries = [
    'Finland', 'Denmark', 'Switzerland', 'Iceland', 'Netherlands', 
    'Norway', 'Sweden', 'Luxembourg', 'New Zealand', 'Austria',
    'Australia', 'Israel', 'Germany', 'Canada', 'Ireland',
    'United States', 'United Kingdom', 'Czechia', 'Belgium', 'France',
    'Japan', 'Spain', 'Italy', 'Brazil', 'Mexico',
    'South Africa', 'China', 'India', 'Russia'
  ]
  
  // Simulate loading delay for placeholders
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
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
              {selectedCountries.map(country => (
                <button
                  key={country}
                  onClick={() => handleCountryToggle(country)}
                  className="px-4 py-2 rounded-md bg-primary text-white font-medium flex items-center shadow-md hover:bg-primary/90 transition duration-200"
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
              <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center mb-4 overflow-hidden relative">
                {isLoading ? (
                  <LoadingPlaceholder />
                ) : (
                  <div className="w-full h-full p-6">
                    <div className="text-gray-500 text-center mb-4">
                      [Placeholder for Line Chart: Happiness Score Trends]
                    </div>
                    <div className="h-56 bg-white rounded-md shadow-inner p-4 relative">
                      <div className="absolute left-0 bottom-8 w-full h-px bg-gray-300"></div>
                      <div className="absolute left-10 top-0 w-px h-full bg-gray-300"></div>
                      
                      {/* Y-axis label */}
                      <div className="absolute -left-6 top-1/2 -translate-y-1/2 transform -rotate-90 text-xs text-gray-500">
                        Happiness Score
                      </div>
                      
                      {/* X-axis label */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                        Year
                      </div>
                      
                      {/* Sample trend lines */}
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M10,50 Q30,30 50,40 T90,20" fill="none" stroke="#4F46E5" strokeWidth="2" />
                        <path d="M10,60 Q30,70 50,65 T90,50" fill="none" stroke="#10B981" strokeWidth="2" />
                        <path d="M10,70 Q30,65 50,60 T90,40" fill="none" stroke="#F59E0B" strokeWidth="2" />
                        <path d="M10,40 Q30,50 50,45 T90,60" fill="none" stroke="#EF4444" strokeWidth="2" />
                      </svg>
                      
                      {/* Legend */}
                      <div className="absolute top-2 right-2 bg-white/80 p-2 rounded text-xs space-y-1">
                        {selectedCountries.slice(0, 4).map((country, index) => (
                          <div key={country} className="flex items-center">
                            <div className={`w-3 h-2 mr-1 ${
                              index === 0 ? 'bg-indigo-600' : 
                              index === 1 ? 'bg-green-600' : 
                              index === 2 ? 'bg-yellow-500' : 
                              'bg-red-600'
                            }`}></div>
                            <span>{country}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
              <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center mb-4 overflow-hidden relative">
                {isLoading ? (
                  <LoadingPlaceholder />
                ) : (
                  <div className="w-full h-full p-6">
                    <div className="text-gray-500 text-center mb-4">
                      [Placeholder for Radar Chart: Factor Comparison]
                    </div>
                    <div className="h-56 bg-white rounded-md shadow-inner p-4 relative flex items-center justify-center">
                      {/* Simple radar chart placeholder */}
                      <div className="relative w-48 h-48">
                        {/* Circular guides */}
                        <div className="absolute inset-0 rounded-full border border-gray-200"></div>
                        <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 rounded-full border border-gray-200"></div>
                        <div className="absolute top-[37.5%] left-[37.5%] right-[37.5%] bottom-[37.5%] rounded-full border border-gray-200"></div>
                        
                        {/* Factor axes */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gray-300"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gray-300"></div>
                        <div className="absolute top-1/4 left-1/4 w-[70.7%] h-px bg-gray-300 origin-left rotate-45"></div>
                        <div className="absolute top-1/4 right-1/4 w-[70.7%] h-px bg-gray-300 origin-right -rotate-45"></div>
                        
                        {/* Factor labels */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[9px] text-gray-500">GDP</div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-[9px] text-gray-500">Social</div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 text-[9px] text-gray-500">Health</div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-[9px] text-gray-500">Freedom</div>
                        <div className="absolute top-[15%] left-[15%] text-[9px] text-gray-500">Trust</div>
                        <div className="absolute top-[15%] right-[15%] text-[9px] text-gray-500">Generosity</div>
                        
                        {/* Sample country data */}
                        {selectedCountries.slice(0, 4).map((country, index) => {
                          const color = index === 0 ? '#4F46E5' : 
                                        index === 1 ? '#10B981' : 
                                        index === 2 ? '#F59E0B' : 
                                        '#EF4444';
                          
                          // Create random polygon points for placeholder
                          const points = [
                            `${50},${10 + index * 5}`,  // GDP
                            `${85 - index * 8},${50}`,  // Freedom
                            `${50},${90 - index * 3}`,  // Social
                            `${15 + index * 6},${50}`,  // Health
                            `${25 + index * 3},${25 + index * 3}`,  // Trust
                            `${75 - index * 3},${25 + index * 3}`   // Generosity
                          ].join(' ');
                          
                          return (
                            <svg key={country} className="absolute inset-0" viewBox="0 0 100 100">
                              <polygon 
                                points={points} 
                                fill={`${color}20`} 
                                stroke={color} 
                                strokeWidth="1.5"
                              />
                            </svg>
                          );
                        })}
                      </div>
                      
                      {/* Legend */}
                      <div className="absolute top-2 right-2 bg-white/80 p-2 rounded text-xs space-y-1">
                        {selectedCountries.slice(0, 4).map((country, index) => (
                          <div key={country} className="flex items-center">
                            <div className={`w-3 h-2 mr-1 ${
                              index === 0 ? 'bg-indigo-600' : 
                              index === 1 ? 'bg-green-600' : 
                              index === 2 ? 'bg-yellow-500' : 
                              'bg-red-600'
                            }`}></div>
                            <span>{country}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
                        {selectedCountries.map(country => (
                          <th key={country} className="p-3 text-left text-gray-700">{country}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Happiness Rank</td>
                        {selectedCountries.map((country, index) => (
                          <td key={country} className="p-3 border-t text-gray-600">
                            {country === 'Finland' ? '1' : 
                             country === 'Denmark' ? '2' : 
                             country === 'Switzerland' ? '3' : 
                             country === 'Iceland' ? '4' : 
                             country === 'Netherlands' ? '5' : 
                             country === 'United States' ? '15' : 
                             country === 'Japan' ? '47' : 
                             `${index + 6}`}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Happiness Score</td>
                        {selectedCountries.map((country, index) => {
                          const baseScore = country === 'Finland' ? 7.8 : 
                                          country === 'Denmark' ? 7.6 : 
                                          country === 'Switzerland' ? 7.5 : 
                                          country === 'United States' ? 6.9 : 
                                          country === 'Japan' ? 6.1 : 
                                          7.0 - (index * 0.2);
                          return (
                            <td key={country} className="p-3 border-t text-gray-600">
                              {baseScore.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">GDP per Capita</td>
                        {selectedCountries.map((country) => {
                          const gdpScore = country === 'Finland' ? 1.45 : 
                                          country === 'Denmark' ? 1.48 : 
                                          country === 'Switzerland' ? 1.52 : 
                                          country === 'United States' ? 1.53 : 
                                          country === 'Japan' ? 1.38 : 
                                          1.30;
                          return (
                            <td key={country} className="p-3 border-t text-gray-600">
                              {gdpScore.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Social Support</td>
                        {selectedCountries.map((country) => {
                          const score = country === 'Finland' ? 1.58 : 
                                        country === 'Denmark' ? 1.55 : 
                                        country === 'Switzerland' ? 1.52 : 
                                        country === 'United States' ? 1.38 : 
                                        country === 'Japan' ? 1.28 : 
                                        1.30;
                          return (
                            <td key={country} className="p-3 border-t text-gray-600">
                              {score.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Life Expectancy</td>
                        {selectedCountries.map((country) => {
                          const score = country === 'Finland' ? 0.81 : 
                                        country === 'Denmark' ? 0.83 : 
                                        country === 'Switzerland' ? 0.92 : 
                                        country === 'United States' ? 0.73 : 
                                        country === 'Japan' ? 0.95 : 
                                        0.80;
                          return (
                            <td key={country} className="p-3 border-t text-gray-600">
                              {score.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Freedom</td>
                        {selectedCountries.map((country) => {
                          const score = country === 'Finland' ? 0.64 : 
                                        country === 'Denmark' ? 0.66 : 
                                        country === 'Switzerland' ? 0.63 : 
                                        country === 'United States' ? 0.51 : 
                                        country === 'Japan' ? 0.45 : 
                                        0.55;
                          return (
                            <td key={country} className="p-3 border-t text-gray-600">
                              {score.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Generosity</td>
                        {selectedCountries.map((country) => {
                          const score = country === 'Finland' ? 0.18 : 
                                        country === 'Denmark' ? 0.21 : 
                                        country === 'Switzerland' ? 0.26 : 
                                        country === 'United States' ? 0.28 : 
                                        country === 'Japan' ? 0.06 : 
                                        0.15;
                          return (
                            <td key={country} className="p-3 border-t text-gray-600">
                              {score.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="p-3 border-t font-medium text-gray-800">Corruption</td>
                        {selectedCountries.map((country) => {
                          const score = country === 'Finland' ? 0.41 : 
                                        country === 'Denmark' ? 0.43 : 
                                        country === 'Switzerland' ? 0.39 : 
                                        country === 'United States' ? 0.15 : 
                                        country === 'Japan' ? 0.19 : 
                                        0.25;
                          return (
                            <td key={country} className="p-3 border-t text-gray-600">
                              {score.toFixed(2)}
                            </td>
                          );
                        })}
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