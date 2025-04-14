/**
 * HappiScope - Map Visualization
 * Interactive global map showing happiness metrics
 */

let happinessMap;
let mapColorScale;
let mapTooltip;
let mapLegend;
let mapData = {};
let currentMapYear = '2024';
let currentMapMetric = 'happiness_score';

/**
 * Initialize the map visualization
 */
function initializeMap() {
    console.log("Map initialization starting...");
    
    // Create SVG container for the map
    const mapContainer = d3.select('#happiness-map');
    console.log("Map container:", mapContainer.node() ? "Found" : "Not found");
    
    // Set explicit dimensions instead of relying on container's dimensions
    const width = 800;  // Explicit width
    const height = 450; // Explicit height
    console.log("Using explicit dimensions:", width, "x", height);
    
    // Create SVG element
    const svg = mapContainer.append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');
    
    // Create a group for the map elements
    happinessMap = svg.append('g')
        .attr('class', 'map');
    
    // Create tooltip div
    mapTooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background-color', 'white')
        .style('border', '1px solid #ddd')
        .style('border-radius', '4px')
        .style('padding', '10px')
        .style('box-shadow', '0 2px 5px rgba(0,0,0,0.1)')
        .style('pointer-events', 'none')
        .style('font-size', '12px')
        .style('z-index', '1000');
    
    // Add zoom behavior
    setupZoom(svg);
    
    // Set up event listeners for year and metric selection
    d3.select('#year-select').on('change', function() {
        currentMapYear = this.value;
        updateMap();
    });
    
    d3.select('#metric-select').on('change', function() {
        currentMapMetric = this.value;
        updateMap();
    });
    
    // Load the GeoJSON world map data
    d3.json('data/world-map.json')
        .then(worldData => {
            // Validate the world map data structure
            console.log("World map data loaded:", worldData);
            console.log("Data type:", Object.prototype.toString.call(worldData));
            console.log("Has features property:", worldData.features ? "Yes" : "No");
            
            // If it doesn't have standard GeoJSON structure, fix it
            if (!worldData.type || !worldData.features) {
                console.log("Converting world-map.json to proper GeoJSON format");
                const features = Array.isArray(worldData) ? worldData : Object.values(worldData);
                worldData = {
                    type: "FeatureCollection",
                    features: features
                };
                console.log("After conversion:", worldData);
            }
            
            // Store the data in global variable
            window.happiscope = window.happiscope || {};
            window.happiscope.data = window.happiscope.data || {};
            window.happiscope.data.worldMap = worldData;
            
            // Now we're certain we have the map data, let's render a simple placeholder map first
            // This will help us determine if the SVG container and projection are working correctly
            console.log("Creating simple placeholder map to test SVG container");
            const mapContainer = d3.select('#happiness-map');
            
            // Check if the container exists
            if (mapContainer.empty()) {
                console.error("Map container (#happiness-map) not found in DOM!");
                return;
            }
            
            console.log("Map container exists, creating SVG");
            
            // Clear any existing content first
            mapContainer.html("");
            
            // Create SVG with explicit dimensions
            const width = 800;
            const height = 450;
            
            const svg = mapContainer.append('svg')
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('viewBox', `0 0 ${width} ${height}`)
                .attr('preserveAspectRatio', 'xMidYMid meet');
            
            console.log("SVG created with dimensions:", width, "x", height);
            
            // Create a simple rectangle to visually confirm the SVG is working
            svg.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width)
                .attr('height', height)
                .attr('fill', '#f0f8ff'); // Light blue background
            
            // Add text to indicate map is loading
            svg.append('text')
                .attr('x', width/2)
                .attr('y', height/2)
                .attr('text-anchor', 'middle')
                .style('font-size', '20px')
                .text('Map is loading...');
            
            // Now wait a moment and then try to render the actual map
            setTimeout(() => {
                console.log("Now attempting to render the actual map");
                renderMap();
            }, 500);
            
        })
        .catch(error => {
            console.error("Error loading world map data:", error);
            // Display a user-friendly error message
            d3.select('#happiness-map')
                .html('<div style="padding: 20px; text-align: center; color: #d33; background: #fee;">' +
                      '<h3>Unable to load map data</h3>' +
                      '<p>Please check your internet connection and try again.</p>' +
                      '<p>Technical details: ' + error.message + '</p></div>');
        });
}

/**
 * Load happiness data for all years
 */
function loadHappinessData() {
    console.log("Starting to load happiness data files...");
    
    // First load country mapping data to get region information
    d3.json('data/countries.json').then(countryData => {
        console.log("Loaded country mapping data");
        window.happiscope = window.happiscope || {};
        window.happiscope.countryMapping = countryData;
        
        // Create an array of promises for loading data for each year
        const promises = [];
        for (let year = 2015; year <= 2024; year++) {
            const filepath = `data/happiness_${year}.csv`;
            console.log(`Attempting to load: ${filepath}`);
            
            promises.push(
                d3.csv(filepath)
                    .then(data => {
                        console.log(`Successfully loaded data for ${year}, ${data.length} entries`);
                        
                        // Process the data and merge with region information
                        mapData[year] = data.map(d => {
                            // Find the country in our mapping to get the region
                            let region = null;
                            const countryInfo = countryData.countries.find(c => 
                                c.code === d.country_code || c.name === d.country
                            );
                            
                            if (countryInfo) {
                                region = countryInfo.region;
                            } else {
                                // Try alternative names
                                for (const [canonical, alternatives] of Object.entries(countryData.alternativeNames || {})) {
                                    if (alternatives.includes(d.country)) {
                                        const canonicalCountry = countryData.countries.find(c => c.name === canonical);
                                        if (canonicalCountry) {
                                            region = canonicalCountry.region;
                                            break;
                                        }
                                    }
                                }
                            }
                            
                            return {
                                country: d.country.replace(/\*$/, ''), // Remove trailing asterisks
                                country_code: d.country_code,
                                region: region,
                                happiness_score: +d.happiness_score || 0,
                                gdp_per_capita: +d.gdp_per_capita || 0,
                                social_support: +d.social_support || 0,
                                healthy_life_expectancy: +d.healthy_life_expectancy || 0,
                                freedom: +d.freedom || 0,
                                generosity: +d.generosity || 0,
                                corruption: +d.corruption || 0,
                                dystopia_residual: +d.dystopia_residual || 0
                            };
                        });
                    })
                    .catch(error => {
                        console.error(`Error loading data for ${year}:`, error);
                    })
            );
        }
        
        // Wait for all data to load, then render the map
        Promise.all(promises)
            .then(() => {
                console.log("All happiness data loaded successfully, rendering map...");
                renderMap();
            })
            .catch(error => {
                console.error('Error loading happiness data:', error);
                // Show error message on map
                d3.select('#happiness-map')
                    .html('<div class="error-message"><p>Unable to load map data. Please try again later.</p></div>');
            });
    }).catch(error => {
        console.error('Error loading country mapping data:', error);
    });
}

/**
 * Render the world map with happiness data
 */
function renderMap() {
    // Use the world map data from the global scope
    const worldData = window.happiscope.data.worldMap;
    
    if (!worldData || !worldData.features) {
        console.error('World map data not found or invalid format');
        return;
    }
    
    console.log("Starting to render map with", worldData.features.length, "features");
    
    // Get the container and clear previous content
    const mapContainer = d3.select('#happiness-map');
    const svg = mapContainer.select('svg');
    
    // If SVG doesn't exist for some reason, log error and return
    if (svg.empty()) {
        console.error("SVG container not found inside #happiness-map");
        return;
    }
    
    // Clear previous content except the background rectangle
    svg.selectAll('*:not(rect)').remove();
    
    // Use fixed dimensions for the projection
    const width = 800;
    const height = 450;
    
    try {
        console.log("Creating projection");
        const projection = d3.geoNaturalEarth1()
            .fitSize([width, height], worldData);
        
        const pathGenerator = d3.geoPath().projection(projection);
        
        // Create a group for the map elements and assign to global happinessMap variable
        const mapGroup = svg.append('g')
            .attr('class', 'map');
        
        // Important: Assign mapGroup to the global happinessMap variable
        happinessMap = mapGroup;
        
        // Draw countries
        console.log("Drawing country paths");
        const countryPaths = mapGroup.selectAll('path')
            .data(worldData.features)
            .enter()
            .append('path')
            .attr('d', pathGenerator)
            .attr('class', 'country')
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.5)
            .attr('fill', '#ccc'); // Start with a neutral color
        
        console.log("Country paths created:", countryPaths.size());
        
        // After paths are created, update the map with the current year and metric data
        // This ensures the colors are applied immediately
        updateMap();
        
        // Basic test interaction
        countryPaths
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1.5);
                
                showMapTooltip(event, d);
            })
            .on('mouseout', function() {
                d3.select(this)
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 0.5);
                
                hideMapTooltip();
            });
        
        console.log("Basic map rendering complete");
        
    } catch (error) {
        console.error("Error rendering map:", error);
        svg.append('text')
            .attr('x', width/2)
            .attr('y', height/2)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('fill', 'red')
            .text(`Error rendering map: ${error.message}`);
    }
}

/**
 * Update the map with selected year and metric data
 */
function updateMap() {
    const yearData = mapData[currentMapYear];
    
    if (!yearData) {
        console.error(`No data found for year ${currentMapYear}`);
        return;
    }
    
    // Determine the extent of the current metric
    const metricExtent = d3.extent(yearData, d => d[currentMapMetric]);
    
    // Generate color scale based on the metric
    let colorRange;
    switch (currentMapMetric) {
        case 'happiness_score':
            colorRange = ['#edf8e9', '#006d2c']; // Green scale
            break;
        case 'gdp_per_capita':
            colorRange = ['#eff3ff', '#08519c']; // Blue scale
            break;
        case 'social_support':
            colorRange = ['#fee5d9', '#a50f15']; // Red scale
            break;
        case 'healthy_life_expectancy':
            colorRange = ['#efedf5', '#756bb1']; // Purple scale
            break;
        case 'freedom':
            colorRange = ['#ffffd4', '#006837']; // Yellow-green scale
            break;
        case 'generosity':
            colorRange = ['#f7f7f7', '#d73027']; // Red-gray scale
            break;
        case 'corruption':
            colorRange = ['#f7f7f7', '#252525']; // Gray scale
            break;
        default:
            colorRange = ['#edf8e9', '#006d2c']; // Default green scale
    }
    
    mapColorScale = d3.scaleSequential()
        .domain(metricExtent)
        .interpolator(d3.interpolate(colorRange[0], colorRange[1]));
    
    // Update country colors using our improved country data matching
    happinessMap.selectAll('path.country')
        .transition()
        .duration(750)
        .attr('fill', d => {
            const countryCode = d.properties.ISO_A3;
            // Use the improved getCountryData function instead of direct find
            const countryData = getCountryData(countryCode, currentMapYear);
            return countryData ? mapColorScale(countryData[currentMapMetric]) : '#eee';
        });
    
    // Update tooltip behavior
    happinessMap.selectAll('path.country')
        .on('mouseover', function(event, d) {
            showMapTooltip(event, d);
        })
        .on('mouseout', function() {
            hideMapTooltip();
        });
    
    // Update legend
    updateMapLegend(metricExtent, getMetricDisplayName(currentMapMetric), colorRange);
}

/**
 * Update the map legend with the current metric and color scale
 */
function updateMapLegend(domain, title, colorRange) {
    // Clear existing legend
    mapLegend.html('');
    
    // Create new legend
    const legendWidth = 200;
    const legendHeight = 50;
    
    const svg = mapLegend
        .append('svg')
        .attr('width', legendWidth)
        .attr('height', legendHeight);
    
    const legend = svg.append('g')
        .attr('transform', `translate(10, 10)`);
    
    // Create gradient for legend
    const gradient = legend.append('defs')
        .append('linearGradient')
        .attr('id', 'map-legend-gradient')
        .attr('x1', '0%')
        .attr('x2', '100%')
        .attr('y1', '0%')
        .attr('y2', '0%');
    
    // Add color stops to gradient
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorRange[0]);
        
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorRange[1]);
    
    // Draw rectangle with gradient
    legend.append('rect')
        .attr('width', legendWidth - 20)
        .attr('height', 15)
        .style('fill', 'url(#map-legend-gradient)');
    
    // Add labels
    legend.append('text')
        .attr('x', 0)
        .attr('y', 35)
        .text(formatNumber(domain[0]))
        .attr('font-size', '12px');
    
    legend.append('text')
        .attr('x', legendWidth - 20)
        .attr('y', 35)
        .attr('text-anchor', 'end')
        .text(formatNumber(domain[1]))
        .attr('font-size', '12px');
    
    legend.append('text')
        .attr('x', (legendWidth - 20) / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .text(title)
        .attr('font-size', '10px')
        .attr('font-weight', 'bold');
}

/**
 * Helper function to get the rank of a country in the data
 */
function getCountryRank(countryName, yearData) {
    const sortedData = [...yearData].sort((a, b) => b.happiness_score - a.happiness_score);
    const rank = sortedData.findIndex(d => d.country === countryName) + 1;
    return rank > 0 ? rank : 'N/A';
}

/**
 * Helper function to get a display name for a metric
 */
function getMetricDisplayName(metric) {
    const metricNames = {
        'happiness_score': 'Happiness Score',
        'gdp_per_capita': 'GDP per Capita',
        'social_support': 'Social Support',
        'healthy_life_expectancy': 'Healthy Life Expectancy',
        'freedom': 'Freedom to Make Life Choices',
        'generosity': 'Generosity',
        'corruption': 'Corruption Perception'
    };
    
    return metricNames[metric] || metric;
}

/**
 * Get country data for a specific year
 * @param {string} countryCode - The ISO 3166-1 alpha-3 country code
 * @param {number|string} year - The year to get data for
 * @returns {Object|null} - The country data object or null if not found
 */
function getCountryData(countryCode, year) {
    if (!mapData[year]) {
        return null;
    }
    
    const yearData = mapData[year];
    
    // Try to find the country directly by code
    let countryData = yearData.find(d => d.country_code === countryCode);
    
    // If not found by code, try to find by country name using the mapping
    if (!countryData && window.happiscope.countryMapping) {
        const countryInfo = window.happiscope.countryMapping.countries.find(c => c.code === countryCode);
        if (countryInfo) {
            const countryName = countryInfo.name;
            countryData = yearData.find(d => d.country.toLowerCase() === countryName.toLowerCase());
            
            // If still not found, try alternative names
            if (!countryData && window.happiscope.countryMapping.alternativeNames) {
                for (const [mainName, alternatives] of Object.entries(window.happiscope.countryMapping.alternativeNames)) {
                    if (mainName.toLowerCase() === countryName.toLowerCase()) {
                        // Try each alternative name
                        for (const altName of alternatives) {
                            countryData = yearData.find(d => d.country.toLowerCase() === altName.toLowerCase());
                            if (countryData) break;
                        }
                    }
                }
            }
            
            // If found, add the country code and region for future reference
            if (countryData) {
                countryData.country_code = countryCode;
                countryData.region = countryInfo.region;
            }
        }
    }
    
    return countryData;
}

/**
 * Show tooltip with country data
 * @param {Object} event - The mouse event
 * @param {Object} d - The country data
 */
function showMapTooltip(event, d) {
    const countryCode = d.id || d.properties.ISO_A3;
    const countryData = getCountryData(countryCode, currentMapYear);
    
    if (!countryData) {
        mapTooltip.style("visibility", "hidden");
        return;
    }
    
    const countryName = countryData.country;
    const score = countryData.happiness_score !== null ? countryData.happiness_score.toFixed(2) : "No data";
    
    // Calculate rank from the data
    const rank = getCountryRank(countryName, mapData[currentMapYear]);
    
    // Get region from countryData or from the country mapping
    let region = countryData.region;
    if (!region && window.happiscope.countryMapping) {
        const matchedCountry = window.happiscope.countryMapping.countries.find(c => c.code === countryCode);
        if (matchedCountry) {
            region = matchedCountry.region;
        }
    }
    region = region || "Unknown";
    
    mapTooltip.html(`
        <strong>${countryName}</strong><br>
        Region: ${region}<br>
        Happiness Score: ${score}<br>
        Global Rank: ${rank}
    `)
    .style("left", (event.pageX + 15) + "px")
    .style("top", (event.pageY - 28) + "px")
    .style("visibility", "visible");
}

/**
 * Hide map tooltip when moving away from a country
 */
function hideMapTooltip() {
    // Hide tooltip instead of removing it
    mapTooltip.style("visibility", "hidden");
    
    // Remove highlight
    d3.selectAll('.country')
        .classed('highlighted', false)
        .style('stroke', '#fff')
        .style('stroke-width', '0.5px');
}

/**
 * Format metric values with appropriate units and decimal places
 */
function formatMetricValue(value, metric) {
    if (value === undefined || value === null) return 'No data';
    
    if (metric === 'gdp_per_capita') {
        return '$' + value.toLocaleString();
    } else if (metric === 'happiness_score') {
        return value.toFixed(2) + ' / 10';
    } else {
        return value.toFixed(3);
    }
}

/**
 * Format numeric values for display
 */
function formatNumber(value) {
    if (value === undefined || value === null) return 'N/A';
    
    // For values less than 0.01, use scientific notation
    if (Math.abs(value) < 0.01 && value !== 0) {
        return value.toExponential(2);
    }
    
    // For values less than 1, use 3 decimal places
    if (Math.abs(value) < 1) {
        return value.toFixed(3);
    }
    
    // For larger values, use locale formatting with appropriate decimal places
    if (Math.abs(value) < 10) {
        return value.toFixed(2);
    } else if (Math.abs(value) < 100) {
        return value.toFixed(1);
    } else {
        return Math.round(value).toLocaleString();
    }
}

/**
 * Function to zoom and pan the map
 */
function setupZoom(svg) {
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
            happinessMap.attr('transform', event.transform);
        });
    
    svg.call(zoom);
    
    // Add zoom controls
    const zoomControls = d3.select('.map-container')
        .append('div')
        .attr('class', 'zoom-controls')
        .style('position', 'absolute')
        .style('bottom', '10px')
        .style('left', '10px');
    
    zoomControls.append('button')
        .attr('class', 'zoom-in')
        .html('<i class="fas fa-plus"></i>')
        .on('click', () => {
            svg.transition().duration(300).call(zoom.scaleBy, 1.3);
        });
    
    zoomControls.append('button')
        .attr('class', 'zoom-out')
        .html('<i class="fas fa-minus"></i>')
        .on('click', () => {
            svg.transition().duration(300).call(zoom.scaleBy, 0.7);
        });
    
    zoomControls.append('button')
        .attr('class', 'zoom-reset')
        .html('<i class="fas fa-home"></i>')
        .on('click', () => {
            svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
        });
}