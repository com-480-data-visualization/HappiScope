#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
HappiScope Data Processor
-------------------------
This script processes and combines data from multiple sources to create
standardized JSON files for the HappiScope data visualization website.

Sources:
- World Happiness Reports (2015-2024)
- Human Development Index (HDI) data
- Population data from UN World Population Prospects
"""

import os
import json
import pandas as pd
import numpy as np
from pathlib import Path

# Define paths
BASE_DIR = Path(__file__).parent
HAPPINESS_DIR = BASE_DIR / "happiness_score_data"
HDI_DIR = BASE_DIR / "hdi_data" 
POPULATION_DIR = BASE_DIR / "population_data"
OUTPUT_DIR = BASE_DIR.parent / "docs" / "data"

# Create output directory if it doesn't exist
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ISO country code mapping file for standardization
COUNTRY_MAPPING_FILE = "country_codes_mapping.json"

def load_country_mapping():
    """Load or create country code mapping for standardization."""
    mapping_path = BASE_DIR / COUNTRY_MAPPING_FILE
    
    # Create default mapping if file doesn't exist
    if not mapping_path.exists():
        print("Creating default country mapping file...")
        # These are example mappings - you should expand this with your actual country names
        default_mapping = {
            # Happiness report name: {"code": "ISO3", "hdi_name": "HDI Dataset name", "pop_name": "Population dataset name"}
            "United States": {"code": "USA", "hdi_name": "United States", "pop_name": "United States of America"},
            "United Kingdom": {"code": "GBR", "hdi_name": "United Kingdom", "pop_name": "United Kingdom"},
            "China": {"code": "CHN", "hdi_name": "China", "pop_name": "China"},
            "Switzerland": {"code": "CHE", "hdi_name": "Switzerland", "pop_name": "Switzerland"},
            # Add more as needed
        }
        
        with open(mapping_path, 'w', encoding='utf-8') as f:
            json.dump(default_mapping, f, indent=2)
        return default_mapping
    
    # Load existing mapping
    with open(mapping_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def process_happiness_data():
    """Process World Happiness Report data for all years."""
    print("Processing happiness data...")
    happiness_data = {}
    country_mapping = load_country_mapping()
    
    # Process each year's happiness data
    for year in range(2015, 2025):
        file_path = HAPPINESS_DIR / f"{year}_report.csv"
        if not file_path.exists():
            print(f"Warning: Missing happiness data file for {year}")
            continue
            
        df = pd.read_csv(file_path)
        
        # Standardize column names and data structure
        year_data = []
        
        for _, row in df.iterrows():
            country_name = row['country']
            # Get country code or use country name as fallback
            country_info = country_mapping.get(country_name, {"code": None})
            country_code = country_info.get("code")
            
            # Look for region/continent column
            region = None
            if 'continent' in df.columns:
                region = row['continent']
            elif 'region' in df.columns:
                region = row['region']
                
            # Create standardized entry
            entry = {
                "country": country_name,
                "country_code": country_code,
                "region": region,
                "happiness_score": float(row['happiness_score']) if not pd.isna(row['happiness_score']) else None,
                "gdp_per_capita": float(row['gdp_per_capita']) if 'gdp_per_capita' in row and not pd.isna(row['gdp_per_capita']) else None,
                "social_support": float(row['social_support']) if 'social_support' in row and not pd.isna(row['social_support']) else None,
                "healthy_life_expectancy": float(row['health']) if 'health' in row and not pd.isna(row['health']) else None,
                "freedom": float(row['freedom']) if 'freedom' in row and not pd.isna(row['freedom']) else None,
                "generosity": float(row['generosity']) if 'generosity' in row and not pd.isna(row['generosity']) else None,
                "corruption": float(row['corruption']) if 'corruption' in row and not pd.isna(row['corruption']) else None
            }
            
            # Add happiness rank
            if 'happiness_rank' in df.columns:
                entry["happiness_rank"] = int(row['happiness_rank']) if not pd.isna(row['happiness_rank']) else None
            else:
                # Calculate rank based on happiness score
                entry["happiness_rank"] = None  # Will be calculated after all entries are processed
                
            year_data.append(entry)
        
        # Calculate ranks if they weren't in the original data
        if year_data and year_data[0]["happiness_rank"] is None:
            sorted_data = sorted(year_data, key=lambda x: float('-inf') if x["happiness_score"] is None else x["happiness_score"], reverse=True)
            for rank, entry in enumerate(sorted_data, 1):
                if entry["happiness_score"] is not None:
                    entry["happiness_rank"] = rank
        
        happiness_data[year] = year_data
        
        # Save each year as separate CSV file
        output_df = pd.DataFrame(year_data)
        output_df.to_csv(OUTPUT_DIR / f"happiness_{year}.csv", index=False)
    
    return happiness_data

def process_hdi_data():
    """Process Human Development Index data."""
    print("Processing HDI data...")
    hdi_file = HDI_DIR / "human-development-index.csv"
    
    if not hdi_file.exists():
        print(f"Warning: HDI data file not found at {hdi_file}")
        return None
        
    df = pd.read_csv(hdi_file)
    
    # Save HDI data to output directory
    df.to_csv(OUTPUT_DIR / "hdi.csv", index=False)
    
    # Create a structured version for easier use in visualizations
    latest_year = df['Year'].max()
    latest_hdi = df[df['Year'] == latest_year]
    
    hdi_data = []
    for _, row in latest_hdi.iterrows():
        hdi_data.append({
            "country": row['Entity'],
            "year": int(row['Year']),
            "hdi": float(row['Human Development Index']) if not pd.isna(row['Human Development Index']) else None
        })
    
    return hdi_data

def process_population_data():
    """Process population data from all years."""
    print("Processing population data...")
    population_data = {}
    
    # Process each year's population data
    for year in range(2015, 2025):
        file_path = POPULATION_DIR / f"population_{year}.csv"
        if not file_path.exists():
            print(f"Warning: Missing population data file for {year}")
            continue
            
        df = pd.read_csv(file_path)
        
        # Save each year as separate CSV file
        df.to_csv(OUTPUT_DIR / f"population_{year}.csv", index=False)
        
        # Latest year data goes into the return value for additional processing
        if year == 2024:
            population_data = df.to_dict('records')
    
    return population_data

def create_world_map_data():
    """Create a TopoJSON world map file with country codes."""
    print("Creating world map data...")
    
    # For a real implementation, you would:
    # 1. Download world map data from a source like Natural Earth
    # 2. Process it with a library like GeoPandas
    # 3. Save it as TopoJSON for efficient web visualization
    
    # Placeholder for this script:
    print("Note: No world map data created. Please download TopoJSON world map data")
    print("and save it to the docs/data directory as world-map.json")
    
    # Example command to get map data (you would need to run this separately):
    # curl -o world-map.json https://raw.githubusercontent.com/topojson/world-atlas/master/world/110m.json

def create_country_mapping(happiness_data, hdi_data, population_data):
    """Create a comprehensive country name mapping file."""
    print("Creating comprehensive country mapping...")
    
    # Extract country names from each dataset
    happiness_countries = set()
    for year_data in happiness_data.values():
        happiness_countries.update(item["country"] for item in year_data)
    
    hdi_countries = set(item["country"] for item in hdi_data) if hdi_data else set()
    
    population_countries = set()
    if population_data:
        population_countries = set(item["Location"] for item in population_data)
    
    # Create mapping dictionary
    country_mapping = {}
    for country in happiness_countries:
        country_mapping[country] = {
            "code": None,  # You'll need to add these manually or use a library like pycountry
            "hdi_name": None,
            "pop_name": None
        }
    
    # Write the mapping to file for manual editing
    with open(BASE_DIR / "country_mapping_generated.json", 'w', encoding='utf-8') as f:
        json.dump(country_mapping, f, indent=2, sort_keys=True)
    
    print(f"Generated country mapping saved to {BASE_DIR}/country_mapping_generated.json")
    print("Please edit this file to add country codes and corresponding names in other datasets.")

def create_combined_dataset(happiness_data, hdi_data, population_data):
    """Create a combined dataset for correlation analysis."""
    print("Creating combined dataset...")
    
    # Use the latest year of happiness data
    latest_year = max(happiness_data.keys())
    latest_happiness = happiness_data[latest_year]
    
    # Create a mapping of country names for joining
    country_mapping = load_country_mapping()
    
    combined_data = []
    
    # Start with happiness data
    for happiness_entry in latest_happiness:
        country = happiness_entry["country"]
        entry = {
            "country": country,
            "country_code": happiness_entry["country_code"],
            "region": happiness_entry["region"],
            "happiness_score": happiness_entry["happiness_score"],
            "gdp_per_capita": happiness_entry["gdp_per_capita"],
            "hdi": None,
            "population": None
        }
        
        # Try to match HDI data
        if hdi_data:
            mapping = country_mapping.get(country, {})
            hdi_name = mapping.get("hdi_name", country)
            
            hdi_entry = next((item for item in hdi_data if item["country"] == hdi_name), None)
            if hdi_entry:
                entry["hdi"] = hdi_entry["hdi"]
        
        # Try to match population data
        if population_data:
            mapping = country_mapping.get(country, {})
            pop_name = mapping.get("pop_name", country)
            
            pop_entry = next((item for item in population_data if item["Location"] == pop_name), None)
            if pop_entry:
                entry["population"] = pop_entry["PopTotal"]
        
        combined_data.append(entry)
    
    # Save combined data
    combined_df = pd.DataFrame(combined_data)
    combined_df.to_csv(OUTPUT_DIR / "combined_data.csv", index=False)
    
    return combined_data

def main():
    """Main function to process all data sources."""
    print("Starting HappiScope data processing...")
    
    # Process all data sources
    happiness_data = process_happiness_data()
    hdi_data = process_hdi_data()
    population_data = process_population_data()
    
    # Create additional files
    create_world_map_data()
    create_country_mapping(happiness_data, hdi_data, population_data)
    create_combined_dataset(happiness_data, hdi_data, population_data)
    
    print("Data processing complete!")

if __name__ == "__main__":
    main()