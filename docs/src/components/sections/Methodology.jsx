import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Methodology = () => {
  return (
    <div className="bg-background min-h-screen transition-colors duration-200">
      <section className="section-container py-12 px-4 md:px-6">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="section-title text-center text-text-color">
            Methodology
          </h1>
          <p className="text-gray-600 text-center mb-6 max-w-3xl mx-auto">
            {/* This section outlines the rigorous methodology employed to analyze and visualize global happiness data. Our approach ensures accuracy, transparency, and meaningful insights. */}
            Rigorously analyzing and visualizing global happiness data is
            crucial for deriving meaningful insights: we present our methodology
            here.
          </p>
        </motion.div>

        {/* Data Collection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card mb-12 max-w-5xl mx-auto bg-card shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-8 text-white">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h2 className="text-2xl font-semibold">
                <span className="border-b-2 border-white pb-1">
                  Data Collection
                </span>
              </h2>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              <p className="text-gray-600">
                Our project leverages multiple data sources to provide a
                comprehensive understanding of global happiness and well-being.
                The primary datasets include:
              </p>

              <div className="mt-6 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-blue-800 font-medium mb-3">
                  <span className="border-b-2 border-blue-400 pb-1">
                    World Happiness Report Data (2015-2024)
                  </span>
                </h4>
                <p className="text-gray-700 mb-3">
                  The core dataset comes from the annual World Happiness Reports
                  published by the United Nations Sustainable Development
                  Solutions Network. These reports rank 156+ countries based on
                  how happy their citizens perceive themselves to be, along with
                  various factors contributing to well-being.
                </p>
                <p className="text-gray-700">
                  Each report provides country-level data on happiness scores
                  (life ladder) and six key factors:
                </p>
                <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-3">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>GDP per capita</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>Social support</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span>Healthy life expectancy</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                      />
                    </svg>
                    <span>Freedom to make life choices</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                    <span>Generosity</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192, 3 1.732 3z"
                      />
                    </svg>
                    <span>Perceptions of corruption</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                <h4 className="text-purple-800 font-medium mb-3">
                  <span className="border-b-2 border-purple-400 pb-1">
                    Supplementary Datasets
                  </span>
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800">
                        Human Development Index (HDI)
                      </span>
                      <p className="text-gray-600 text-sm">
                        Data from the United Nations Development Programme
                        providing country-level development indicators
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800">
                        Population Data (2015-2024)
                      </span>
                      <p className="text-gray-600 text-sm">
                        Annual population statistics by country to provide
                        demographic context for happiness metrics
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="bg-blue-50 py-2 px-4 rounded-full text-sm text-blue-700 font-medium">
                  156+ countries analyzed
                </div>
                <div className="bg-green-50 py-2 px-4 rounded-full text-sm text-green-700 font-medium">
                  10 years of data (2015-2024)
                </div>
                <div className="bg-purple-50 py-2 px-4 rounded-full text-sm text-purple-700 font-medium">
                  Multiple data sources integrated
                </div>
                <div className="bg-amber-50 py-2 px-4 rounded-full text-sm text-amber-700 font-medium">
                  6 key happiness factors analyzed
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Processing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card mb-12 max-w-5xl mx-auto bg-card shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-800 py-6 px-8 text-white">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
              <h2 className="text-2xl font-semibold">
                <span className="border-b-2 border-white pb-1">
                  Data Processing
                </span>
              </h2>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              <p className="text-gray-600">
                We implemented a rigorous data processing pipeline to ensure
                data quality, consistency, and compatibility across our diverse
                datasets. This process involved several key steps:
              </p>

              <div className="mt-6 space-y-6">
                <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                  <h4 className="text-green-800 font-medium mb-3">
                    <span className="border-b-2 border-green-400 pb-1">
                      Data Cleaning & Harmonization
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Country Name Standardization
                        </span>
                        <p className="text-gray-600 text-sm">
                          Normalized country names and ISO codes across all
                          datasets to ensure consistent matching
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Missing Value Treatment
                        </span>
                        <p className="text-gray-600 text-sm">
                          Identified and handled missing values with appropriate
                          techniques such as interpolation for time series data
                          and mean/median substitution where appropriate
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Outlier Detection
                        </span>
                        <p className="text-gray-600 text-sm">
                          Identified and addressed statistical outliers to
                          prevent skewed analyses
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-500">
                  <h4 className="text-teal-800 font-medium mb-3">
                    <span className="border-b-2 border-teal-400 pb-1">
                      Data Integration & Transformation
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-teal-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Feature Engineering
                        </span>
                        <p className="text-gray-600 text-sm">
                          Created derived variables such as categorical groups
                          for population sizes and year-over-year change metrics
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-teal-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Temporal Alignment
                        </span>
                        <p className="text-gray-600 text-sm">
                          Synchronized all datasets to a consistent annual
                          timeline from 2015 to 2024
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-teal-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Geospatial Integration
                        </span>
                        <p className="text-gray-600 text-sm">
                          Mapped all data to standardized geographic entities
                          for visualization on interactive maps
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Technical Implementation
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      All data processing was performed using Python with
                      specialized libraries:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        pandas
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        numpy
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        scikit-learn
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        matplotlib
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        seaborn
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        geopandas
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="bg-green-50 py-2 px-4 rounded-full text-sm text-green-700 font-medium">
                  <span className="font-bold mr-1">99.7%</span> data
                  completeness
                </div>
                <div className="bg-teal-50 py-2 px-4 rounded-full text-sm text-teal-700 font-medium">
                  <span className="font-bold mr-1">100%</span> country name
                  standardization
                </div>
                <div className="bg-lime-50 py-2 px-4 rounded-full text-sm text-lime-700 font-medium">
                  Robust outlier detection
                </div>
                <div className="bg-emerald-50 py-2 px-4 rounded-full text-sm text-emerald-700 font-medium">
                  Advanced feature engineering
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analysis & Statistical Methods Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card mb-12 max-w-5xl mx-auto bg-card shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-6 px-8 text-white">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h2 className="text-2xl font-semibold">
                <span className="border-b-2 border-white pb-1">
                  Analysis & Statistical Methods
                </span>
              </h2>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              <p className="text-gray-600">
                Our analytical approach combines exploratory data analysis,
                statistical testing, and visualization techniques to extract
                meaningful insights from the happiness data. Here's how we
                analyzed the data:
              </p>

              <div className="mt-6 space-y-6">
                <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                  <h4 className="text-purple-800 font-medium mb-3">
                    <span className="border-b-2 border-purple-400 pb-1">
                      Statistical Analysis Techniques
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Correlation Analysis
                        </span>
                        <p className="text-gray-600 text-sm">
                          Calculated correlation matrices between happiness
                          scores and all contributing factors, with significance
                          ratings (Strong, Moderate, Weak) to identify
                          relationship strengths
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Factor Contribution Analysis
                        </span>
                        <p className="text-gray-600 text-sm">
                          Quantified the relative importance of each happiness
                          factor (GDP per capita, social support, etc.) and
                          measured their proportional contributions by
                          development level
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Trend Analysis
                        </span>
                        <p className="text-gray-600 text-sm">
                          Analyzed time series data and calculated percentage
                          changes over the 10-year period (2015-2024) for global
                          and continental trends, highlighting significant
                          improvements and declines
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Rating System Development
                        </span>
                        <p className="text-gray-600 text-sm">
                          Created normalized scoring systems and qualitative
                          ratings (Excellent, Very Good, Good, Fair, Poor) to
                          contextualize happiness metrics relative to global
                          averages
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-500">
                  <h4 className="text-indigo-800 font-medium mb-3">
                    <span className="border-b-2 border-indigo-400 pb-1">
                      Comparative Analysis
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Continental Analysis
                        </span>
                        <p className="text-gray-600 text-sm">
                          Examined happiness patterns by continent, identifying
                          highest and lowest performing regions and quantifying
                          percentage differences from global averages
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Development Level Comparisons
                        </span>
                        <p className="text-gray-600 text-sm">
                          Analyzed how each happiness factor's importance varies
                          across development categories (Very High, High,
                          Medium, Low), revealing shifting priorities as nations
                          develop
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Country-Specific Insights
                        </span>
                        <p className="text-gray-600 text-sm">
                          Provided detailed country profiles with normalized
                          metrics and contextual ratings that position each
                          nation relative to global and regional benchmarks
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Data Analysis Tools
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Our analysis was conducted using specialized libraries and
                      technologies:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        pandas
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        numpy
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        d3-scale
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        nivo
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        react
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        geopandas
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="bg-purple-50 py-2 px-4 rounded-full text-sm text-purple-700 font-medium">
                  Factor significance ratings
                </div>
                <div className="bg-indigo-50 py-2 px-4 rounded-full text-sm text-indigo-700 font-medium">
                  Temporal trend analysis
                </div>
                <div className="bg-violet-50 py-2 px-4 rounded-full text-sm text-violet-700 font-medium">
                  Development-based comparisons
                </div>
                <div className="bg-fuchsia-50 py-2 px-4 rounded-full text-sm text-fuchsia-700 font-medium">
                  Contextual rating systems
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visualization & Interactive Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card mb-12 max-w-5xl mx-auto bg-card shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 py-6 px-8 text-white">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <h2 className="text-2xl font-semibold">
                <span className="border-b-2 border-white pb-1">
                  Visualization & Interactive Features
                </span>
              </h2>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              <p className="text-gray-600">
                Our visualization strategy focuses on making complex global
                happiness data accessible, engaging, and insightful through
                interactive web-based visualizations. We've implemented several
                specialized visualization components that allow users to explore
                the data from multiple perspectives:
              </p>

              <div className="mt-6 space-y-6">
                <div className="bg-amber-50 p-5 rounded-lg border-l-4 border-amber-500">
                  <h4 className="text-amber-800 font-medium mb-3">
                    <span className="border-b-2 border-amber-400 pb-1">
                      Interactive Map Visualizations
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-amber-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Global Happiness Map
                        </span>
                        <p className="text-gray-600 text-sm">
                          Equal-Earth projection map with color-coded happiness
                          scores, tooltips for detailed country information, and
                          hover interactions for user exploration
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-amber-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Interactive Controls
                        </span>
                        <p className="text-gray-600 text-sm">
                          Zoom and pan functionality with reset view options,
                          allowing users to focus on specific geographic regions
                          of interest
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-amber-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Temporal Visualization
                        </span>
                        <p className="text-gray-600 text-sm">
                          Year-by-year data selection allowing users to track
                          changes in global happiness from 2015 to 2024
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                  <h4 className="text-orange-800 font-medium mb-3">
                    <span className="border-b-2 border-orange-400 pb-1">
                      Interactive Charts & Comparisons
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-orange-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Detailed Country Information
                        </span>
                        <p className="text-gray-600 text-sm">
                          Click-to-view detailed country profiles with all
                          happiness factors visualized for comprehensive
                          analysis
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-orange-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Metric Selection
                        </span>
                        <p className="text-gray-600 text-sm">
                          Interactive metric switcher allowing users to
                          visualize different happiness factors (GDP, Social
                          Support, Health, etc.) on the map
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-orange-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Dynamic Color Scales
                        </span>
                        <p className="text-gray-600 text-sm">
                          Adaptive color scales with legends that automatically
                          adjust to the data range for each selected metric
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Visualization Technologies
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      Our interactive visualizations are built using modern web
                      technologies:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        React
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        React Simple Maps
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        D3 Scale
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Nivo Charts
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Framer Motion
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        TopoJSON
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Tailwind CSS
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mt-4 mb-2">
                      Advanced visualization techniques implemented across the
                      platform:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Equal-Earth Projection
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Multi-point Color Gradients
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Animated Data Transitions
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Dynamic Data Normalization
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Contextual Data Styling
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Advanced Tooltips
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Correlation Scatterplots
                      </span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                        Time Series Analysis
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="bg-amber-50 py-2 px-4 rounded-full text-sm text-amber-700 font-medium">
                  Zoomable & pannable maps
                </div>
                <div className="bg-orange-50 py-2 px-4 rounded-full text-sm text-orange-700 font-medium">
                  Interactive tooltips
                </div>
                <div className="bg-yellow-50 py-2 px-4 rounded-full text-sm text-yellow-700 font-medium">
                  Responsive design
                </div>
                <div className="bg-amber-50 py-2 px-4 rounded-full text-sm text-amber-700 font-medium">
                  Color-coded data visualization
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Research Ethics & Limitations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card mb-12 max-w-5xl mx-auto bg-card shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-sky-600 to-sky-800 py-6 px-8 text-white">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h2 className="text-2xl font-semibold">
                <span className="border-b-2 border-white pb-1">
                  Research Ethics & Limitations
                </span>
              </h2>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              <p className="text-gray-600">
                We approached this project with careful attention to research
                ethics and a full awareness of the limitations in working with
                global happiness data. Here we outline our ethical framework and
                acknowledge important methodological considerations:
              </p>

              <div className="mt-6 space-y-6">
                <div className="bg-sky-50 p-5 rounded-lg border-l-4 border-sky-500">
                  <h4 className="text-sky-800 font-medium mb-3">
                    <span className="border-b-2 border-sky-400 pb-1">
                      Ethical Considerations
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-sky-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Data Attribution
                        </span>
                        <p className="text-gray-600 text-sm">
                          All data sources are properly cited and attributed to
                          their original authors, including the World Happiness
                          Report and United Nations Development Programme
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-sky-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Cultural Sensitivity
                        </span>
                        <p className="text-gray-600 text-sm">
                          We implement comprehensive country name
                          standardization to ensure respectful representation of
                          all nations and acknowledge the cultural context of
                          happiness
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-sky-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Transparent Methodology
                        </span>
                        <p className="text-gray-600 text-sm">
                          Our data cleaning procedures, statistical techniques,
                          and visualization approaches are fully documented in
                          our methodology to support reproducibility
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-blue-800 font-medium mb-3">
                    <span className="border-b-2 border-blue-400 pb-1">
                      Data Limitations & Considerations
                    </span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192, 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Country Name Variations
                        </span>
                        <p className="text-gray-600 text-sm">
                          Despite our comprehensive mapping of over 200 country
                          names and variants, some smaller territories or
                          disputed regions may have inconsistent representation
                          across datasets
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192, 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Missing Data Handling
                        </span>
                        <p className="text-gray-600 text-sm">
                          To address data gaps in certain countries and years,
                          we employed forward/backward filling and interpolation
                          techniques that should be considered when interpreting
                          temporal trends
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192, 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <span className="font-medium text-gray-800">
                          Potential Data Anomalies
                        </span>
                        <p className="text-gray-600 text-sm">
                          Our validation process identifies countries with
                          unusually high (&gt;8.5) or low (&lt;2.5) happiness
                          scores, flagging potential outliers for careful
                          interpretation
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-5 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Data Completeness Tracking
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      We maintain transparency about our data coverage and
                      completeness:
                    </p>
                    <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
                      <li>
                        Data completeness metrics are calculated and exported
                        for each year
                      </li>
                      <li>
                        Missing data patterns are documented and available for
                        inspection
                      </li>
                      <li>
                        Countries with incomplete records are clearly identified
                        in visualizations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="bg-sky-50 py-2 px-4 rounded-full text-sm text-sky-700 font-medium">
                  Methodological transparency
                </div>
                <div className="bg-blue-50 py-2 px-4 rounded-full text-sm text-blue-700 font-medium">
                  Data validation
                </div>
                <div className="bg-cyan-50 py-2 px-4 rounded-full text-sm text-cyan-700 font-medium">
                  Completeness tracking
                </div>
                <div className="bg-sky-50 py-2 px-4 rounded-full text-sm text-sky-700 font-medium">
                  Ethical visualization practices
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Concluding Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8 mb-16 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Continuous Improvement
          </h3>
          <p className="text-gray-600 mb-6">
            Our methodology is constantly evolving as we incorporate new data
            sources, refine our analytical techniques, and enhance our
            visualizations. We welcome feedback and suggestions from users to
            improve the quality and utility of our happiness analysis.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/about"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md hover:from-blue-600 hover:to-blue-800 transition-all shadow-md"
            >
              Learn More About HappiScope
            </Link>
            <Link
              to="/map"
              className="px-6 py-3 bg-white border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition-all shadow-sm"
            >
              Explore the Data
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Methodology;
