import { motion } from 'framer-motion';

const CountryDetails = ({ country, metric }) => {
  if (!country) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <p className="text-sm">Select a country on the map to view detailed information</p>
      </div>
    );
  }

  // Format metrics for display
  const formatMetric = (value) => {
    if (value === undefined || value === null) return 'No data';
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  // Style metrics based on values
  const getMetricStyle = (metric, value) => {
    if (value === undefined || value === null) return {};
    
    if (metric === 'score' || metric === 'freedom' || 
        metric === 'social_support' || metric === 'gdp_per_capita') {
      if (value >= 1.25) return { color: '#4CAF50' }; // High - green
      if (value >= 0.75) return { color: '#8BC34A' }; // Medium-high - light green
      if (value >= 0.5) return { color: '#FFC107' };  // Medium - yellow
      if (value >= 0.25) return { color: '#FF9800' }; // Medium-low - orange
      return { color: '#F44336' };                    // Low - red
    }
    
    if (metric === 'corruption') {
      // Reverse scale for corruption (lower is better)
      if (value <= 0.1) return { color: '#4CAF50' };
      if (value <= 0.2) return { color: '#8BC34A' };
      if (value <= 0.3) return { color: '#FFC107' };
      if (value <= 0.4) return { color: '#FF9800' };
      return { color: '#F44336' };
    }
    
    return {};
  };

  const factorData = [
    { name: 'GDP per Capita', value: country.gdp_per_capita, key: 'gdp_per_capita' },
    { name: 'Social Support', value: country.social_support, key: 'social_support' },
    { name: 'Life Expectancy', value: country.life_expectancy, key: 'life_expectancy' },
    { name: 'Freedom', value: country.freedom, key: 'freedom' },
    { name: 'Generosity', value: country.generosity, key: 'generosity' },
    { name: 'Corruption', value: country.corruption, key: 'corruption' }
  ];

  const metadataItems = [
    { name: 'Population', value: country.population?.toLocaleString() || 'Unknown' },
    { name: 'Population Category', value: country.population_category || 'Unknown' },
    { name: 'Development', value: country.development_category || 'Unknown' },
    { name: 'Region', value: country.region || 'Unknown' },
    { name: 'Continent', value: country.continent || 'Unknown' },
    { name: 'HDI', value: formatMetric(country.hdi) },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md h-full overflow-y-auto"
    >
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">{country.country}</h3>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">Happiness Score:</span>
            <span className="text-lg font-bold" style={{ color: '#4CAF50' }}>
              {formatMetric(country.score)}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Data for year {country.year}
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Happiness Factors</h4>
        <div className="space-y-3">
          {factorData.map((factor) => (
            <div key={factor.key} className="relative">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">{factor.name}</span>
                <span className="font-medium" style={getMetricStyle(factor.key, factor.value)}>
                  {formatMetric(factor.value)}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${Math.min(100, (factor.value / 2) * 100)}%`,
                    backgroundColor: getMetricStyle(factor.key, factor.value).color || '#9CA3AF'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Country Metadata</h4>
        <div className="grid grid-cols-2 gap-2">
          {metadataItems.map((item) => (
            <div key={item.name} className="text-xs">
              <span className="text-gray-500">{item.name}:</span> <span className="font-medium text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Comparison</h4>
        <p className="text-xs text-gray-600 mb-3">
          {country.country} ranks {factorData.some(f => f.key === metric && f.value > 1.25) ? 'high' : 
          factorData.some(f => f.key === metric && f.value > 0.75) ? 'above average' : 
          factorData.some(f => f.key === metric && f.value > 0.5) ? 'average' : 
          factorData.some(f => f.key === metric && f.value > 0.25) ? 'below average' : 'low'} 
          {' '}in {metric === 'score' ? 'happiness' : metric.replace('_', ' ')} compared to other countries.
        </p>
        <div className="flex items-center text-xs">
          <span className={`px-2 py-1 rounded-full ${country.development_category === 'Very High' ? 'bg-green-100 text-green-800' : 
            country.development_category === 'High' ? 'bg-teal-100 text-teal-800' : 
            country.development_category === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
            country.development_category === 'Low' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
            {country.development_category || 'Unknown'} development
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryDetails;