import { motion } from 'framer-motion';
import { useState } from 'react';

const CountryDetails = ({ country, metric }) => {
  if (!country) {
    return (
      <div className="flex items-center justify-center min-h-[300px] p-6 text-gray-500 bg-gray-50/50 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <p className="text-sm mb-2">Select a country on the map to view detailed information</p>
        <p className="text-xs text-gray-400">Click on any country to explore happiness metrics</p>
      </div>
    );
  }

  // Format metrics for display
  const formatMetric = (value) => {
    if (value === undefined || value === null) return 'No data';
    return typeof value === 'number' ? value.toFixed(2) : value;
  };

  // Get rating description based on value
  const getRatingDescription = (metric, value) => {
    if (value === undefined || value === null) return 'No data';
    
    if (metric === 'corruption') {
      // Corruption is inversely rated (lower is better)
      if (value <= 0.1) return 'Excellent';
      if (value <= 0.2) return 'Very Good';
      if (value <= 0.3) return 'Good';
      if (value <= 0.4) return 'Fair';
      return 'Poor';
    }
    
    // Standard rating for positive metrics
    if (value >= 1.25) return 'Excellent'; 
    if (value >= 0.75) return 'Very Good'; 
    if (value >= 0.5) return 'Good';  
    if (value >= 0.25) return 'Fair'; 
    return 'Poor';
  };

  // Style metrics based on values
  const getMetricStyle = (metric, value) => {
    if (value === undefined || value === null) return {};
    
    if (metric === 'score' || metric === 'freedom' || 
        metric === 'social_support' || metric === 'gdp_per_capita') {
      if (value >= 1.25) return { color: '#22c55e' }; // High - green
      if (value >= 0.75) return { color: '#84cc16' }; // Medium-high - light green
      if (value >= 0.5) return { color: '#eab308' };  // Medium - yellow
      if (value >= 0.25) return { color: '#f97316' }; // Medium-low - orange
      return { color: '#ef4444' };                    // Low - red
    }
    
    if (metric === 'corruption') {
      // Reverse scale for corruption (lower is better)
      if (value <= 0.1) return { color: '#22c55e' };
      if (value <= 0.2) return { color: '#84cc16' };
      if (value <= 0.3) return { color: '#eab308' };
      if (value <= 0.4) return { color: '#f97316' };
      return { color: '#ef4444' };
    }
    
    return {};
  };

  const getBarColor = (metric, value) => {
    if (value === undefined || value === null) return '#e5e7eb'; // gray-200
    
    if (metric === 'corruption') {
      // Reverse scale for corruption (lower is better)
      if (value <= 0.1) return '#bbf7d0'; // green-200
      if (value <= 0.2) return '#dcfce7'; // green-100
      if (value <= 0.3) return '#fef9c3'; // yellow-100
      if (value <= 0.4) return '#fed7aa'; // orange-100
      return '#fecaca'; // red-100
    }
    
    // Standard colors for positive metrics
    if (value >= 1.25) return '#bbf7d0'; // green-200
    if (value >= 0.75) return '#dcfce7'; // green-100
    if (value >= 0.5) return '#fef9c3';  // yellow-100
    if (value >= 0.25) return '#fed7aa'; // orange-100
    return '#fecaca'; // red-100
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
    { name: 'Population', value: country.population ? `${(country.population * 1000).toLocaleString()}` : 'Unknown' },
    { name: 'Population Category', value: country.population_category || 'Unknown' },
    { name: 'Development', value: country.development_category || 'Unknown' },
    { name: 'Region', value: country.region || 'Unknown' },
    { name: 'Continent', value: country.continent || 'Unknown' },
    { name: 'Human Development Index (HDI)', value: formatMetric(country.hdi) },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-100 shadow-lg"
    >
      {/* Header with country name, flag placeholder and happiness score */}
      <div className="p-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 shadow-inner">
              <span className="text-lg font-bold">{country.country.slice(0, 2)}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{country.country}</h3>
              <div className="text-sm text-blue-100 mt-0.5">{country.continent || country.region}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-blue-100">Happiness Score</div>
            <div className="text-2xl font-bold">{formatMetric(country.score)}</div>
          </div>
        </div>
      </div>
      
      {/* Main content area without scrollable container - content flows naturally */}
      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column: Happiness Factors */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b">Happiness Factors</h4>
            
            {/* Rank indicator */}
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Global Rank:</span>
                <span className="text-lg font-semibold text-blue-700">
                  {country.rank ? `#${country.rank}` : 'Not ranked'}
                </span>
              </div>
            </div>
            
            {/* Happiness Factors */}
            <div className="space-y-4">
              {factorData.map((factor) => (
                <div key={factor.key} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {getRatingDescription(factor.key, factor.value)}
                      </span>
                    </div>
                    <span className="text-sm font-semibold" style={getMetricStyle(factor.key, factor.value)}>
                      {formatMetric(factor.value)}
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${Math.min(100, (factor.value / 2) * 100)}%` 
                      }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="h-full rounded-full shadow-inner" 
                      style={{ 
                        backgroundColor: getBarColor(factor.key, factor.value)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Insights */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Insights</h4>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {country.country} ranks {factorData.some(f => f.key === metric && f.value > 1.25) ? 'high' : 
                factorData.some(f => f.key === metric && f.value > 0.75) ? 'above average' : 
                factorData.some(f => f.key === metric && f.value > 0.5) ? 'average' : 
                factorData.some(f => f.key === metric && f.value > 0.25) ? 'below average' : 'low'} 
                {' '}in {metric === 'score' ? 'happiness' : metric.replace(/_/g, ' ')} compared to other countries in {country.continent || 'its region'}.
              </p>
            </div>
          </div>
          
          {/* Right column: Country Data */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-gray-700 pb-2 border-b">Country Data</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {metadataItems.map((item) => (
                <div key={item.name} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">{item.name}</div>
                  <div className="font-medium text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 pt-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                country.development_category === 'Very High' ? 'bg-green-100 text-green-800' : 
                country.development_category === 'High' ? 'bg-teal-100 text-teal-800' : 
                country.development_category === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                country.development_category === 'Low' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {country.development_category || 'Unknown'} development
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                country.population_category === 'Very Large' ? 'bg-purple-100 text-purple-800' : 
                country.population_category === 'Large' ? 'bg-indigo-100 text-indigo-800' : 
                country.population_category === 'Medium' ? 'bg-blue-100 text-blue-800' : 
                country.population_category === 'Small' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {country.population_category || 'Unknown'} population
              </span>
            </div>
            
            <div className="pt-4 border-t border-gray-100 mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">About the Data</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Data for {country.country} is from the World Happiness Report {country.year}. 
                The happiness score ranges from 0 to 10 and is based on survey responses to the main life evaluation question 
                asked in the Gallup World Poll.
              </p>
              <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
                <span>Year: {country.year}</span>
                <span>Last updated: Apr 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryDetails;