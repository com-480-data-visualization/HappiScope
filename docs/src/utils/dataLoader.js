/**
 * Data loader utility for HappiScope
 * Handles fetching, caching, and processing data from various sources
 */

// Define data file paths relative to the src directory
const DATA_PATHS = {
  happiness: 'data/happiness_data.json',
  timeSeries: 'data/time_series.json',
  countries: 'data/countries.json',
  correlations: 'data/correlations.json',
  globalTrends: 'data/global_trends.json',
  continentSummary: 'data/summary_by_continent.json',
  populationAnalysis: 'data/population_category_analysis.json',
  dataCompleteness: 'data/data_completeness.json',
  dataDictionary: 'data/data_dictionary.json'
};

// Cache for loaded data
const dataCache = {};

/**
 * Fetch data from a URL with caching
 * @param {string} url - The URL to fetch data from
 * @returns {Promise<Object>} - The data object
 */
async function fetchData(url) {
  if (dataCache[url]) {
    return dataCache[url];
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load data from ${url}: ${response.statusText}`);
    }
    
    const data = await response.json();
    dataCache[url] = data;
    return data;
  } catch (error) {
    console.error(`Error loading data from ${url}:`, error);
    return null;
  }
}

/**
 * Load the complete happiness dataset
 * @returns {Promise<Array>} - Array of happiness data records
 */
export async function loadHappinessData() {
  return await fetchData(DATA_PATHS.happiness);
}

/**
 * Load time series data by country
 * @returns {Promise<Object>} - Object with country keys and time series arrays
 */
export async function loadTimeSeriesData() {
  return await fetchData(DATA_PATHS.timeSeries);
}

/**
 * Load country metadata (latest data for each country)
 * @returns {Promise<Array>} - Array of country metadata objects
 */
export async function loadCountriesData() {
  return await fetchData(DATA_PATHS.countries);
}

/**
 * Load correlation matrix data for happiness factors
 * @returns {Promise<Object>} - Correlation matrix data
 */
export async function loadCorrelationsData() {
  return await fetchData(DATA_PATHS.correlations);
}

/**
 * Load global trends data over time
 * @returns {Promise<Array>} - Array of global trend data points by year
 */
export async function loadGlobalTrendsData() {
  return await fetchData(DATA_PATHS.globalTrends);
}

/**
 * Load combined data for map and exploration views
 * @returns {Promise<Object>} - Object containing combined data
 */
export async function loadCombinedData() {
  const data = await loadHappinessData();
  if (!data) return { data: [] };
  
  return { 
    data: data,
    years: [...new Set(data.map(item => item.year))].sort((a, b) => a - b)
  };
}

/**
 * Load continent summary data
 * @returns {Promise<Array>} - Array of continent summary data
 */
export async function loadContinentSummaryData() {
  return await fetchData(DATA_PATHS.continentSummary);
}

/**
 * Load population category analysis data
 * @returns {Promise<Array>} - Array of population category data
 */
export async function loadPopulationAnalysisData() {
  return await fetchData(DATA_PATHS.populationAnalysis);
}

/**
 * Load data completeness information
 * @returns {Promise<Object>} - Data completeness by year
 */
export async function loadDataCompletenessInfo() {
  return await fetchData(DATA_PATHS.dataCompleteness);
}

/**
 * Load data dictionary for field descriptions
 * @returns {Promise<Object>} - Data dictionary object
 */
export async function loadDataDictionary() {
  return await fetchData(DATA_PATHS.dataDictionary);
}

/**
 * Get all available years in the dataset
 * @returns {Promise<Array<number>>} - Array of available years
 */
export async function getAvailableYears() {
  try {
    const data = await loadHappinessData();
    if (!data) return [];
    
    // Extract unique years from the data
    const years = [...new Set(data.map(item => item.year))];
    return years.sort((a, b) => a - b);
  } catch (error) {
    console.error('Error getting available years:', error);
    return [];
  }
}

/**
 * Get data for a specific year
 * @param {number} year - The year to filter data for
 * @returns {Promise<Array>} - Array of data points for the specified year
 */
export async function getDataForYear(year) {
  const data = await loadHappinessData();
  if (!data) return [];
  
  return data.filter(item => item.year === year);
}

/**
 * Get country time series data for specific countries and a metric
 * @param {Array<string>} countries - Array of country names to include
 * @param {string} metric - Metric to extract (e.g., 'score', 'gdp_per_capita')
 * @returns {Promise<Object>} - Object with country data series
 */
export async function getCountryComparisonData(countries, metric = 'score') {
  const timeSeriesData = await loadTimeSeriesData();
  if (!timeSeriesData) return null;
  
  const result = {};
  
  countries.forEach(country => {
    if (timeSeriesData[country]) {
      result[country] = timeSeriesData[country].map(item => ({
        year: item.year,
        value: item[metric]
      })).sort((a, b) => a.year - b.year);
    }
  });
  
  return {
    metric,
    countries,
    data: result
  };
}

/**
 * Get ranking data for a specific year and metric
 * @param {number} year - The year to get rankings for
 * @param {string} metric - The metric to rank by (default: 'score')
 * @param {number} limit - Maximum number of countries to include (default: 20)
 * @returns {Promise<Array>} - Array of ranked countries with values
 */
export async function getRankingData(year, metric = 'score', limit = 20) {
  const yearData = await getDataForYear(year);
  if (!yearData.length) return [];
  
  // Filter out entries with undefined or null values for the metric
  const filteredData = yearData.filter(item => item[metric] !== undefined && item[metric] !== null);
  
  // Sort by the metric value (descending)
  const sortedData = filteredData.sort((a, b) => b[metric] - a[metric]);
  
  // Take only the specified limit
  return sortedData.slice(0, limit).map((item, index) => ({
    rank: index + 1,
    country: item.country,
    value: item[metric],
    continent: item.continent,
    country_code: item.country_code
  }));
}

/**
 * Get continent averages for a specific year and metric
 * @param {number} year - The year to analyze
 * @param {string} metric - The metric to average (default: 'score')
 * @returns {Promise<Array>} - Array of continent averages
 */
export async function getContinentAverages(year, metric = 'score') {
  const continentData = await loadContinentSummaryData();
  if (!continentData) return [];
  
  return continentData
    .filter(item => item.year === year && item[metric] !== undefined)
    .map(item => ({
      continent: item.continent,
      value: item[metric]
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Get the metric description from the data dictionary
 * @param {string} metricName - The metric name to look up
 * @returns {Promise<string>} - Description of the metric
 */
export async function getMetricDescription(metricName) {
  const dictionary = await loadDataDictionary();
  if (!dictionary || !dictionary.fields) return '';
  
  return dictionary.fields[metricName] || '';
}

export default {
  loadHappinessData,
  loadTimeSeriesData,
  loadCountriesData,
  loadCorrelationsData,
  loadGlobalTrendsData,
  loadCombinedData,
  loadContinentSummaryData,
  loadPopulationAnalysisData,
  loadDataCompletenessInfo,
  loadDataDictionary,
  getAvailableYears,
  getDataForYear,
  getCountryComparisonData,
  getRankingData,
  getContinentAverages,
  getMetricDescription
};