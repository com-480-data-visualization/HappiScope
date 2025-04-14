/**
 * HappiScope - Time Series Visualization
 * Tracks happiness trends over time for selected countries
 */

let timeSeriesChart;
let timeSeriesData = {};
let selectedCountries = ['Switzerland', 'China', 'United States'];
let timeSeriesSvg;

/**
 * Initialize the time series visualization
 */
function initializeTimeSeries() {
    // Create SVG container for the chart
    const chartContainer = d3.select('#time-series-chart');
    const width = chartContainer.node().getBoundingClientRect().width;
    const height = chartContainer.node().getBoundingClientRect().height;
    
    // Create SVG element
    timeSeriesSvg = chartContainer.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Add a group for the chart elements
    timeSeriesChart = timeSeriesSvg.append('g')
        .attr('transform', `translate(50, 20)`); // Margin for axes
    
    // Set up event listener for country selection
    d3.select('#add-country-btn').on('click', function() {
        const select = document.getElementById('countries-multi-select');
        const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
        
        if (selectedOptions.length > 0) {
            selectedCountries = selectedOptions;
            updateTimeSeriesChart();
        }
    });
    
    // Load happiness data for all years
    loadTimeSeriesData();
}

/**
 * Load time series data for all years
 */
function loadTimeSeriesData() {
    // Show loading indicator
    d3.select('#time-series-chart')
        .append('div')
        .attr('class', 'loading')
        .html('<i class="fas fa-spinner"></i><p>Loading data...</p>');
    
    // Create an array of promises for loading data for each year
    const promises = [];
    for (let year = 2015; year <= 2024; year++) {
        promises.push(
            d3.csv(`data/happiness_${year}.csv`)
                .then(data => {
                    // Process data
                    data.forEach(d => {
                        // Normalize country names by removing asterisks
                        const country = d.country.replace(/\*$/, '');
                        
                        if (!timeSeriesData[country]) {
                            timeSeriesData[country] = [];
                        }
                        
                        timeSeriesData[country].push({
                            year: year,
                            happiness_score: +d.happiness_score,
                            gdp_per_capita: +d.gdp_per_capita,
                            social_support: +d.social_support,
                            healthy_life_expectancy: +d.healthy_life_expectancy,
                            freedom: +d.freedom,
                            generosity: +d.generosity,
                            corruption: +d.corruption
                        });
                    });
                })
                .catch(error => {
                    console.error(`Error loading time series data for ${year}:`, error);
                })
        );
    }
    
    // Wait for all data to load, then render the chart
    Promise.all(promises)
        .then(() => {
            // Remove loading indicator
            d3.select('#time-series-chart .loading').remove();
            
            // Populate countries dropdown
            populateCountryDropdown();
            
            // Render the chart
            updateTimeSeriesChart();
        })
        .catch(error => {
            console.error('Error loading time series data:', error);
            // Show error message
            d3.select('#time-series-chart')
                .html('<div class="error-message"><p>Unable to load time series data. Please try again later.</p></div>');
        });
}

/**
 * Populate the country dropdown with all available countries
 */
function populateCountryDropdown() {
    const countries = Object.keys(timeSeriesData).sort();
    const dropdown = d3.select('#countries-multi-select');
    
    // Clear existing options
    dropdown.selectAll('option').remove();
    
    // Add options for all countries
    dropdown.selectAll('option')
        .data(countries)
        .enter()
        .append('option')
        .attr('value', d => d)
        .text(d => d)
        .property('selected', d => selectedCountries.includes(d));
}

/**
 * Update the time series chart with selected countries
 */
function updateTimeSeriesChart() {
    // Clear previous chart
    timeSeriesChart.selectAll('*').remove();
    
    // Get chart dimensions
    const width = timeSeriesSvg.attr('width') - 70; // Adjust for margins
    const height = timeSeriesSvg.attr('height') - 50; // Adjust for margins
    
    // Filter data for selected countries
    const filteredData = {};
    selectedCountries.forEach(country => {
        if (timeSeriesData[country]) {
            filteredData[country] = timeSeriesData[country];
        }
    });
    
    // If no valid countries selected, show message
    if (Object.keys(filteredData).length === 0) {
        timeSeriesChart.append('text')
            .attr('x', width / 2)
            .attr('y', height / 2)
            .attr('text-anchor', 'middle')
            .text('Please select at least one country');
        return;
    }
    
    // Create scales
    const years = Array.from({length: 10}, (_, i) => 2015 + i);
    
    const xScale = d3.scalePoint()
        .domain(years)
        .range([0, width - 50]);
    
    const yScale = d3.scaleLinear()
        .domain([0, 10]) // Happiness score is from 0-10
        .range([height - 30, 0]);
    
    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.happiness_score))
        .curve(d3.curveMonotoneX); // Smooth curve
    
    // Color scale for countries
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    
    // Draw axes
    // X axis
    const xAxis = timeSeriesChart.append('g')
        .attr('transform', `translate(0, ${height - 30})`)
        .call(d3.axisBottom(xScale));
    
    // Y axis
    const yAxis = timeSeriesChart.append('g')
        .call(d3.axisLeft(yScale).ticks(5));
    
    // Add axis labels
    timeSeriesChart.append('text')
        .attr('x', width / 2)
        .attr('y', height)
        .attr('text-anchor', 'middle')
        .text('Year')
        .attr('font-size', '12px');
    
    timeSeriesChart.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -(height / 2))
        .attr('y', -35)
        .attr('text-anchor', 'middle')
        .text('Happiness Score')
        .attr('font-size', '12px');
    
    // Draw lines for each country
    Object.entries(filteredData).forEach(([country, data]) => {
        // Sort data by year
        data.sort((a, b) => a.year - b.year);
        
        // Draw line
        timeSeriesChart.append('path')
            .datum(data)
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', colorScale(country))
            .attr('stroke-width', 2)
            .attr('class', `line-${country.replace(/\s+/g, '-').toLowerCase()}`);
        
        // Add data points with interaction
        const circles = timeSeriesChart.selectAll(`.point-${country.replace(/\s+/g, '-').toLowerCase()}`)
            .data(data)
            .enter()
            .append('circle')
            .attr('class', `point-${country.replace(/\s+/g, '-').toLowerCase()} chart-point`)
            .attr('cx', d => xScale(d.year))
            .attr('cy', d => yScale(d.happiness_score))
            .attr('r', 5)
            .attr('fill', colorScale(country))
            .on('mouseover', function(event, d) {
                showTimeSeriesPointTooltip(event, d, country);
                
                // Highlight point
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 8)
                    .attr('stroke', '#333')
                    .attr('stroke-width', 2);
                
                // Highlight line
                timeSeriesChart.select(`.line-${country.replace(/\s+/g, '-').toLowerCase()}`)
                    .transition()
                    .duration(200)
                    .attr('stroke-width', 4);
            })
            .on('mouseout', function() {
                hideTimeSeriesPointTooltip();
                
                // Reset point
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 5)
                    .attr('stroke', 'none');
                
                // Reset line
                timeSeriesChart.select(`.line-${country.replace(/\s+/g, '-').toLowerCase()}`)
                    .transition()
                    .duration(200)
                    .attr('stroke-width', 2);
            });
    });
    
    // Add legend
    const legend = timeSeriesChart.append('g')
        .attr('transform', `translate(${width - 40}, 20)`);
    
    Object.keys(filteredData).forEach((country, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(0, ${i * 25})`);
        
        legendItem.append('rect')
            .attr('width', 15)
            .attr('height', 15)
            .attr('fill', colorScale(country));
        
        legendItem.append('text')
            .attr('x', 20)
            .attr('y', 12)
            .text(country)
            .attr('font-size', '12px');
    });
    
    // Update insights based on selected countries
    updateTimeSeriesInsights(filteredData);
}

/**
 * Update time series insights based on selected data
 */
function updateTimeSeriesInsights(data) {
    const insightsList = d3.select('#time-insights');
    
    // Clear existing insights
    insightsList.selectAll('li').remove();
    
    // Generate insights for each selected country
    Object.entries(data).forEach(([country, yearData]) => {
        // Sort data by year
        yearData.sort((a, b) => a.year - b.year);
        
        // Calculate trend
        const firstScore = yearData[0]?.happiness_score;
        const lastScore = yearData[yearData.length - 1]?.happiness_score;
        const scoreDiff = lastScore - firstScore;
        
        // Find peak year
        const maxScoreData = yearData.reduce((max, current) => 
            current.happiness_score > max.happiness_score ? current : max, yearData[0]);
        
        let insightText = '';
        
        if (scoreDiff > 0.3) {
            insightText = `${country} shows significant improvement from ${firstScore.toFixed(1)} in 2015 to ${lastScore.toFixed(1)} in 2024`;
        } else if (scoreDiff < -0.3) {
            insightText = `${country} displays a notable decline from ${firstScore.toFixed(1)} in 2015 to ${lastScore.toFixed(1)} in 2024`;
        } else {
            insightText = `${country} has remained relatively stable around ${lastScore.toFixed(1)} over the past decade`;
        }
        
        // Add peak information if different from last year
        if (maxScoreData.year !== 2024 && maxScoreData.happiness_score > lastScore + 0.2) {
            insightText += ` with peak happiness (${maxScoreData.happiness_score.toFixed(1)}) in ${maxScoreData.year}`;
        }
        
        insightsList.append('li').text(insightText);
    });
}

/**
 * Show tooltip for time series data point
 */
function showTimeSeriesPointTooltip(event, d, country) {
    const tooltipContent = `
        <div class="tooltip-title">${country} - ${d.year}</div>
        <div><strong>Happiness Score:</strong> ${d.happiness_score.toFixed(2)}</div>
        <div><strong>GDP per Capita:</strong> ${d.gdp_per_capita.toFixed(3)}</div>
        <div><strong>Social Support:</strong> ${d.social_support.toFixed(3)}</div>
        <div><strong>Life Expectancy:</strong> ${d.healthy_life_expectancy.toFixed(3)}</div>
        <div><strong>Freedom:</strong> ${d.freedom.toFixed(3)}</div>
        <div><strong>Generosity:</strong> ${d.generosity.toFixed(3)}</div>
        <div><strong>Corruption:</strong> ${d.corruption.toFixed(3)}</div>
    `;
    
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip chart-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'visible')
        .style('left', (event.pageX + 15) + 'px')
        .style('top', (event.pageY - 30) + 'px')
        .html(tooltipContent);
}

/**
 * Hide time series tooltip
 */
function hideTimeSeriesPointTooltip() {
    d3.select('.chart-tooltip').remove();
}