<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import * as topojson from "topojson-client";
  import { selectedMetricInfo, selectedYear } from "../stores/appStore";
  import { getDataForYear } from "../utils/dataLoader";

  // Component props
  export let data = [];
  export let metric = "score";
  export let width = 960;
  export let height = 500;
  export let interactive = true;
  export let showLegend = true;
  export let showTooltip = true;
  export let onCountryClick = () => {};

  // Local state
  let mapContainer;
  let svg;
  let tooltip;
  let zoom;
  let mapData = [];
  let worldData = null;
  let countriesFeature = null;
  let ready = false;
  let loading = true;
  let error = null;
  let selectedYearValue;

  // Subscribe to the selected year
  selectedYear.subscribe((value) => {
    selectedYearValue = value;
    loadData();
  });

  // Get the metric info from the store
  let metricInfo;
  selectedMetricInfo.subscribe((value) => {
    metricInfo = value;
  });

  // Responsive dimensions
  $: actualWidth = mapContainer?.clientWidth || width;
  $: actualHeight = height;

  // Color scale
  $: colorScale = createColorScale(metric, mapData);

  // Projection for the map
  let projection;
  $: if (actualWidth && actualHeight && worldData) {
    projection = d3
      .geoNaturalEarth1()
      .fitSize([actualWidth, actualHeight], worldData);
  }

  // Path generator
  let pathGenerator;
  $: if (projection) {
    pathGenerator = d3.geoPath().projection(projection);
  }

  // Load data for the selected year
  async function loadData() {
    if (!selectedYearValue) return;

    try {
      loading = true;
      const yearData = await getDataForYear(selectedYearValue);

      if (yearData && yearData.length > 0) {
        mapData = yearData;

        if (svg && worldData) {
          updateMap();
        }
      }

      loading = false;
    } catch (err) {
      console.error("Error loading data for year:", err);
      error = "Failed to load data for the selected year.";
      loading = false;
    }
  }

  onMount(async () => {
    try {
      loading = true;

      // Load world topojson data
      const worldTopojson = await loadWorldData();

      if (worldTopojson) {
        // Convert TopoJSON to GeoJSON
        worldData = topojson.feature(
          worldTopojson,
          worldTopojson.objects.countries
        );
        countriesFeature = worldData.features;

        // Initialize the map
        initializeMap();

        // Load data for the selected year
        await loadData();

        // Update map with data
        updateMap();

        ready = true;
      }

      loading = false;
    } catch (err) {
      console.error("Error loading map data:", err);
      error = "Failed to load map data. Please try again later.";
      loading = false;
    }

    // Setup resize observer for responsive behavior
    const resizeObserver = new ResizeObserver(() => {
      if (mapContainer && svg) {
        updateMapSize();
      }
    });

    if (mapContainer) {
      resizeObserver.observe(mapContainer);
    }

    return () => {
      if (mapContainer) {
        resizeObserver.unobserve(mapContainer);
      }
    };
  });

  afterUpdate(() => {
    if (svg && worldData) {
      updateMap();
    }
  });

  async function loadWorldData() {
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load world map data: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (err) {
      console.error("Error loading world data:", err);
      throw err;
    }
  }

  function createColorScale(metricName, mapData) {
    if (!mapData || mapData.length === 0) {
      return d3.scaleSequential(d3.interpolateBlues).domain([0, 10]);
    }

    // Get the values for the selected metric
    const values = mapData
      .filter((d) => d[metricName] !== undefined && !isNaN(d[metricName]))
      .map((d) => d[metricName]);

    if (values.length === 0) {
      return d3.scaleSequential(d3.interpolateBlues).domain([0, 10]);
    }

    // Determine domain based on metric
    let domain;
    let colorInterpolator;

    switch (metricName) {
      case "score":
        domain = [
          Math.max(0, d3.min(values) * 0.9),
          Math.min(10, d3.max(values) * 1.05),
        ];
        colorInterpolator = d3.interpolateBlues;
        break;
      case "gdp_per_capita":
        domain = [0, d3.max(values) * 1.05];
        colorInterpolator = d3.interpolateGreens;
        break;
      case "social_support":
        domain = [0, d3.max(values) * 1.05];
        colorInterpolator = d3.interpolateOranges;
        break;
      case "life_expectancy":
        domain = [0, d3.max(values) * 1.05];
        colorInterpolator = d3.interpolateReds;
        break;
      case "freedom":
        domain = [0, d3.max(values) * 1.05];
        colorInterpolator = d3.interpolatePurples;
        break;
      case "generosity":
        domain = [
          Math.min(0, d3.min(values) * 1.2),
          Math.max(0, d3.max(values) * 1.2),
        ];
        colorInterpolator = d3.interpolatePurples;
        break;
      case "corruption":
        domain = [0, d3.max(values) * 1.05];
        colorInterpolator = d3.interpolateGreys;
        break;
      case "hdi":
        domain = [0, 1];
        colorInterpolator = d3.interpolateBlues;
        break;
      case "population":
        domain = [0, d3.max(values)];
        colorInterpolator = d3.interpolateBlues;
        break;
      default:
        domain = [d3.min(values) * 0.9, d3.max(values) * 1.05];
        colorInterpolator = d3.interpolateBlues;
    }

    // Create the color scale
    return d3.scaleSequential(colorInterpolator).domain(domain);
  }

  function getCountryColor(d) {
    // Find the corresponding data for this country
    const countryData = mapData.find((item) => item.country_code === d.id);

    // Return color based on the metric value or a default color if no data
    if (
      countryData &&
      countryData[metric] !== undefined &&
      !isNaN(countryData[metric])
    ) {
      return colorScale(countryData[metric]);
    }

    return "#e0e0e0"; // Default gray for countries without data
  }

  function initializeMap() {
    svg = d3
      .select(mapContainer)
      .append("svg")
      .attr("width", actualWidth)
      .attr("height", actualHeight)
      .attr("viewBox", [0, 0, actualWidth, actualHeight])
      .attr("style", "max-width: 100%; height: auto;");

    // Add a background rectangle for ocean
    svg
      .append("rect")
      .attr("width", actualWidth)
      .attr("height", actualHeight)
      .attr("fill", "#f0f8ff"); // Light blue for ocean

    // Add a group for map elements
    const mapGroup = svg.append("g").attr("class", "map-group");

    // Add countries
    mapGroup.append("g").attr("class", "countries");

    // Add borders
    mapGroup
      .append("path")
      .attr("class", "country-borders")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .attr("stroke-linejoin", "round");

    // Setup tooltip if enabled
    if (showTooltip) {
      tooltip = d3
        .select(mapContainer)
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("border-radius", "3px")
        .style("padding", "8px")
        .style("pointer-events", "none")
        .style("font-size", "0.8rem")
        .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)");
    }

    // Setup zoom behavior if interactive
    if (interactive) {
      zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          mapGroup.attr("transform", event.transform);
        });

      svg.call(zoom);
    }

    // Draw legend if requested
    if (showLegend) {
      drawLegend();
    }
  }

  function updateMapSize() {
    if (!svg) return;

    // Update dimensions
    svg
      .attr("width", actualWidth)
      .attr("height", actualHeight)
      .attr("viewBox", [0, 0, actualWidth, actualHeight]);

    // Update projection
    projection = d3
      .geoNaturalEarth1()
      .fitSize([actualWidth, actualHeight], worldData);

    // Update path generator
    pathGenerator = d3.geoPath().projection(projection);

    // Update map elements
    updateMap();

    // Update legend position if it exists
    if (showLegend) {
      svg
        .select(".legend")
        .attr("transform", `translate(${actualWidth - 120}, 20)`);
    }
  }

  function updateMap() {
    if (!svg || !worldData || !pathGenerator) return;

    // Update countries
    svg
      .select(".countries")
      .selectAll("path")
      .data(countriesFeature)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "country")
            .attr("data-id", (d) => d.id)
            .attr("d", pathGenerator)
            .attr("fill", getCountryColor)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.3)
            .style("cursor", interactive ? "pointer" : "default")
            .on("mouseover", function (event, d) {
              if (!showTooltip) return;

              d3.select(this).attr("stroke-width", 1);

              // Find country data
              const countryData = mapData.find(
                (item) => item.country_code === d.id
              );

              if (countryData) {
                tooltip.transition().duration(200).style("opacity", 0.9);

                tooltip
                  .html(
                    `
                <strong>${countryData.country}</strong><br>
                ${
                  countryData[metric] !== undefined &&
                  !isNaN(countryData[metric])
                    ? `<span style="color:${metricInfo?.color || "#333"}">
                      ${metricInfo?.label || metric}: ${typeof countryData[metric] === "number" ? countryData[metric].toFixed(2) : countryData[metric]}
                     </span>`
                    : "<span>No data available</span>"
                }
              `
                  )
                  .style("left", event.pageX + 10 + "px")
                  .style("top", event.pageY - 28 + "px");
              }
            })
            .on("mouseout", function () {
              if (!showTooltip) return;

              d3.select(this).attr("stroke-width", 0.3);

              tooltip.transition().duration(500).style("opacity", 0);
            })
            .on("click", function (event, d) {
              if (!interactive) return;

              const countryData = mapData.find(
                (item) => item.country_code === d.id
              );

              if (countryData) {
                onCountryClick(countryData);
              }
            }),
        (update) =>
          update.transition().duration(750).attr("fill", getCountryColor),
        (exit) => exit.remove()
      );

    // Update country borders
    svg
      .select(".country-borders")
      .attr(
        "d",
        pathGenerator(
          topojson.mesh(worldData, worldData.features, (a, b) => a !== b)
        )
      );

    // Update legend if needed
    if (showLegend) {
      updateLegend();
    }
  }

  function drawLegend() {
    const legendWidth = 100;
    const legendHeight = 200;

    // Create legend container
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${actualWidth - legendWidth - 20}, 20)`);

    // Add background rect
    legend
      .append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("fill", "white")
      .attr("stroke", "#e2e8f0")
      .attr("rx", 4);

    // Add title
    legend
      .append("text")
      .attr("class", "legend-title")
      .attr("x", legendWidth / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "0.9em")
      .attr("font-weight", "bold")
      .attr("fill", "#333");

    // Add gradient rectangle
    legend
      .append("rect")
      .attr("class", "legend-gradient")
      .attr("x", 20)
      .attr("y", 40)
      .attr("width", 20)
      .attr("height", legendHeight - 60);

    // Add min value text
    legend
      .append("text")
      .attr("class", "legend-min")
      .attr("x", 45)
      .attr("y", legendHeight - 15)
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .attr("font-size", "0.8em")
      .attr("fill", "#333");

    // Add max value text
    legend
      .append("text")
      .attr("class", "legend-max")
      .attr("x", 45)
      .attr("y", 40)
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .attr("font-size", "0.8em")
      .attr("fill", "#333");

    // Add mid value text
    legend
      .append("text")
      .attr("class", "legend-mid")
      .attr("x", 45)
      .attr("y", (legendHeight - 20) / 2 + 40)
      .attr("text-anchor", "start")
      .attr("alignment-baseline", "middle")
      .attr("font-size", "0.8em")
      .attr("fill", "#333");

    // Update legend with initial values
    updateLegend();
  }

  function updateLegend() {
    if (!svg) return;

    const legend = svg.select(".legend");
    if (legend.empty()) return;

    // Update title
    legend.select(".legend-title").text(metricInfo?.label || metric);

    // Get domain values
    const domain = colorScale.domain();
    const min = domain[0];
    const max = domain[1];
    const mid = (min + max) / 2;

    // Create gradient
    const legendHeight = 200;
    const gradientHeight = legendHeight - 60;

    // Get color samples at different positions
    const numSamples = 20;
    const samples = Array.from(
      { length: numSamples },
      (_, i) => i / (numSamples - 1)
    );

    // Create gradient stops
    const gradientStops = samples.map((t) => {
      const value = min + t * (max - min);
      const color = colorScale(value);
      return {
        offset: `${t * 100}%`,
        color: color,
      };
    });

    // Apply gradient to rectangle
    const gradientRect = legend.select(".legend-gradient");

    // Remove any existing gradient
    svg.select("defs").remove();

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    // Add gradient stops
    gradientStops.forEach((stop) => {
      gradient
        .append("stop")
        .attr("offset", stop.offset)
        .attr("stop-color", stop.color);
    });

    gradientRect.attr("fill", "url(#legend-gradient)");

    // Update min, max, and mid values
    const formatter = getFormatter(metric);

    legend.select(".legend-min").text(formatter(min));

    legend.select(".legend-max").text(formatter(max));

    legend.select(".legend-mid").text(formatter(mid));
  }

  function getFormatter(metricName) {
    switch (metricName) {
      case "score":
        return d3.format(".1f");
      case "hdi":
        return d3.format(".2f");
      case "population":
        return d3.format(".3s");
      case "gdp_per_capita":
      case "social_support":
      case "life_expectancy":
      case "freedom":
      case "generosity":
      case "corruption":
        return d3.format(".2f");
      default:
        return d3.format(".2f");
    }
  }

  function resetZoom() {
    if (svg && zoom) {
      svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    }
  }
</script>

<div class="world-map-container" bind:this={mapContainer}>
  {#if loading && !svg}
    <div class="loading-indicator">
      <div class="loading-spinner"></div>
      <div>Loading map...</div>
    </div>
  {:else if error}
    <div class="error-message">
      <p>{error}</p>
      <button on:click={() => window.location.reload()}>Retry</button>
    </div>
  {:else if interactive}
    <div class="map-controls">
      <button class="zoom-button" on:click={resetZoom} title="Reset zoom">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8-8-3.59 8-8 8zm3-9h-2V7h-2v4H9v2h2v4h2v-4h2v-2z"
          />
        </svg>
      </button>
    </div>
  {/if}
</div>

<style>
  .world-map-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #f0f8ff;
  }

  .loading-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #64748b;
    font-size: 0.9rem;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .error-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #dc2626;
  }

  .error-message button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .map-controls {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .zoom-button {
    width: 36px;
    height: 36px;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #4b5563;
    transition: all 0.2s ease;
  }

  .zoom-button:hover {
    background-color: #f3f4f6;
  }

  :global(.tooltip) {
    z-index: 100;
  }
</style>
