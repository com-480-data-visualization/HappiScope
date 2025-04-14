<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import { selectedMetricInfo } from "../stores/appStore";

  // Component props
  export let data = [];
  export let metric = "happiness_score";
  export let width = 900;
  export let height = 500;
  export let margin = { top: 40, right: 20, bottom: 60, left: 60 };
  export let showLegend = true;
  export let showLabels = true;
  export let sortDirection = "desc"; // 'asc' or 'desc'
  export let maxItems = 20;
  export let onBarClick = () => {};
  export let highlightedItems = [];
  export let animationDuration = 750;
  export let responsive = true;

  let chartContainer;
  let svg;
  let tooltip;
  let chartWidth;
  let chartHeight;

  // Get the metric info from the store
  let metricInfo;
  selectedMetricInfo.subscribe((value) => {
    metricInfo = value;
  });

  $: actualWidth = responsive ? chartContainer?.clientWidth || width : width;
  $: actualHeight = height;
  $: innerWidth = actualWidth - margin.left - margin.right;
  $: innerHeight = actualHeight - margin.top - margin.bottom;

  // Derived state
  $: displayData = prepareData(data);
  $: colorScale = d3
    .scaleOrdinal()
    .domain([
      "Europe",
      "Asia",
      "North America",
      "South America",
      "Africa",
      "Oceania",
      "Unknown",
    ])
    .range([
      "#4C78A8",
      "#72B7B2",
      "#54A24B",
      "#EECA3B",
      "#F58518",
      "#E45756",
      "#9D755D",
    ]);

  function prepareData(rawData) {
    if (!rawData || !rawData.length) return [];

    // Sort data based on metric value and direction
    const sorted = [...rawData].sort((a, b) => {
      return sortDirection === "desc" ? b.value - a.value : a.value - b.value;
    });

    // Limit to maxItems
    return sorted.slice(0, maxItems);
  }

  onMount(() => {
    initializeChart();

    // Setup resize observer for responsive behavior
    if (responsive) {
      const resizeObserver = new ResizeObserver(() => {
        if (chartContainer) {
          updateChart();
        }
      });

      resizeObserver.observe(chartContainer);

      return () => {
        resizeObserver.disconnect();
      };
    }
  });

  afterUpdate(() => {
    if (svg) {
      updateChart();
    }
  });

  function initializeChart() {
    // Create SVG element
    svg = d3
      .select(chartContainer)
      .append("svg")
      .attr("width", actualWidth)
      .attr("height", actualHeight)
      .attr("viewBox", [0, 0, actualWidth, actualHeight])
      .attr("style", "max-width: 100%; height: auto;");

    // Add a group for the chart elements
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "chart-group");

    // Add title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", actualWidth / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("font-size", "1.2em")
      .attr("font-weight", "bold")
      .attr("fill", "#333");

    // Add x-axis group
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr(
        "transform",
        `translate(${margin.left}, ${actualHeight - margin.bottom})`
      );

    // Add y-axis group
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add axis labels
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -(margin.top + innerHeight / 2))
      .attr("y", margin.left / 3)
      .attr("text-anchor", "middle")
      .attr("font-size", "0.9em")
      .attr("fill", "#555");

    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", actualHeight - margin.bottom / 3)
      .attr("text-anchor", "middle")
      .attr("font-size", "0.9em")
      .attr("fill", "#555");

    // Setup tooltip
    tooltip = d3
      .select(chartContainer)
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

    // Draw legend if requested
    if (showLegend) {
      drawLegend();
    }

    // Initial chart drawing
    updateChart();
  }

  function updateChart() {
    if (!svg || !displayData || !displayData.length) return;

    // Update SVG dimensions
    svg
      .attr("width", actualWidth)
      .attr("height", actualHeight)
      .attr("viewBox", [0, 0, actualWidth, actualHeight]);

    // Update title
    svg
      .select(".chart-title")
      .attr("x", actualWidth / 2)
      .text(`${metricInfo?.label || metric} by Country`);

    // Create scales
    const x = d3
      .scaleBand()
      .domain(displayData.map((d) => d.country))
      .range([0, innerWidth])
      .padding(0.2);

    const maxValue = d3.max(displayData, (d) => d.value);
    const yMin =
      sortDirection === "desc" ? 0 : d3.min(displayData, (d) => d.value) * 0.9;

    const y = d3
      .scaleLinear()
      .domain([yMin, maxValue * 1.05]) // Add 5% padding at the top
      .range([innerHeight, 0]);

    // Update axes
    const xAxis = d3.axisBottom(x).tickSizeOuter(0);

    const yAxis = d3
      .axisLeft(y)
      .ticks(5)
      .tickFormat((d) => {
        // Format the tick values based on metric type
        if (metric === "happiness_score") {
          return d.toFixed(1);
        } else if (metric === "hdi") {
          return d.toFixed(2);
        } else {
          return d3.format(".2s")(d);
        }
      });

    svg
      .select(".x-axis")
      .transition()
      .duration(animationDuration)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .style("font-size", "0.8em");

    svg.select(".y-axis").transition().duration(animationDuration).call(yAxis);

    // Update axis labels
    svg
      .select(".x-axis-label")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", actualHeight - margin.bottom / 3)
      .text("Country");

    svg
      .select(".y-axis-label")
      .attr("x", -(margin.top + innerHeight / 2))
      .attr("y", margin.left / 3)
      .text(metricInfo?.label || metric);

    // Select the chart group for bars
    const chartGroup = svg.select(".chart-group");

    // DATA JOIN
    const bars = chartGroup
      .selectAll(".bar")
      .data(displayData, (d) => d.country);

    // EXIT
    bars
      .exit()
      .transition()
      .duration(animationDuration)
      .attr("y", actualHeight)
      .attr("height", 0)
      .remove();

    // UPDATE
    bars
      .transition()
      .duration(animationDuration)
      .attr("x", (d) => x(d.country))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => Math.max(0, innerHeight - y(d.value)))
      .attr("fill", (d) => {
        if (highlightedItems.includes(d.country)) {
          // Highlighted bars are more saturated
          const baseColor = colorScale(d.continent);
          return d3.rgb(baseColor).brighter(0.3).toString();
        }
        return colorScale(d.continent);
      })
      .attr("stroke", (d) =>
        highlightedItems.includes(d.country) ? "#333" : "none"
      )
      .attr("stroke-width", (d) =>
        highlightedItems.includes(d.country) ? 2 : 0
      );

    // ENTER
    bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.country))
      .attr("width", x.bandwidth())
      .attr("y", actualHeight - margin.bottom) // Start from bottom for animation
      .attr("height", 0)
      .attr("fill", (d) => colorScale(d.continent))
      .attr("data-country", (d) => d.country)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("stroke", "#333").attr("stroke-width", 2);

        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(
            `
          <strong>${d.country}</strong><br>
          <span style="color:${metricInfo?.color || "#333"}">
            ${metricInfo?.label || metric}: ${d.value.toFixed(3)}
          </span><br>
          <small>Rank: ${d.rank}</small>
        `
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        const country = d3.select(this).attr("data-country");

        d3.select(this)
          .attr("stroke", highlightedItems.includes(country) ? "#333" : "none")
          .attr("stroke-width", highlightedItems.includes(country) ? 2 : 0);

        tooltip.transition().duration(500).style("opacity", 0);
      })
      .on("click", (event, d) => onBarClick(d))
      .transition()
      .duration(animationDuration)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => Math.max(0, innerHeight - y(d.value)));

    // Add value labels if showLabels is true
    if (showLabels) {
      // DATA JOIN for labels
      const labels = chartGroup
        .selectAll(".value-label")
        .data(displayData, (d) => d.country);

      // REMOVE old labels
      labels
        .exit()
        .transition()
        .duration(animationDuration / 2)
        .style("opacity", 0)
        .remove();

      // UPDATE existing labels
      labels
        .transition()
        .duration(animationDuration)
        .attr("x", (d) => x(d.country) + x.bandwidth() / 2)
        .attr("y", (d) => y(d.value) - 5)
        .text((d) => d.value.toFixed(1));

      // ADD new labels
      labels
        .enter()
        .append("text")
        .attr("class", "value-label")
        .attr("text-anchor", "middle")
        .attr("x", (d) => x(d.country) + x.bandwidth() / 2)
        .attr("y", actualHeight - margin.bottom)
        .attr("font-size", "0.7em")
        .attr("fill", "#333")
        .style("opacity", 0)
        .text((d) => d.value.toFixed(1))
        .transition()
        .duration(animationDuration)
        .attr("y", (d) => y(d.value) - 5)
        .style("opacity", 1);
    } else {
      // Remove labels if showLabels is false
      chartGroup.selectAll(".value-label").remove();
    }
  }

  function drawLegend() {
    const legendWidth = 200;
    const legendHeight = 150;
    const legendMargin = { top: 10, right: 10, bottom: 10, left: 10 };
    const legendItemHeight = 20;

    const continents = [
      "Europe",
      "Asia",
      "North America",
      "South America",
      "Africa",
      "Oceania",
    ];

    // Create legend container
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        `translate(${actualWidth - legendWidth - legendMargin.right}, ${margin.top})`
      );

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
      .attr("x", legendMargin.left)
      .attr("y", legendMargin.top + 15)
      .attr("font-size", "0.9em")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Continents");

    // Add legend items
    const legendItems = legend
      .selectAll(".legend-item")
      .data(continents)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr(
        "transform",
        (d, i) =>
          `translate(${legendMargin.left}, ${legendMargin.top + 30 + i * legendItemHeight})`
      );

    // Add color rectangles
    legendItems
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => colorScale(d));

    // Add labels
    legendItems
      .append("text")
      .attr("x", 25)
      .attr("y", 12)
      .attr("font-size", "0.8em")
      .attr("fill", "#333")
      .text((d) => d);
  }
</script>

<div class="bar-chart-container" bind:this={chartContainer}>
  {#if !svg && displayData.length === 0}
    <div class="loading-indicator">
      <div class="loading-spinner"></div>
      <div>Loading chart data...</div>
    </div>
  {/if}
</div>

<style>
  .bar-chart-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
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

  :global(.tooltip) {
    z-index: 100;
  }
</style>
