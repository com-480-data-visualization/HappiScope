import { useState } from 'react'
import { motion } from 'framer-motion'

function Methodology() {
  const [activeTab, setActiveTab] = useState('data')

  const tabs = [
    { id: 'data', label: 'Data Sources' },
    { id: 'preprocessing', label: 'Data Preprocessing' },
    { id: 'visualization', label: 'Visualization Approaches' },
    { id: 'analysis', label: 'Analytical Methods' }
  ]

  return (
    <div className="bg-background min-h-screen">
      <section className="section-container py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title text-center"
        >
          Methodology
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-center mb-12 max-w-3xl mx-auto"
        >
          A detailed explanation of our data sources, preprocessing steps, visualization design decisions, and analytical approaches.
        </motion.p>

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white shadow-md rounded-lg p-4 inline-flex flex-wrap justify-center">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                } mx-1 my-1 transition duration-200`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          {activeTab === 'data' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
              <p className="text-gray-600 mb-4">
                Our primary data source is the World Happiness Report (2015-2024), which provides annual happiness scores and rankings for countries worldwide, along with contributing factors.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Primary Dataset: World Happiness Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Data Collection Methodology</h4>
                  <p className="text-gray-600">
                    The World Happiness Report relies on survey data from the Gallup World Poll, which asks respondents to evaluate their current life situation on a scale from 0 to 10, with 0 representing the worst possible life and 10 the best possible life.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Key Metrics</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Overall happiness score (0-10 scale)</li>
                    <li>Country rankings</li>
                    <li>Six key explanatory factors with relative contributions</li>
                    <li>Statistical confidence intervals</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">Explanatory Factors</h4>
              <p className="text-gray-600 mb-4">
                The World Happiness Report identifies six key factors that contribute to explaining variations in happiness:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-primary">GDP per Capita</p>
                  <p className="text-sm text-gray-600">Economic output per person, log-transformed to account for diminishing returns</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-primary">Social Support</p>
                  <p className="text-sm text-gray-600">Having someone to count on in times of trouble</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-primary">Healthy Life Expectancy</p>
                  <p className="text-sm text-gray-600">Number of years of healthy life expected at birth</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-primary">Freedom</p>
                  <p className="text-sm text-gray-600">Freedom to make life choices without external constraints</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-primary">Generosity</p>
                  <p className="text-sm text-gray-600">Charitable donations and helping behavior</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium text-primary">Corruption Perception</p>
                  <p className="text-sm text-gray-600">Public perception of corruption in government and business</p>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Supplementary Datasets</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Human Development Index (HDI)</h4>
                  <p className="text-gray-600 mb-2">
                    A composite index measuring average achievement in three basic dimensions of human development:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>A long and healthy life (life expectancy at birth)</li>
                    <li>Knowledge (expected years of schooling and mean years of schooling)</li>
                    <li>A decent standard of living (GNI per capita)</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Source:</span> United Nations Development Programme (UNDP)
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Population Data</h4>
                  <p className="text-gray-600 mb-2">
                    Demographic information used to contextualize happiness findings and weight regional averages:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Total population by country (2015-2024)</li>
                    <li>Population density</li>
                    <li>Age distribution statistics</li>
                    <li>Urban/rural population percentages</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Source:</span> World Bank Open Data, United Nations Population Division
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Additional World Bank Indicators</h4>
                  <p className="text-gray-600 mb-2">
                    Supplementary economic and social indicators to enrich our analysis:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Income inequality (Gini coefficient)</li>
                    <li>Unemployment rates</li>
                    <li>Education metrics</li>
                    <li>Healthcare spending as percentage of GDP</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Source:</span> World Bank Open Data
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'preprocessing' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Data Preprocessing</h2>
              <p className="text-gray-600 mb-4">
                The raw data from various sources underwent several preprocessing steps to ensure consistency, completeness, and compatibility across all visualizations.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Preprocessing Pipeline</h3>
              <div className="relative overflow-hidden">
                <div className="absolute left-4 h-full w-0.5 bg-gray-200"></div>
                <div className="space-y-6 pl-10 relative">
                  <div>
                    <div className="absolute left-3.5 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">1</div>
                    <h4 className="font-medium text-lg mb-2">Data Collection and Initial Inspection</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Gathered data from multiple sources in various formats (CSV, Excel, JSON)</li>
                        <li>Conducted exploratory data analysis to identify patterns, missing values, and outliers</li>
                        <li>Assessed data quality, completeness, and integrity by source and year</li>
                        <li>Documented dataset characteristics and limitations</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="absolute left-3.5 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">2</div>
                    <h4 className="font-medium text-lg mb-2">Data Cleaning</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Handled missing values through various strategies (imputation, exclusion, or interpolation)</li>
                        <li>Standardized country names and codes to ensure consistency across datasets</li>
                        <li>Detected and addressed outliers using statistical methods</li>
                        <li>Corrected data entry errors and inconsistencies</li>
                        <li>Normalized numerical scales where appropriate</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="absolute left-3.5 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">3</div>
                    <h4 className="font-medium text-lg mb-2">Data Integration</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Merged data from multiple sources using common identifiers (country codes, names)</li>
                        <li>Resolved conflicting data points and source precedence</li>
                        <li>Created a unified dataset with consistent structure across years</li>
                        <li>Verified integrity of relationships after merging</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="absolute left-3.5 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">4</div>
                    <h4 className="font-medium text-lg mb-2">Feature Engineering</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Created derived metrics (e.g., happiness-to-GDP ratio, happiness efficiency)</li>
                        <li>Calculated region and income group aggregates</li>
                        <li>Constructed time-series metrics (growth rates, volatility measures, trends)</li>
                        <li>Generated correlation matrices between happiness and contributing factors</li>
                        <li>Developed categorical variables for filtering and grouping</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="absolute left-3.5 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center">5</div>
                    <h4 className="font-medium text-lg mb-2">Data Structuring for Visualization</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Transformed data into formats optimized for specific visualization libraries</li>
                        <li>Created hierarchical structures for nested visualizations</li>
                        <li>Generated geospatial mappings for map-based visualizations</li>
                        <li>Prepared color scales and ranges for consistent visual encoding</li>
                        <li>Optimized data structures for efficient loading and rendering</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-medium mt-10 mb-2">Technical Implementation</h3>
              <p className="text-gray-600 mb-4">
                The preprocessing pipeline was implemented using Python, with the following libraries playing key roles:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Data Processing Libraries</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li><span className="font-medium">Pandas</span>: Primary tool for data manipulation and analysis</li>
                    <li><span className="font-medium">NumPy</span>: Numerical computations and array operations</li>
                    <li><span className="font-medium">SciPy</span>: Statistical analysis and testing</li>
                    <li><span className="font-medium">GeoPandas</span>: Geospatial data processing</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Data Output</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>All preprocessed data stored as JSON files for web compatibility</li>
                    <li>Created specialized data structures for each visualization type</li>
                    <li>Implemented data versioning to track changes</li>
                    <li>Generated data dictionaries to document field meanings and units</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-600 mt-6">
                All preprocessing code is available in our GitHub repository, with detailed documentation of each transformation step.
              </p>
            </div>
          )}
          
          {activeTab === 'visualization' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Visualization Approaches</h2>
              <p className="text-gray-600 mb-4">
                Our visualization design decisions were guided by established principles in data visualization, with a focus on clarity, interactivity, and insight generation.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Design Principles & Philosophy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Visual Clarity</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Minimized chart junk and non-data ink</li>
                    <li>Used consistent visual encoding across visualizations</li>
                    <li>Implemented clear visual hierarchies to guide attention</li>
                    <li>Provided appropriate context and annotations</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">User-Centered Design</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Designed for multiple levels of exploration (overview to detail)</li>
                    <li>Incorporated feedback from user testing</li>
                    <li>Ensured accessibility considerations in color choices</li>
                    <li>Provided guided onboarding for complex visualizations</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Interactivity</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Used direct manipulation interfaces where possible</li>
                    <li>Implemented linked views to show relationships</li>
                    <li>Provided responsive feedback for user actions</li>
                    <li>Used tooltips and details-on-demand to manage complexity</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Narrative Elements</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Integrated key findings as highlights</li>
                    <li>Used animation to show transitions and changes</li>
                    <li>Provided contextual information alongside visualizations</li>
                    <li>Created guided pathways through complex data</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-2">Color System</h3>
              <p className="text-gray-600 mb-4">
                Our color system was carefully designed to support both intuitive understanding and accessibility:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-6 gap-2 mb-4">
                  <div className="h-10 rounded bg-green-600"></div>
                  <div className="h-10 rounded bg-green-500"></div>
                  <div className="h-10 rounded bg-green-400"></div>
                  <div className="h-10 rounded bg-yellow-400"></div>
                  <div className="h-10 rounded bg-orange-400"></div>
                  <div className="h-10 rounded bg-red-500"></div>
                </div>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Sequential color scales for continuous metrics (happiness scores, GDP)</li>
                  <li>Diverging color scales for comparison to global or regional averages</li>
                  <li>Categorical color schemes for discrete categories (regions, factors)</li>
                  <li>All color schemes tested for color blindness compatibility</li>
                  <li>Consistent color encoding maintained across all visualizations</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Visualization Types</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Interactive Choropleth Map</h4>
                  <p className="text-gray-600 mb-2">
                    A global map visualization for exploring happiness scores and factors with time controls:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Color-coded countries by happiness score or selected factor</li>
                    <li>Time slider for exploring changes over the decade</li>
                    <li>Interactive tooltips with detailed country information</li>
                    <li>Zoom and pan capabilities for detailed regional exploration</li>
                    <li>Country selection for detailed view and comparison</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Factor Correlation Analysis</h4>
                  <p className="text-gray-600 mb-2">
                    Visualizations showing relationships between happiness and its contributing factors:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Scatter plots with regression lines to show correlations</li>
                    <li>Color-coding by region or income group</li>
                    <li>Interactive highlighting of selected countries</li>
                    <li>Statistical annotations showing correlation strength</li>
                    <li>Controls for selecting different factors and years</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Time Series Visualizations</h4>
                  <p className="text-gray-600 mb-2">
                    Line charts and animated transitions showing changes over time:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Multi-line charts for country comparisons</li>
                    <li>Small multiples for factor trends</li>
                    <li>Area charts for stacked factor contributions</li>
                    <li>Animated transitions between years</li>
                    <li>Annotations for significant events or changes</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Comparative Visualizations</h4>
                  <p className="text-gray-600 mb-2">
                    Tools for direct comparison between countries and regions:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Radar charts comparing factor profiles</li>
                    <li>Bar charts for direct metric comparison</li>
                    <li>Slope graphs showing rank changes</li>
                    <li>Interactive tables with sorting capabilities</li>
                    <li>Side-by-side comparisons with synchronized scales</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Technical Implementation</h3>
              <p className="text-gray-600">
                We leveraged several key technologies to implement our visualizations:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">D3.js</h4>
                  <p className="text-gray-600">
                    Used for data-driven document manipulation, creating the core visualizations with fine-grained control over visual elements and transitions. D3 provides the foundation for our custom interactive charts.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Three.js</h4>
                  <p className="text-gray-600">
                    Employed for creating 3D globe visualizations and immersive data landscapes that provide novel perspectives on global happiness patterns and relationships.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Framer Motion</h4>
                  <p className="text-gray-600">
                    Implemented for smooth animations, transitions between states, and interactive elements that enhance user engagement and understanding of data changes.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'analysis' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Analytical Methods</h2>
              <p className="text-gray-600 mb-4">
                Our analysis of happiness data employs various statistical and computational methods to uncover patterns and relationships.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Statistical Approaches</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Correlation Analysis</h4>
                  <p className="text-gray-600 mb-2">
                    Examining relationships between happiness and contributing factors:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Pearson correlation coefficients for linear relationships</li>
                    <li>Spearman rank correlations for non-linear relationships</li>
                    <li>Partial correlations controlling for confounding variables</li>
                    <li>Correlation matrices across multiple variables</li>
                    <li>Statistical significance testing (p-values)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Time Series Analysis</h4>
                  <p className="text-gray-600 mb-2">
                    Tracking trends and changes in happiness over the decade:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Trend identification and decomposition</li>
                    <li>Year-over-year change calculation</li>
                    <li>Moving averages to smooth short-term fluctuations</li>
                    <li>Identification of significant inflection points</li>
                    <li>Growth rate comparisons across regions and factors</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Comparative Analysis</h4>
                  <p className="text-gray-600 mb-2">
                    Comparing happiness determinants across regions and groups:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>ANOVA tests for group differences</li>
                    <li>t-tests for pairwise comparisons</li>
                    <li>Effect size calculations</li>
                    <li>Regional and income-based aggregations</li>
                    <li>Benchmarking against global and group averages</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Factor Contribution Analysis</h4>
                  <p className="text-gray-600 mb-2">
                    Assessing the relative impact of different factors:
                  </p>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>Multiple regression modeling</li>
                    <li>Variable importance measures</li>
                    <li>Decomposition of variance</li>
                    <li>Factor loading visualization</li>
                    <li>Counterfactual scenario analysis</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Advanced Analytical Techniques</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <p className="text-gray-600 mb-3">
                  Beyond standard statistical methods, we employed several advanced techniques:
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li><span className="font-medium">Clustering Analysis</span>: Identifying natural groupings of countries based on happiness profiles</li>
                  <li><span className="font-medium">Principal Component Analysis (PCA)</span>: Reducing dimensionality to identify key patterns</li>
                  <li><span className="font-medium">Geospatial Analysis</span>: Identifying regional patterns and neighborhood effects</li>
                  <li><span className="font-medium">Counterfactual Modeling</span>: Exploring "what-if" scenarios for policy insights</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Interpretation Frameworks</h3>
              <p className="text-gray-600 mb-4">
                To contextualize our findings, we developed several interpretive frameworks:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Happiness Efficiency Model</h4>
                  <p className="text-gray-600">
                    This framework examines how efficiently countries convert economic resources into happiness, 
                    identifying nations that achieve high happiness scores despite lower GDP levels, and analyzing 
                    the factors that contribute to this efficiency.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Resilience Index</h4>
                  <p className="text-gray-600">
                    We developed a measure of happiness resilience, tracking how countries maintained or recovered 
                    happiness levels during global challenges like the COVID-19 pandemic, identifying factors that 
                    contribute to societal resilience.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Factor Balance Theory</h4>
                  <p className="text-gray-600">
                    This framework suggests that balanced development across all happiness factors leads to more 
                    sustainable happiness than exceptional performance in one area but deficiencies in others.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-2">Limitations and Considerations</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-600 mb-3">
                  We acknowledge several important limitations in our analysis:
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li><span className="font-medium">Data Gaps</span>: Some countries have incomplete data for certain years or factors</li>
                  <li><span className="font-medium">Cultural Bias</span>: The concept and reporting of happiness varies across cultures</li>
                  <li><span className="font-medium">Self-Reporting Bias</span>: Happiness scores rely on subjective self-assessments</li>
                  <li><span className="font-medium">Temporal Limitations</span>: Ten years may be insufficient to capture long-term trends</li>
                  <li><span className="font-medium">Causality</span>: Correlation between factors and happiness doesn't imply causation</li>
                  <li><span className="font-medium">Unmeasured Factors</span>: Many potentially important contributors to happiness are not captured in the data</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-medium mt-6 mb-2">References and Further Reading</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <a href="https://worldhappiness.report/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    World Happiness Report
                  </a>
                  <p className="text-gray-600 mt-1">
                    The official website of the World Happiness Report, containing all annual reports and methodology documentation.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <a href="https://hdr.undp.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    United Nations Development Programme - Human Development Reports
                  </a>
                  <p className="text-gray-600 mt-1">
                    Source of the Human Development Index data and methodological documentation.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    World Bank Open Data
                  </a>
                  <p className="text-gray-600 mt-1">
                    Repository of global development data including many of our supplementary indicators.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <a href="https://github.com/com-480-data-visualization/HappiScope" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    HappiScope GitHub Repository
                  </a>
                  <p className="text-gray-600 mt-1">
                    Our project repository containing all code, data preprocessing scripts, and technical documentation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}

export default Methodology