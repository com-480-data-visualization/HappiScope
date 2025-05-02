import { useState, useEffect, memo } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  ZoomableGroup,
  Sphere,
  Graticule
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { motion } from 'framer-motion';
import { feature } from 'topojson-client';
import happinessData from '../../data/happiness_data.json';
import countriesData from '../../data/countries.json';
import worldMapData from '../../data/world-map.json';

// Process TopoJSON data into GeoJSON for simpler usage
const { countries, land } = {
  countries: feature(worldMapData, worldMapData.objects.countries),
  land: feature(worldMapData, worldMapData.objects.land)
};

// Create lookup tables for country codes and names
const createLookupTables = () => {
  const nameToCodeMap = new Map();
  const codeToNameMap = new Map();
  const countryAliases = {
    'United States': 'United States of America',
    'Russia': 'Russian Federation',
    'South Korea': 'Korea, Republic of',
    'North Korea': 'Korea, Democratic People\'s Republic of',
    'Congo': 'Republic of Congo',
    'DRC': 'Democratic Republic of the Congo',
    'Tanzania': 'Tanzania, United Republic of',
    'UAE': 'United Arab Emirates',
    'UK': 'United Kingdom',
    'USA': 'United States of America',
    // Add more aliases as needed
  };

  // First, populate with country data from countries.json
  countriesData.forEach(country => {
    nameToCodeMap.set(country.country.toLowerCase(), country.country_code);
    codeToNameMap.set(country.country_code, country.country);
  });

  // Add aliases
  Object.entries(countryAliases).forEach(([alias, official]) => {
    const code = nameToCodeMap.get(official.toLowerCase());
    if (code) {
      nameToCodeMap.set(alias.toLowerCase(), code);
    }
  });

  return { nameToCodeMap, codeToNameMap };
};

const { nameToCodeMap, codeToNameMap } = createLookupTables();

const WorldMap = memo(({ year = 2024, metric = 'score', setSelectedCountry }) => {
  const [data, setData] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });
  const [mapReady, setMapReady] = useState(false);

  // Filter data for the selected year
  useEffect(() => {
    const filteredData = happinessData.filter(d => d.year === year);
    setData(filteredData);
    setMapReady(true);
  }, [year]);

  // Setup color scale with more distinct colors
  const getColorScale = () => {
    // Get metric min/max values
    let min = 0;
    let max = 10;
    
    if (metric !== 'score') {
      const metricValues = data.filter(d => d[metric] !== undefined).map(d => d[metric] || 0);
      if (metricValues.length > 0) {
        min = Math.min(...metricValues);
        max = Math.max(...metricValues);
      }
    }
    
    // More distinct color gradient from red (unhappy) to deep blue (happy)
    return scaleLinear()
      .domain([min, min + (max-min)*0.2, min + (max-min)*0.4, min + (max-min)*0.6, min + (max-min)*0.8, max])
      .range(["#d73027", "#fc8d59", "#fee090", "#91bfdb", "#4575b4", "#313695"])
      .clamp(true);
  };

  const colorScale = getColorScale();

  // Handle zoom
  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  // Find country data using multiple matching strategies
  const findCountryData = (geo) => {
    if (!geo.properties) return null;
    
    // Try to match by the country name
    const countryName = geo.properties.name;
    if (!countryName) return null;
    
    // Look for direct country match
    let countryData = data.find(d => 
      d.country.toLowerCase() === countryName.toLowerCase()
    );
    
    // If not found, try through our country code mappings
    if (!countryData) {
      const countryCode = nameToCodeMap.get(countryName.toLowerCase());
      if (countryCode) {
        countryData = data.find(d => d.country_code === countryCode);
      }
    }
    
    // Last resort: fuzzy name matching
    if (!countryData) {
      countryData = data.find(d => 
        countryName.toLowerCase().includes(d.country.toLowerCase()) || 
        d.country.toLowerCase().includes(countryName.toLowerCase())
      );
    }
    
    return countryData;
  };

  // Handle country interactions
  const handleCountryClick = (geo, countryData) => {
    if (countryData) {
      setSelectedCountry(countryData);
    }
  };

  const handleMouseEnter = (geo, countryData, e) => {
    const { clientX, clientY } = e;
    
    if (countryData) {
      setTooltipContent(`
        <strong>${countryData.country}</strong><br />
        ${metric === 'score' ? 'Happiness Score' : metric.replace(/_/g, ' ')}: ${countryData[metric]?.toFixed(2) || 'No data'}
      `);
      setTooltipPosition({ x: clientX, y: clientY });
      setShowTooltip(true);
    } else if (geo.properties && geo.properties.name) {
      // Even when we don't have data, show the country name
      setTooltipContent(`
        <strong>${geo.properties.name}</strong><br />
        No data available
      `);
      setTooltipPosition({ x: clientX, y: clientY });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
    setShowTooltip(false);
  };

  const handleMouseMove = (e) => {
    if (showTooltip) {
      const { clientX, clientY } = e;
      setTooltipPosition({ x: clientX, y: clientY });
    }
  };

  // Generate legend values based on the current metric
  const getLegendValues = () => {
    if (metric === 'score') {
      return [0, 2, 4, 6, 8, 10];
    }
    
    const metricValues = data.filter(d => d[metric] !== undefined).map(d => d[metric] || 0);
    if (metricValues.length === 0) return [0, 2, 4, 6, 8, 10];
    
    let min = Math.min(...metricValues);
    let max = Math.max(...metricValues);
    
    return [
      min,
      min + (max-min)*0.2,
      min + (max-min)*0.4,
      min + (max-min)*0.6,
      min + (max-min)*0.8,
      max
    ];
  };

  const legendValues = getLegendValues();

  if (!mapReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Controls */}
      <div className="absolute top-2 right-2 z-10 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute z-50 bg-white shadow-lg rounded-md px-3 py-2 text-sm pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y - 10,
          }}
          dangerouslySetInnerHTML={{ __html: tooltipContent }}
        />
      )}

      {/* Map */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
      >
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 170,
          }}
          width={960}
          height={500}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            translateExtent={[
              [0, 0],
              [960, 500]
            ]}
          >
            <Sphere stroke="#E4E5E6" strokeWidth={0.5} fill="#f9fafe" />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            
            {/* First render the land to ensure map background displays */}
            <Geography geography={land} fill="#DDD" stroke="#FFF" strokeWidth={0.1} />
            
            {/* Then render individual countries with data coloring */}
            <Geographies geography={countries}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const countryData = findCountryData(geo);
                  
                  return (
                    <Geography
                      key={geo.rsmKey || geo.properties.name}
                      geography={geo}
                      onClick={() => handleCountryClick(geo, countryData)}
                      onMouseEnter={(e) => handleMouseEnter(geo, countryData, e)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: countryData && countryData[metric] !== undefined ? colorScale(countryData[metric]) : "#F5F4F6",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: countryData ? "#A9D6E5" : "#F5F4F6",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: countryData ? "pointer" : "default"
                        },
                        pressed: {
                          fill: "#2E86AB",
                          stroke: "#FFFFFF",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </motion.div>

      {/* Color Legend - Improved visibility and labels */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg flex items-center space-x-1 shadow-md">
        <span className="text-xs font-medium mr-2">
          {metric === 'score' ? 'Happiness Score' : metric.replace(/_/g, ' ')}:
        </span>
        {legendValues.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-12 h-6 border border-gray-200"
              style={{ backgroundColor: colorScale(value) }}
            ></div>
            <span className="text-xs mt-1">{value.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default WorldMap;