<script context="module">
  // Helper function to categorize fields
  function getFieldCategory(fieldName) {
    if (
      ["country", "country_code", "region", "continent"].includes(fieldName)
    ) {
      return "Geographic";
    } else if (["year"].includes(fieldName)) {
      return "Temporal";
    } else if (
      [
        "score",
        "gdp_per_capita",
        "social_support",
        "life_expectancy",
        "freedom",
        "corruption",
        "generosity",
        "dystopia_residual",
      ].includes(fieldName)
    ) {
      return "Happiness Metrics";
    } else if (["hdi", "development_category"].includes(fieldName)) {
      return "Development";
    } else if (
      [
        "population",
        "pop_male",
        "pop_female",
        "population_density",
        "population_category",
      ].includes(fieldName)
    ) {
      return "Demographic";
    } else if (["weighted_score"].includes(fieldName)) {
      return "Derived";
    }
    return "Other";
  }
</script>

<script>
  import { Link } from "svelte-routing";
  import { onMount } from "svelte";
  import { loadDataDictionary } from "../utils/dataLoader";

  // Local state for data dictionary
  let dataDictionary = null;
  let loadingDictionary = true;

  // Track which section is in view for the table of contents
  let activeSection = "introduction";

  onMount(async () => {
    // Load data dictionary
    try {
      loadingDictionary = true;
      dataDictionary = await loadDataDictionary();
      loadingDictionary = false;
    } catch (error) {
      console.error("Error loading data dictionary:", error);
      loadingDictionary = false;
    }

    // Set up intersection observer for each section
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        });
      },
      { threshold: 0.6 } // Require 60% of the section to be visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  });

  // Scroll to section
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<div class="methodology-container">
  <aside class="toc">
    <div class="toc-content">
      <h2>Contents</h2>
      <ul>
        <li>
          <a
            href="#introduction"
            class:active={activeSection === "introduction"}
            on:click|preventDefault={() => scrollToSection("introduction")}
          >
            Introduction
          </a>
        </li>
        <li>
          <a
            href="#data-sources"
            class:active={activeSection === "data-sources"}
            on:click|preventDefault={() => scrollToSection("data-sources")}
          >
            Data Sources
          </a>
        </li>
        <li>
          <a
            href="#data-processing"
            class:active={activeSection === "data-processing"}
            on:click|preventDefault={() => scrollToSection("data-processing")}
          >
            Data Processing
          </a>
        </li>
        <li>
          <a
            href="#naming-standardization"
            class:active={activeSection === "naming-standardization"}
            on:click|preventDefault={() =>
              scrollToSection("naming-standardization")}
          >
            Naming Standardization
          </a>
        </li>
        <li>
          <a
            href="#visualization-methods"
            class:active={activeSection === "visualization-methods"}
            on:click|preventDefault={() =>
              scrollToSection("visualization-methods")}
          >
            Visualization Methods
          </a>
        </li>
        <li>
          <a
            href="#technical-implementation"
            class:active={activeSection === "technical-implementation"}
            on:click|preventDefault={() =>
              scrollToSection("technical-implementation")}
          >
            Technical Implementation
          </a>
        </li>
        <li>
          <a
            href="#data-dictionary"
            class:active={activeSection === "data-dictionary"}
            on:click|preventDefault={() => scrollToSection("data-dictionary")}
          >
            Data Dictionary
          </a>
        </li>
      </ul>
    </div>
  </aside>

  <main class="content">
    <header>
      <h1>Methodology</h1>
      <p class="subtitle">
        Documentation of data sources, processing methods, and visualization
        techniques used in the HappiScope project.
      </p>
    </header>

    <section id="introduction">
      <h2>Introduction</h2>
      <p>
        HappiScope is a data visualization project that aims to provide insights
        into global happiness trends and factors that contribute to well-being
        across different countries. This methodology page documents the approach
        taken to collect, process, and visualize the data.
      </p>
      <p>
        The project integrates multiple datasets including the World Happiness
        Report, Human Development Index (HDI), and global population statistics
        to provide a comprehensive view of happiness and its correlates across
        countries and over time.
      </p>
    </section>

    <section id="data-sources">
      <h2>Data Sources</h2>
      <p>
        HappiScope draws upon three main data sources, each providing a
        different perspective on global well-being and development:
      </p>

      {#if dataDictionary && dataDictionary.sources}
        {#each Object.entries(dataDictionary.sources) as [key, source]}
          <div class="data-source-card">
            <h3>{source.name}</h3>
            <p>
              <strong>Years covered:</strong>
              {source.years}
            </p>
            <p>
              <strong>Description:</strong>
              {source.description}
            </p>
            <p>
              <strong>URL:</strong>
              <a href={source.source} target="_blank">{source.source}</a>
            </p>
          </div>
        {/each}
      {:else}
        <div class="data-source-card">
          <h3>World Happiness Report</h3>
          <p>
            <strong>Publisher:</strong> Sustainable Development Solutions Network
          </p>
          <p><strong>Years covered:</strong> 2015-2024</p>
          <p>
            <strong>Description:</strong> Annual survey data measuring subjective
            well-being across countries, including overall happiness scores and contributing
            factors like social support, freedom, and corruption perception.
          </p>
          <p>
            <strong>URL:</strong>
            <a href="https://worldhappiness.report/" target="_blank"
              >https://worldhappiness.report/</a
            >
          </p>
        </div>

        <div class="data-source-card">
          <h3>Human Development Index (HDI)</h3>
          <p>
            <strong>Publisher:</strong> United Nations Development Programme
          </p>
          <p><strong>Years covered:</strong> 2015-2024</p>
          <p>
            <strong>Description:</strong> Composite index measuring average achievement
            in key dimensions of human development: a long and healthy life, being
            knowledgeable, and having a decent standard of living.
          </p>
          <p>
            <strong>URL:</strong>
            <a
              href="http://hdr.undp.org/en/content/human-development-index-hdi"
              target="_blank">http://hdr.undp.org/</a
            >
          </p>
        </div>

        <div class="data-source-card">
          <h3>Global Population Data</h3>
          <p><strong>Publisher:</strong> World Bank</p>
          <p><strong>Years covered:</strong> 2015-2024</p>
          <p>
            <strong>Description:</strong> Annual population estimates for countries
            and territories, providing context for the scale and representation of
            happiness and development metrics.
          </p>
          <p>
            <strong>URL:</strong>
            <a
              href="https://data.worldbank.org/indicator/SP.POP.TOTL"
              target="_blank">https://data.worldbank.org/</a
            >
          </p>
        </div>
      {/if}
    </section>

    <section id="data-processing">
      <h2>Data Processing</h2>
      <p>
        Several data processing steps were taken to prepare the raw data for
        visualization:
      </p>

      <div class="process-step">
        <h3>1. Data Cleaning</h3>
        <p>
          Raw data files were processed to handle missing values, outliers, and
          inconsistencies:
        </p>
        <ul>
          <li>
            Missing happiness scores were imputed where possible using data from
            adjacent years
          </li>
          <li>
            Countries with less than 50% data coverage across years were
            excluded from time-series analyses
          </li>
          <li>
            Outlier detection and validation was performed for anomalous values
          </li>
          <li>
            Population data was rounded to the nearest thousand for consistency
          </li>
        </ul>
      </div>

      <div class="process-step">
        <h3>2. Data Integration</h3>
        <p>The three datasets were integrated based on country and year:</p>
        <ul>
          <li>
            Country names were standardized across all datasets (see <a
              href="#naming-standardization">Naming Standardization</a
            >)
          </li>
          <li>A unified schema was created with consistent field naming</li>
          <li>
            Year fields were normalized to ensure proper temporal alignment
          </li>
          <li>
            HDI and population data were joined to happiness data using country
            and year as keys
          </li>
        </ul>
      </div>

      <div class="process-step">
        <h3>3. Data Transformation</h3>
        <p>
          Several transformations were applied to create additional metrics:
        </p>
        <ul>
          <li>
            Year-over-year change in happiness score was calculated for trend
            analysis
          </li>
          <li>
            Population density was derived from population and country area data
          </li>
          <li>Countries were grouped by continent for regional analysis</li>
          <li>Ranking data was calculated for each metric and year</li>
          <li>
            Normalized versions of metrics were created for cross-metric
            comparisons
          </li>
        </ul>
      </div>

      <div class="process-step">
        <h3>4. Data Export</h3>
        <p>The processed data was exported in multiple formats:</p>
        <ul>
          <li>JSON files for direct use in the web application</li>
          <li>
            Yearly data files to support filtering by specific time periods
          </li>
          <li>Combined dataset for analyses that span the entire timeline</li>
          <li>Lightweight summary dataset for initial page loads</li>
        </ul>
      </div>
    </section>

    <section id="naming-standardization">
      <h2>Naming Standardization</h2>
      <p>
        A critical challenge in this project was resolving inconsistencies in
        country naming across datasets. The following approach was used to
        standardize entity names:
      </p>

      <div class="standardization-details">
        <h3>Country Name Harmonization</h3>
        <p>
          A master mapping table was created to standardize country names across
          all datasets. This addressed several types of discrepancies:
        </p>
        <table class="standardization-table">
          <thead>
            <tr>
              <th>Issue Type</th>
              <th>Example</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Spelling variations</td>
              <td>"United States" vs. "United States of America" vs. "USA"</td>
              <td>Mapped to standard form: "United States"</td>
            </tr>
            <tr>
              <td>Transliteration differences</td>
              <td>"Côte d'Ivoire" vs. "Ivory Coast"</td>
              <td>Used official English name: "Côte d'Ivoire"</td>
            </tr>
            <tr>
              <td>Political status changes</td>
              <td>"North Macedonia" vs. "Macedonia"</td>
              <td>Used current official name: "North Macedonia"</td>
            </tr>
            <tr>
              <td>Special characters</td>
              <td>"Türkiye" vs. "Turkey"</td>
              <td>Consistent handling of diacritics, using "Türkiye"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="standardization-details">
        <h3>Field Name Standardization</h3>
        <p>
          Field names were standardized across datasets according to these
          principles:
        </p>
        <ul>
          <li>
            Use lowercase with underscores for all field names (e.g., <code
              >happiness_score</code
            >)
          </li>
          <li>
            Use consistent prefixes for related fields (e.g., all happiness
            factors start with the same prefix)
          </li>
          <li>
            Avoid abbreviations unless universally recognized (e.g., <code
              >gdp_per_capita</code
            >)
          </li>
          <li>Maintain consistent tense and form across similar fields</li>
          <li>
            Use suffixes to indicate unit types where appropriate (e.g., <code
              >_percent</code
            >, <code>_index</code>)
          </li>
        </ul>
      </div>
    </section>

    <section id="visualization-methods">
      <h2>Visualization Methods</h2>
      <p>
        HappiScope employs several visualization techniques to represent
        different aspects of the data:
      </p>

      <div class="visualization-method">
        <h3>Choropleth World Map</h3>
        <p>
          A color-coded world map visualization where countries are shaded
          according to their happiness score or other selected metrics. This
          provides an immediate global overview of the data distribution.
        </p>
        <p>
          <strong>Implementation details:</strong>
        </p>
        <ul>
          <li>D3.js geo projection using Natural Earth data</li>
          <li>Color scales calibrated to the data range of each metric</li>
          <li>Interactive tooltips providing detailed information on hover</li>
          <li>Zoom and pan capabilities for detailed exploration</li>
          <li>Missing data indicated by a neutral gray color</li>
        </ul>
      </div>

      <div class="visualization-method">
        <h3>Bar Charts for Rankings</h3>
        <p>
          Bar charts are used to display country rankings for various metrics,
          making it easy to compare values across countries for a specific year.
        </p>
        <p>
          <strong>Implementation details:</strong>
        </p>
        <ul>
          <li>Horizontal bars for better readability of country names</li>
          <li>Color-coding by continent for regional patterns</li>
          <li>Animated transitions when changing metrics or years</li>
          <li>Value labels for precise reading</li>
          <li>Consistent scaling for meaningful comparisons</li>
        </ul>
      </div>

      <div class="visualization-method">
        <h3>Line Charts for Time Series</h3>
        <p>
          Line charts display trends over time for selected countries, allowing
          users to observe changes in happiness and other metrics across the
          years.
        </p>
        <p>
          <strong>Implementation details:</strong>
        </p>
        <ul>
          <li>
            Multiple lines with distinct colors and patterns for country
            differentiation
          </li>
          <li>Interactive points showing exact values on hover</li>
          <li>Smooth transitions when adding or removing countries</li>
          <li>Optional confidence intervals where data allows</li>
          <li>Grid lines for easier value reading</li>
        </ul>
      </div>
    </section>

    <section id="technical-implementation">
      <h2>Technical Implementation</h2>
      <p>
        HappiScope is built using modern web technologies to ensure performance,
        accessibility, and a rich user experience:
      </p>

      <div class="tech-stack">
        <h3>Framework & Libraries</h3>
        <ul>
          <li>
            <strong>Svelte:</strong> A reactive component-based framework for building
            the user interface
          </li>
          <li>
            <strong>D3.js:</strong> Data visualization library powering the custom
            charts and maps
          </li>
          <li>
            <strong>Rollup:</strong> Module bundler for optimizing the application
            size
          </li>
          <li>
            <strong>Svelte-Routing:</strong> Handles client-side navigation between
            views
          </li>
        </ul>
      </div>

      <div class="tech-stack">
        <h3>Project Architecture</h3>
        <p>The application follows a component-based architecture:</p>
        <ul>
          <li>
            <strong>Components:</strong> Reusable visualization elements (WorldMap,
            BarChart, LineChart)
          </li>
          <li>
            <strong>Routes:</strong> Main application views (Home, Explore, Data
            Details, Methodology)
          </li>
          <li>
            <strong>Stores:</strong> Svelte stores for global state management
          </li>
          <li><strong>Utils:</strong> Data loading and processing utilities</li>
          <li>
            <strong>Public:</strong> Static assets and the compiled application
          </li>
        </ul>
      </div>

      <div class="tech-stack">
        <h3>Performance Optimizations</h3>
        <p>Several strategies are employed to ensure good performance:</p>
        <ul>
          <li>
            Data loading is deferred and cached to minimize network requests
          </li>
          <li>
            Complex visualizations use canvas rendering for better performance
            with large datasets
          </li>
          <li>
            Throttling and debouncing for performance-intensive operations like
            map interactions
          </li>
          <li>Progressive loading of data, starting with summarized views</li>
          <li>Responsive handling of window resize events</li>
        </ul>
      </div>

      <div class="tech-stack">
        <h3>Accessibility Considerations</h3>
        <p>The application is designed with accessibility in mind:</p>
        <ul>
          <li>Semantic HTML structure for screen reader compatibility</li>
          <li>ARIA attributes on interactive elements</li>
          <li>Keyboard navigation support for all interactive features</li>
          <li>Color schemes tested for colorblindness compatibility</li>
          <li>Alternative text representations of visualized data</li>
          <li>Responsive design for various devices and screen sizes</li>
        </ul>
      </div>
    </section>

    <section id="data-dictionary">
      <h2>Data Dictionary</h2>
      <p>
        This data dictionary documents the standardized field names used across
        the HappiScope project, ensuring consistent interpretation of the data.
      </p>

      {#if loadingDictionary}
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Loading data dictionary...</p>
        </div>
      {:else if dataDictionary && dataDictionary.fields}
        <table class="data-dictionary-table">
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.entries(dataDictionary.fields) as [field, description]}
              <tr>
                <td><code>{field}</code></td>
                <td>{description}</td>
                <td>{getFieldCategory(field)}</td>
              </tr>
            {/each}
          </tbody>
        </table>

        <h3>Data Transformation Notes</h3>
        {#if dataDictionary.transformation_notes}
          <ul class="transformation-notes">
            {#each dataDictionary.transformation_notes as note}
              <li>{note}</li>
            {/each}
          </ul>
        {/if}
      {:else}
        <p class="error-message">Data dictionary not available.</p>

        <table class="data-dictionary-table">
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Source</th>
              <th>Range/Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>country</td>
              <td>string</td>
              <td>Standardized country name</td>
              <td>All</td>
              <td>-</td>
            </tr>
            <tr>
              <td>country_code</td>
              <td>string</td>
              <td>ISO 3166-1 alpha-3 country code</td>
              <td>All</td>
              <td>e.g., "USA", "FIN"</td>
            </tr>
            <tr>
              <td>year</td>
              <td>integer</td>
              <td>Reference year for the data</td>
              <td>All</td>
              <td>2015-2024</td>
            </tr>
            <!-- Additional fields would go here -->
          </tbody>
        </table>
      {/if}
    </section>

    <section class="conclusion">
      <h2>Conclusion</h2>
      <p>
        The methodology outlined above represents our approach to creating a
        robust, accurate, and insightful visualization of global happiness data.
        Through careful data processing, standardization, and thoughtful
        visualization design, HappiScope aims to provide meaningful insights
        into the factors that contribute to happiness and well-being around the
        world.
      </p>
      <p>
        For further questions about the methodology or to access the raw data
        used in this project, please visit our GitHub repository or contact the
        project team.
      </p>
    </section>
  </main>
</div>

<style>
  .methodology-container {
    display: flex;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
    gap: 2rem;
  }

  .toc {
    width: 280px;
    flex-shrink: 0;
    position: sticky;
    top: 2rem;
    align-self: flex-start;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
  }

  .toc-content {
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .toc h2 {
    font-size: 1.5rem;
    color: #1e3a8a;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .toc ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc a {
    display: block;
    padding: 0.5rem 0;
    color: #4b5563;
    text-decoration: none;
    border-left: 3px solid transparent;
    padding-left: 0.75rem;
    transition: all 0.2s ease;
  }

  .toc a:hover {
    color: #2563eb;
    background-color: #f0f7ff;
    border-left-color: #93c5fd;
  }

  .toc a.active {
    color: #2563eb;
    font-weight: 500;
    border-left-color: #2563eb;
    background-color: #eff6ff;
  }

  .content {
    flex: 1;
    max-width: 900px;
  }

  header {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.5rem;
    color: #1e3a8a;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #4b5563;
    line-height: 1.6;
  }

  section {
    margin-bottom: 4rem;
    scroll-margin-top: 2rem;
  }

  h2 {
    font-size: 2rem;
    color: #1e3a8a;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e5e7eb;
  }

  h3 {
    font-size: 1.5rem;
    color: #2563eb;
    margin: 1.5rem 0 1rem;
  }

  p {
    font-size: 1.05rem;
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 1.2rem;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 1.2rem;
  }

  li {
    font-size: 1.05rem;
    color: #4b5563;
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }

  a {
    color: #2563eb;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  code {
    font-family: monospace;
    background-color: #f3f4f6;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
  }

  /* Data Source Cards */
  .data-source-card {
    background-color: #f8fafc;
    border-left: 4px solid #3b82f6;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 0 8px 8px 0;
  }

  .data-source-card h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
  }

  .data-source-card p {
    margin-bottom: 0.5rem;
  }

  /* Process Steps */
  .process-step {
    margin-bottom: 2rem;
    padding-left: 1rem;
    border-left: 3px solid #e5e7eb;
  }

  .process-step h3 {
    margin-top: 0;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.95rem;
  }

  th {
    background-color: #f1f5f9;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    color: #334155;
    border: 1px solid #e2e8f0;
  }

  td {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    color: #4b5563;
  }

  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  .standardization-table {
    font-size: 0.9rem;
  }

  .data-dictionary-table {
    font-size: 0.9rem;
  }

  /* Standardization Details */
  .standardization-details {
    margin-bottom: 2rem;
  }

  /* Visualization Method */
  .visualization-method {
    margin-bottom: 2.5rem;
  }

  /* Tech Stack */
  .tech-stack {
    margin-bottom: 2rem;
  }

  .tech-stack h3 {
    margin-bottom: 0.75rem;
  }

  /* Conclusion */
  .conclusion {
    background-color: #f8fafc;
    padding: 2rem;
    border-radius: 8px;
    border-left: 5px solid #3b82f6;
  }

  /* Responsive styles */
  @media screen and (max-width: 1024px) {
    .methodology-container {
      flex-direction: column;
    }

    .toc {
      width: 100%;
      position: relative;
      top: 0;
      max-height: none;
      margin-bottom: 2rem;
    }

    .content {
      max-width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    .data-dictionary-table {
      display: block;
      overflow-x: auto;
    }

    h1 {
      font-size: 2.2rem;
    }

    h2 {
      font-size: 1.8rem;
    }

    h3 {
      font-size: 1.3rem;
    }

    .data-source-card {
      padding: 1.2rem;
    }
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 0;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
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
    font-weight: 500;
    padding: 1rem;
    background-color: #fee2e2;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }

  .transformation-notes {
    background-color: #f8fafc;
    padding: 1.5rem;
    border-radius: 6px;
    margin-top: 1rem;
  }
</style>
