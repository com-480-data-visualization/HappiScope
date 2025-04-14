<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import {
    selectedYear,
    selectedMetric,
    selectedView,
    addToRecentlyViewed,
  } from "../stores/appStore";
  import {
    getDataForYear,
    getRankingData,
    loadHappinessData,
    loadGlobalTrendsData,
    loadCorrelationsData,
  } from "../utils/dataLoader";
  import WorldMap from "../components/WorldMap.svelte";
  import BarChart from "../components/BarChart.svelte";

  // Local state
  let loadingHighlights = true;
  let topCountries = [];
  let highlightStats = {
    happiest: { country: "", score: 0 },
    mostImproved: { country: "", change: 0 },
    correlations: [
      { factor: "GDP per Capita", correlation: 0 },
      { factor: "Social Support", correlation: 0 },
      { factor: "Life Expectancy", correlation: 0 },
    ],
  };
  let worldMapData = [];
  let currentYear = new Date().getFullYear();
  const latestDataYear = 2024; // Set to the most recent year in our dataset
  let visibleSection = "intro";

  // Track scroll position for animations
  let scrollY;

  onMount(async () => {
    // Set default year to the latest available in our dataset
    selectedYear.set(latestDataYear);

    // Load highlight data
    await loadHighlights();

    // Subscribe to scroll events for animations
    const sections = document.querySelectorAll(".animate-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  });

  async function loadHighlights() {
    loadingHighlights = true;

    try {
      // Load world map data for the most recent year
      const yearData = await getDataForYear(latestDataYear);
      if (yearData && yearData.length > 0) {
        worldMapData = yearData;

        // Get top 5 countries by happiness score
        const happinessRankings = await getRankingData(
          latestDataYear,
          "score",
          5
        );

        if (happinessRankings?.length > 0) {
          topCountries = happinessRankings;
          highlightStats.happiest = {
            country: happinessRankings[0].country,
            score: happinessRankings[0].value,
          };

          // Add top countries to recently viewed
          addToRecentlyViewed(happinessRankings[0].country);
        }
      }

      // Calculate most improved country over time
      const allData = await loadHappinessData();
      if (allData && allData.length > 0) {
        const improvementData = getMostImprovedCountry(allData);
        if (improvementData) {
          highlightStats.mostImproved = improvementData;
        }
      }

      // Get correlations from precomputed data
      const correlationsData = await loadCorrelationsData();
      if (correlationsData && correlationsData.data) {
        const factors = [
          { name: "GDP per Capita", key: "gdp_per_capita" },
          { name: "Social Support", key: "social_support" },
          { name: "Life Expectancy", key: "life_expectancy" },
        ];

        const correlations = factors.map((factor) => {
          const index = correlationsData.columns.indexOf(factor.key);
          const scoreIndex = correlationsData.columns.indexOf("score");
          if (index >= 0 && scoreIndex >= 0) {
            return {
              factor: factor.name,
              correlation: parseFloat(
                correlationsData.data[scoreIndex][index].toFixed(2)
              ),
            };
          }
          return { factor: factor.name, correlation: 0.5 }; // Fallback
        });

        // Sort by correlation strength (absolute value)
        correlations.sort(
          (a, b) => Math.abs(b.correlation) - Math.abs(a.correlation)
        );
        highlightStats.correlations = correlations;
      }

      loadingHighlights = false;
    } catch (err) {
      console.error("Error loading highlights:", err);
      loadingHighlights = false;
    }
  }

  // Function to find most improved country between first and last years
  function getMostImprovedCountry(data) {
    if (!data || data.length === 0) return null;

    // Get all years in the dataset
    const years = [...new Set(data.map((d) => d.year))].sort();
    const firstYear = years[0];
    const lastYear = years[years.length - 1];

    // Get countries with data in both years
    const firstYearData = data.filter((d) => d.year === firstYear);
    const lastYearData = data.filter((d) => d.year === lastYear);

    // Calculate improvements
    const improvements = [];

    firstYearData.forEach((first) => {
      const last = lastYearData.find((d) => d.country === first.country);

      if (last && first.score !== undefined && last.score !== undefined) {
        improvements.push({
          country: first.country,
          startScore: first.score,
          endScore: last.score,
          change: last.score - first.score,
        });
      }
    });

    // Sort by improvement (descending)
    improvements.sort((a, b) => b.change - a.change);

    // Return the top improved country
    if (improvements.length > 0) {
      return {
        country: improvements[0].country,
        change: improvements[0].change,
      };
    }

    return null;
  }

  function navigateToExplore() {
    selectedYear.set(latestDataYear);
    selectedMetric.set("score");
    selectedView.set("map");
    window.location.href = "#/explore";
  }

  function navigateToRankings() {
    selectedYear.set(latestDataYear);
    selectedMetric.set("score");
    selectedView.set("ranking");
    window.location.href = "#/explore";
  }

  function navigateToMethodology() {
    window.location.href = "#/methodology";
  }
</script>

<svelte:window bind:scrollY />

<div class="home-container">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <h1 in:fly={{ y: -20, duration: 800 }}>HappiScope</h1>
      <h2 in:fly={{ y: -10, duration: 800, delay: 300 }}>
        Visualizing Global Happiness
      </h2>

      <p in:fly={{ y: 10, duration: 800, delay: 500 }}>
        Explore how happiness varies across the world, discover what factors
        contribute most to well-being, and see how happiness has changed over
        time.
      </p>

      <div class="hero-actions" in:fly={{ y: 20, duration: 800, delay: 700 }}>
        <button class="primary-btn" on:click={navigateToExplore}>
          Explore the Data
        </button>
        <button class="secondary-btn" on:click={navigateToMethodology}>
          Learn About the Project
        </button>
      </div>
    </div>

    <div class="hero-visual" in:fade={{ duration: 1500 }}>
      {#if worldMapData.length > 0}
        <WorldMap
          data={worldMapData}
          metric="score"
          width={600}
          height={400}
          interactive={false}
        />
      {:else}
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
        </div>
      {/if}
    </div>
  </section>

  <!-- Key Insights Section -->
  <section class="insights-section animate-section">
    <h2>Key Insights</h2>

    {#if loadingHighlights}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading highlights...</p>
      </div>
    {:else}
      <div class="insight-cards">
        <div class="insight-card">
          <div class="insight-icon">🏆</div>
          <h3>Happiest Country</h3>
          <div class="insight-value">{highlightStats.happiest.country}</div>
          <p>
            With a happiness score of {highlightStats.happiest.score.toFixed(2)}
          </p>
        </div>

        <div class="insight-card">
          <div class="insight-icon">📈</div>
          <h3>Most Improved</h3>
          <div class="insight-value">{highlightStats.mostImproved.country}</div>
          <p>
            Increased by {highlightStats.mostImproved.change.toFixed(2)} points
          </p>
        </div>

        <div class="insight-card">
          <div class="insight-icon">🔍</div>
          <h3>Key Correlation</h3>
          <div class="insight-value">
            {highlightStats.correlations[0].factor}
          </div>
          <p>
            {(highlightStats.correlations[0].correlation * 100).toFixed(0)}%
            correlation with happiness
          </p>
        </div>
      </div>

      <div class="insights-cta">
        <p>
          Discover more patterns and insights by exploring the full dataset.
        </p>
        <button on:click={navigateToExplore}>Start Exploring</button>
      </div>
    {/if}
  </section>

  <!-- Top Countries Section -->
  <section class="rankings-section animate-section">
    <h2>Happiest Countries</h2>

    {#if topCountries.length > 0}
      <div class="rankings-chart">
        <BarChart
          data={topCountries}
          metric="value"
          xField="country"
          height={400}
          showLegend={false}
          showLabels={true}
          maxItems={5}
        />
      </div>

      <div class="rankings-info">
        <p>
          These countries consistently rank at the top of the happiness index.
          What can we learn from their social policies, economic systems, and
          cultural values?
        </p>

        <button on:click={navigateToRankings}>See Full Rankings</button>
      </div>
    {:else}
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Loading rankings...</p>
      </div>
    {/if}
  </section>

  <!-- About the Project Section -->
  <section class="about-section animate-section">
    <h2>About HappiScope</h2>

    <div class="about-content">
      <div class="about-text">
        <p>
          HappiScope is an interactive data visualization project that explores
          global happiness trends using data from the World Happiness Report,
          Human Development Index (HDI), and global population statistics.
        </p>

        <p>
          Created for the "Data Visualization" course at EPFL, this project
          demonstrates how effective visualization can uncover patterns and
          insights in complex global datasets.
        </p>

        <h3>Key Features:</h3>
        <ul>
          <li>Interactive world map visualization</li>
          <li>Country rankings by multiple metrics</li>
          <li>Time-series analysis across 10 years (2015-2024)</li>
          <li>
            Correlation analysis between happiness and contributing factors
          </li>
          <li>Standardized data from multiple sources</li>
          <li>Responsive design for both desktop and mobile</li>
        </ul>

        <div class="about-cta">
          <button on:click={navigateToMethodology}
            >Learn About Methodology</button
          >
        </div>
      </div>

      <div class="about-image">
        <img
          src="/images/data-visualization.svg"
          alt="Data visualization illustration"
          onerror="this.onerror=null; this.src='https://placehold.co/300x300/e6f7ff/1e3a8a?text=Data+Visualization'"
        />
      </div>
    </div>
  </section>
</div>

<style>
  /* Existing styles remain unchanged */
</style>
