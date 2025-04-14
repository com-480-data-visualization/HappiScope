/**
 * HappiScope - Happiness Factors Visualization
 * Interactive visualizations showing different happiness factors across countries
 */

let factorsData = {};
let currentFactorYear = '2024';
let currentRegion = 'all';

/**
 * Initialize the happiness factors visualizations
 */
function initializeFactorCharts() {
    // Set up event listeners for year and region selection
    d3.select('#factor-year-select').on('change', function() {
        currentFactorYear = this.value;
        updateFactorCharts();
    });
    
    d3.select('#region-select').on('change', function() {
        currentRegion = this.value;
        updateFactorCharts();
    });
    
    // Load happiness data for all years
    loadFactorsData();
}

/**
 * Load happiness factors data for all years
 */
function loadFactorsData() {
    // Show loading indicators
    document.querySelectorAll('.factor-chart').forEach(chart => {
        d3.select(chart)
            .append('div')
            .attr('class', 'loading')
            .html('<i class="fas fa-spinner"></i><p>Loading data...</p>');
    });
    
    // Create an array of promises for loading data for each year
    const promises = [];
    for (let year = 2015; year <= 2024; year++) {
        promises.push(
            d3.csv(`data/happiness_${year}.csv`)  // Fixed relative path
                .then(data => {
                    factorsData[year] = data.map(d => ({
                        country: d.country.replace(/\*$/, ''), // Remove trailing asterisks
                        country_code: d.country_code,
                        region: d.region || 'unknown',
                        happiness_score: +d.happiness_score,
                        gdp_per_capita: +d.gdp_per_capita,
                        social_support: +d.social_support,
                        healthy_life_expectancy: +d.healthy_life_expectancy,
                        freedom: +d.freedom,
                        generosity: +d.generosity,
                        corruption: +d.corruption,
                        dystopia_residual: +d.dystopia_residual
                    }));
                })
                .catch(error => {
                    console.error(`Error loading factors data for ${year}:`, error);
                })
        );
    }
    
    // Wait for all data to load, then create the factor charts
    Promise.all(promises)
        .then(() => {
            // Remove loading indicators
            document.querySelectorAll('.factor-chart .loading').forEach(loader => {
                loader.remove();
            });
            
            createFactorCharts();
        })
        .catch(error => {
            console.error('Error loading factors data:', error);
            // Show error message on factor charts
            document.querySelectorAll('.factor-chart').forEach(chart => {
                chart.innerHTML = '<div class="error-message"><p>Unable to load factor data. Please try again later.</p></div>';
            });
        });
}

/**
 * Create all happiness factor charts
 */
function createFactorCharts() {
    // Create individual factor charts
    createFactorChart('gdp-factor-chart', 'gdp_per_capita', 'GDP per Capita');
    createFactorChart('social-support-factor-chart', 'social_support', 'Social Support');
    createFactorChart('life-expectancy-factor-chart', 'healthy_life_expectancy', 'Healthy Life Expectancy');
    createFactorChart('freedom-factor-chart', 'freedom', 'Freedom');
    createFactorChart('generosity-factor-chart', 'generosity', 'Generosity');
    createFactorChart('corruption-factor-chart', 'corruption', 'Corruption Perception');
    
    // Generate factor insights
    updateFactorInsights();
}

/**
 * Create an individual factor chart
 */
function createFactorChart(containerId, factorKey, factorName) {
    const container = d3.select(`#${containerId}`);
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    
    // Create SVG element
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Add a group for margin convention
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    const chartGroup = svg.append('g')
        .attr('class', 'chart-group')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Create scales (will be updated with actual data)
    const xScale = d3.scaleBand()
        .range([0, chartWidth])
        .padding(0.1);
    
    const yScale = d3.scaleLinear()
        .range([chartHeight, 0]);
    
    // Create axes
    const xAxis = chartGroup.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${chartHeight})`);
    
    const yAxis = chartGroup.append('g')
        .attr('class', 'y-axis');
    
    // Add axis labels
    chartGroup.append('text')
        .attr('class', 'x-axis-label')
        .attr('text-anchor', 'middle')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + 35)
        .text('Countries')
        .style('font-size', '11px')
        .style('fill', '#555');
    
    chartGroup.append('text')
        .attr('class', 'y-axis-label')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr('x', -chartHeight / 2)
        .attr('y', -30)
        .text(factorName)
        .style('font-size', '11px')
        .style('fill', '#555');
    
    // Add chart title
    chartGroup.append('text')
        .attr('class', 'chart-title')
        .attr('text-anchor', 'middle')
        .attr('x', chartWidth / 2)
        .attr('y', -5)
        .text(factorName)
        .style('font-size', '12px')
        .style('font-weight', 'bold');
    
    // Store the chart elements in data attributes for later updates
    container.node().dataset.xAxis = 'x-axis';
    container.node().dataset.yAxis = 'y-axis';
    container.node().dataset.factorKey = factorKey;
    container.node().dataset.factorName = factorName;
}

/**
 * Update all factor charts with the selected year and region data
 */
function updateFactorCharts() {
    // Get data for the selected year
    const yearData = factorsData[currentFactorYear];
    
    if (!yearData) {
        console.error(`No data found for year ${currentFactorYear}`);
        return;
    }
    
    // Filter data by selected region if needed
    let filteredData = yearData;
    if (currentRegion !== 'all') {
        filteredData = yearData.filter(d => d.region.toLowerCase() === currentRegion);
    }
    
    // Sort data by happiness score for consistent ordering
    filteredData = filteredData.sort((a, b) => b.happiness_score - a.happiness_score);
    
    // Limit to top 15 countries for better readability
    filteredData = filteredData.slice(0, 15);
    
    // Update each factor chart
    updateFactorChart('gdp-factor-chart', filteredData);
    updateFactorChart('social-support-factor-chart', filteredData);
    updateFactorChart('life-expectancy-factor-chart', filteredData);
    updateFactorChart('freedom-factor-chart', filteredData);
    updateFactorChart('generosity-factor-chart', filteredData);
    updateFactorChart('corruption-factor-chart', filteredData);
    
    // Update insights based on new data
    updateFactorInsights();
}

/**
 * Update an individual factor chart with new data
 */
function updateFactorChart(containerId, data) {
    const container = d3.select(`#${containerId}`);
    const factorKey = container.node().dataset.factorKey;
    const factorName = container.node().dataset.factorName;
    
    const svg = container.select('svg');
    const chartGroup = svg.select('.chart-group');
    
    // Get dimensions
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Update scales with new data
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([0, chartWidth])
        .padding(0.1);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[factorKey]) * 1.1]) // Add 10% headroom
        .range([chartHeight, 0]);
    
    // Update axes
    chartGroup.select('.x-axis')
        .transition()
        .duration(500)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')
        .style('font-size', '10px');
    
    chartGroup.select('.y-axis')
        .transition()
        .duration(500)
        .call(d3.axisLeft(yScale).ticks(5));
    
    // Update bars
    const bars = chartGroup.selectAll('.factor-bar')
        .data(data, d => d.country);
    
    // Remove old bars
    bars.exit()
        .transition()
        .duration(300)
        .attr('y', chartHeight)
        .attr('height', 0)
        .remove();
    
    // Add new bars
    const newBars = bars.enter()
        .append('rect')
        .attr('class', 'factor-bar')
        .attr('x', d => xScale(d.country))
        .attr('width', xScale.bandwidth())
        .attr('y', chartHeight)
        .attr('height', 0)
        .attr('fill', getColorForFactor(factorKey))
        .attr('stroke', 'white')
        .attr('stroke-width', 0.5)
        .attr('data-country', d => d.country)
        .attr('data-value', d => d[factorKey]);
        
    // Add tooltip and interaction
    newBars.on('mouseover', function(event, d) {
            showFactorTooltip(event, d, factorKey, factorName);
            
            // Highlight the bar
            d3.select(this)
                .transition()
                .duration(150)
                .attr('opacity', 0.7)
                .attr('stroke', '#333')
                .attr('stroke-width', 1.5);
                
            // Find and highlight same country bars in other charts
            const country = d.country;
            d3.selectAll(`.factor-bar[data-country="${country}"]`)
                .transition()
                .duration(150)
                .attr('opacity', 0.7)
                .attr('stroke', '#333')
                .attr('stroke-width', 1.5);
        })
        .on('mousemove', function(event) {
            moveFactorTooltip(event);
        })
        .on('mouseout', function(event, d) {
            hideFactorTooltip();
            
            // Reset all highlighted bars
            d3.selectAll('.factor-bar')
                .transition()
                .duration(150)
                .attr('opacity', 1)
                .attr('stroke', 'white')
                .attr('stroke-width', 0.5);
        })
        // Animate new bars
        .transition()
        .duration(500)
        .attr('y', d => yScale(d[factorKey]))
        .attr('height', d => chartHeight - yScale(d[factorKey]));
    
    // Update existing bars
    bars.transition()
        .duration(500)
        .attr('x', d => xScale(d.country))
        .attr('width', xScale.bandwidth())
        .attr('y', d => yScale(d[factorKey]))
        .attr('height', d => chartHeight - yScale(d[factorKey]))
        .attr('data-country', d => d.country)
        .attr('data-value', d => d[factorKey]);
}

/**
 * Show tooltip for factor bar
 */
function showFactorTooltip(event, d, factorKey, factorName) {
    const tooltipContent = `
        <div class="tooltip-title">${d.country}</div>
        <div><strong>${factorName}:</strong> ${d[factorKey].toFixed(3)}</div>
        <div><strong>Happiness Score:</strong> ${d.happiness_score.toFixed(2)}</div>
        <div><strong>Region:</strong> ${d.region}</div>
        <div><strong>Global Rank:</strong> ${getCountryRank(d.country, factorsData[currentFactorYear])}</div>
    `;
    
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip factor-tooltip')
        .style('position', 'absolute')
        .style('visibility', 'visible')
        .style('left', (event.pageX + 15) + 'px')
        .style('top', (event.pageY - 30) + 'px')
        .html(tooltipContent);
}

/**
 * Move the factor tooltip with the mouse
 */
function moveFactorTooltip(event) {
    d3.select('.factor-tooltip')
        .style('left', (event.pageX + 15) + 'px')
        .style('top', (event.pageY - 30) + 'px');
}

/**
 * Hide the factor tooltip
 */
function hideFactorTooltip() {
    d3.select('.factor-tooltip').remove();
}

/**
 * Update factor insights based on current data
 */
function updateFactorInsights() {
    const insightsList = d3.select('#factor-insights');
    const yearData = factorsData[currentFactorYear] || [];
    
    // Clear existing insights
    insightsList.html('');
    
    if (yearData.length === 0) return;
    
    // Sort data by happiness score
    const sortedData = [...yearData].sort((a, b) => b.happiness_score - a.happiness_score);
    const topCountries = sortedData.slice(0, 10);
    
    // Calculate average factors for top 10 countries
    const avgGDP = d3.mean(topCountries, d => d.gdp_per_capita);
    const avgSocialSupport = d3.mean(topCountries, d => d.social_support);
    const avgLifeExpectancy = d3.mean(topCountries, d => d.healthy_life_expectancy);
    const avgFreedom = d3.mean(topCountries, d => d.freedom);
    const avgGenerosity = d3.mean(topCountries, d => d.generosity);
    const avgCorruption = d3.mean(topCountries, d => d.corruption);
    
    // Generate insights
    insightsList.append('li')
        .html(`The top 10 happiest countries in ${currentFactorYear} have an average GDP per capita of <strong>${avgGDP.toFixed(3)}</strong>.`);
    
    insightsList.append('li')
        .html(`<strong>${topCountries[0].country}</strong> ranks highest in happiness with a score of ${topCountries[0].happiness_score.toFixed(2)}.`);
    
    // Find which factor shows the strongest correlation with happiness
    const correlations = [
        { factor: 'GDP per Capita', key: 'gdp_per_capita', value: calculateCorrelation(yearData, 'gdp_per_capita', 'happiness_score') },
        { factor: 'Social Support', key: 'social_support', value: calculateCorrelation(yearData, 'social_support', 'happiness_score') },
        { factor: 'Life Expectancy', key: 'healthy_life_expectancy', value: calculateCorrelation(yearData, 'healthy_life_expectancy', 'happiness_score') },
        { factor: 'Freedom', key: 'freedom', value: calculateCorrelation(yearData, 'freedom', 'happiness_score') },
        { factor: 'Generosity', key: 'generosity', value: calculateCorrelation(yearData, 'generosity', 'happiness_score') },
        { factor: 'Corruption Perception', key: 'corruption', value: calculateCorrelation(yearData, 'corruption', 'happiness_score') }
    ];
    
    // Sort by correlation strength (absolute value)
    correlations.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
    
    insightsList.append('li')
        .html(`<strong>${correlations[0].factor}</strong> shows the strongest correlation with happiness (r = ${correlations[0].value.toFixed(2)}).`);
}

/**
 * Calculate the Pearson correlation coefficient between two variables
 */
function calculateCorrelation(data, keyX, keyY) {
    // Filter out entries with missing values
    const filteredData = data.filter(d => 
        d[keyX] !== undefined && d[keyX] !== null && 
        d[keyY] !== undefined && d[keyY] !== null
    );
    
    const n = filteredData.length;
    if (n === 0) return 0;
    
    // Extract x and y values
    const x = filteredData.map(d => d[keyX]);
    const y = filteredData.map(d => d[keyY]);
    
    // Calculate means
    const meanX = d3.mean(x);
    const meanY = d3.mean(y);
    
    // Calculate covariance and standard deviations
    let covariance = 0;
    let stdDevX = 0;
    let stdDevY = 0;
    
    for (let i = 0; i < n; i++) {
        covariance += (x[i] - meanX) * (y[i] - meanY);
        stdDevX += (x[i] - meanX) ** 2;
        stdDevY += (y[i] - meanY) ** 2;
    }
    
    // Finalize calculation
    return covariance / Math.sqrt(stdDevX * stdDevY);
}

/**
 * Get an appropriate color for each factor
 */
function getColorForFactor(factorKey) {
    const colorMap = {
        'gdp_per_capita': '#3182bd',         // Blue
        'social_support': '#e6550d',          // Orange
        'healthy_life_expectancy': '#31a354', // Green
        'freedom': '#756bb1',                 // Purple
        'generosity': '#de2d26',              // Red
        'corruption': '#636363'               // Gray
    };
    
    return colorMap[factorKey] || '#2ca02c'; // Default color
}

/**
 * Helper function to get the rank of a country in the data
 */
function getCountryRank(countryName, yearData) {
    if (!yearData) return 'N/A';
    
    const sortedData = [...yearData].sort((a, b) => b.happiness_score - a.happiness_score);
    const rank = sortedData.findIndex(d => d.country === countryName) + 1;
    return rank > 0 ? rank : 'N/A';
}