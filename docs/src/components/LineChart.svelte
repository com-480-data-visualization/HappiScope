<script>
  import { onMount, afterUpdate } from "svelte";
  import * as d3 from "d3";
  import { selectedMetricInfo } from "../stores/appStore";

  // Component props
  export let data = {};
  export let metric = "happiness_score";
  export let width = 900;
  export let height = 500;
  export let margin = { top: 40, right: 80, bottom: 60, left: 60 };
  export let showLegend = true;
  export let showTooltip = true;
  export let showPoints = true;
  export let animationDuration = 750;
  export let responsive = true;
  export let onPointClick = () => {};

  let chartContainer;
  let svg;
  let tooltip;

  // Get the metric info from the store
  let metricInfo;
  selectedMetricInfo.subscribe((value) => {
    metricInfo = value;
  });

  $: actualWidth = responsive ? chartContainer?.clientWidth || width : width;
  $: actualHeight = height;
  $: innerWidth = actualWidth - margin.left - margin.right;
  $: innerHeight = actualHeight - margin.top - margin.bottom;

  // Color generator for countries
  $: colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  // Generate dynamic line styles
  $: lineStyles = Object.keys(data).map((country, i) => ({
    country,
    color: colorScale(country),
    strokeWidth: 2.5,
    strokeDasharray: i % 3 === 0 ? "none" : i % 3 === 1 ? "5,5" : "2,2",
  }));

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
    if (showTooltip) {
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
    }

    // Draw legend if requested
    if (showLegend) {
      drawLegend();
    }

    // Initial chart drawing
    updateChart();
  }

  function updateChart() {
    if (!svg || !data || Object.keys(data).length === 0) return;

    // Update SVG dimensions
    svg
      .attr("width", actualWidth)
      .attr("height", actualHeight)
      .attr("viewBox", [0, 0, actualWidth, actualHeight]);

    // Update title
    svg
      .select(".chart-title")
      .attr("x", actualWidth / 2)
      .text(`${metricInfo?.label || metric} Trends Over Time`);

    // Get all data points for scales
    const allDataPoints = Object.values(data)
      .flat()
      .filter((d) => d && d.value !== undefined && d.year !== undefined);

    if (allDataPoints.length === 0) return;

    // Get min and max years
    const years = [...new Set(allDataPoints.map((d) => d.year))].sort(
      (a, b) => a - b
    );
    const minYear = years[0];
    const maxYear = years[years.length - 1];

    // Get min and max values with padding
    const minValue = d3.min(allDataPoints, (d) => d.value) * 0.9;
    const maxValue = d3.max(allDataPoints, (d) => d.value) * 1.05;

    // Create scales
    const x = d3
      .scaleLinear()
      .domain([minYear, maxYear])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([Math.max(0, minValue), maxValue])
      .range([innerHeight, 0]);

    // Update axes
    const xAxis = d3
      .axisBottom(x)
      .tickFormat(d3.format("d")) // Format as integers (years)
      .ticks(Math.min(maxYear - minYear + 1, 10));

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

    svg.select(".x-axis").transition().duration(animationDuration).call(xAxis);

    svg.select(".y-axis").transition().duration(animationDuration).call(yAxis);

    // Update axis labels
    svg
      .select(".x-axis-label")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", actualHeight - margin.bottom / 3)
      .text("Year");

    svg
      .select(".y-axis-label")
      .attr("x", -(margin.top + innerHeight / 2))
      .attr("y", margin.left / 3)
      .text(metricInfo?.label || metric);

    // Select the chart group for lines
    const chartGroup = svg.select(".chart-group");

    // Create line generator
    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.value))
      .curve(d3.curveMonotoneX); // Smoother curve

    // Add grid lines (optional)
    chartGroup
      .selectAll(".grid-line-y")
      .data(y.ticks(5))
      .join(
        (enter) =>
          enter
            .append("line")
            .attr("class", "grid-line-y")
            .attr("x1", 0)
            .attr("x2", innerWidth)
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "3,3")
            .attr("y1", (d) => y(d))
            .attr("y2", (d) => y(d))
            .style("opacity", 0)
            .transition()
            .duration(animationDuration)
            .style("opacity", 0.5),
        (update) =>
          update
            .transition()
            .duration(animationDuration)
            .attr("y1", (d) => y(d))
            .attr("y2", (d) => y(d)),
        (exit) =>
          exit
            .transition()
            .duration(animationDuration)
            .style("opacity", 0)
            .remove()
      );

    // DATA JOIN for lines
    const countries = Object.keys(data);

    // Remove any existing lines and points
    chartGroup
      .selectAll(".line-path")
      .data(countries, (d) => d)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "line-path")
            .attr("data-country", (d) => d)
            .attr("fill", "none")
            .attr("stroke", (d) => colorScale(d))
            .attr(
              "stroke-width",
              (d, i) =>
                lineStyles.find((s) => s.country === d)?.strokeWidth || 2
            )
            .attr(
              "stroke-dasharray",
              (d, i) =>
                lineStyles.find((s) => s.country === d)?.strokeDasharray ||
                "none"
            )
            .attr("d", (d) => {
              const countryData = data[d].sort((a, b) => a.year - b.year);
              return line(countryData);
            })
            .style("opacity", 0)
            .transition()
            .duration(animationDuration)
            .style("opacity", 1),
        (update) =>
          update
            .transition()
            .duration(animationDuration)
            .attr("stroke", (d) => colorScale(d))
            .attr(
              "stroke-width",
              (d, i) =>
                lineStyles.find((s) => s.country === d)?.strokeWidth || 2
            )
            .attr(
              "stroke-dasharray",
              (d, i) =>
                lineStyles.find((s) => s.country === d)?.strokeDasharray ||
                "none"
            )
            .attr("d", (d) => {
              const countryData = data[d].sort((a, b) => a.year - b.year);
              return line(countryData);
            }),
        (exit) =>
          exit
            .transition()
            .duration(animationDuration)
            .style("opacity", 0)
            .remove()
      );

    // Add data points if showPoints is true
    if (showPoints) {
      // Flatten the data for points
      const pointsData = [];

      Object.keys(data).forEach((country) => {
        data[country].forEach((d) => {
          pointsData.push({
            country,
            year: d.year,
            value: d.value,
          });
        });
      });

      chartGroup
        .selectAll(".data-point")
        .data(pointsData, (d) => `${d.country}-${d.year}`)
        .join(
          (enter) =>
            enter
              .append("circle")
              .attr("class", "data-point")
              .attr("data-country", (d) => d.country)
              .attr("data-year", (d) => d.year)
              .attr("cx", (d) => x(d.year))
              .attr("cy", (d) => y(d.value))
              .attr("r", 0) // Start with radius 0 for animation
              .attr("fill", (d) => colorScale(d.country))
              .attr("stroke", "#fff")
              .attr("stroke-width", 1)
              .style("cursor", "pointer")
              .on("mouseover", function (event, d) {
                if (!showTooltip) return;

                d3.select(this).attr("r", 6).attr("stroke-width", 2);

                tooltip.transition().duration(200).style("opacity", 0.9);

                tooltip
                  .html(
                    `
                <strong>${d.country}</strong><br>
                <span style="color:${metricInfo?.color || colorScale(d.country)}">
                  ${metricInfo?.label || metric}: ${d.value.toFixed(3)}
                </span><br>
                <small>Year: ${d.year}</small>
              `
                  )
                  .style("left", event.pageX + 10 + "px")
                  .style("top", event.pageY - 28 + "px");
              })
              .on("mouseout", function () {
                if (!showTooltip) return;

                d3.select(this).attr("r", 4).attr("stroke-width", 1);

                tooltip.transition().duration(500).style("opacity", 0);
              })
              .on("click", (event, d) => onPointClick(d))
              .transition()
              .duration(animationDuration)
              .attr("r", 4), // Animate to final radius
          (update) =>
            update
              .transition()
              .duration(animationDuration)
              .attr("cx", (d) => x(d.year))
              .attr("cy", (d) => y(d.value))
              .attr("fill", (d) => colorScale(d.country)),
          (exit) =>
            exit.transition().duration(animationDuration).attr("r", 0).remove()
        );
    } else {
      // Remove points if showPoints is false
      chartGroup.selectAll(".data-point").remove();
    }

    // Update the legend if it exists
    if (showLegend) {
      updateLegend();
    }
  }

  function drawLegend() {
    const legendWidth = 240;
    const legendHeight = Math.max(120, Object.keys(data).length * 25 + 30);
    const legendMargin = { top: 10, right: 10, bottom: 10, left: 10 };
    const legendItemHeight = 22;

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
      .attr("class", "legend-background")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("fill", "white")
      .attr("stroke", "#e2e8f0")
      .attr("rx", 4);

    // Add title
    legend
      .append("text")
      .attr("class", "legend-title")
      .attr("x", legendMargin.left + 8)
      .attr("y", legendMargin.top + 16)
      .attr("font-size", "0.9em")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Countries");

    // Legend will be updated in updateLegend()
  }

  function updateLegend() {
    const legendWidth = 240;
    const legendHeight = Math.max(120, Object.keys(data).length * 25 + 30);
    const legendMargin = { top: 10, right: 10, bottom: 10, left: 10 };
    const legendItemHeight = 22;

    const legend = svg.select(".legend");

    // Update background size
    legend.select(".legend-background").attr("height", legendHeight);

    // Add legend items
    const legendItems = legend
      .selectAll(".legend-item")
      .data(Object.keys(data), (d) => d);

    // REMOVE old items
    legendItems.exit().remove();

    // UPDATE existing items
    legendItems.attr(
      "transform",
      (d, i) =>
        `translate(${legendMargin.left + 8}, ${legendMargin.top + 30 + i * legendItemHeight})`
    );

    legendItems
      .select("line")
      .attr("stroke", (d) => colorScale(d))
      .attr(
        "stroke-width",
        (d) => lineStyles.find((s) => s.country === d)?.strokeWidth || 2
      )
      .attr(
        "stroke-dasharray",
        (d) =>
          lineStyles.find((s) => s.country === d)?.strokeDasharray || "none"
      );

    legendItems.select("text").text((d) => d);

    // ADD new items
    const enterItems = legendItems
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr(
        "transform",
        (d, i) =>
          `translate(${legendMargin.left + 8}, ${legendMargin.top + 30 + i * legendItemHeight})`
      );

    // Add line sample
    enterItems
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 20)
      .attr("y2", 0)
      .attr("stroke", (d) => colorScale(d))
      .attr(
        "stroke-width",
        (d) => lineStyles.find((s) => s.country === d)?.strokeWidth || 2
      )
      .attr(
        "stroke-dasharray",
        (d) =>
          lineStyles.find((s) => s.country === d)?.strokeDasharray || "none"
      );

    // Add point sample if points are shown
    if (showPoints) {
      enterItems
        .append("circle")
        .attr("cx", 10)
        .attr("cy", 0)
        .attr("r", 4)
        .attr("fill", (d) => colorScale(d))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);
    }

    // Add labels
    enterItems
      .append("text")
      .attr("x", 30)
      .attr("y", 4)
      .attr("font-size", "0.8em")
      .attr("fill", "#333")
      .text((d) => d);
  }
</script>

<div class="line-chart-container" bind:this={chartContainer}>
  {#if !svg || Object.keys(data).length === 0}
    <div class="loading-indicator">
      <div class="loading-spinner"></div>
      <div>Loading chart data...</div>
    </div>
  {/if}
</div>

<style>
  .line-chart-container {
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

  :global(.line-path) {
    transition: stroke-width 0.2s ease;
  }

  :global(.line-path:hover) {
    stroke-width: 4px;
  }
</style>
