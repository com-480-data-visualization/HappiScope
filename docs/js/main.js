/**
 * HappiScope - Main JavaScript
 * Handles general website functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active section highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Add console logs for debugging
    console.log("DOM fully loaded, initializing visualizations...");
    
    // Initialize all visualizations
    initializeVisualizations();
});

/**
 * Initialize theme toggle functionality
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const storedTheme = localStorage.getItem('theme');
    
    // Check if a theme preference is stored
    if (storedTheme) {
        body.classList.add(storedTheme);
        if (storedTheme === 'dark-theme') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Use dark theme if user's system preference is dark
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            // Update the toggle button icon
            if (body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark-theme');
                
                // Update chart themes if visualizations exist
                updateVisualizationThemes('dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light-theme');
                
                // Update chart themes if visualizations exist
                updateVisualizationThemes('light');
            }
        });
    }
}

/**
 * Update visualization themes based on current theme
 */
function updateVisualizationThemes(theme) {
    try {
        // Update map theme if it exists
        if (typeof updateMapTheme === 'function') {
            updateMapTheme(theme);
        }
        
        // Update colors and styles based on theme
        const textColor = theme === 'dark' ? '#f0f0f0' : '#333';
        const gridColor = theme === 'dark' ? '#555' : '#ddd';
        
        // Update axis colors for all charts
        d3.selectAll('.x-axis text, .y-axis text, .x-axis-label, .y-axis-label, .chart-title')
            .style('fill', textColor);
        
        // Update grid lines
        d3.selectAll('.grid-lines line')
            .style('stroke', gridColor);
            
        // Redraw charts if needed
        if (typeof updateCorrelationChart === 'function') {
            updateCorrelationChart();
        }
        
        if (typeof updateFactorCharts === 'function') {
            updateFactorCharts();
        }
        
        if (typeof updateTimeSeriesChart === 'function') {
            updateTimeSeriesChart();
        }
    } catch (error) {
        console.warn('Error updating visualization themes:', error);
    }
}

/**
 * Initialize all data visualizations
 */
function initializeVisualizations() {
    console.log("Starting visualization initialization...");
    
    // First load country mapping data to help with consistency
    loadCountryMappingData()
        .then(() => {
            // Once mapping is loaded, initialize each visualization independently
            
            // Initialize map visualization
            if (document.getElementById('happiness-map')) {
                console.log("Initializing map visualization...");
                try {
                    if (typeof initializeMap === 'function') {
                        initializeMap();
                        console.log("Map initialization completed");
                    } else {
                        console.error("initializeMap function is not available");
                    }
                } catch (error) {
                    console.error("Error initializing map:", error);
                    document.getElementById('happiness-map').innerHTML = 
                        '<div class="error-message"><p>Error loading map visualization. Check console for details.</p></div>';
                }
            }
            
            // Initialize time series visualization
            if (document.getElementById('time-series-chart')) {
                console.log("Initializing time series visualization...");
                try {
                    if (typeof initializeTimeSeries === 'function') {
                        initializeTimeSeries();
                        console.log("Time series initialization completed");
                    } else {
                        console.error("initializeTimeSeries function is not available");
                    }
                } catch (error) {
                    console.error("Error initializing time series:", error);
                    document.getElementById('time-series-chart').innerHTML = 
                        '<div class="error-message"><p>Error loading time series visualization. Check console for details.</p></div>';
                }
            }
            
            // Initialize factor charts
            const factorCharts = document.querySelectorAll('.factor-chart');
            if (factorCharts.length > 0) {
                console.log("Initializing factor charts...");
                try {
                    if (typeof initializeFactorCharts === 'function') {
                        initializeFactorCharts();
                        console.log("Factor charts initialization completed");
                    } else {
                        console.error("initializeFactorCharts function is not available");
                    }
                } catch (error) {
                    console.error("Error initializing factor charts:", error);
                    factorCharts.forEach(chart => {
                        chart.innerHTML = '<div class="error-message"><p>Error loading factor visualization. Check console for details.</p></div>';
                    });
                }
            }
            
            // Initialize correlation chart
            if (document.getElementById('correlation-chart')) {
                console.log("Initializing correlation chart...");
                try {
                    if (typeof initializeCorrelations === 'function') {
                        initializeCorrelations();
                        console.log("Correlations initialization completed");
                    } else {
                        console.error("initializeCorrelations function is not available");
                    }
                } catch (error) {
                    console.error("Error initializing correlations:", error);
                    document.getElementById('correlation-chart').innerHTML = 
                        '<div class="error-message"><p>Error loading correlation visualization. Check console for details.</p></div>';
                }
            }
        })
        .catch(error => {
            console.error("Error initializing visualizations:", error);
            showNotification("Error initializing visualizations. Check console for details.", "error");
        });
}

/**
 * Load country mapping data to help with matching countries across different datasets
 */
function loadCountryMappingData() {
    window.happiscope = window.happiscope || {};
    
    return fetch('data/countries.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load country mapping data');
            }
            return response.json();
        })
        .then(data => {
            // Store the mapping in the global object
            window.happiscope.countryMapping = data;
            console.log("Country mapping data loaded successfully");
            return data;
        })
        .catch(error => {
            console.error("Error loading country mapping:", error);
            // Create an empty mapping to prevent errors
            window.happiscope.countryMapping = {};
            // Continue with initialization despite the error
            return {};
        });
}

/**
 * Initialize section visibility animations
 */
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('section');
    const animationElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once the animation is triggered, we don't need to observe it anymore
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the section is visible
    });
    
    // Create intersection observer for animation elements
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Calculate delay based on data attribute or position in section
                const delay = entry.target.dataset.delay || 0;
                
                // Set delay and add visible class
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                // Once the animation is triggered, we don't need to observe it anymore
                elementObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger a bit before the element comes into view
    });
    
    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Observe each animation element
    animationElements.forEach(element => {
        elementObserver.observe(element);
    });
    
    // Make hero section visible immediately
    document.querySelector('#hero').classList.add('visible');
}

/**
 * Helper function to format large numbers
 */
function formatNumber(num) {
    if (num === null || num === undefined) return 'N/A';
    
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toFixed(1);
    }
}

/**
 * Helper function to generate a color scale based on domain values
 */
function generateColorScale(domain, colorRange = ['#edf8fb', '#006d2c']) {
    return d3.scaleSequential()
        .domain([domain[0], domain[1]])
        .interpolator(d3.interpolate(colorRange[0], colorRange[1]));
}

/**
 * Helper function to create a customizable legend for visualizations
 */
function createLegend(container, colorScale, title) {
    const legendWidth = 200;
    const legendHeight = 50;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', legendWidth)
        .attr('height', legendHeight);
    
    const legend = svg.append('g')
        .attr('transform', `translate(10, 10)`);
    
    // Create gradient for legend
    const gradient = legend.append('defs')
        .append('linearGradient')
        .attr('id', 'legend-gradient-' + Math.random().toString(36).substr(2, 9))
        .attr('x1', '0%')
        .attr('x2', '100%')
        .attr('y1', '0%')
        .attr('y2', '0%');
    
    const domain = colorScale.domain();
    
    // Add color stops to gradient
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorScale(domain[0]));
        
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorScale(domain[1]));
    
    // Draw rectangle with gradient
    legend.append('rect')
        .attr('width', legendWidth - 20)
        .attr('height', 15)
        .style('fill', 'url(#' + gradient.attr('id') + ')')
        .style('stroke', '#ccc')
        .style('stroke-width', 0.5);
    
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
    
    if (title) {
        legend.append('text')
            .attr('x', (legendWidth - 20) / 2)
            .attr('y', -5)
            .attr('text-anchor', 'middle')
            .text(title)
            .attr('font-size', '10px')
            .attr('font-weight', 'bold');
    }
    
    return legend;
}

/**
 * Helper function for getting current year data
 */
function getCurrentYearData(yearData, year) {
    if (!yearData || !yearData[year]) {
        console.warn(`No data available for year ${year}`);
        return [];
    }
    return yearData[year];
}

/**
 * Helper function to get browser language for localization
 */
function getBrowserLanguage() {
    return (navigator.languages && navigator.languages.length) 
        ? navigator.languages[0] 
        : navigator.language || navigator.userLanguage || 'en-US';
}

/**
 * Create and show a toast notification
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
                  type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
                  '<i class="fas fa-info-circle"></i>'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to the DOM
    const container = document.querySelector('.notification-container') || 
        (() => {
            const cont = document.createElement('div');
            cont.className = 'notification-container';
            document.body.appendChild(cont);
            return cont;
        })();
    
    container.appendChild(notification);
    
    // Add click event to close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('hiding');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('hiding');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, duration);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    return notification;
}