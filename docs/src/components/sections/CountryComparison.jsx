import { useState } from 'react'
import { motion } from 'framer-motion'

const CountryComparison = () => {
  const [selectedCountries, setSelectedCountries] = useState(['Finland', 'Denmark', 'United States', 'Japan'])
  
  // This would be replaced with actual data in the final implementation
  const availableCountries = [
    'Finland', 'Denmark', 'Switzerland', 'Iceland', 'Netherlands', 
    'Norway', 'Sweden', 'Luxembourg', 'New Zealand', 'Austria',
    'Australia', 'Israel', 'Germany', 'Canada', 'Ireland',
    'United States', 'United Kingdom', 'Czechia', 'Belgium', 'France',
    'Japan', 'Spain', 'Italy', 'Brazil', 'Mexico',
    'South Africa', 'China', 'India', 'Russia'
  ]
  
  const handleCountryToggle = (country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter(c => c !== country))
    } else if (selectedCountries.length < 5) {
      setSelectedCountries([...selectedCountries, country])
    }
  }
  
  return (
    <div className="bg-background min-h-screen">
      <section className="section-container py-12">
        <h1 className="section-title text-center">Country Comparison</h1>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Compare happiness metrics between countries to uncover unique patterns and insights across different regions and cultures.
        </p>
        
        {/* Country Selection */}
        <div className="mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Select Countries to Compare (max 5):</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCountries.map(country => (
                <button
                  key={country}
                  onClick={() => handleCountryToggle(country)}
                  className="px-4 py-2 rounded-md bg-primary text-white flex items-center"
                >
                  {country} <span className="ml-2">×</span>
                </button>
              ))}
            </div>
            
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search for a country..."
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2">
                  {availableCountries
                    .filter(country => !selectedCountries.includes(country))
                    .map(country => (
                      <button
                        key={country}
                        onClick={() => handleCountryToggle(country)}
                        className="px-3 py-2 text-left text-sm rounded-md hover:bg-gray-100"
                        disabled={selectedCountries.length >= 5}
                      >
                        {country}
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comparison Visualizations */}
        {selectedCountries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Happiness Score Comparison */}
            <div className="card mb-8">
              <h3 className="text-xl font-semibold mb-4">Happiness Score Comparison (2015-2024)</h3>
              <div className="bg-gray-200 rounded-md h-80 flex items-center justify-center mb-4">
                <p className="text-gray-500">
                  [Placeholder for Line Chart: Happiness Score Trends for {selectedCountries.join(', ')}]
                </p>
              </div>
              <p className="text-gray-600">
                [Placeholder] This chart shows how happiness scores have changed over time for the selected countries,
                allowing you to compare trends and identify diverging or converging patterns.
              </p>
            </div>
            
            {/* Factor Breakdown */}
            <div className="card mb-8">
              <h3 className="text-xl font-semibold mb-4">Factor Breakdown (2024)</h3>
              <div className="bg-gray-200 rounded-md h-80 flex items-center justify-center mb-4">
                <p className="text-gray-500">
                  [Placeholder for Radar Chart: Factor Comparison for {selectedCountries.join(', ')}]
                </p>
              </div>
              <p className="text-gray-600">
                [Placeholder] This radar chart compares the six main factors that contribute to happiness across
                the selected countries, highlighting their relative strengths and weaknesses.
              </p>
            </div>
            
            {/* Detailed Metrics Comparison */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Detailed Metrics (2024)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left">Metric</th>
                      {selectedCountries.map(country => (
                        <th key={country} className="p-3 text-left">{country}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-t">Happiness Rank</td>
                      {selectedCountries.map(country => (
                        <td key={country} className="p-3 border-t">[Rank]</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border-t">Happiness Score</td>
                      {selectedCountries.map(country => (
                        <td key={country} className="p-3 border-t">[Score]</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border-t">GDP per Capita</td>
                      {selectedCountries.map(country => (
                        <td key={country} className="p-3 border-t">[GDP]</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border-t">Social Support</td>
                      {selectedCountries.map(country => (
                        <td key={country} className="p-3 border-t">[Support]</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border-t">Life Expectancy</td>
                      {selectedCountries.map(country => (
                        <td key={country} className="p-3 border-t">[Life Exp]</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border-t">Freedom</td>
                      {selectedCountries.map(country => (
                        <td key={country} className="p-3 border-t">[Freedom]</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border-t">Generosity</td>
                      {selectedCountries.map(country => (
                        <td key={country} className="p-3 border-t">[Generosity]</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 border-t">Corruption</td>
                      {selectedCountries.map(country => (
                        <td key={country} className="p-3 border-t">[Corruption]</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        
        {selectedCountries.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600">
              Please select at least one country to display comparison visualizations.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default CountryComparison