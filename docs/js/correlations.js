/**
 * HappiScope - Correlations Visualization
 * Interactive scatter plots showing correlations between different metrics
 */

let correlationChart;
let correlationData = {
    happiness: {},
    hdi: {},
    population: {}
};
let currentXMetric = 'happiness_score';
let currentYMetric = 'hdi';

/**
 * Initialize the correlations visualization
 */
function initializeCorrelations() {
    // Create SVG container for the chart
    const chartContainer = d3.select('#correlation-chart');
    const width = chartContainer.node().getBoundingClientRect().width;
    const height = chartContainer.node().getBoundingClientRect().height;
    
    // Create SVG element
    const svg = chartContainer.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Create a group for the chart elements with margins
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    correlationChart = svg.append('g')
        .attr('class', 'correlation-chart')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // Add axes groups
    correlationChart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${chartHeight})`);
    
    correlationChart.append('g')
        .attr('class', 'y-axis');
    
    // Add axis labels
    correlationChart.append('text')
        .attr('class', 'x-axis-label')
        .attr('text-anchor', 'middle')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + 40)
        .text('Happiness Score')
        .style('font-size', '12px');
    
    correlationChart.append('text')
        .attr('class', 'y-axis-label')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr('x', -chartHeight / 2)
        .attr('y', -40)
        .text('Human Development Index')
        .style('font-size', '12px');
    
    // Add grid lines
    correlationChart.append('g')
        .attr('class', 'grid-lines')
        .attr('opacity', 0.1);
    
    // Set up event listeners for metric selection
    d3.select('#correlation-x-select').on('change', function() {
        currentXMetric = this.value;
        updateCorrelationChart();
    });
    
    d3.select('#correlation-y-select').on('change', function() {
        currentYMetric = this.value;
        updateCorrelationChart();
    });
    
    // Load correlation data
    loadCorrelationData();
}

/**
 * Load data for correlation analysis
 */
function loadCorrelationData() {
    // Load happiness data (latest year)
    d3.csv(`data/happiness_2024.csv`)  // Fixed relative path
        .then(data => {
            correlationData.happiness = data.map(d => ({
                country: d.country.replace(/\*$/, ''), // Remove trailing asterisks
                country_code: d.country_code,
                region: d.region || 'unknown',
                happiness_score: +d.happiness_score,
                gdp_per_capita: +d.gdp_per_capita
            }));
            
            // Load HDI data
            return d3.csv('data/hdi.csv');  // Fixed relative path
        })
        .then(data => {
            correlationData.hdi = data.map(d => ({
                country: d.Entity.replace(/\*$/, ''), // Remove trailing asterisks
                year: +d.Year,
                hdi: +d.HDI
            }));
            
            // Filter for latest year available
            const latestYear = d3.max(correlationData.hdi, d => d.year);
            correlationData.hdi = correlationData.hdi.filter(d => d.year === latestYear);
            
            // Load population data (latest year)
            return d3.csv('data/population_2024.csv');  // Fixed relative path
        })
        .then(data => {
            correlationData.population = data.map(d => ({
                country: d.Location.replace(/\*$/, ''), // Remove trailing asterisks
                population: +d.PopTotal
            }));
            
            // Render the correlation chart
            updateCorrelationChart();
        })
        .catch(error => {
            console.error('Error loading correlation data:', error);
            // Show error message
            d3.select('#correlation-chart')
                .html('<div class="error-message"><p>Unable to load correlation data. Please try again later.</p></div>');
        });
}

/**
 * Update the correlation chart based on selected metrics
 */
function updateCorrelationChart() {
    // Prepare combined data based on selected metrics
    const combinedData = prepareCorrelationData(currentXMetric, currentYMetric);
    
    // Get chart dimensions
    const chartContainer = d3.select('#correlation-chart');
    const width = chartContainer.node().getBoundingClientRect().width;
    const height = chartContainer.node().getBoundingClientRect().height;
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Update x-axis
    const xExtent = d3.extent(combinedData, d => d.x);
    let xScale;
    
    // Use log scale for population, linear for others
    if (currentXMetric === 'population') {
        xScale = d3.scaleLog()
            .domain([Math.max(1, xExtent[0]), xExtent[1]])
            .range([0, chartWidth])
            .nice();
    } else {
        xScale = d3.scaleLinear()
            .domain([0, xExtent[1] * 1.05]) // Start at 0 with 5% headroom
            .range([0, chartWidth])
            .nice();
    }
    
    const xAxis = d3.axisBottom(xScale);
    correlationChart.select('.x-axis')
        .transition()
        .duration(500)
        .call(xAxis);
    
    // Update y-axis
    const yExtent = d3.extent(combinedData, d => d.y);
    let yScale;
    
    // Use log scale for population, linear for others
    if (currentYMetric === 'population') {
        yScale = d3.scaleLog()
            .domain([Math.max(1, yExtent[0]), yExtent[1]])
            .range([chartHeight, 0])
            .nice();
    } else {
        yScale = d3.scaleLinear()
            .domain([0, yExtent[1] * 1.05]) // Start at 0 with 5% headroom
            .range([chartHeight, 0])
            .nice();
    }
    
    const yAxis = d3.axisLeft(yScale);
    correlationChart.select('.y-axis')
        .transition()
        .duration(500)
        .call(yAxis);
    
    // Update axis labels
    correlationChart.select('.x-axis-label')
        .text(getMetricDisplayName(currentXMetric));
    
    correlationChart.select('.y-axis-label')
        .text(getMetricDisplayName(currentYMetric));
    
    // Update grid lines
    const gridLinesGroup = correlationChart.select('.grid-lines');
    gridLinesGroup.selectAll('*').remove();
    
    // Add horizontal grid lines
    yScale.ticks(5).forEach(tick => {
        gridLinesGroup.append('line')
            .attr('x1', 0)
            .attr('x2', chartWidth)
            .attr('y1', yScale(tick))
            .attr('y2', yScale(tick))
            .attr('stroke', 'black');
    });
    
    // Add vertical grid lines
    xScale.ticks(5).forEach(tick => {
        gridLinesGroup.append('line')
            .attr('x1', xScale(tick))
            .attr('x2', xScale(tick))
            .attr('y1', 0)
            .attr('y2', chartHeight)
            .attr('stroke', 'black');
    });
    
    // Update scatter plot points
    const points = correlationChart.selectAll('.correlation-point')
        .data(combinedData, d => d.country);
    
    // Remove old points
    points.exit()
        .transition()
        .duration(300)
        .attr('r', 0)
        .remove();
    
    // Add new points
    points.enter()
        .append('circle')
        .attr('class', 'correlation-point')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 0)
        .attr('fill', d => getRegionColor(d.region))
        .attr('opacity', 0.7)
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        // Add tooltip behavior
        .on('mouseover', function(event, d) {
            const tooltip = d3.select('body')
                .append('div')
                .attr('class', 'correlation-tooltip')
                .style('position', 'absolute')
                .style('visibility', 'visible')
                .style('background-color', 'white')
                .style('border', '1px solid #ddd')
                .style('border-radius', '4px')
                .style('padding', '10px')
                .style('box-shadow', '0 2px 5px rgba(0,0,0,0.1)')
                .style('pointer-events', 'none')
                .style('font-size', '12px')
                .style('z-index', '1000')
                .style('top', `${event.pageY - 10}px`)
                .style('left', `${event.pageX + 10}px`);
            
            tooltip.html(`
                <strong>${d.country}</strong><br>
                ${getMetricDisplayName(currentXMetric)}: ${formatMetricValue(d.x, currentXMetric)}<br>
                ${getMetricDisplayName(currentYMetric)}: ${formatMetricValue(d.y, currentYMetric)}<br>
                Region: ${d.region || 'Unknown'}
            `);
            
            // Highlight the point
            d3.select(this)
                .attr('r', 8)
                .attr('stroke-width', 2);
        })
        .on('mousemove', function(event) {
            d3.select('.correlation-tooltip')
                .style('top', `${event.pageY - 10}px`)
                .style('left', `${event.pageX + 10}px`);
        })
        .on('mouseout', function() {
            d3.select('.correlation-tooltip').remove();
            d3.select(this)
                .attr('r', 5)
                .attr('stroke-width', 1);
        })
        // Animate new points
        .transition()
        .duration(500)
        .attr('r', 5);
    
    // Update existing points
    points.transition()
        .duration(500)
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('fill', d => getRegionColor(d.region));
    
    // Calculate and display correlation coefficient
    if (combinedData.length > 0) {
        const correlation = calculateCorrelation(combinedData.map(d => d.x), combinedData.map(d => d.y));
        updateCorrelationInsights(correlation, currentXMetric, currentYMetric);
    }
    
    // Add region legend
    createRegionLegend();
}

/**
 * Prepare combined data based on selected metrics
 */
function prepareCorrelationData(xMetric, yMetric) {
    const combinedData = [];
    
    // First dataset based on x metric
    let xData;
    if (xMetric === 'happiness_score' || xMetric === 'gdp_per_capita') {
        xData = correlationData.happiness;
    } else if (xMetric === 'hdi') {
        xData = correlationData.hdi;
    } else if (xMetric === 'population') {
        xData = correlationData.population;
    }
    
    // Second dataset based on y metric
    let yData;
    if (yMetric === 'happiness_score' || yMetric === 'gdp_per_capita') {
        yData = correlationData.happiness;
    } else if (yMetric === 'hdi') {
        yData = correlationData.hdi;
    } else if (yMetric === 'population') {
        yData = correlationData.population;
    }
    
    // Create mapping of country to data
    const xMap = new Map();
    xData.forEach(d => {
        if (d[getMetricKey(xMetric)] !== undefined) {
            xMap.set(d.country, {
                value: d[getMetricKey(xMetric)],
                region: d.region
            });
        }
    });
    
    const yMap = new Map();
    yData.forEach(d => {
        if (d[getMetricKey(yMetric)] !== undefined) {
            yMap.set(d.country, {
                value: d[getMetricKey(yMetric)]
            });
        }
    });
    
    // Find countries that exist in both datasets
    for (const [country, xInfo] of xMap.entries()) {
        if (yMap.has(country)) {
            combinedData.push({
                country: country,
                x: xInfo.value,
                y: yMap.get(country).value,
                region: xInfo.region
            });
        }
    }
    
    return combinedData;
}

/**
 * Get the data property name for a metric
 */
function getMetricKey(metric) {
    const metricKeys = {
        'happiness_score': 'happiness_score',
        'gdp_per_capita': 'gdp_per_capita',
        'hdi': 'hdi',
        'population': 'population'
    };
    
    return metricKeys[metric] || metric;
}

/**
 * Get a display name for a metric
 */
function getMetricDisplayName(metric) {
    const metricNames = {
        'happiness_score': 'Happiness Score',
        'gdp_per_capita': 'GDP per Capita',
        'hdi': 'Human Development Index',
        'population': 'Population'
    };
    
    return metricNames[metric] || metric;
}

/**
 * Format a metric value based on its type
 */
function formatMetricValue(value, metric) {
    if (metric === 'population') {
        return formatNumber(value); // Use the global helper function
    } else if (metric === 'hdi') {
        return value.toFixed(3);
    } else {
        return value.toFixed(2);
    }
}

/**
 * Get color for a region
 */
function getRegionColor(region) {
    if (!region) return '#999999';
    
    const regionColors = {
        'europe': '#4e79a7',
        'north america': '#f28e2c',
        'south america': '#e15759',
        'asia': '#76b7b2',
        'africa': '#59a14f',
        'oceania': '#edc949'
    };
    
    const lowerRegion = region.toLowerCase();
    return regionColors[lowerRegion] || '#999999';
}

/**
 * Create a legend for regions
 */
function createRegionLegend() {
    const regions = ['Europe', 'North America', 'South America', 'Asia', 'Africa', 'Oceania'];
    
    // Remove existing legend
    correlationChart.selectAll('.region-legend').remove();
    
    // Create legend group
    const legend = correlationChart.append('g')
        .attr('class', 'region-legend')
        .attr('transform', 'translate(20, 20)');
    
    // Add legend title
    legend.append('text')
        .text('Regions')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('y', -5);
    
    // Add legend items
    regions.forEach((region, i) => {
        const legendItem = legend.append('g')
            .attr('transform', `translate(0, ${i * 20})`);
        
        legendItem.append('circle')
            .attr('r', 5)
            .attr('fill', getRegionColor(region));
        
        legendItem.append('text')
            .attr('x', 10)
            .attr('y', 4)
            .text(region)
            .attr('font-size', '10px');
    });
}

/**
 * Calculate the Pearson correlation coefficient between two arrays
 */
function calculateCorrelation(x, y) {
    const n = x.length;
    if (n !== y.length || n === 0) {
        return null;
    }
    
    // Calculate means
    const xMean = x.reduce((sum, val) => sum + val, 0) / n;
    const yMean = y.reduce((sum, val) => sum + val, 0) / n;
    
    // Calculate correlation coefficient
    let numerator = 0;
    let denominatorX = 0;
    let denominatorY = 0;
    
    for (let i = 0; i < n; i++) {
        const xDiff = x[i] - xMean;
        const yDiff = y[i] - yMean;
        numerator += xDiff * yDiff;
        denominatorX += xDiff * xDiff;
        denominatorY += yDiff * yDiff;
    }
    
    if (denominatorX === 0 || denominatorY === 0) {
        return null;
    }
    
    return numerator / Math.sqrt(denominatorX * denominatorY);
}

/**
 * Update the correlation insights panel
 */
function updateCorrelationInsights(correlation, xMetric, yMetric) {
    if (correlation === null) return;
    
    const correlationText = correlation.toFixed(3);
    const strength = Math.abs(correlation) < 0.3 ? 'weak' : 
                     Math.abs(correlation) < 0.7 ? 'moderate' : 'strong';
    const direction = correlation > 0 ? 'positive' : 'negative';
    
    const xLabel = getMetricDisplayName(xMetric);
    const yLabel = getMetricDisplayName(yMetric);
    
    document.querySelector('.correlation-insights p').innerHTML = 
        `The correlation between ${xLabel} and ${yLabel} is <strong>${correlationText}</strong>, ` +
        `indicating a <strong>${strength} ${direction}</strong> relationship. ` +
        getCorrelationInterpretation(correlation, xMetric, yMetric);
}

/**
 * Get an interpretation of the correlation between two metrics
 */
function getCorrelationInterpretation(correlation, xMetric, yMetric) {
    if (xMetric === 'happiness_score' && yMetric === 'hdi') {
        return `Countries with higher Human Development Index scores tend to report higher levels of happiness, suggesting the influence of economic development, life expectancy, and education on subjective well-being.`;
    } else if (xMetric === 'hdi' && yMetric === 'happiness_score') {
        return `Countries with higher happiness scores tend to have better Human Development Index ratings, suggesting subjective well-being correlates with objective development metrics.`;
    } else if ((xMetric === 'happiness_score' && yMetric === 'gdp_per_capita') || 
               (xMetric === 'gdp_per_capita' && yMetric === 'happiness_score')) {
        return `Economic prosperity as measured by GDP per capita shows a significant relationship with happiness, though the correlation is not perfect, suggesting other factors also play important roles.`;
    } else if ((xMetric === 'happiness_score' && yMetric === 'population') || 
               (xMetric === 'population' && yMetric === 'happiness_score')) {
        return `The relationship between population size and happiness score is complex, with both small and large nations appearing across the happiness spectrum.`;
    } else {
        return `This relationship highlights the complex interplay between different development metrics and subjective well-being.`;
    }
}