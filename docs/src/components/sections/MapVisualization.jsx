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
  const [globalInsights, setGlobalInsights] = useState({
    happiestRegions: { text: '', change: 0 },
    improvedCountries: { text: '', countries: [] },
    concernAreas: { text: '', change: 0 }
  })
  
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
          
          // Calculate rankings for the selected year based on happiness score
          const rankedData = [...yearData]
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .map((country, index) => ({
              ...country,
              rank: index + 1
            }));
          
          // Pre-select a default country (Finland - often in top happiness rankings)
          const defaultCountry = rankedData.find(d => d.country === "Finland") || 
                                 rankedData.find(d => d.country === "Denmark") ||
                                 rankedData.find(d => d.country === "Switzerland") ||
                                 rankedData[0]; // Fallback to first country if specific ones not found
          
          if (defaultCountry) {
            setSelectedCountry(defaultCountry);
            console.log(`Pre-selected country: ${defaultCountry.country}`);
          }
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
  }, [selectedYear])
  
  // Update selected country when year changes
  useEffect(() => {
    if (selectedCountry) {
      // Get countries for the selected year
      const yearData = happinessData.filter(d => d.year === selectedYear);
      
      // Calculate rankings for the current year
      const rankedData = [...yearData]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .map((country, index) => ({
          ...country,
          rank: index + 1
        }));
      
      // Find the same country in the new year's data with rank
      const updatedCountry = rankedData.find(d => 
        d.country_code === selectedCountry.country_code
      );
      
      setSelectedCountry(updatedCountry || null);
    }
  }, [selectedYear])
  
  // Calculate global insights when year changes
  useEffect(() => {
    calculateGlobalInsights(selectedYear);
  }, [selectedYear]);
  
  // Function to calculate global insights based on data
  const calculateGlobalInsights = (year) => {
    try {
      const currentYearData = happinessData.filter(d => d.year === year);
      
      if (currentYearData.length === 0) {
        console.warn(`No data available for ${year}`);
        return;
      }
      
      // Get previous year data if available (for comparison)
      const prevYear = year > 2015 ? year - 1 : null;
      const prevYearData = prevYear ? happinessData.filter(d => d.year === prevYear) : [];
      
      // 1. Analyze happiest regions
      // Group by continent/region and calculate average happiness
      const regionScores = {};
      const regionCountries = {};
      
      currentYearData.forEach(country => {
        if (country.continent && country.score) {
          if (!regionScores[country.continent]) {
            regionScores[country.continent] = 0;
            regionCountries[country.continent] = 0;
          }
          regionScores[country.continent] += country.score;
          regionCountries[country.continent]++;
        }
      });
      
      // Calculate average scores by region
      const regionAvgs = {};
      Object.keys(regionScores).forEach(region => {
        regionAvgs[region] = regionScores[region] / regionCountries[region];
      });
      
      // Sort regions by average score
      const sortedRegions = Object.entries(regionAvgs)
        .sort((a, b) => b[1] - a[1])
        .map(([region, score]) => ({ region, score }));
      
      // Get top 10 countries
      const top10Countries = [...currentYearData]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 10);
      
      // Count countries by region in top 10
      const regionCounts = {};
      top10Countries.forEach(country => {
        if (country.continent) {
          regionCounts[country.continent] = (regionCounts[country.continent] || 0) + 1;
        }
      });
      
      // Find dominant region in top 10
      const dominantRegion = Object.entries(regionCounts)
        .sort((a, b) => b[1] - a[1])[0] || [null, 0];
      
      let regionChangeText = '';
      let regionChange = 0;
      
      // Calculate regional change if previous year data exists
      if (prevYearData.length > 0 && dominantRegion[0]) {
        const prevRegionScores = {};
        const prevRegionCountries = {};
        
        prevYearData.forEach(country => {
          if (country.continent === dominantRegion[0] && country.score) {
            if (!prevRegionScores[country.continent]) {
              prevRegionScores[country.continent] = 0;
              prevRegionCountries[country.continent] = 0;
            }
            prevRegionScores[country.continent] += country.score;
            prevRegionCountries[country.continent]++;
          }
        });
        
        // Previous year average for dominant region
        const prevAvg = prevRegionScores[dominantRegion[0]] / prevRegionCountries[dominantRegion[0]];
        const currentAvg = regionAvgs[dominantRegion[0]];
        
        // Calculate percent change
        regionChange = prevAvg > 0 ? ((currentAvg - prevAvg) / prevAvg) * 100 : 0;
      }
      
      // 2. Analyze improving countries
      const improvingCountries = [];
      
      if (prevYearData.length > 0) {
        currentYearData.forEach(country => {
          const prevData = prevYearData.find(d => d.country_code === country.country_code);
          if (prevData && country.score && prevData.score) {
            const improvement = country.score - prevData.score;
            if (improvement > 0.2) { // Lowered threshold to catch more improvements
              improvingCountries.push({
                country: country.country,
                improvement,
                region: country.region || country.continent,
                score: country.score,
                primaryContributor: getPrimaryContributor(country, prevData)
              });
            }
          }
        });
      }
      
      // Sort by improvement amount
      improvingCountries.sort((a, b) => b.improvement - a.improvement);
      
      // Group improving countries by region
      const improvingRegions = {};
      improvingCountries.forEach(country => {
        if (country.region) {
          improvingRegions[country.region] = (improvingRegions[country.region] || 0) + 1;
        }
      });
      
      // Find region with most improving countries
      const topImprovingRegion = Object.entries(improvingRegions)
        .sort((a, b) => b[1] - a[1])[0] || [null, 0];
      
      // 3. Areas of concern
      const decliningCountries = [];
      
      if (prevYearData.length > 0) {
        currentYearData.forEach(country => {
          const prevData = prevYearData.find(d => d.country_code === country.country_code);
          if (prevData && country.score && prevData.score) {
            const decline = prevData.score - country.score;
            if (decline > 0.2) { // Lowered threshold to capture more declines
              decliningCountries.push({
                country: country.country,
                decline,
                region: country.region || country.continent,
                score: country.score,
                primaryContributor: getPrimaryContributor(prevData, country, true)
              });
            }
          }
        });
      }
      
      // Sort by decline amount
      decliningCountries.sort((a, b) => b.decline - a.decline);
      
      // Group declining countries by region
      const decliningRegions = {};
      decliningCountries.forEach(country => {
        if (country.region) {
          decliningRegions[country.region] = (decliningRegions[country.region] || 0) + 1;
        }
      });
      
      // Find region with most declining countries
      const mostDecliningRegion = Object.entries(decliningRegions)
        .sort((a, b) => b[1] - a[1])[0] || [null, 0];
      
      // Calculate average decline in the most declining region
      let avgDecline = 0;
      if (mostDecliningRegion[0]) {
        const declineSum = decliningCountries
          .filter(c => c.region === mostDecliningRegion[0])
          .reduce((sum, c) => sum + c.decline, 0);
          
        const declineCount = decliningCountries.filter(c => c.region === mostDecliningRegion[0]).length;
        
        avgDecline = declineCount > 0 ? declineSum / declineCount : 0;
      }
      
      // Get average happiness score for current year
      const avgScore = currentYearData.reduce((sum, c) => sum + (c.score || 0), 0) / currentYearData.length;
      
      // Get average happiness score for previous year if data exists
      let prevAvgScore = 0;
      let globalChange = 0;
      if (prevYearData.length > 0) {
        prevAvgScore = prevYearData.reduce((sum, c) => sum + (c.score || 0), 0) / prevYearData.length;
        globalChange = ((avgScore - prevAvgScore) / prevAvgScore) * 100;
      }
      
      // Create insight texts
      const happiestRegionsText = dominantRegion[0] ? 
        `${dominantRegion[0]} dominates the top happiness rankings with ${dominantRegion[1]} out of 10 happiest countries.` : 
        'Top happiness rankings are spread across multiple regions with no clear dominance.';
        
      const improvedCountriesText = topImprovingRegion[0] ? 
        `${topImprovingRegion[0]} nations show the fastest happiness growth, with ${topImprovingRegion[1]} countries improving by over 0.2 points.` :
        'Improvements are spread across different regions with no clear pattern.';
        
      const concernAreasText = mostDecliningRegion[0] ? 
        `${mostDecliningRegion[0]} experienced declining happiness scores, potentially associated with regional challenges.` :
        'No significant regional patterns of decline observed this year.';
      
      // Get common factor in improving/declining countries
      const getCommonFactors = (countries) => {
        if (!countries || countries.length === 0) return [];
        
        const factorCounts = {
          gdp_per_capita: 0,
          social_support: 0,
          life_expectancy: 0,
          freedom: 0,
          generosity: 0,
          corruption: 0
        };
        
        countries.forEach(country => {
          if (country.primaryContributor) {
            factorCounts[country.primaryContributor] = (factorCounts[country.primaryContributor] || 0) + 1;
          }
        });
        
        return Object.entries(factorCounts)
          .sort((a, b) => b[1] - a[1])
          .filter(f => f[1] > 0)
          .map(f => ({
            factor: f[0],
            count: f[1],
            percentage: Math.round((f[1] / countries.length) * 100)
          }));
      };
      
      const improvementFactors = getCommonFactors(improvingCountries);
      const declineFactors = getCommonFactors(decliningCountries);
    
      // Update insights state
      setGlobalInsights({
        happiestRegions: { 
          text: happiestRegionsText, 
          change: regionChange.toFixed(1),
          topRegions: sortedRegions.slice(0, 3),
          dominantRegion: dominantRegion[0] || '',
          dominantCount: dominantRegion[1] || 0,
          topCountries: top10Countries.slice(0, 5).map(c => ({ name: c.country, score: c.score }))
        },
        improvedCountries: { 
          text: improvedCountriesText, 
          countries: improvingCountries.slice(0, 5),
          region: topImprovingRegion[0] || '',
          factors: improvementFactors,
          averageImprovement: improvingCountries.length ? 
            (improvingCountries.reduce((sum, c) => sum + c.improvement, 0) / improvingCountries.length).toFixed(2) : 0
        },
        concernAreas: { 
          text: concernAreasText, 
          change: avgDecline.toFixed(1),
          countries: decliningCountries.slice(0, 5),
          region: mostDecliningRegion[0] || '',
          factors: declineFactors
        },
        global: {
          avgScore: avgScore.toFixed(2),
          change: globalChange.toFixed(2),
          totalCountries: currentYearData.length
        }
      });
      
    } catch (error) {
      console.error("Error calculating global insights:", error);
    }
  };
  
  // Helper function to determine which factor contributed most to change
  const getPrimaryContributor = (currentData, prevData, isDecline = false) => {
    if (!currentData || !prevData) return null;
    
    const factors = ['gdp_per_capita', 'social_support', 'life_expectancy', 'freedom', 'generosity', 'corruption'];
    let maxChange = 0;
    let primaryFactor = null;
    
    factors.forEach(factor => {
      if (currentData[factor] !== undefined && prevData[factor] !== undefined) {
        // For corruption, a decrease is positive (inverse for decline)
        const change = factor === 'corruption' && !isDecline ? 
          prevData[factor] - currentData[factor] : 
          currentData[factor] - prevData[factor];
        
        if (Math.abs(change) > Math.abs(maxChange)) {
          maxChange = change;
          primaryFactor = factor;
        }
      }
    });
    
    return primaryFactor;
  };
  
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
  
  // Function to handle when a country is selected from the map
  const handleSelectCountry = (country) => {
    if (country) {
      // Get all countries for the selected year with rankings
      const yearData = happinessData.filter(d => d.year === selectedYear);
      const rankedData = [...yearData]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .map((countryData, index) => ({
          ...countryData,
          rank: index + 1
        }));
      
      // Find the selected country with its rank
      const rankedCountry = rankedData.find(d => d.country_code === country.country_code);
      setSelectedCountry(rankedCountry || country);
    } else {
      setSelectedCountry(null);
    }
  };
  
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
        
        {/* Controls Section - Compact Time and Metric Selectors */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 gap-4">
            {/* Combined Compact Controls with improved styling */}
            <div className="bg-white shadow-md rounded-lg p-5">
              <div className="flex flex-wrap items-center mb-4 justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-medium text-gray-800">Year:</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-2.5 py-1.5 min-w-[54px] text-sm rounded-md font-medium transition-all duration-200 ${
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
                
                <button 
                  onClick={toggleTimelineAnimation}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium shadow-sm transition-all ${
                    timelineAnimating 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {timelineAnimating ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                      </svg>
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                      </svg>
                      <span>Play Timeline</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-base font-medium text-gray-800">Metric:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {metrics.map(metric => (
                    <button
                      key={metric.id}
                      onClick={() => setSelectedMetric(metric.id)}
                      className={`px-2.5 py-1.5 text-sm rounded-md font-medium transition-all duration-200 ${
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
          </div>
        </motion.div>
        
        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="bg-gray-100 rounded-md h-[500px] flex items-center justify-center mb-6 overflow-hidden relative">
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
                  setSelectedCountry={handleSelectCountry} 
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
        
        {/* Details Section - Now without height constraint to allow natural flow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 bg-white shadow-md rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Country Details</h3>
          <div>
            <CountryDetails country={selectedCountry} metric={selectedMetric} />
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12"
        >
          {/* Global summary banner */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-4 mb-8 text-white">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center mb-2 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold">Global Happiness Insights for {selectedYear}</h2>
              </div>
              <div className="text-white flex items-center">
                <div className="mr-6">
                  <p className="text-xs opacity-80">Global Average Score</p>
                  <p className="text-xl font-bold">{globalInsights.global?.avgScore || "N/A"}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-xs opacity-80 mr-2">Year-over-Year</p>
                  {(globalInsights.global?.change > 0) ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      {Math.abs(globalInsights.global?.change || 0)}%
                    </span>
                  ) : (globalInsights.global?.change < 0) ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-800">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {Math.abs(globalInsights.global?.change || 0)}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                      No change
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Happiest Regions */}
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="border-t-4 border-green-500 p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">Happiest Regions</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {globalInsights.happiestRegions.change > 0 ? '+' : ''}{globalInsights.happiestRegions.change}%
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mt-2 mb-3">
                  {globalInsights.happiestRegions.text}
                </p>
                
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Top 5 Countries</h4>
                  <ul className="space-y-2">
                    {globalInsights.happiestRegions.topCountries?.map((country, idx) => (
                      <li key={idx} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {idx + 1}. {country.name}
                        </span>
                        <span className="text-sm font-semibold text-green-600">{Number(country.score).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Top Regions by Score</h4>
                  <div className="space-y-2">
                    {globalInsights.happiestRegions.topRegions?.map((region, idx) => (
                      <div key={idx} className="relative">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-700">{region.region}</span>
                          <span className="text-gray-600">{Number(region.score).toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{width: `${Math.min(100, (region.score / 10) * 100)}%`}}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 2: Improving Countries */}
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="border-t-4 border-yellow-500 p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">Top Improving Countries</h3>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Avg +{globalInsights.improvedCountries.averageImprovement}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mt-2 mb-3">
                  {globalInsights.improvedCountries.text}
                </p>
                
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Biggest Improvements</h4>
                  <ul className="space-y-2">
                    {globalInsights.improvedCountries.countries?.slice(0, 5).map((country, idx) => (
                      <li key={idx} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {country.country}
                        </span>
                        <span className="text-sm font-semibold text-yellow-600">+{country.improvement.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Key Contributing Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {globalInsights.improvedCountries.factors?.map((factor, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 bg-yellow-50 text-yellow-800 text-xs font-medium rounded-full"
                        title={`Contributed to ${factor.percentage}% of improving countries`}
                      >
                        {factor.factor.replace(/_/g, ' ').split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')} ({factor.percentage}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 3: Areas of Concern */}
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="border-t-4 border-red-500 p-5">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">Areas of Concern</h3>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    {globalInsights.concernAreas.change} pts
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mt-2 mb-3">
                  {globalInsights.concernAreas.text}
                </p>
                
                <div className="mt-4">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Most Declining</h4>
                  <ul className="space-y-2">
                    {globalInsights.concernAreas.countries?.slice(0, 5).map((country, idx) => (
                      <li key={idx} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {country.country}
                        </span>
                        <span className="text-sm font-semibold text-red-600">-{country.decline.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Primary Declining Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {globalInsights.concernAreas.factors?.map((factor, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-1 bg-red-50 text-red-800 text-xs font-medium rounded-full"
                        title={`Contributed to ${factor.percentage}% of declining countries`}
                      >
                        {factor.factor.replace(/_/g, ' ').split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')} ({factor.percentage}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default MapVisualization