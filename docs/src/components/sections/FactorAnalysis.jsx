import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FactorAnalysis = () => {
  const [selectedFactor, setSelectedFactor] = useState('GDP per Capita')
  const [isLoading, setIsLoading] = useState(true)
  
  const factors = [
    'GDP per Capita',
    'Social Support',
    'Life Expectancy',
    'Freedom',
    'Generosity',
    'Corruption'
  ]

  // Simulate loading delay for placeholders
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    
    return () => clearTimeout(timer)
  }, [selectedFactor])

  const LoadingPlaceholder = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-gray-500 text-sm">Loading visualization...</p>
    </div>
  )

  return (
    <div className="bg-background min-h-screen">
      <section className="section-container py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title text-center">Happiness Factor Analysis</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Explore the relationship between happiness scores and various contributing factors
            across different regions and time periods.
          </p>
        </motion.div>

        {/* Factor Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3 text-center">Select Factor:</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {factors.map(factor => (
                <button
                  key={factor}
                  onClick={() => setSelectedFactor(factor)}
                  className={`px-4 py-2 rounded-md ${
                    selectedFactor === factor
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } transition duration-200`}
                >
                  {factor}
                </button>
              ))}
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
            className="card"
          >
            <h3 className="text-xl font-semibold mb-4">
              Correlation with Happiness Score
            </h3>
            <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center mb-4 relative overflow-hidden">
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6">
                  <p className="text-gray-500 mb-4">
                    [Scatter Plot: {selectedFactor} vs Happiness]
                  </p>
                  <div className="w-full max-w-md h-48 bg-white rounded-lg shadow-inner p-4 relative">
                    {/* Y-axis label */}
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 transform -rotate-90 text-xs text-gray-500">
                      Happiness Score
                    </div>
                    
                    {/* X-axis label */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                      {selectedFactor}
                    </div>
                    
                    {/* Axis lines */}
                    <div className="absolute left-10 top-0 w-px h-full bg-gray-300"></div>
                    <div className="absolute left-0 bottom-10 w-full h-px bg-gray-300"></div>
                    
                    {/* Sample data points */}
                    <div className="absolute left-[15%] bottom-[30%] w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
                    <div className="absolute left-[25%] bottom-[45%] w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
                    <div className="absolute left-[35%] bottom-[38%] w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
                    <div className="absolute left-[45%] bottom-[50%] w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
                    <div className="absolute left-[55%] bottom-[60%] w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
                    <div className="absolute left-[65%] bottom-[65%] w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
                    <div className="absolute left-[75%] bottom-[70%] w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
                    <div className="absolute left-[85%] bottom-[75%] w-3 h-3 rounded-full bg-blue-500 opacity-70"></div>
                    
                    {/* Trend line */}
                    <div className="absolute left-[15%] bottom-[35%] w-[70%] h-px bg-primary transform rotate-[30deg] origin-bottom-left"></div>
                    
                    {/* Correlation value */}
                    <div className="absolute top-2 right-2 bg-gray-100 px-2 py-1 rounded text-xs">
                      r = 0.73
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-600">
              This scatter plot shows the correlation between {selectedFactor} and
              overall happiness scores across all countries. Each point represents a country,
              and the trend line indicates a {selectedFactor === 'Corruption' ? 'negative' : 'positive'} correlation.
            </p>
          </motion.div>

          {/* Regional Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card"
          >
            <h3 className="text-xl font-semibold mb-4">
              Regional Comparison
            </h3>
            <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center mb-4 relative overflow-hidden">
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6">
                  <p className="text-gray-500 mb-4">
                    [Bar Chart: {selectedFactor} by Region]
                  </p>
                  <div className="w-full max-w-md h-48 bg-white rounded-lg shadow-inner p-4 relative flex items-end justify-around">
                    {/* Y-axis label */}
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 transform -rotate-90 text-xs text-gray-500">
                      {selectedFactor} Score
                    </div>
                    
                    {/* X-axis line */}
                    <div className="absolute left-0 bottom-10 w-full h-px bg-gray-300"></div>
                    
                    {/* Bars */}
                    <div className="flex items-end justify-around w-full h-full pb-10 px-2">
                      <div className="flex flex-col items-center">
                        <div className="w-8 bg-primary rounded-t" style={{ height: '30%' }}></div>
                        <span className="text-xs mt-1 text-gray-500">Africa</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 bg-primary rounded-t" style={{ height: '45%' }}></div>
                        <span className="text-xs mt-1 text-gray-500">Americas</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 bg-primary rounded-t" style={{ height: '40%' }}></div>
                        <span className="text-xs mt-1 text-gray-500">Asia</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 bg-primary rounded-t" style={{ height: '65%' }}></div>
                        <span className="text-xs mt-1 text-gray-500">Europe</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 bg-primary rounded-t" style={{ height: '55%' }}></div>
                        <span className="text-xs mt-1 text-gray-500">Oceania</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-600">
              This bar chart compares {selectedFactor} across different regions,
              highlighting regional variations in this happiness contributor. Europe generally shows the 
              highest levels for most positive factors.
            </p>
          </motion.div>

          {/* Time Trend Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card"
          >
            <h3 className="text-xl font-semibold mb-4">
              Trend Over Time (2015-2024)
            </h3>
            <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center mb-4 relative overflow-hidden">
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6">
                  <p className="text-gray-500 mb-4">
                    [Line Chart: {selectedFactor} Trend]
                  </p>
                  <div className="w-full max-w-md h-48 bg-white rounded-lg shadow-inner p-4 relative">
                    {/* Y-axis label */}
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 transform -rotate-90 text-xs text-gray-500">
                      {selectedFactor} Score
                    </div>
                    
                    {/* X-axis line and label */}
                    <div className="absolute left-0 bottom-10 w-full h-px bg-gray-300"></div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                      Year (2015-2024)
                    </div>
                    
                    {/* Lines */}
                    <svg className="absolute inset-0 w-full h-full pl-2 pr-4 pt-4 pb-10" preserveAspectRatio="none">
                      {/* Global line */}
                      <path d="M 0,60 Q 60,40 120,55 T 240,30 T 360,20" fill="none" stroke="#3B82F6" strokeWidth="2" />
                      
                      {/* Europe line */}
                      <path d="M 0,40 Q 60,25 120,30 T 240,10 T 360,5" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4" />
                      
                      {/* Africa line */}
                      <path d="M 0,80 Q 60,75 120,72 T 240,65 T 360,60" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4" />
                    </svg>
                    
                    {/* Legend */}
                    <div className="absolute top-2 right-2 flex flex-col items-start space-y-1 bg-white/80 p-1 rounded text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-0.5 bg-blue-500 mr-1"></div>
                        <span>Global</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-0.5 bg-green-500 mr-1 border-b border-dashed"></div>
                        <span>Europe</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-0.5 bg-yellow-500 mr-1 border-b border-dashed"></div>
                        <span>Africa</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-600">
              This line chart shows how the importance of {selectedFactor} has
              changed over the past decade globally and by selected regions. Note the
              increasing trend in Europe and the slower progress in Africa.
            </p>
          </motion.div>

          {/* Factor Impact Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card"
          >
            <h3 className="text-xl font-semibold mb-4">
              Impact Analysis
            </h3>
            <div className="bg-gray-100 rounded-md h-80 flex items-center justify-center mb-4 relative overflow-hidden">
              {isLoading ? (
                <LoadingPlaceholder />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6">
                  <p className="text-gray-500 mb-4">
                    [Impact Visualization of {selectedFactor}]
                  </p>
                  <div className="w-full max-w-md h-48 bg-white rounded-lg shadow-inner p-4 relative">
                    {/* Horizontal bars showing factor contribution */}
                    <div className="space-y-4 h-full flex flex-col justify-around">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">High Income</span>
                          <span className="text-xs font-medium">38%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: '38%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">Upper Middle</span>
                          <span className="text-xs font-medium">29%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: '29%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">Lower Middle</span>
                          <span className="text-xs font-medium">19%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: '19%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-500">Low Income</span>
                          <span className="text-xs font-medium">14%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: '14%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Label */}
                    <div className="absolute top-2 left-2 text-xs text-gray-500">
                      Contribution of {selectedFactor} to Happiness
                    </div>
                  </div>
                </div>
              )}
            </div>
            <p className="text-gray-600">
              This visualization shows the relative impact of {selectedFactor} on
              happiness scores compared to other factors across different country income groups.
              Notice how the contribution varies significantly between high and low-income nations.
            </p>
          </motion.div>
        </div>

        {/* Statistical Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Statistical Insights</h2>
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Correlation Coefficient</h4>
                <p className="text-3xl font-bold text-primary">
                  {selectedFactor === 'GDP per Capita' && '0.78'}
                  {selectedFactor === 'Social Support' && '0.73'}
                  {selectedFactor === 'Life Expectancy' && '0.81'}
                  {selectedFactor === 'Freedom' && '0.59'}
                  {selectedFactor === 'Generosity' && '0.17'}
                  {selectedFactor === 'Corruption' && '-0.42'}
                </p>
                <p className="text-gray-600 mt-2">
                  {selectedFactor === 'Generosity' ? 'Weak' : selectedFactor === 'Freedom' ? 'Moderate' : selectedFactor === 'Corruption' ? 'Moderate negative' : 'Strong'} correlation between {selectedFactor} and happiness.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Regional Variance</h4>
                <p className="text-3xl font-bold text-primary">
                  {selectedFactor === 'GDP per Capita' && '42%'}
                  {selectedFactor === 'Social Support' && '38%'}
                  {selectedFactor === 'Life Expectancy' && '35%'}
                  {selectedFactor === 'Freedom' && '52%'}
                  {selectedFactor === 'Generosity' && '68%'}
                  {selectedFactor === 'Corruption' && '73%'}
                </p>
                <p className="text-gray-600 mt-2">
                  Variance in {selectedFactor} contribution across regions, with {selectedFactor === 'Generosity' || selectedFactor === 'Corruption' || selectedFactor === 'Freedom' ? 'high' : 'moderate'} regional differences.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Trend Direction</h4>
                <p className="text-3xl font-bold text-green-500">
                  {selectedFactor === 'Corruption' ? (
                    <span className="text-red-500">Decreasing</span>
                  ) : selectedFactor === 'Generosity' ? (
                    <span className="text-yellow-500">Stable</span>
                  ) : (
                    'Increasing'
                  )}
                </p>
                <p className="text-gray-600 mt-2">
                  {selectedFactor} shows {selectedFactor === 'Corruption' ? 'a decreasing' : selectedFactor === 'Generosity' ? 'little change in' : 'an increasing'} importance over the past decade (2015-2024).
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Findings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Key Findings About {selectedFactor}</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-primary">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {selectedFactor === 'GDP per Capita' && (
                  <span>While GDP per capita strongly correlates with happiness, its impact diminishes at higher income levels, suggesting a "saturation point" for economic prosperity.</span>
                )}
                {selectedFactor === 'Social Support' && (
                  <span>Social support shows consistently high importance across all regions and income levels, highlighting the universal human need for supportive relationships.</span>
                )}
                {selectedFactor === 'Life Expectancy' && (
                  <span>Health (measured by life expectancy) has the strongest correlation with happiness among all factors, emphasizing the fundamental importance of well-being.</span>
                )}
                {selectedFactor === 'Freedom' && (
                  <span>Freedom to make life choices shows the greatest regional variance, suggesting that cultural and political contexts significantly affect its impact.</span>
                )}
                {selectedFactor === 'Generosity' && (
                  <span>Generosity has the weakest correlation with national happiness, though it may have significant effects at individual rather than societal levels.</span>
                )}
                {selectedFactor === 'Corruption' && (
                  <span>Corruption perception shows a consistent negative correlation with happiness, with the strongest effect in transitioning economies.</span>
                )}
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>The contribution of {selectedFactor} to happiness has {selectedFactor === 'Corruption' ? 'decreased' : selectedFactor === 'Generosity' ? 'remained stable' : 'increased'} over the past decade, with the most significant changes occurring after 2020.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Countries with balanced development across all factors, including {selectedFactor}, tend to have more stable happiness scores over time than those with extreme performance in single areas.</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default FactorAnalysis