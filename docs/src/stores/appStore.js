import { writable, derived } from 'svelte/store';
import * as dataLoader from '../utils/dataLoader';

// Create writable stores for app state
export const selectedYear = writable(null);
export const selectedCountries = writable([]);
export const selectedMetric = writable('score');
export const selectedView = writable('map'); // map, ranking, comparison, correlation
export const isLoading = writable(true);
export const dataLoadError = writable(null);
export const mapZoom = writable(1);
export const mapCenter = writable({ lat: 30, lng: 0 });
export const availableYears = writable([]);

// Available metrics for visualization and comparison
export const availableMetrics = writable([
  { id: 'score', label: 'Happiness Score', color: '#3b82f6', description: 'Overall happiness rating (0-10)' },
  { id: 'gdp_per_capita', label: 'GDP per Capita', color: '#10b981', description: 'Economic output per person' },
  { id: 'social_support', label: 'Social Support', color: '#f59e0b', description: 'Presence of support in times of need' },
  { id: 'life_expectancy', label: 'Healthy Life Expectancy', color: '#ef4444', description: 'Expected years of healthy life' },
  { id: 'freedom', label: 'Freedom', color: '#8b5cf6', description: 'Freedom to make life choices' },
  { id: 'generosity', label: 'Generosity', color: '#ec4899', description: 'Donation and helping behavior' },
  { id: 'corruption', label: 'Corruption Perception', color: '#6b7280', description: 'Perceived corruption in business/government' },
  { id: 'hdi', label: 'Human Development Index', color: '#0ea5e9', description: 'Combined measure of health, education, and income' },
  { id: 'population', label: 'Population', color: '#f97316', description: 'Total country population' },
  { id: 'weighted_score', label: 'Population-Weighted Score', color: '#8b5cf6', description: 'Happiness score weighted by population size' }
]);

// Create derived store for the currently selected metric info
export const selectedMetricInfo = derived(
  [selectedMetric, availableMetrics],
  ([$selectedMetric, $availableMetrics]) => {
    return $availableMetrics.find(m => m.id === $selectedMetric) || $availableMetrics[0];
  }
);

// Default color scale for visualizations
export const colorScales = writable({
  score: [
    { value: 2.5, color: "#c1e7ff" },
    { value: 5.0, color: "#6baed6" },
    { value: 7.5, color: "#2171b5" },
    { value: 10.0, color: "#084594" }
  ],
  hdi: [
    { value: 0.3, color: "#c6dbef" },
    { value: 0.5, color: "#6baed6" },
    { value: 0.7, color: "#2171b5" },
    { value: 1.0, color: "#084594" }
  ],
  population: [
    { value: 1000000, color: "#deebf7" },
    { value: 50000000, color: "#9ecae1" },
    { value: 500000000, color: "#3182bd" },
    { value: 1500000000, color: "#08519c" }
  ]
});

// Filter options
export const filters = writable({
  continents: [],
  populationMin: 0,
  populationMax: Number.MAX_SAFE_INTEGER,
  hdiMin: 0,
  hdiMax: 1,
  happinessMin: 0,
  happinessMax: 10
});

// User preferences
export const userPreferences = writable({
  theme: 'light', // light, dark
  colorBlindMode: false,
  language: 'en',
  showDataLabels: true,
  animationSpeed: 'medium' // slow, medium, fast
});

// Recent viewed countries
export const recentlyViewed = writable([]);

// Data dictionary for field descriptions
export const dataDictionary = writable(null);

// Initialize app data
export async function initializeAppData() {
  isLoading.set(true);
  
  try {
    // Load the data dictionary
    const dictionary = await dataLoader.loadDataDictionary();
    dataDictionary.set(dictionary);
    
    // Get available years
    const years = await dataLoader.getAvailableYears();
    availableYears.set(years);
    
    // Set default selected year (most recent)
    if (years && years.length > 0) {
      const latestYear = years[years.length - 1];
      selectedYear.set(latestYear);
    }
    
    isLoading.set(false);
  } catch (error) {
    console.error('Error initializing app data:', error);
    dataLoadError.set(error.message || 'Failed to load application data');
    isLoading.set(false);
  }
}

// Add a country to recently viewed
export function addToRecentlyViewed(country) {
  recentlyViewed.update(countries => {
    // Remove country if it already exists
    const filtered = countries.filter(c => c !== country);
    // Add to the beginning
    return [country, ...filtered].slice(0, 10); // Keep only 10 most recent
  });
}

// Reset filters to default values
export function resetFilters() {
  filters.set({
    continents: [],
    populationMin: 0,
    populationMax: Number.MAX_SAFE_INTEGER,
    hdiMin: 0,
    hdiMax: 1,
    happinessMin: 0,
    happinessMax: 10
  });
}

// Toggle a country selection
export function toggleCountrySelection(country) {
  selectedCountries.update(countries => {
    if (countries.includes(country)) {
      return countries.filter(c => c !== country);
    } else {
      // Limit to maximum 5 countries for comparison
      const updated = [...countries, country];
      return updated.slice(-5);
    }
  });
}

// Clear all selected countries
export function clearSelectedCountries() {
  selectedCountries.set([]);
}

// Set user theme preference
export function setTheme(theme) {
  userPreferences.update(prefs => ({
    ...prefs,
    theme
  }));
  
  // Apply theme to document
  document.documentElement.setAttribute('data-theme', theme);
}

// Initialize theme from system preference
export function initTheme() {
  userPreferences.subscribe(prefs => {
    document.documentElement.setAttribute('data-theme', prefs.theme);
  });
}