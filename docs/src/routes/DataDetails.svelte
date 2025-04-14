<script context="module">
  function formatMetricName(metric) {
    switch (metric) {
      case "happiness_score":
        return "Happiness Score";
      case "gdp_per_capita":
        return "GDP per Capita";
      case "social_support":
        return "Social Support";
      case "healthy_life_expectancy":
        return "Healthy Life Expectancy";
      case "freedom":
        return "Freedom";
      case "generosity":
        return "Generosity";
      case "corruption":
        return "Corruption";
      case "hdi":
        return "HDI";
      case "population":
        return "Population";
      default:
        return metric
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
    }
  }

  function getDatasetName(dataset) {
    switch (dataset) {
      case "happiness":
        return "World Happiness Report";
      case "hdi":
        return "Human Development Index";
      case "population":
        return "Global Population Data";
      default:
        return "Dataset";
    }
  }
</script>

<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { fade } from "svelte/transition";
  import { loadCombinedData, getRankingData } from "../utils/dataLoader";

  let datasetInfoVisible = {
    happiness: true,
    hdi: false,
    population: false,
  };

  let activeTab = "happiness";
  let loading = true;
  let error = null;
  let dataStats = {
    countries: 0,
    years: [],
    totalEntries: 0,
    metricCoverage: {},
    continentBreakdown: {},
    yearlyEntries: {},
  };
  let selectedDataset = "happiness"; // 'happiness', 'hdi', 'population'
  let selectedTab = "overview"; // 'overview', 'samples', 'structure'

  let sampleData = [];
  let columnDescriptions = {};

  function toggleDataset(dataset) {
    Object.keys(datasetInfoVisible).forEach((key) => {
      datasetInfoVisible[key] = false;
    });

    datasetInfoVisible[dataset] = true;
    activeTab = dataset;
  }

  onMount(async () => {
    renderDataCompleteness();
    await loadDataStats();
    loadColumnDescriptions();
  });

  async function loadDataStats() {
    try {
      loading = true;
      error = null;

      const combinedData = await loadCombinedData();

      if (combinedData && combinedData.data) {
        const data = combinedData.data;

        const uniqueCountries = [...new Set(data.map((item) => item.country))];
        const uniqueYears = [...new Set(data.map((item) => item.year))].sort();

        dataStats.countries = uniqueCountries.length;
        dataStats.years = uniqueYears;
        dataStats.totalEntries = data.length;

        const metrics = [
          "happiness_score",
          "gdp_per_capita",
          "social_support",
          "healthy_life_expectancy",
          "freedom",
          "generosity",
          "corruption",
          "hdi",
          "population",
        ];

        dataStats.metricCoverage = {};
        metrics.forEach((metric) => {
          const entriesWithMetric = data.filter(
            (item) =>
              item[metric] !== undefined &&
              item[metric] !== null &&
              !isNaN(item[metric])
          );

          dataStats.metricCoverage[metric] = {
            count: entriesWithMetric.length,
            percentage: Math.round(
              (entriesWithMetric.length / data.length) * 100
            ),
          };
        });

        dataStats.continentBreakdown = {};
        data.forEach((item) => {
          if (item.continent) {
            if (!dataStats.continentBreakdown[item.continent]) {
              dataStats.continentBreakdown[item.continent] = 0;
            }
            dataStats.continentBreakdown[item.continent]++;
          }
        });

        dataStats.yearlyEntries = {};
        uniqueYears.forEach((year) => {
          dataStats.yearlyEntries[year] = data.filter(
            (item) => item.year === year
          ).length;
        });

        await loadSampleData(selectedDataset);

        loading = false;
      } else {
        throw new Error("Failed to load data stats");
      }
    } catch (err) {
      console.error("Error loading data stats:", err);
      error = "Failed to load data statistics. Please try again later.";
      loading = false;
    }
  }

  async function loadSampleData(dataset) {
    try {
      let sampleSize = 10;
      let year = Math.max(...dataStats.years);

      switch (dataset) {
        case "happiness":
          sampleData = await getRankingData(
            year,
            "happiness_score",
            sampleSize
          );
          break;
        case "hdi":
          sampleData = await getRankingData(year, "hdi", sampleSize);
          break;
        case "population":
          sampleData = await getRankingData(year, "population", sampleSize);
          break;
        default:
          sampleData = await getRankingData(
            year,
            "happiness_score",
            sampleSize
          );
      }
    } catch (err) {
      console.error("Error loading sample data:", err);
      sampleData = [];
    }
  }

  function loadColumnDescriptions() {
    columnDescriptions = {
      happiness: [
        {
          name: "country",
          type: "string",
          description: "Name of the country",
        },
        {
          name: "year",
          type: "integer",
          description: "Year of the report",
        },
        {
          name: "happiness_score",
          type: "float",
          description:
            "Self-reported life satisfaction score on a scale of 0-10",
        },
        {
          name: "happiness_rank",
          type: "integer",
          description: "Country rank by happiness score for the given year",
        },
        {
          name: "gdp_per_capita",
          type: "float",
          description: "Contribution of GDP per capita to the happiness score",
        },
        {
          name: "social_support",
          type: "float",
          description: "Contribution of social support to the happiness score",
        },
        {
          name: "healthy_life_expectancy",
          type: "float",
          description:
            "Contribution of healthy life expectancy to the happiness score",
        },
        {
          name: "freedom",
          type: "float",
          description:
            "Contribution of freedom to make life choices to the happiness score",
        },
        {
          name: "generosity",
          type: "float",
          description: "Contribution of generosity to the happiness score",
        },
        {
          name: "corruption",
          type: "float",
          description:
            "Contribution of corruption perception to the happiness score",
        },
      ],
      hdi: [
        {
          name: "country",
          type: "string",
          description: "Name of the country",
        },
        {
          name: "year",
          type: "integer",
          description: "Year of the HDI value",
        },
        {
          name: "hdi",
          type: "float",
          description: "Human Development Index value (0-1)",
        },
        {
          name: "hdi_rank",
          type: "integer",
          description: "Country rank by HDI value for the given year",
        },
        {
          name: "life_expectancy",
          type: "float",
          description: "Life expectancy at birth in years",
        },
        {
          name: "education_index",
          type: "float",
          description:
            "Education index based on mean and expected years of schooling",
        },
        {
          name: "income_index",
          type: "float",
          description: "Income index based on GNI per capita",
        },
      ],
      population: [
        {
          name: "country",
          type: "string",
          description: "Name of the country",
        },
        {
          name: "year",
          type: "integer",
          description: "Year of the population estimate",
        },
        {
          name: "population",
          type: "integer",
          description: "Total population count",
        },
        {
          name: "population_density",
          type: "float",
          description: "Population per square kilometer of land area",
        },
        {
          name: "growth_rate",
          type: "float",
          description: "Annual population growth rate (percentage)",
        },
      ],
    };
  }

  async function handleDatasetChange(dataset) {
    selectedDataset = dataset;
    await loadSampleData(dataset);
  }

  function handleTabChange(tab) {
    selectedTab = tab;
  }

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }
</script>

<div class="data-details-container">
  <header>
    <h1>Dataset Details</h1>
    <p class="subtitle">
      Explore the structure, coverage, and sample data from the datasets used in
      HappiScope.
    </p>
  </header>

  <div class="dataset-tabs">
    <button
      class:active={selectedDataset === "happiness"}
      on:click={() => handleDatasetChange("happiness")}
    >
      World Happiness Report
    </button>
    <button
      class:active={selectedDataset === "hdi"}
      on:click={() => handleDatasetChange("hdi")}
    >
      Human Development Index
    </button>
    <button
      class:active={selectedDataset === "population"}
      on:click={() => handleDatasetChange("population")}
    >
      Population Data
    </button>
  </div>

  {#if loading}
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading dataset information...</p>
    </div>
  {:else if error}
    <div class="error-container">
      <p class="error-message">{error}</p>
      <button on:click={loadDataStats}>Retry</button>
    </div>
  {:else}
    <div class="content-tabs">
      <button
        class:active={selectedTab === "overview"}
        on:click={() => handleTabChange("overview")}
      >
        Overview
      </button>
      <button
        class:active={selectedTab === "samples"}
        on:click={() => handleTabChange("samples")}
      >
        Sample Data
      </button>
      <button
        class:active={selectedTab === "structure"}
        on:click={() => handleTabChange("structure")}
      >
        Data Structure
      </button>
    </div>

    <div class="tab-content">
      {#if selectedTab === "overview"}
        <div class="overview-tab" in:fade={{ duration: 300 }}>
          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-value">{formatNumber(dataStats.countries)}</div>
              <div class="stat-label">Countries</div>
            </div>

            <div class="stat-card">
              <div class="stat-value">
                {dataStats.years[0]} - {dataStats.years[
                  dataStats.years.length - 1
                ]}
              </div>
              <div class="stat-label">Year Range</div>
            </div>

            <div class="stat-card">
              <div class="stat-value">
                {formatNumber(dataStats.totalEntries)}
              </div>
              <div class="stat-label">Total Data Points</div>
            </div>
          </div>

          <div class="dataset-description">
            {#if selectedDataset === "happiness"}
              <h2>World Happiness Report Dataset</h2>
              <p>
                The World Happiness Report is a publication of the Sustainable
                Development Solutions Network, powered by data from the Gallup
                World Poll. The report ranks countries based on how their
                citizens assess their own well-being, along with various life
                factors that contribute to overall happiness.
              </p>
              <p>
                Each country's score is composed of surveyed life evaluations
                (happiness scores) and six key variables: GDP per capita, social
                support, healthy life expectancy, freedom to make life choices,
                generosity, and perception of corruption. These factors help
                explain why some countries rank higher than others.
              </p>
              <h3>Key Features:</h3>
              <ul>
                <li>Annual data from 2015 through 2024</li>
                <li>Coverage of approximately 150+ countries per year</li>
                <li>Six contributing factors to happiness scores</li>
                <li>Rankings and score comparisons between countries</li>
              </ul>
            {:else if selectedDataset === "hdi"}
              <h2>Human Development Index (HDI) Dataset</h2>
              <p>
                The Human Development Index (HDI) is a summary composite measure
                of a country's average achievements in three basic aspects of
                human development: health, knowledge, and standard of living.
                Published by the United Nations Development Programme (UNDP),
                the HDI ranks countries by level of "human development" and
                separates developed, developing, and underdeveloped countries.
              </p>
              <p>
                The HDI was created to emphasize that people and their
                capabilities should be the ultimate criteria for assessing the
                development of a country, not economic growth alone. It can also
                be used to question national policy choices, asking how two
                countries with the same level of GNI per capita can end up with
                different human development outcomes.
              </p>
              <h3>Key Features:</h3>
              <ul>
                <li>Composite index on a scale of 0 to 1</li>
                <li>
                  Three dimensions: long and healthy life, knowledge, and decent
                  standard of living
                </li>
                <li>Annual data from 2015 through 2024</li>
                <li>Coverage of approximately 190 countries</li>
              </ul>
            {:else if selectedDataset === "population"}
              <h2>Global Population Dataset</h2>
              <p>
                The Global Population dataset contains annual population
                estimates and projections for countries and territories around
                the world. The data is sourced from the World Bank's World
                Development Indicators, which compiles population data from
                various national and international sources.
              </p>
              <p>
                Population numbers provide important context when analyzing
                happiness and development metrics, as they can reveal how
                broadly shared societal benefits are and help identify patterns
                across countries of different sizes and population densities.
              </p>
              <h3>Key Features:</h3>
              <ul>
                <li>Annual population estimates from 2015 through 2024</li>
                <li>
                  Coverage of approximately 200+ countries and territories
                </li>
                <li>Population density information</li>
                <li>Annual growth rates</li>
              </ul>
            {/if}
          </div>

          <div class="coverage-section">
            <h2>Data Coverage</h2>

            <div class="coverage-charts">
              <div class="coverage-chart">
                <h3>Yearly Data Points</h3>
                <div class="bar-chart">
                  {#each Object.entries(dataStats.yearlyEntries) as [year, count]}
                    <div class="bar-container">
                      <div class="bar-label">{year}</div>
                      <div
                        class="bar"
                        style="width: {(count /
                          Math.max(...Object.values(dataStats.yearlyEntries))) *
                          100}%"
                      >
                        <div class="bar-value">{count}</div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>

              <div class="coverage-chart">
                <h3>Metric Completeness</h3>
                <div class="bar-chart">
                  {#each Object.entries(dataStats.metricCoverage) as [metric, stats]}
                    <div class="bar-container">
                      <div class="bar-label">{formatMetricName(metric)}</div>
                      <div class="bar" style="width: {stats.percentage}%">
                        <div class="bar-value">{stats.percentage}%</div>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>

            <div class="coverage-notes">
              <h3>Notes on Data Coverage</h3>
              <p>
                Data coverage varies across years and metrics. Some countries
                may have missing data for certain years or metrics. In the
                HappiScope visualizations, missing data is handled gracefully
                with clear indicators and appropriate filtering options.
              </p>
              <p>
                For time series analyses, we focus on countries with consistent
                data across multiple years to ensure accurate trend reporting.
                Where possible, missing values are imputed using appropriate
                statistical methods, but these imputed values are clearly marked
                in the interface.
              </p>
            </div>
          </div>
        </div>
      {:else if selectedTab === "samples"}
        <div class="samples-tab" in:fade={{ duration: 300 }}>
          <h2>
            Sample Data from {getDatasetName(selectedDataset)} ({dataStats
              .years[dataStats.years.length - 1]})
          </h2>

          {#if sampleData && sampleData.length > 0}
            <div class="sample-table-container">
              <table class="sample-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Country</th>
                    {#if selectedDataset === "happiness"}
                      <th>Happiness Score</th>
                      <th>GDP per Capita</th>
                      <th>Social Support</th>
                      <th>Life Expectancy</th>
                    {:else if selectedDataset === "hdi"}
                      <th>HDI Value</th>
                      <th>Life Expectancy</th>
                      <th>Education Index</th>
                      <th>Income Index</th>
                    {:else if selectedDataset === "population"}
                      <th>Population</th>
                      <th>Density</th>
                      <th>Growth Rate</th>
                    {/if}
                  </tr>
                </thead>
                <tbody>
                  {#each sampleData as country, i}
                    <tr>
                      <td>{i + 1}</td>
                      <td>{country.country}</td>
                      {#if selectedDataset === "happiness"}
                        <td>{country.happiness_score?.toFixed(2) || "N/A"}</td>
                        <td>{country.gdp_per_capita?.toFixed(2) || "N/A"}</td>
                        <td>{country.social_support?.toFixed(2) || "N/A"}</td>
                        <td
                          >{country.healthy_life_expectancy?.toFixed(2) ||
                            "N/A"}</td
                        >
                      {:else if selectedDataset === "hdi"}
                        <td>{country.hdi?.toFixed(3) || "N/A"}</td>
                        <td>{country.life_expectancy?.toFixed(1) || "N/A"}</td>
                        <td>{country.education_index?.toFixed(2) || "N/A"}</td>
                        <td>{country.income_index?.toFixed(2) || "N/A"}</td>
                      {:else if selectedDataset === "population"}
                        <td>{formatNumber(country.population) || "N/A"}</td>
                        <td
                          >{country.population_density?.toFixed(1) || "N/A"}</td
                        >
                        <td
                          >{country.growth_rate
                            ? (country.growth_rate * 100).toFixed(2) + "%"
                            : "N/A"}</td
                        >
                      {/if}
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>

            <p class="sample-note">
              Note: This sample shows the top {sampleData.length} countries by
              {selectedDataset === "happiness"
                ? "happiness score"
                : selectedDataset === "hdi"
                  ? "HDI value"
                  : "population"} for the year
              {dataStats.years[dataStats.years.length - 1]}.
            </p>
          {:else}
            <p class="no-data-message">No sample data available.</p>
          {/if}

          <div class="data-source-info">
            <h3>Data Sources</h3>
            {#if selectedDataset === "happiness"}
              <p>
                <strong>Source:</strong> World Happiness Report, Sustainable
                Development Solutions Network<br />
                <strong>URL:</strong>
                <a href="https://worldhappiness.report/" target="_blank"
                  >https://worldhappiness.report/</a
                ><br />
                <strong>License:</strong> Creative Commons Attribution 4.0 International
                License
              </p>
            {:else if selectedDataset === "hdi"}
              <p>
                <strong>Source:</strong> Human Development Reports, United
                Nations Development Programme<br />
                <strong>URL:</strong>
                <a href="http://hdr.undp.org/en/data" target="_blank"
                  >http://hdr.undp.org/en/data</a
                ><br />
                <strong>License:</strong> Open Data Commons Attribution License
              </p>
            {:else if selectedDataset === "population"}
              <p>
                <strong>Source:</strong> World Development Indicators, World
                Bank<br />
                <strong>URL:</strong>
                <a
                  href="https://data.worldbank.org/indicator/SP.POP.TOTL"
                  target="_blank"
                  >https://data.worldbank.org/indicator/SP.POP.TOTL</a
                ><br />
                <strong>License:</strong> Creative Commons Attribution 4.0 International
                License
              </p>
            {/if}
          </div>
        </div>
      {:else if selectedTab === "structure"}
        <div class="structure-tab" in:fade={{ duration: 300 }}>
          <h2>Data Structure for {getDatasetName(selectedDataset)}</h2>

          <p class="structure-description">
            Below is the schema for the {getDatasetName(selectedDataset)} dataset,
            showing column names, data types, and descriptions of each field.
          </p>

          <table class="structure-table">
            <thead>
              <tr>
                <th>Column Name</th>
                <th>Data Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {#if columnDescriptions[selectedDataset]}
                {#each columnDescriptions[selectedDataset] as column}
                  <tr>
                    <td><code>{column.name}</code></td>
                    <td>{column.type}</td>
                    <td>{column.description}</td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>

          <div class="data-notes">
            <h3>Data Processing Notes</h3>
            <p>
              All datasets undergo several processing steps before being
              integrated into the HappiScope visualizations:
            </p>
            <ol>
              <li>
                <strong>Data Cleaning:</strong> Handling of missing values, outlier
                detection, and correction of inconsistencies in raw data.
              </li>
              <li>
                <strong>Normalization:</strong> Country names are standardized across
                all datasets to ensure consistent mapping and joining.
              </li>
              <li>
                <strong>Integration:</strong> Datasets are joined using country and
                year as common keys, creating a unified dataset for visualization.
              </li>
              <li>
                <strong>Derived Metrics:</strong> Additional metrics like year-over-year
                changes and rankings are calculated from the raw data.
              </li>
              <li>
                <strong>Geocoding:</strong> Countries are mapped to their geographical
                coordinates and standard country codes for map visualizations.
              </li>
            </ol>
            <p>
              For more detailed information about data processing methodologies,
              please visit our
              <a href="#/methodology">Methodology</a> page.
            </p>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .data-details-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  header {
    margin-bottom: 2rem;
    text-align: center;
  }

  h1 {
    font-size: 2.5rem;
    color: #1e3a8a;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #4b5563;
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  h2 {
    font-size: 1.8rem;
    color: #1e3a8a;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.3rem;
    color: #2563eb;
    margin: 1.5rem 0 0.75rem;
  }

  p {
    font-size: 1.05rem;
    color: #4b5563;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .dataset-tabs,
  .content-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .dataset-tabs button {
    padding: 0.75rem 1.25rem;
    border-radius: 6px;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    color: #4b5563;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dataset-tabs button.active {
    background-color: #2563eb;
    color: white;
    border-color: #2563eb;
  }

  .dataset-tabs button:hover:not(.active) {
    background-color: #e5e7eb;
  }

  .content-tabs button {
    padding: 0.6rem 1rem;
    border-radius: 4px;
    background-color: white;
    border: 1px solid #e5e7eb;
    color: #4b5563;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .content-tabs button.active {
    border-bottom: 3px solid #2563eb;
    color: #2563eb;
    font-weight: 500;
  }

  .content-tabs button:hover:not(.active) {
    background-color: #f9fafb;
  }

  .tab-content {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    padding: 2rem;
    min-height: 400px;
    margin-bottom: 2rem;
  }

  .stats-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    flex: 1;
    min-width: 200px;
    background-color: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #2563eb;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 1.1rem;
    color: #64748b;
  }

  .dataset-description {
    margin-bottom: 2.5rem;
  }

  .dataset-description ul {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .dataset-description li {
    margin-bottom: 0.5rem;
    color: #4b5563;
    line-height: 1.5;
  }

  .coverage-charts {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .coverage-chart {
    flex: 1;
    min-width: 300px;
  }

  .bar-chart {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .bar-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .bar-label {
    flex: 0 0 150px;
    font-size: 0.9rem;
    color: #64748b;
    text-align: right;
  }

  .bar {
    height: 24px;
    background-color: #3b82f6;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    transition: width 0.5s ease;
    min-width: 40px;
  }

  .bar-value {
    font-size: 0.8rem;
    color: white;
    font-weight: 500;
  }

  .coverage-notes {
    background-color: #f8fafc;
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 4px solid #3b82f6;
  }

  .sample-table-container {
    overflow-x: auto;
    margin-bottom: 1.5rem;
  }

  .sample-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e5e7eb;
  }

  .sample-table th {
    background-color: #f3f4f6;
    padding: 1rem 0.75rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #d1d5db;
    white-space: nowrap;
  }

  .sample-table td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    color: #4b5563;
  }

  .sample-table tr:nth-child(even) {
    background-color: #f9fafb;
  }

  .sample-note {
    font-style: italic;
    color: #64748b;
    font-size: 0.95rem;
  }

  .no-data-message {
    text-align: center;
    padding: 3rem 0;
    color: #64748b;
    font-style: italic;
  }

  .data-source-info {
    margin-top: 2.5rem;
    padding: 1.5rem;
    background-color: #f0f7ff;
    border-radius: 8px;
    border: 1px solid #93c5fd;
  }

  .data-source-info h3 {
    color: #1e40af;
    margin-top: 0;
  }

  .data-source-info a {
    color: #2563eb;
    text-decoration: none;
  }

  .data-source-info a:hover {
    text-decoration: underline;
  }

  .structure-description {
    margin-bottom: 1.5rem;
  }

  .structure-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }

  .structure-table th {
    background-color: #f3f4f6;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    border-bottom: 2px solid #d1d5db;
  }

  .structure-table td {
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    color: #4b5563;
    line-height: 1.4;
    vertical-align: top;
  }

  code {
    font-family: monospace;
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9rem;
    color: #374151;
  }

  .data-notes {
    background-color: #f0fdf4;
    border-radius: 8px;
    padding: 1.5rem;
    border-left: 4px solid #34d399;
  }

  .data-notes h3 {
    color: #047857;
    margin-top: 0;
  }

  .data-notes ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .data-notes li {
    margin-bottom: 0.75rem;
    color: #4b5563;
    line-height: 1.5;
  }

  .data-notes a {
    color: #059669;
    text-decoration: none;
  }

  .data-notes a:hover {
    text-decoration: underline;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
  }

  .error-message {
    color: #dc2626;
    margin-bottom: 1rem;
  }

  .error-container button {
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .dataset-tabs button,
    .content-tabs button {
      flex: 1;
      text-align: center;
      min-width: unset;
      padding: 0.6rem;
    }

    .stats-cards {
      flex-direction: column;
    }

    .tab-content {
      padding: 1.5rem 1rem;
    }

    .bar-label {
      flex: 0 0 100px;
      font-size: 0.8rem;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.2rem;
    }
  }
</style>
