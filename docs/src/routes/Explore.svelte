<script>
  import { onMount } from "svelte";
  import WorldMap from "../components/WorldMap.svelte";
  import BarChart from "../components/BarChart.svelte";
  import LineChart from "../components/LineChart.svelte";
  import {
    selectedYear,
    selectedMetric,
    selectedMetricInfo,
    selectedCountries,
    selectedView,
    toggleCountrySelection,
    clearSelectedCountries,
    isLoading,
    dataLoadError,
  } from "../stores/appStore";
  import {
    loadCombinedData,
    getCountryComparisonData,
    getRankingData,
  } from "../utils/dataLoader";

  // Local state
  let mapData = [];
  let rankingData = [];
  let comparisonData = {};
  let availableYears = Array.from({ length: 10 }, (_, i) => 2015 + i);
  let metricOptions = [];
  let activeTab = "map"; // 'map', 'ranking', 'comparison'
  let isDataLoading = false;
  let error = null;
  let countrySearchTerm = "";
  let filteredCountries = [];

  // Subscribe to store values
  let year;
  let metric;
  let metricInfo;
  let selectedCountriesList = [];

  selectedYear.subscribe((value) => {
    year = value;
    loadData();
  });

  selectedMetric.subscribe((value) => {
    metric = value;
    loadData();
  });

  selectedMetricInfo.subscribe((value) => {
    metricInfo = value;
  });

  selectedCountries.subscribe((value) => {
    selectedCountriesList = value;
    if (selectedCountriesList.length > 0) {
      loadComparisonData();
    }
  });

  selectedView.subscribe((value) => {
    activeTab = value;
  });

  isLoading.subscribe((value) => {
    isDataLoading = value;
  });

  dataLoadError.subscribe((value) => {
    error = value;
  });

  onMount(async () => {
    loadData();
  });

  async function loadData() {
    isLoading.set(true);
    dataLoadError.set(null);

    try {
      // Load map data
      mapData = await loadMapData(year, metric);

      // Load ranking data
      rankingData = await getRankingData(year, metric, 20);

      // Load comparison data if countries are selected
      if (selectedCountriesList.length > 0) {
        await loadComparisonData();
      }

      isLoading.set(false);
    } catch (err) {
      console.error("Error loading data:", err);
      dataLoadError.set("Failed to load data. Please try again later.");
      isLoading.set(false);
    }
  }

  async function loadMapData(year, metric) {
    const combinedData = await loadCombinedData();

    if (!combinedData || !combinedData.data) {
      throw new Error("No data available");
    }

    // Filter by year and transform data for the WorldMap component
    return combinedData.data
      .filter((item) => item.year === parseInt(year))
      .map((item) => ({
        id: item.countryId || item.country.toLowerCase().replace(/\s+/g, "-"),
        name: item.country,
        [metric]: item[metric],
        continent: item.continent,
        year: item.year,
        data: item,
      }));
  }

  async function loadComparisonData() {
    if (selectedCountriesList.length === 0) return;

    const data = await getCountryComparisonData(selectedCountriesList, metric);
    if (data && data.data) {
      comparisonData = data.data;
    }
  }

  function handleCountryClick(country) {
    toggleCountrySelection(country.name || country.country);

    // If we're in map or ranking view, switch to comparison view when a country is selected
    if (activeTab !== "comparison" && selectedCountriesList.length === 1) {
      selectedView.set("comparison");
    }
  }

  function handleMetricChange(e) {
    selectedMetric.set(e.target.value);
  }

  function handleYearChange(e) {
    selectedYear.set(parseInt(e.target.value));
  }

  function handleTabChange(tab) {
    selectedView.set(tab);
  }

  function handleCountrySearch(e) {
    countrySearchTerm = e.target.value.toLowerCase();
    if (countrySearchTerm.length > 0) {
      filteredCountries = mapData
        .filter((c) => c.name.toLowerCase().includes(countrySearchTerm))
        .slice(0, 10)
        .map((c) => c.name);
    } else {
      filteredCountries = [];
    }
  }

  function selectSearchCountry(country) {
    toggleCountrySelection(country);
    countrySearchTerm = "";
    filteredCountries = [];
  }
</script>

<div class="explore-container">
  <header class="explore-header">
    <h1>Explore Global Happiness Data</h1>
    <p class="explore-description">
      Interact with world happiness data across different views. Compare
      countries, analyze rankings, and discover trends in happiness scores and
      related metrics.
    </p>
  </header>

  <div class="controls-container">
    <div class="primary-controls">
      <div class="control-group">
        <label for="metric-select">Metric</label>
        <select
          id="metric-select"
          value={metric}
          on:change={handleMetricChange}
          disabled={isDataLoading}
        >
          <option value="happiness_score">Happiness Score</option>
          <option value="gdp_per_capita">GDP per Capita</option>
          <option value="social_support">Social Support</option>
          <option value="healthy_life_expectancy"
            >Healthy Life Expectancy</option
          >
          <option value="freedom">Freedom</option>
          <option value="generosity">Generosity</option>
          <option value="corruption">Corruption Perception</option>
          <option value="hdi">Human Development Index</option>
        </select>
      </div>

      <div class="control-group">
        <label for="year-select">Year</label>
        <select
          id="year-select"
          value={year}
          on:change={handleYearChange}
          disabled={isDataLoading}
        >
          {#each availableYears as availableYear}
            <option value={availableYear}>{availableYear}</option>
          {/each}
        </select>
      </div>

      <div class="control-group search-group">
        <label for="country-search">Find Country</label>
        <div class="search-container">
          <input
            id="country-search"
            type="text"
            placeholder="Search for a country..."
            value={countrySearchTerm}
            on:input={handleCountrySearch}
            disabled={isDataLoading}
          />

          {#if filteredCountries.length > 0}
            <ul class="search-results">
              {#each filteredCountries as country}
                <li
                  on:click={() => selectSearchCountry(country)}
                  on:keydown={(e) =>
                    e.key === "Enter" && selectSearchCountry(country)}
                  tabindex="0"
                  role="button"
                  aria-label="Select {country}"
                >
                  {country}
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>
    </div>

    <div class="view-controls">
      <button
        class:active={activeTab === "map"}
        on:click={() => handleTabChange("map")}
        disabled={isDataLoading}
      >
        World Map
      </button>
      <button
        class:active={activeTab === "ranking"}
        on:click={() => handleTabChange("ranking")}
        disabled={isDataLoading}
      >
        Rankings
      </button>
      <button
        class:active={activeTab === "comparison"}
        on:click={() => handleTabChange("comparison")}
        disabled={isDataLoading || selectedCountriesList.length === 0}
      >
        Comparison
      </button>
    </div>
  </div>

  {#if isDataLoading}
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading visualization data...</p>
    </div>
  {:else if error}
    <div class="error-container">
      <p class="error-message">{error}</p>
      <button on:click={loadData}>Retry</button>
    </div>
  {:else}
    <div class="visualization-container">
      {#if activeTab === "map"}
        <div class="map-view">
          <WorldMap
            data={mapData}
            {metric}
            height={600}
            showLegend={true}
            interactive={true}
            onCountryClick={handleCountryClick}
          />

          <div class="map-info">
            <h3>{metricInfo?.label || metric} by Country</h3>
            <p>
              Click on countries to select them for comparison. Selected
              countries will appear below.
            </p>

            {#if selectedCountriesList.length > 0}
              <div class="selected-countries">
                <h4>Selected Countries</h4>
                <ul>
                  {#each selectedCountriesList as country}
                    <li>
                      <span class="country-name">{country}</span>
                      <button
                        class="remove-btn"
                        on:click={() => toggleCountrySelection(country)}
                      >
                        ✕
                      </button>
                    </li>
                  {/each}
                </ul>

                <div class="selection-actions">
                  <button
                    on:click={() => handleTabChange("comparison")}
                    disabled={selectedCountriesList.length === 0}
                  >
                    Compare Selected
                  </button>
                  <button
                    class="clear-btn"
                    on:click={clearSelectedCountries}
                    disabled={selectedCountriesList.length === 0}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {:else if activeTab === "ranking"}
        <div class="ranking-view">
          <h3>Top 20 Countries by {metricInfo?.label || metric}</h3>

          {#if rankingData && rankingData.length > 0}
            <div class="ranking-chart">
              <BarChart
                data={rankingData}
                {metric}
                height={600}
                showLegend={true}
                showLabels={true}
                maxItems={20}
                highlightedItems={selectedCountriesList}
                onBarClick={handleCountryClick}
              />
            </div>

            <div class="ranking-info">
              <p>
                This chart shows the top 20 countries ranked by {metricInfo?.label ||
                  metric}
                for the year {year}. Click on bars to select countries for
                comparison.
              </p>

              {#if selectedCountriesList.length > 0}
                <div class="selected-countries">
                  <h4>Selected Countries</h4>
                  <ul>
                    {#each selectedCountriesList as country}
                      <li>
                        <span class="country-name">{country}</span>
                        <button
                          class="remove-btn"
                          on:click={() => toggleCountrySelection(country)}
                        >
                          ✕
                        </button>
                      </li>
                    {/each}
                  </ul>

                  <div class="selection-actions">
                    <button
                      on:click={() => handleTabChange("comparison")}
                      disabled={selectedCountriesList.length === 0}
                    >
                      Compare Selected
                    </button>
                    <button
                      class="clear-btn"
                      on:click={clearSelectedCountries}
                      disabled={selectedCountriesList.length === 0}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <p class="no-data">
              No ranking data available for the selected year and metric.
            </p>
          {/if}
        </div>
      {:else if activeTab === "comparison"}
        <div class="comparison-view">
          <h3>Country Comparison: {metricInfo?.label || metric} (2015-2024)</h3>

          {#if selectedCountriesList.length > 0 && Object.keys(comparisonData).length > 0}
            <div class="comparison-chart">
              <LineChart
                data={comparisonData}
                {metric}
                height={600}
                showLegend={true}
                showTooltip={true}
                showPoints={true}
              />
            </div>

            <div class="comparison-info">
              <p>
                This chart compares {metricInfo?.label || metric} over time for the
                selected countries. Hover over points to see exact values.
              </p>

              <div class="selected-countries">
                <h4>Selected Countries</h4>
                <ul>
                  {#each selectedCountriesList as country}
                    <li>
                      <span class="country-name">{country}</span>
                      <button
                        class="remove-btn"
                        on:click={() => toggleCountrySelection(country)}
                      >
                        ✕
                      </button>
                    </li>
                  {/each}
                </ul>

                <button class="clear-btn" on:click={clearSelectedCountries}>
                  Clear All
                </button>
              </div>

              <div class="comparison-hint">
                <h4>Adding Countries</h4>
                <p>
                  To add more countries to this comparison, return to the World
                  Map or Rankings view and select additional countries (maximum
                  5).
                </p>
              </div>
            </div>
          {:else}
            <div class="empty-comparison">
              <p>Please select at least one country to see comparison data.</p>
              <button on:click={() => handleTabChange("map")}>
                Go to World Map to Select Countries
              </button>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .explore-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .explore-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .explore-header h1 {
    font-size: 2.2rem;
    color: #1e3a8a;
    margin-bottom: 1rem;
  }

  .explore-description {
    font-size: 1.1rem;
    color: #4b5563;
    max-width: 800px;
    margin: 0 auto;
  }

  .controls-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .primary-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    flex: 1;
  }

  .control-group {
    display: flex;
    flex-direction: column;
    min-width: 160px;
  }

  .control-group label {
    font-size: 0.9rem;
    color: #4b5563;
    margin-bottom: 0.3rem;
  }

  .control-group select,
  .control-group input {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 0.95rem;
    background-color: white;
  }

  .search-group {
    position: relative;
    flex: 1;
    max-width: 280px;
  }

  .search-container {
    position: relative;
  }

  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .search-results li {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .search-results li:hover {
    background-color: #f3f4f6;
  }

  .view-controls {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .view-controls button {
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
    border: none;
    border-radius: 4px;
    background-color: #e5e7eb;
    color: #4b5563;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .view-controls button.active {
    background-color: #2563eb;
    color: white;
  }

  .view-controls button:hover:not(.active):not(:disabled) {
    background-color: #d1d5db;
  }

  .view-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .visualization-container {
    width: 100%;
    min-height: 600px;
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .map-view,
  .ranking-view,
  .comparison-view {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .map-info,
  .ranking-info,
  .comparison-info {
    padding: 1.5rem;
    background-color: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }

  .map-info h3,
  .ranking-info h3,
  .comparison-info h3 {
    margin-top: 0;
    color: #1e3a8a;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .selected-countries {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: #f0f9ff;
    border-radius: 6px;
    border: 1px solid #bae6fd;
  }

  .selected-countries h4 {
    margin-top: 0;
    color: #0369a1;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .selected-countries ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .selected-countries li {
    display: flex;
    align-items: center;
    background-color: #e0f2fe;
    border-radius: 4px;
    padding: 0.3rem 0.6rem;
  }

  .country-name {
    margin-right: 0.5rem;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    border-radius: 50%;
    transition: all 0.2s ease;
  }

  .remove-btn:hover {
    background-color: #cbd5e1;
    color: #334155;
  }

  .selection-actions {
    display: flex;
    gap: 0.5rem;
  }

  .selection-actions button {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .selection-actions button:first-child {
    background-color: #2563eb;
    color: white;
  }

  .selection-actions button:first-child:hover:not(:disabled) {
    background-color: #1d4ed8;
  }

  .clear-btn {
    background-color: #e5e7eb;
    color: #4b5563;
  }

  .clear-btn:hover:not(:disabled) {
    background-color: #d1d5db;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .loading-container,
  .error-container,
  .empty-comparison {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-message {
    color: #dc2626;
    margin-bottom: 1rem;
  }

  .error-container button,
  .empty-comparison button {
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .error-container button:hover,
  .empty-comparison button:hover {
    background-color: #1d4ed8;
  }

  .comparison-hint {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: #f0fdf4;
    border-radius: 6px;
    border: 1px solid #bbf7d0;
  }

  .comparison-hint h4 {
    margin-top: 0;
    color: #16a34a;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  @media screen and (max-width: 768px) {
    .controls-container {
      flex-direction: column;
      gap: 1rem;
    }

    .primary-controls {
      flex-direction: column;
    }

    .control-group,
    .search-group {
      width: 100%;
      max-width: none;
    }

    .view-controls {
      width: 100%;
    }

    .view-controls button {
      flex: 1;
      text-align: center;
    }

    .explore-header h1 {
      font-size: 1.8rem;
    }

    .explore-description {
      font-size: 1rem;
    }
  }
</style>
