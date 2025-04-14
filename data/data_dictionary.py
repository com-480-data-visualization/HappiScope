import pandas as pd
import json
from pathlib import Path

"""
HappiScope Data Dictionary

This document provides definitions for all standardized fields used in the HappiScope dataset.
It explains the meaning, range, source, and transformation process for each data field.
"""

# Main dataset fields
FIELD_DEFINITIONS = {
    # Core Happiness Report fields
    "country": "Official country name, standardized across all datasets",
    "country_code": "ISO 3166-1 alpha-3 country code (e.g., USA, FRA, JPN)",
    "year": "Year of data collection, ranges from 2015 to 2024",
    "score": "Happiness score (also called Ladder score) on a scale of 0-10, representing subjective well-being reported by respondents",
    "gdp_per_capita": "Log of GDP per capita, representing economic strength contribution to happiness",
    "social_support": "National average of binary responses to having someone to count on in times of trouble",
    "life_expectancy": "Healthy life expectancy at birth, contribution to happiness",
    "freedom": "National average of binary responses to the question of freedom to make life choices",
    "corruption": "National average of perception of corruption in government and business",
    "generosity": "Residual of regressing national average of charitable donation on GDP per capita",
    "dystopia_residual": "The unexplained component of happiness, calculated by comparing to a hypothetical 'dystopia' country",
    # Geographic categorization
    "region": "Regional classification from World Happiness Report (e.g., Western Europe, North America)",
    "continent": "Continent classification derived from region or added as supplementary data",
    # Human Development Index data
    "hdi": "Human Development Index value (0-1), measuring average achievement in key dimensions of human development",
    "development_category": "HDI-based categorization: Low, Medium, High, Very High",
    # Population data
    "population": "Total population in thousands",
    "pop_male": "Male population in thousands",
    "pop_female": "Female population in thousands",
    "population_density": "Population per square kilometer of land area",
    "population_category": "Categorization based on population size: Very Small, Small, Medium, Large, Very Large",
    # Derived metrics
    "weighted_score": "Happiness score weighted by population size",
}

# Data sources with descriptions
DATA_SOURCES = {
    "happiness": {
        "name": "World Happiness Report",
        "years": "2015-2024",
        "source": "https://worldhappiness.report/",
        "description": "Annual survey data measuring subjective well-being and its determinants",
    },
    "hdi": {
        "name": "Human Development Index",
        "years": "2015-2024",
        "source": "https://hdr.undp.org/data-center/human-development-index",
        "description": "Composite index measuring average achievement in health, education and standard of living",
    },
    "population": {
        "name": "UN World Population Prospects",
        "years": "2015-2024",
        "source": "https://population.un.org/wpp/",
        "description": "Demographic data with population estimates and projections",
    },
}

# Transformation notes
TRANSFORMATION_NOTES = [
    "Country names standardized using extensive mapping of variants to official names",
    "ISO 3166-1 alpha-3 country codes added for consistent identification",
    "Column names harmonized across all years of happiness reports",
    "Region and continent information standardized and filled where missing",
    "Missing values filled using forward/backward filling within countries",
    "Population categorized into 5 groups based on size thresholds",
    "Development categorized into 4 groups based on HDI thresholds",
    "Numerical columns rounded to 3 decimal places for efficiency",
]

# Export this information as JSON for potential use in the web application
if __name__ == "__main__":
    output_dir = Path(__file__).parent.parent / "docs" / "src" / "data"

    data_dict = {
        "fields": FIELD_DEFINITIONS,
        "sources": DATA_SOURCES,
        "transformation_notes": TRANSFORMATION_NOTES,
    }

    with open(output_dir / "data_dictionary.json", "w") as f:
        json.dump(data_dict, f, indent=2)

    print(f"Data dictionary exported to {output_dir / 'data_dictionary.json'}")
