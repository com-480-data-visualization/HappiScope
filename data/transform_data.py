#!/usr/bin/env python3
"""
HappiScope Data Transformation Script

This script combines and transforms data from multiple sources:
- Happiness Score data (2015-2024)
- Human Development Index data
- Population data

Output: JSON files optimized for the web application in a format ready for visualization
"""

import os
import pandas as pd
import json
import numpy as np
from pathlib import Path

# Define paths
BASE_DIR = Path(__file__).parent
HAPPINESS_DIR = BASE_DIR / "happiness_score_data"
HDI_DIR = BASE_DIR / "hdi_data"
POPULATION_DIR = BASE_DIR / "population_data"
OUTPUT_DIR = Path(BASE_DIR.parent) / "docs" / "src" / "data"

# Create output directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Country name standardization and ISO code mapping
def get_country_mappings():
    """
    Create dictionaries for standardizing country names and providing ISO 3166-1 alpha-3 country codes.
    
    Returns:
        tuple: (name_mapping_dict, country_code_dict)
            - name_mapping_dict: Maps various country name forms to a standard name
            - country_code_dict: Maps standard country names to their ISO 3166-1 alpha-3 codes
    """
    # Dictionary to standardize country names (from various forms to a standard form)
    name_mapping = {
        # Name variations to standard names
        'United States': 'United States of America',
        'US': 'United States of America',
        'USA': 'United States of America',
        'UK': 'United Kingdom',
        'Britain': 'United Kingdom',
        'Great Britain': 'United Kingdom',
        'Russia': 'Russian Federation',
        'Congo (Brazzaville)': 'Republic of Congo',
        'Congo (Kinshasa)': 'Democratic Republic of the Congo',
        'Republic of Congo': 'Republic of Congo',
        'DR Congo': 'Democratic Republic of the Congo',
        'Congo': 'Republic of Congo',
        'Hong Kong S.A.R. of China': 'Hong Kong',
        'Hong Kong S.A.R., China': 'Hong Kong',
        'Hong Kong SAR': 'Hong Kong',
        'China, Hong Kong SAR': 'Hong Kong',
        'Macao S.A.R. of China': 'Macao',
        'Macao S.A.R., China': 'Macao',
        'Macao SAR': 'Macao',
        'China, Macao SAR': 'Macao',
        'Taiwan Province of China': 'Taiwan',
        'China, Taiwan Province of China': 'Taiwan',
        'Türkiye': 'Turkey',
        'Republic of Korea': 'South Korea',
        'Korea, Republic of': 'South Korea',
        'Korea, South': 'South Korea',
        'Korea, Democratic People\'s Republic of': 'North Korea',
        'Korea, North': 'North Korea',
        'Palestine': 'Palestinian Territories',
        'State of Palestine': 'Palestinian Territories',
        'Iran (Islamic Republic of)': 'Iran',
        'Iran, Islamic Republic of': 'Iran',
        'Viet Nam': 'Vietnam',
        'Lao People\'s Democratic Republic': 'Laos',
        'Lao PDR': 'Laos',
        'Syrian Arab Republic': 'Syria',
        'Swaziland': 'Eswatini',
        'Czech Republic': 'Czechia',
        'Macedonia': 'North Macedonia',
        'Burma': 'Myanmar',
        'Venezuela, RB': 'Venezuela',
        'Venezuela (Bolivarian Republic of)': 'Venezuela',
        'Tanzania': 'Tanzania, United Republic of',
        'United Republic of Tanzania': 'Tanzania, United Republic of',
        'Côte d\'Ivoire': 'Ivory Coast',
        'Dem. People\'s Republic of Korea': 'North Korea',
        'Bolivia (Plurinational State of)': 'Bolivia',
        'Gambia': 'The Gambia',
        'Gambia, The': 'The Gambia',
        'North Cyprus': 'Northern Cyprus',
    }
    
    # Map standard country names to ISO 3166-1 alpha-3 codes
    # This is essential for map visualizations and consistent country identification
    country_codes = {
        'Afghanistan': 'AFG',
        'Albania': 'ALB',
        'Algeria': 'DZA',
        'Andorra': 'AND',
        'Angola': 'AGO',
        'Antigua and Barbuda': 'ATG',
        'Argentina': 'ARG',
        'Armenia': 'ARM',
        'Australia': 'AUS',
        'Austria': 'AUT',
        'Azerbaijan': 'AZE',
        'Bahamas': 'BHS',
        'Bahrain': 'BHR',
        'Bangladesh': 'BGD',
        'Barbados': 'BRB',
        'Belarus': 'BLR',
        'Belgium': 'BEL',
        'Belize': 'BLZ',
        'Benin': 'BEN',
        'Bhutan': 'BTN',
        'Bolivia': 'BOL',
        'Bosnia and Herzegovina': 'BIH',
        'Botswana': 'BWA',
        'Brazil': 'BRA',
        'Brunei': 'BRN',
        'Brunei Darussalam': 'BRN',
        'Bulgaria': 'BGR',
        'Burkina Faso': 'BFA',
        'Burundi': 'BDI',
        'Cabo Verde': 'CPV',
        'Cape Verde': 'CPV',
        'Cambodia': 'KHM',
        'Cameroon': 'CMR',
        'Canada': 'CAN',
        'Central African Republic': 'CAF',
        'Chad': 'TCD',
        'Chile': 'CHL',
        'China': 'CHN',
        'Colombia': 'COL',
        'Comoros': 'COM',
        'Republic of Congo': 'COG',
        'Democratic Republic of the Congo': 'COD',
        'Democratic Republic of Congo': 'COD',
        'Costa Rica': 'CRI',
        'Cote d\'Ivoire': 'CIV',
        'Croatia': 'HRV',
        'Cuba': 'CUB',
        'Cyprus': 'CYP',
        'Czechia': 'CZE',
        'Denmark': 'DNK',
        'Djibouti': 'DJI',
        'Dominica': 'DMA',
        'Dominican Republic': 'DOM',
        'East Timor': 'TLS',
        'Timor-Leste': 'TLS',
        'Ecuador': 'ECU',
        'Egypt': 'EGY',
        'El Salvador': 'SLV',
        'Equatorial Guinea': 'GNQ',
        'Eritrea': 'ERI',
        'Estonia': 'EST',
        'Eswatini': 'SWZ',
        'Ethiopia': 'ETH',
        'Fiji': 'FJI',
        'Finland': 'FIN',
        'France': 'FRA',
        'Gabon': 'GAB',
        'The Gambia': 'GMB',
        'Georgia': 'GEO',
        'Germany': 'DEU',
        'Ghana': 'GHA',
        'Greece': 'GRC',
        'Grenada': 'GRD',
        'Guatemala': 'GTM',
        'Guinea': 'GIN',
        'Guinea-Bissau': 'GNB',
        'Guyana': 'GUY',
        'Haiti': 'HTI',
        'Honduras': 'HND',
        'Hong Kong': 'HKG',
        'Hungary': 'HUN',
        'Iceland': 'ISL',
        'India': 'IND',
        'Indonesia': 'IDN',
        'Iran': 'IRN',
        'Iraq': 'IRQ',
        'Ireland': 'IRL',
        'Israel': 'ISR',
        'Italy': 'ITA',
        'Ivory Coast': 'CIV',
        'Jamaica': 'JAM',
        'Japan': 'JPN',
        'Jordan': 'JOR',
        'Kazakhstan': 'KAZ',
        'Kenya': 'KEN',
        'Kiribati': 'KIR',
        'Kosovo': 'XKX',
        'Kuwait': 'KWT',
        'Kyrgyzstan': 'KGZ',
        'Laos': 'LAO',
        'Latvia': 'LVA',
        'Lebanon': 'LBN',
        'Lesotho': 'LSO',
        'Liberia': 'LBR',
        'Libya': 'LBY',
        'Liechtenstein': 'LIE',
        'Lithuania': 'LTU',
        'Luxembourg': 'LUX',
        'Macao': 'MAC',
        'Madagascar': 'MDG',
        'Malawi': 'MWI',
        'Malaysia': 'MYS',
        'Maldives': 'MDV',
        'Mali': 'MLI',
        'Malta': 'MLT',
        'Marshall Islands': 'MHL',
        'Mauritania': 'MRT',
        'Mauritius': 'MUS',
        'Mexico': 'MEX',
        'Micronesia': 'FSM',
        'Micronesia (country)': 'FSM',
        'Micronesia (Fed. States of)': 'FSM',
        'Moldova': 'MDA',
        'Republic of Moldova': 'MDA',
        'Monaco': 'MCO',
        'Mongolia': 'MNG',
        'Montenegro': 'MNE',
        'Morocco': 'MAR',
        'Mozambique': 'MOZ',
        'Myanmar': 'MMR',
        'Namibia': 'NAM',
        'Nauru': 'NRU',
        'Nepal': 'NPL',
        'Netherlands': 'NLD',
        'New Zealand': 'NZL',
        'Nicaragua': 'NIC',
        'Niger': 'NER',
        'Nigeria': 'NGA',
        'Niue': 'NIU',
        'North Korea': 'PRK',
        'North Macedonia': 'MKD',
        'Northern Cyprus': 'CYN',  # Not an ISO code but used for consistency
        'Norway': 'NOR',
        'Oman': 'OMN',
        'Pakistan': 'PAK',
        'Palau': 'PLW',
        'Palestinian Territories': 'PSE',
        'Panama': 'PAN',
        'Papua New Guinea': 'PNG',
        'Paraguay': 'PRY',
        'Peru': 'PER',
        'Philippines': 'PHL',
        'Poland': 'POL',
        'Portugal': 'PRT',
        'Qatar': 'QAT',
        'Romania': 'ROU',
        'Russian Federation': 'RUS',
        'Rwanda': 'RWA',
        'Saint Kitts and Nevis': 'KNA',
        'Saint Lucia': 'LCA',
        'Saint Vincent and the Grenadines': 'VCT',
        'Samoa': 'WSM',
        'San Marino': 'SMR',
        'Sao Tome and Principe': 'STP',
        'Saudi Arabia': 'SAU',
        'Senegal': 'SEN',
        'Serbia': 'SRB',
        'Seychelles': 'SYC',
        'Sierra Leone': 'SLE',
        'Singapore': 'SGP',
        'Slovakia': 'SVK',
        'Slovenia': 'SVN',
        'Solomon Islands': 'SLB',
        'Somalia': 'SOM',
        'South Africa': 'ZAF',
        'South Korea': 'KOR',
        'South Sudan': 'SSD',
        'Spain': 'ESP',
        'Sri Lanka': 'LKA',
        'Sudan': 'SDN',
        'Suriname': 'SUR',
        'Sweden': 'SWE',
        'Switzerland': 'CHE',
        'Syria': 'SYR',
        'Taiwan': 'TWN',
        'Tajikistan': 'TJK',
        'Tanzania, United Republic of': 'TZA',
        'Thailand': 'THA',
        'Togo': 'TGO',
        'Tonga': 'TON',
        'Trinidad and Tobago': 'TTO',
        'Tunisia': 'TUN',
        'Turkey': 'TUR',
        'Turkmenistan': 'TKM',
        'Tuvalu': 'TUV',
        'Uganda': 'UGA',
        'Ukraine': 'UKR',
        'United Arab Emirates': 'ARE',
        'United Kingdom': 'GBR',
        'United States of America': 'USA',
        'Uruguay': 'URY',
        'Uzbekistan': 'UZB',
        'Vanuatu': 'VUT',
        'Venezuela': 'VEN',
        'Vietnam': 'VNM',
        'Yemen': 'YEM',
        'Zambia': 'ZMB',
        'Zimbabwe': 'ZWE',
        
        # Add regions/continents with custom codes for visualization
        'Africa': 'AFR',
        'Asia': 'ASI',
        'Europe': 'EUR',
        'North America': 'NAM',
        'South America': 'SAM',
        'Oceania': 'OCE',
        
        # Add territories and special regions
        'Mayotte': 'MYT',
        'Réunion': 'REU',
        'Western Sahara': 'ESH',
        'Saint Helena': 'SHN',
        'Macao SAR': 'MAC',
        'Faroe Islands': 'FRO',
        'Guernsey': 'GGY',
        'Isle of Man': 'IMN',
        'Jersey': 'JEY',
        'Gibraltar': 'GIB',
        'Holy See': 'VAT',
        'Kosovo (under UNSC res. 1244)': 'XKX',
        'Anguilla': 'AIA',
        'Aruba': 'ABW',
        'Bonaire, Sint Eustatius and Saba': 'BES',
        'British Virgin Islands': 'VGB',
        'Cayman Islands': 'CYM',
        'Curaçao': 'CUW',
        'Guadeloupe': 'GLP',
        'Martinique': 'MTQ',
        'Montserrat': 'MSR',
        'Puerto Rico': 'PRI',
        'Saint Barthélemy': 'BLM',
        'Saint Martin (French part)': 'MAF',
        'Sint Maarten (Dutch part)': 'SXM',
        'Turks and Caicos Islands': 'TCA',
        'United States Virgin Islands': 'VIR',
        'Falkland Islands (Malvinas)': 'FLK',
        'French Guiana': 'GUF',
        'Bermuda': 'BMU',
        'Greenland': 'GRL',
        'Saint Pierre and Miquelon': 'SPM',
        'New Caledonia': 'NCL',
        'Guam': 'GUM',
        'Northern Mariana Islands': 'MNP',
        'American Samoa': 'ASM',
        'Cook Islands': 'COK',
        'French Polynesia': 'PYF',
        'Tokelau': 'TKL',
        'Wallis and Futuna Islands': 'WLF'
    }
    
    return name_mapping, country_codes

def standardize_country_names(df, country_col='country'):
    """
    Standardize country names in a dataframe and add ISO country codes.
    
    Args:
        df: Pandas dataframe with a country column
        country_col: Name of the country column (default: 'country')
        
    Returns:
        DataFrame with standardized country names and added 'country_code' column
    """
    name_mapping, country_codes = get_country_mappings()
    
    # Remove asterisks from country names if present
    if country_col in df.columns:
        df[country_col] = df[country_col].astype(str).str.replace(r'\*$', '', regex=True)
    
    # First standardize names
    for variant, standard in name_mapping.items():
        df.loc[df[country_col] == variant, country_col] = standard
    
    # Add country codes
    df['country_code'] = df[country_col].map(country_codes)
    
    # Log countries with missing codes
    missing_codes = df[df['country_code'].isna()][country_col].unique()
    if len(missing_codes) > 0:
        print(f"Warning: Missing country codes for: {', '.join(missing_codes)}")
    
    return df

def process_happiness_data():
    """Process happiness score data from all years and combine into one dataset"""
    print("Processing happiness data...")
    
    all_data = []
    years = range(2015, 2025)
    
    for year in years:
        file_path = HAPPINESS_DIR / f"{year}_report.csv"
        if not file_path.exists():
            print(f"Warning: No data file found for {year}")
            continue
            
        df = pd.read_csv(file_path)
        
        # Standardize column names (they may differ slightly between years)
        column_mapping = {
            'Country': 'country',
            'Country or region': 'country',
            'Country name': 'country',
            'Region': 'region',
            'Happiness Rank': 'rank',
            'Happiness Score': 'score',
            'Happiness.Score': 'score', 
            'Happiness score': 'score',
            'happiness_score': 'score',
            'Score': 'score',
            'Ladder score': 'score',
            'Life Ladder': 'score',
            'GDP per capita': 'gdp_per_capita',
            'Economy..GDP.per.Capita.': 'gdp_per_capita',
            'Economy (GDP per Capita)': 'gdp_per_capita',
            'Explained by: GDP per capita': 'gdp_per_capita',
            'Log GDP per capita': 'gdp_per_capita',
            'gdp_per_capita': 'gdp_per_capita',
            'Social support': 'social_support',
            'Family': 'social_support',
            'Explained by: Social support': 'social_support',
            'social_support': 'social_support',
            'Health..Life.Expectancy.': 'life_expectancy',
            'Health (Life Expectancy)': 'life_expectancy',
            'Healthy Life Expectancy': 'life_expectancy',
            'Healthy life expectancy': 'life_expectancy',
            'Explained by: Healthy life expectancy': 'life_expectancy',
            'health': 'life_expectancy',
            'Freedom': 'freedom',
            'Freedom to make life choices': 'freedom',
            'Explained by: Freedom to make life choices': 'freedom',
            'freedom': 'freedom',
            'Trust..Government.Corruption.': 'corruption',
            'Trust (Government Corruption)': 'corruption',
            'Perceptions of corruption': 'corruption',
            'Explained by: Perceptions of corruption': 'corruption',
            'corruption': 'corruption',
            'Generosity': 'generosity',
            'Explained by: Generosity': 'generosity',
            'generosity': 'generosity',
            'Continent': 'continent',
            'continent': 'continent',
            'Dystopia Residual': 'dystopia_residual',
            'Explained by: Dystopia + residual': 'dystopia_residual',
            'dystopia_residual': 'dystopia_residual'
        }
        
        # Rename columns based on mapping, ignore those not in the mapping
        df = df.rename(columns={col: column_mapping.get(col, col) for col in df.columns})
        
        # Keep only the columns we need
        essential_columns = ['country', 'score', 'gdp_per_capita', 
                           'social_support', 'life_expectancy', 
                           'freedom', 'corruption', 'generosity', 'dystopia_residual']
        
        # Add region or continent if they exist in the dataframe
        if 'region' in df.columns:
            essential_columns.append('region')
        if 'continent' in df.columns:
            essential_columns.append('continent')
        
        # Filter to keep only columns that exist in the dataframe
        existing_columns = [col for col in essential_columns if col in df.columns]
        
        df = df[existing_columns].copy()
        
        # Add year column
        df['year'] = year
        
        # Standardize country names and add country codes
        df = standardize_country_names(df)
        
        all_data.append(df)
    
    # Combine all years into a single dataframe
    combined_df = pd.concat(all_data, ignore_index=True)
    
    # Handle region and continent information
    if 'region' not in combined_df.columns and 'continent' in combined_df.columns:
        # If we have continent but not region, create a region mapping from continent
        continent_to_region = {
            'Europe': 'Western Europe',
            'North America': 'North America',
            'Australia': 'Australia and New Zealand',
            'Oceania': 'Australia and New Zealand',
            'Asia': 'Eastern Asia',
            'South America': 'Latin America and Caribbean',
            'Africa': 'Sub-Saharan Africa'
        }
        combined_df['region'] = combined_df['continent'].map(continent_to_region)
    elif 'region' in combined_df.columns and 'continent' not in combined_df.columns:
        # If we have region but not continent, create a continent mapping
        region_to_continent = {
            'Western Europe': 'Europe',
            'North America': 'North America',
            'Australia and New Zealand': 'Oceania',
            'Middle East and Northern Africa': 'Asia',
            'Latin America and Caribbean': 'South America',
            'Southeastern Asia': 'Asia',
            'Central and Eastern Europe': 'Europe',
            'Eastern Asia': 'Asia',
            'Sub-Saharan Africa': 'Africa',
            'Southern Asia': 'Asia',
            'Central America': 'North America'  # Added Central America mapping
        }
        combined_df['continent'] = combined_df['region'].map(region_to_continent)
    
    # If we have region data for some countries, fill missing region data based on country-region mapping
    if 'region' in combined_df.columns:
        # Create country-region mapping from non-null values
        country_region_map = combined_df.dropna(subset=['region'])[['country', 'region']].drop_duplicates()
        if not country_region_map.empty:
            country_region_dict = country_region_map.set_index('country')['region'].to_dict()
            # Fill missing region data
            combined_df['region'] = combined_df.apply(
                lambda row: country_region_dict.get(row['country']) if pd.isna(row.get('region', None)) else row.get('region', None), 
                axis=1
            )
    
    return combined_df

def process_hdi_data():
    """Process Human Development Index data"""
    print("Processing HDI data...")
    
    # Read the HDI data
    hdi_file = HDI_DIR / "human-development-index.csv"
    if not hdi_file.exists():
        print(f"Warning: HDI data file not found at {hdi_file}")
        return pd.DataFrame()
        
    hdi_df = pd.read_csv(hdi_file)
    
    # Rename columns for consistency
    hdi_df = hdi_df.rename(columns={
        'Entity': 'country',
        'Year': 'year',
        'Human Development Index': 'hdi'
    })
    
    # Filter for the years we're interested in (2015-2024)
    hdi_df = hdi_df[(hdi_df['year'] >= 2015) & (hdi_df['year'] <= 2024)]
    
    # Filter out non-country entities (e.g., regions, continents)
    non_country_patterns = [
        'World', 'Very high human development', 'High human development',
        'Medium human development', 'Low human development', 'income', 
        'OECD', 'Developing', 'Arab', 'ASEAN', 'Latin America', 'Caribbean',
        'European', 'Union', 'East Asia', 'Central Asia', 'South Asia',
        'Sub-Saharan', 'UNDP', 'region', 'Developed', 'Pacific', 'Small'
    ]
    
    # Create regex pattern to match any of the non-country patterns
    non_country_regex = '|'.join(non_country_patterns)
    hdi_df = hdi_df[~hdi_df['country'].str.contains(non_country_regex, case=False, na=False)]
    
    # Standardize country names and add country codes
    hdi_df = standardize_country_names(hdi_df)
    
    # Keep only records with valid country codes
    hdi_df = hdi_df.dropna(subset=['country_code'])
    
    return hdi_df[['country', 'year', 'hdi', 'country_code']]

def process_population_data():
    """Process population data for all years"""
    print("Processing population data...")
    
    all_pop_data = []
    years = range(2015, 2025)
    
    for year in years:
        file_path = POPULATION_DIR / f"population_{year}.csv"
        if not file_path.exists():
            print(f"Warning: No population data file found for {year}")
            continue
            
        df = pd.read_csv(file_path)
        
        # Extract country, male population, female population, and total population
        # Look for the Location column for country names
        if 'Location' in df.columns:
            # Check if PopDensity exists in the dataframe before selecting it
            density_col = ['PopDensity'] if 'PopDensity' in df.columns else []
            pop_df = df[['Location', 'PopMale', 'PopFemale', 'PopTotal'] + density_col].copy()
            
            column_renames = {
                'Location': 'country',
                'PopMale': 'pop_male',
                'PopFemale': 'pop_female', 
                'PopTotal': 'population'
            }
            
            # Add density if it exists
            if 'PopDensity' in df.columns:
                column_renames['PopDensity'] = 'population_density'
                
            pop_df = pop_df.rename(columns=column_renames)
        else:
            print(f"Warning: Could not find Location column in {year} population data")
            continue
        
        # Filter out non-country rows if possible
        if 'LocTypeName' in df.columns:
            country_mask = df['LocTypeName'] == 'Country/Area'
            pop_df = pop_df[country_mask].copy()
        
        # Add year column
        pop_df['year'] = year
        
        # Standardize country names and add country codes
        pop_df = standardize_country_names(pop_df)
        
        all_pop_data.append(pop_df)
    
    # Combine all years
    if all_pop_data:
        # Get columns that exist in the first dataframe
        columns_to_keep = ['country', 'year', 'country_code']
        for col in ['population', 'pop_male', 'pop_female', 'population_density']:
            if col in all_pop_data[0].columns:
                columns_to_keep.append(col)
                
        combined_pop_df = pd.concat(all_pop_data, ignore_index=True)
        return combined_pop_df[columns_to_keep]
    else:
        print("No population data found")
        return pd.DataFrame()

def merge_datasets():
    """Merge all datasets on country and year"""
    print("Merging all datasets...")
    
    # Get processed data
    happiness_df = process_happiness_data()
    hdi_df = process_hdi_data()
    population_df = process_population_data()
    
    # Merge happiness and HDI data
    if not hdi_df.empty:
        merged_df = pd.merge(
            happiness_df, 
            hdi_df, 
            on=['country', 'year', 'country_code'], 
            how='left'
        )
    else:
        merged_df = happiness_df
    
    # Merge population data
    if not population_df.empty:
        merged_df = pd.merge(
            merged_df,
            population_df,
            on=['country', 'year', 'country_code'],
            how='left'
        )
    
    # Fill missing values for better visualization
    for col in ['gdp_per_capita', 'social_support', 'life_expectancy', 
                'freedom', 'corruption', 'generosity', 'hdi', 'population']:
        if col in merged_df.columns:
            # For each country, forward/backward fill missing values
            # Use ffill() and bfill() instead of fillna(method='ffill') to avoid FutureWarning
            merged_df[col] = merged_df.groupby('country')[col].transform(
                lambda x: x.ffill().bfill()
            )
    
    # Create continent mapping based on regions if continent column doesn't already exist
    if 'continent' not in merged_df.columns and 'region' in merged_df.columns:
        region_to_continent = {
            'Western Europe': 'Europe',
            'North America': 'North America',
            'Australia and New Zealand': 'Oceania',
            'Middle East and Northern Africa': 'Asia',
            'Latin America and Caribbean': 'South America',
            'Southeastern Asia': 'Asia',
            'Central and Eastern Europe': 'Europe',
            'Eastern Asia': 'Asia',
            'Sub-Saharan Africa': 'Africa',
            'Southern Asia': 'Asia'
        }
        
        # Add continent column based on region mapping
        merged_df['continent'] = merged_df['region'].map(region_to_continent)
    
    # Calculate additional metrics for analysis
    if 'population' in merged_df.columns and 'score' in merged_df.columns:
        # Create population-weighted happiness score by year
        merged_df['weighted_score'] = merged_df['score'] * merged_df['population']
        
        # Create a new population size category column for analysis
        pop_bins = [0, 10e3, 50e3, 100e3, 500e3, float('inf')]
        pop_labels = ['Very Small (<10M)', 'Small (10-50M)', 'Medium (50-100M)', 'Large (100-500M)', 'Very Large (>500M)']
        merged_df['population_category'] = pd.cut(merged_df['population'], bins=pop_bins, labels=pop_labels)
    
    # Add development category based on HDI if available
    if 'hdi' in merged_df.columns:
        hdi_bins = [0, 0.55, 0.7, 0.8, 1.0]
        hdi_labels = ['Low', 'Medium', 'High', 'Very High']
        merged_df['development_category'] = pd.cut(merged_df['hdi'], bins=hdi_bins, labels=hdi_labels)
    
    # Convert year column to integer to avoid int64 serialization issues
    merged_df['year'] = merged_df['year'].astype(int)
    
    return merged_df

def export_data():
    """Export data to JSON files for web application"""
    print("Exporting data to JSON...")
    
    # Get merged data
    data = merge_datasets()
    
    # For numerical columns, round to 3 decimal places to reduce file size
    numeric_cols = data.select_dtypes(include=['float64']).columns
    for col in numeric_cols:
        data[col] = data[col].round(3)
    
    # Export full dataset
    data_json = data.to_json(orient='records')
    with open(OUTPUT_DIR / 'happiness_data.json', 'w') as f:
        f.write(data_json)
    
    # Export time series data by country
    time_series = {}
    for country in data['country'].unique():
        country_data = data[data['country'] == country].sort_values('year')
        time_series[country] = country_data.to_dict(orient='records')
    
    with open(OUTPUT_DIR / 'time_series.json', 'w') as f:
        json.dump(time_series, f)
    
    # Export country list with additional metadata (continent, latest scores)
    countries_df = data.sort_values('year', ascending=False).drop_duplicates('country')
    countries = countries_df[['country', 'continent', 'country_code', 'score', 'hdi']].sort_values('country')
    countries_json = countries.to_dict(orient='records')
    with open(OUTPUT_DIR / 'countries.json', 'w') as f:
        json.dump(countries_json, f)
    
    # Export summary statistics by continent and year
    summary = data.groupby(['continent', 'year']).agg({
        'score': 'mean',
        'gdp_per_capita': 'mean',
        'social_support': 'mean',
        'life_expectancy': 'mean',
        'freedom': 'mean',
        'corruption': 'mean',
        'generosity': 'mean',
        'hdi': 'mean',
        'population': 'sum'
    }).reset_index()
    
    summary_json = summary.to_json(orient='records')
    with open(OUTPUT_DIR / 'summary_by_continent.json', 'w') as f:
        f.write(summary_json)
    
    # Export global averages by year
    global_avg = data.groupby('year').agg({
        'score': 'mean',
        'gdp_per_capita': 'mean',
        'social_support': 'mean',
        'life_expectancy': 'mean',
        'freedom': 'mean',
        'corruption': 'mean',
        'generosity': 'mean',
        'hdi': 'mean'
    }).reset_index()
    
    global_json = global_avg.to_json(orient='records')
    with open(OUTPUT_DIR / 'global_trends.json', 'w') as f:
        f.write(global_json)
        
    # Export correlation matrix for happiness factors
    correlation_cols = ['score', 'gdp_per_capita', 'social_support', 'life_expectancy', 'freedom', 'corruption', 'generosity', 'hdi']
    corr_cols = [col for col in correlation_cols if col in data.columns]
    correlation = data[corr_cols].corr().round(3)
    correlation_json = correlation.to_json(orient='split')
    with open(OUTPUT_DIR / 'correlations.json', 'w') as f:
        f.write(correlation_json)
    
    # Export population category analysis with observed=True to avoid FutureWarning
    if 'population_category' in data.columns:
        pop_category_summary = data.groupby(['population_category', 'year'], observed=True).agg({
            'score': 'mean',
            'hdi': 'mean',
            'country': 'count'
        }).rename(columns={'country': 'num_countries'}).reset_index()
        
        pop_cat_json = pop_category_summary.to_json(orient='records')
        with open(OUTPUT_DIR / 'population_category_analysis.json', 'w') as f:
            f.write(pop_cat_json)
    
    # Export data completeness information
    data_completeness = {}
    for year in sorted(data['year'].unique()):
        year_data = data[data['year'] == year]
        completeness = {
            'year': int(year),
            'total_countries': int(len(year_data)),
            'has_happiness': int(sum(~year_data['score'].isna())),
            'has_hdi': int(sum(~year_data['hdi'].isna()) if 'hdi' in year_data.columns else 0),
            'has_population': int(sum(~year_data['population'].isna()) if 'population' in year_data.columns else 0),
            'complete_records': int(sum(year_data[['score', 'gdp_per_capita', 'social_support', 'freedom']].notna().all(axis=1)))
        }
        # Convert all int64/float64 values to Python integers to avoid JSON serialization issues
        data_completeness[str(year)] = completeness
    
    with open(OUTPUT_DIR / 'data_completeness.json', 'w') as f:
        json.dump(data_completeness, f)
    
    print(f"Data export complete. Files saved to {OUTPUT_DIR}")

def validate_data():
    """Run data validation checks and print summary statistics"""
    print("Validating transformed data...")
    
    # Get merged data
    data = merge_datasets()
    
    # Basic stats
    total_countries = data['country'].nunique()
    years_covered = sorted(data['year'].unique())
    
    print(f"Total unique countries: {total_countries}")
    print(f"Years covered: {years_covered[0]} to {years_covered[-1]}")
    
    # Completeness by year
    completeness = data.groupby('year').apply(
        lambda x: pd.Series({
            'num_countries': len(x),
            'happiness_data_pct': (100 * (~x['score'].isna()).sum() / len(x)),
            'hdi_data_pct': (100 * (~x['hdi'].isna()).sum() / len(x)) if 'hdi' in x.columns else 0,
            'population_data_pct': (100 * (~x['population'].isna()).sum() / len(x)) if 'population' in x.columns else 0
        })
    )
    
    print("\nData completeness by year:")
    print(completeness)
    
    # Countries with missing data
    countries_missing_happiness = data[data['score'].isna()]['country'].unique()
    countries_missing_hdi = data[data['hdi'].isna()]['country'].unique() if 'hdi' in data.columns else []
    
    if len(countries_missing_happiness) > 0:
        print(f"\nCountries missing happiness data: {', '.join(countries_missing_happiness[:10])}" + 
              (f" and {len(countries_missing_happiness)-10} more" if len(countries_missing_happiness) > 10 else ""))
    
    if len(countries_missing_hdi) > 0:
        print(f"\nCountries missing HDI data: {', '.join(countries_missing_hdi[:10])}" + 
              (f" and {len(countries_missing_hdi)-10} more" if len(countries_missing_hdi) > 10 else ""))
    
    # Check for data anomalies
    if 'score' in data.columns:
        min_score = data['score'].min()
        max_score = data['score'].max()
        print(f"\nHappiness score range: {min_score:.2f} to {max_score:.2f}")
        
        # Check for potential outliers
        low_outliers = data[data['score'] < 2.5]['country'].unique()
        high_outliers = data[data['score'] > 8.5]['country'].unique()
        
        if len(low_outliers) > 0:
            print(f"Countries with unusually low happiness scores (<2.5): {', '.join(low_outliers)}")
        
        if len(high_outliers) > 0:
            print(f"Countries with unusually high happiness scores (>8.5): {', '.join(high_outliers)}")
    
    # Return the data for further processing
    return data

if __name__ == "__main__":
    export_data()
    # Run data validation to check for issues
    validate_data()