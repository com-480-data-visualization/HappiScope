# Milestone 1 (21st March, 5pm)

**10% of the final grade**

### Introduction

Understanding what makes societies happy is a crucial question for policymakers, researchers, and citizens alike. The World Happiness Report provides a rich dataset for exploring how different factors contribute to subjective well-being across countries and time. Through interactive visualization, HappiScope aims to transform complex happiness data into intuitive visual insights that reveal patterns and relationships that might otherwise remain hidden in tables and statistics.

### Dataset

Our primary dataset is the **World Happiness Report (2015-2024)**, which ranks countries based on their citizens' self-reported happiness levels and analyzes factors contributing to well-being.

The World Happiness Report represents a comprehensive global survey of happiness and well-being, published annually by the United Nations Sustainable Development Solutions Network. This dataset offers insights through several key metrics: the Happiness Score (or Ladder Score), which captures self-reported life evaluation on a scale of 0-10; GDP per capita as a measure of economic production; Social Support, indicating the presence of someone to count on in times of trouble; Healthy Life Expectancy; Freedom to make life choices; Generosity reflected through donation behaviors; Corruption Perception in the public sector; and the Dystopia Residual representing unexplained components of happiness.

The data is collected through the Gallup World Poll, which conducts nationally representative surveys in approximately 150 countries using samples of about 1,000 individuals per country. While the 2015-2020 data is conveniently preprocessed on Kaggle, we'll need to standardize the 2021-2024 data to maintain consistency throughout our analysis.

**Primary Data Sources:**

- [World Happiness Report Official Website](https://worldhappiness.report/) - Annual reports from 2012-2024
- [Preprocessed Dataset (2015-2020)](https://www.kaggle.com/datasets/yamaerenay/world-happiness-report-preprocessed) - Contains cleaned data

To enrich our analysis and explore correlations between happiness and other socioeconomic factors, we'll incorporate several supplementary datasets:

**Supplementary Data Sources:**

- [Human Development Index (HDI)](https://hdr.undp.org/data-center/human-development-index#/indicies/HDI) - Covers health, education, and income metrics across countries since 1990
- [Global Health Observatory (WHO)](https://www.who.int/data/gho) - Provides health metrics including mental health indicators and life expectancy data
- [World Bank Open Data](https://data.worldbank.org/) - Offers economic and social indicators with extensive historical coverage
- [World Population Prospects (UN)](https://population.un.org/wpp/) - Contains demographic data from 1950 to projections through 2100

Integrating these datasets presents challenges related to naming conventions, missing data, measurement differences, and temporal alignment. Our preprocessing pipeline will address these issues through country name standardization, temporal alignment, and careful handling of missing values.

### Problematic

#### Project Overview

HappiScope aims to create an interactive visualization platform exploring the complex relationships between happiness and various socioeconomic, health, and cultural factors globally. In a world often focused on economic metrics alone, our visualization tools will help users understand the multidimensional nature of well-being and what truly contributes to societal happiness.

#### Key Research Questions

- How has global happiness changed over the past decade (2015-2024), and what regional patterns emerge?
- What factors correlate most strongly with happiness across different regions and income levels?
- How do economic metrics like GDP compare to social support metrics in predicting happiness?
- How do socioeconomic shocks like the COVID-19 pandemic affect happiness trends?
- What are the most significant differences in happiness determinants between high- and low-income countries?

Traditional metrics like GDP often fail to capture the full spectrum of well-being. Our visualization aims to provide a more holistic view, highlighting the complex interplay between economic, social, and personal factors.

#### Target Audience

Our project addresses the needs of several key audiences:

**Policymakers** who require evidence-based visualizations to understand well-being determinants beyond economic indicators, helping inform more holistic policy approaches.

**Researchers** in fields like economics, psychology, and sociology who can use our interactive tools to explore complex relationships between variables and test hypotheses.

**Educators** teaching concepts related to development, well-being, and global affairs who need engaging visual tools to explain complex relationships.

**General Public** interested in understanding global patterns and where their countries stand in terms of happiness and its contributing factors.

### Exploratory Data Analysis

Our exploratory phase examined three key datasets through visualizations that track country trajectories over time, compare scores across nations, and map geographic distributions of key metrics:

- [World Happiness Report Analysis](../data/happiness_score_data/data_vis.ipynb)
- [Human Development Index Analysis](../data/hdi_data/HDI_vis.ipynb)
- [Population Data Analysis](../data/population_data/data_vis.ipynb)

Our preliminary findings reveal several significant patterns in global happiness data:

Global happiness scores range from approximately 1.7 to 7.8, with Nordic and Western European countries consistently dominating the top positions. Finland has maintained the highest happiness ranking since 2018, while Switzerland, Denmark, and other Nordic nations consistently appear in top positions throughout the decade.

Time series analysis shows notable stability in many countries' happiness trajectories, though with some interesting exceptions. For example, Switzerland peaked in happiness in 2016 and has gradually declined while still maintaining high global standing. China shows steady improvement from 5.2 in 2015 to nearly 6.0 in 2024, while the United States displays more variability with a notable drop in 2024.

Regional patterns are evident, with European countries (particularly Northern and Western) clustering at higher happiness levels, while conflict-affected regions and parts of Sub-Saharan Africa typically rank lower. Our European geographic visualization clearly demonstrates this gradient, with Switzerland (7.06) and Germany (6.72) scoring significantly higher than Southern European nations like Portugal (6.03).

When examining Human Development Index (HDI) data alongside happiness metrics, we observe strong correlation patterns that reinforce regional disparities. Countries with high HDI scores generally report higher happiness levels, suggesting the influence of economic development, life expectancy, and education on subjective well-being.

Population trends across countries show interesting relationships with both happiness and development metrics, providing context for understanding how demographic shifts might influence national well-being over time.

### Related Work

#### Existing Happiness Visualizations

The [official World Happiness Report visualizations](https://worldhappiness.report/ed/2023/) provide basic maps and bar charts focused primarily on country rankings and simple correlations. While informative, they lack interactive elements and multivariate exploration capabilities.

[Our World in Data's happiness analysis](https://ourworldindata.org/happiness-and-life-satisfaction) offers more advanced visualizations, including linked scatterplots, cartograms, and detailed time series. Their clean design aesthetic and thoughtful integration of explanatory text with visualizations serves as an inspiration, though most visualizations remain static.

[Visual Capitalist](https://www.visualcapitalist.com/visualizing-the-happiest-country-on-every-continent/) creates visually appealing infographics highlighting happiness by continent, but these tend to simplify complex relationships and lack exploratory capabilities.

#### Visualization Innovation Opportunities

Our visualization approach will advance beyond existing efforts through several key innovations:

**Interactive Temporal Analysis** - Inspired by [Gapminder's dynamic bubble charts](https://www.gapminder.org/tools/), we plan to develop animated transitions showing happiness evolution over time, with interactive controls that allow users to track patterns over the full decade.

**Multi-dimensional Exploration** - Taking cues from interactive dashboards, we envision linked visualizations where selections in one view (e.g., a map) filter or highlight related data in other views (e.g., factor correlation charts), enabling users to discover complex relationships.

**Integrated Supplementary Data** - We aim to seamlessly incorporate metrics from our supplementary datasets, allowing users to explore relationships between happiness and broader development indicators like education levels, health outcomes, and demographic factors.

**Spatial Pattern Discovery** - Our geographic visualizations will reveal regional clusters and outliers, with techniques like small multiple maps to compare different happiness factors across regions and contiguous cartograms to emphasize important patterns.

**Contextual Narratives** - Rather than presenting data in isolation, we plan to integrate explanatory elements that help users understand the metrics, their limitations, and potential interpretations of observed patterns.

### Next Steps

For Milestone 2, we plan to develop functional prototypes of our core visualizations, focusing on the interactive map interface and factor correlation views. We will implement initial interactivity features and refine our data preprocessing pipeline to incorporate the supplementary datasets. User feedback will be gathered to improve usability and insight generation.
