import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Methodology() {
  const [activeTab, setActiveTab] = useState('data')

  const tabs = [
    { 
      id: 'data', 
      label: 'Data Sources',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    { 
      id: 'preprocessing', 
      label: 'Data Preprocessing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    },
    { 
      id: 'visualization', 
      label: 'Visualization Approaches',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: 'analysis', 
      label: 'Analytical Methods',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ]

  return (
    <div className="bg-background min-h-screen pb-16 transition-colors duration-200">
      <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 py-16">
        <div className="section-container px-4 md:px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-title text-center text-text-color relative"
          >
            <span className="inline-block">
              Methodology
              <div className="h-1 w-12 bg-primary rounded-full mx-auto mt-2"></div>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-center mt-4 mb-12 max-w-3xl mx-auto"
          >
            A detailed explanation of our data sources, preprocessing steps, visualization design decisions, and analytical approaches.
          </motion.p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="section-container px-4 md:px-6 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-lg rounded-lg p-2 md:p-1 flex flex-wrap justify-center max-w-4xl mx-auto"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 md:px-5 py-3 rounded-lg text-sm md:text-base flex items-center justify-center ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-transparent hover:bg-gray-100 text-gray-700'
              } mx-1 my-1 transition-all duration-200 flex-1 md:flex-none min-w-[100px]`}
            >
              <span className="mr-2">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Content Sections */}
      <div className="section-container px-4 md:px-6 mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="card max-w-5xl mx-auto bg-card shadow-lg rounded-xl p-6 md:p-8 transition-colors duration-200"
          >
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-text-color">Data Sources</h2>
                  <div className="mt-2 md:mt-0 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Multiple trusted global sources</span>
                  </div>
                </div>
                <p className="text-gray-600 text-lg mb-6">
                  Our primary data source is the World Happiness Report (2015-2024), which provides annual happiness scores and rankings for countries worldwide, along with contributing factors.
                </p>
                
                <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Primary Dataset: World Happiness Report
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Data Collection Methodology
                      </h4>
                      <p className="text-gray-600">
                        The World Happiness Report relies on survey data from the Gallup World Poll, which asks respondents to evaluate their current life situation on a scale from 0 to 10, with 0 representing the worst possible life and 10 the best possible life.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        Key Metrics
                      </h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1.5">
                        <li>Overall happiness score (0-10 scale)</li>
                        <li>Country rankings</li>
                        <li>Six key explanatory factors with relative contributions</li>
                        <li>Statistical confidence intervals</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-text-color flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Explanatory Factors
                </h4>
                <p className="text-gray-600 mb-5">
                  The World Happiness Report identifies six key factors that contribute to explaining variations in happiness:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-primary">GDP per Capita</p>
                    </div>
                    <p className="text-gray-600">Economic output per person, log-transformed to account for diminishing returns</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-primary">Social Support</p>
                    </div>
                    <p className="text-gray-600">Having someone to count on in times of trouble</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-primary">Healthy Life Expectancy</p>
                    </div>
                    <p className="text-gray-600">Number of years of healthy life expected at birth</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      </div>
                      <p className="font-semibold text-primary">Freedom</p>
                    </div>
                    <p className="text-gray-600">Freedom to make life choices without external constraints</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-primary">Generosity</p>
                    </div>
                    <p className="text-gray-600">Charitable donations and helping behavior</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center mb-3">
                      <div className="p-2 rounded-full bg-orange-100 text-orange-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-primary">Corruption Perception</p>
                    </div>
                    <p className="text-gray-600">Public perception of corruption in government and business</p>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border-t border-gray-200 pt-8 mt-8"
                >
                  <h3 className="text-xl font-bold mb-6 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Supplementary Datasets
                  </h3>
                  <div className="space-y-5">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
                      <h4 className="font-semibold text-primary text-lg mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Human Development Index (HDI)
                      </h4>
                      <p className="text-gray-600 mb-3">
                        A composite index measuring average achievement in three basic dimensions of human development:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 mb-3 space-y-1">
                        <li>A long and healthy life (life expectancy at birth)</li>
                        <li>Knowledge (expected years of schooling and mean years of schooling)</li>
                        <li>A decent standard of living (GNI per capita)</li>
                      </ul>
                      <div className="flex items-center text-gray-600 mt-4 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium">Source:</span>&nbsp;United Nations Development Programme (UNDP)
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
                      <h4 className="font-semibold text-primary text-lg mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Population Data
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Demographic information used to contextualize happiness findings and weight regional averages:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 mb-3 space-y-1">
                        <li>Total population by country (2015-2024)</li>
                        <li>Population density</li>
                        <li>Age distribution statistics</li>
                        <li>Urban/rural population percentages</li>
                      </ul>
                      <div className="flex items-center text-gray-600 mt-4 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium">Source:</span>&nbsp;World Bank Open Data, United Nations Population Division
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
                      <h4 className="font-semibold text-primary text-lg mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Additional World Bank Indicators
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Supplementary economic and social indicators to enrich our analysis:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 mb-3 space-y-1">
                        <li>Income inequality (Gini coefficient)</li>
                        <li>Unemployment rates</li>
                        <li>Education metrics</li>
                        <li>Healthcare spending as percentage of GDP</li>
                      </ul>
                      <div className="flex items-center text-gray-600 mt-4 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium">Source:</span>&nbsp;World Bank Open Data
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            
            {activeTab === 'preprocessing' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-text-color">Data Preprocessing</h2>
                  <div className="mt-2 md:mt-0 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span>Data transformed & optimized</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg mb-6">
                  The raw data from various sources underwent several preprocessing steps to ensure consistency, completeness, and compatibility across all visualizations.
                </p>
                
                <div className="relative mb-12">
                  <h3 className="text-xl font-bold mb-6 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    Preprocessing Pipeline
                  </h3>
                  
                  <div className="relative mb-16">
                    <div className="hidden sm:block absolute left-8 inset-0 w-1 h-full bg-gradient-to-b from-primary/50 via-blue-500/50 to-indigo-500/50 rounded-full z-0"></div>
                    
                    <div className="space-y-12 relative z-10">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-start sm:items-center sm:flex-col">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white shadow-lg text-xl font-bold">1</div>
                          <div className="hidden sm:block w-0.5 h-24 bg-transparent"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
                          <h4 className="font-semibold text-lg mb-3 text-text-color">Data Collection and Initial Inspection</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                              <li>Gathered data from multiple sources in various formats (CSV, Excel, JSON)</li>
                              <li>Conducted exploratory data analysis to identify patterns, missing values, and outliers</li>
                              <li>Assessed data quality, completeness, and integrity by source and year</li>
                              <li>Documented dataset characteristics and limitations</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-start sm:items-center sm:flex-col">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white shadow-lg text-xl font-bold">2</div>
                          <div className="hidden sm:block w-0.5 h-24 bg-transparent"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
                          <h4 className="font-semibold text-lg mb-3 text-text-color">Data Cleaning</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                              <li>Handled missing values through various strategies (imputation, exclusion, or interpolation)</li>
                              <li>Standardized country names and codes to ensure consistency across datasets</li>
                              <li>Detected and addressed outliers using statistical methods</li>
                              <li>Corrected data entry errors and inconsistencies</li>
                              <li>Normalized numerical scales where appropriate</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-start sm:items-center sm:flex-col">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500 text-white shadow-lg text-xl font-bold">3</div>
                          <div className="hidden sm:block w-0.5 h-24 bg-transparent"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
                          <h4 className="font-semibold text-lg mb-3 text-text-color">Data Integration</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                              <li>Merged data from multiple sources using common identifiers (country codes, names)</li>
                              <li>Resolved conflicting data points and source precedence</li>
                              <li>Created a unified dataset with consistent structure across years</li>
                              <li>Verified integrity of relationships after merging</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-start sm:items-center sm:flex-col">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-500 text-white shadow-lg text-xl font-bold">4</div>
                          <div className="hidden sm:block w-0.5 h-24 bg-transparent"></div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
                          <h4 className="font-semibold text-lg mb-3 text-text-color">Feature Engineering</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                              <li>Created derived metrics (e.g., happiness-to-GDP ratio, happiness efficiency)</li>
                              <li>Calculated region and income group aggregates</li>
                              <li>Constructed time-series metrics (growth rates, volatility measures, trends)</li>
                              <li>Generated correlation matrices between happiness and contributing factors</li>
                              <li>Developed categorical variables for filtering and grouping</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-400 text-white shadow-lg text-xl font-bold">5</div>
                        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
                          <h4 className="font-semibold text-lg mb-3 text-text-color">Data Structuring for Visualization</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                              <li>Transformed data into formats optimized for specific visualization libraries</li>
                              <li>Created hierarchical structures for nested visualizations</li>
                              <li>Generated geospatial mappings for map-based visualizations</li>
                              <li>Prepared color scales and ranges for consistent visual encoding</li>
                              <li>Optimized data structures for efficient loading and rendering</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-6 mb-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Technical Implementation
                  </h3>
                  <p className="text-gray-600 mb-5">
                    The preprocessing pipeline was implemented using Python, with the following libraries playing key roles:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        Data Processing Libraries
                      </h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li><span className="font-medium text-text-color">Pandas</span>: Primary tool for data manipulation and analysis</li>
                        <li><span className="font-medium text-text-color">NumPy</span>: Numerical computations and array operations</li>
                        <li><span className="font-medium text-text-color">SciPy</span>: Statistical analysis and testing</li>
                        <li><span className="font-medium text-text-color">GeoPandas</span>: Geospatial data processing</li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Data Output
                      </h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        <li>All preprocessed data stored as JSON files for web compatibility</li>
                        <li>Created specialized data structures for each visualization type</li>
                        <li>Implemented data versioning to track changes</li>
                        <li>Generated data dictionaries to document field meanings and units</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
                
                <div className="mt-6 bg-white rounded-lg p-5 shadow-sm border-l-4 border-primary">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600">
                      All preprocessing code is available in our GitHub repository, with detailed documentation of each transformation step.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'visualization' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-text-color">Visualization Approaches</h2>
                  <div className="mt-2 md:mt-0 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Insights through visual design</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg mb-6">
                  Our visualization design decisions were guided by established principles in data visualization, with a focus on clarity, interactivity, and insight generation. Each visual element was purposefully created to enhance understanding of the complex factors influencing global happiness.
                </p>
                
                <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                    Design Principles & Philosophy
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Visual Clarity
                      </h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1.5">
                        <li>Minimized chart junk and non-data ink</li>
                        <li>Used consistent visual encoding across visualizations</li>
                        <li>Implemented clear visual hierarchies</li>
                        <li>Incorporated white space strategically</li>
                        <li>Applied cognitive principles to reduce information overload</li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        User-Centered Design
                      </h4>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1.5">
                        <li>Designed for progressive disclosure of information</li>
                        <li>Incorporated feedback from iterative user testing</li>
                        <li>Ensured accessibility in color choices and interactions</li>
                        <li>Provided guided onboarding for complex visualizations</li>
                        <li>Balanced information density with comprehension needs</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold mb-4 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    Color System & Visual Encoding
                  </h3>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h4 className="font-semibold text-primary mb-3">Purposeful Color Selection</h4>
                    <p className="text-gray-600 mb-4">Our color system was carefully designed to support both intuitive understanding and accessibility:</p>
                    
                    <div className="mb-6">
                      <p className="font-medium text-text-color mb-2">Happiness Score Scale</p>
                      <div className="h-8 w-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-md mb-2"></div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Lower Happiness (0)</span>
                        <span>Moderate (5)</span>
                        <span>Higher Happiness (10)</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h5 className="font-medium text-text-color mb-2">Color Scale Types</h5>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1.5">
                          <li>Sequential scales for continuous metrics</li>
                          <li>Diverging scales for comparison to averages</li>
                          <li>Categorical schemes for discrete categories</li>
                          <li>Color blindness compatible palettes</li>
                          <li>Consistent encoding across visualizations</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-text-color mb-2">Other Visual Encodings</h5>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1.5">
                          <li>Size variations to indicate magnitude</li>
                          <li>Shape differentiation for categorical variables</li>
                          <li>Position encoding for quantitative comparisons</li>
                          <li>Opacity for uncertainty or confidence levels</li>
                          <li>Texture patterns for additional dimensions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-6 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Core Visualization Types
                  </h3>
                  
                  <div className="space-y-5">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-sm border-l-4 border-blue-500 p-5"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-text-color flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Interactive Choropleth Map
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Our central visualization is a global map that displays happiness scores and contributing factors across countries:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Key Features</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Color-coded countries by selected metric</li>
                            <li>Time slider for temporal exploration</li>
                            <li>Interactive tooltips with detailed information</li>
                            <li>Zoom and pan capabilities</li>
                            <li>Factor selection for different map views</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Design Decisions</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Equal-area projection to avoid size distortion</li>
                            <li>Intuitive color scales for quantitative data</li>
                            <li>Progressive information disclosure in tooltips</li>
                            <li>Clear legend with contextual interpretation</li>
                            <li>Smooth transitions between time periods</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-sm border-l-4 border-green-500 p-5"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-text-color flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Factor Correlation Analysis
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Visualizations that reveal relationships between happiness and its contributing factors:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Key Features</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Scatter plots with regression lines</li>
                            <li>Color-coding by region or income group</li>
                            <li>Interactive highlighting of countries</li>
                            <li>Statistical annotations (r-values, p-values)</li>
                            <li>Factor selection controls</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Design Decisions</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Jitter applied to reduce overplotting</li>
                            <li>Confidence intervals shown for regression</li>
                            <li>Interactive brushing for point selection</li>
                            <li>Consistent scales across factor comparisons</li>
                            <li>Annotations explaining statistical significance</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-sm border-l-4 border-purple-500 p-5"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-text-color flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        Time Series Visualizations
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Visualizations that track changes in happiness and contributing factors over time:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Key Features</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Multi-line charts for country comparisons</li>
                            <li>Small multiples for factor trends</li>
                            <li>Area charts for stacked factor contributions</li>
                            <li>Animated transitions between years</li>
                            <li>Event annotations for significant occurrences</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Design Decisions</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Consistent y-axis scales for accurate comparison</li>
                            <li>Smooth interpolation for trend visualization</li>
                            <li>Highlighted significant events (e.g., COVID-19)</li>
                            <li>Option to show confidence intervals</li>
                            <li>Tooltips showing point-in-time details</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-sm border-l-4 border-orange-500 p-5"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-text-color flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Comparative Visualizations
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Tools for direct comparison between countries and regions:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Key Features</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Radar charts comparing factor profiles</li>
                            <li>Bar charts for direct metric comparison</li>
                            <li>Slope graphs showing rank changes</li>
                            <li>Interactive selection of comparison units</li>
                            <li>Customizable metrics and time periods</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Design Decisions</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Synchronized scales for fair comparison</li>
                            <li>Clear visual differentiation between units</li>
                            <li>Direct labeling to minimize legend references</li>
                            <li>Highlighting of significant differences</li>
                            <li>Layout promoting side-by-side comparison</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border-t border-gray-200 pt-8 mt-8"
                >
                  <h3 className="text-xl font-bold mb-6 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Technical Implementation
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-lg text-text-color">D3.js</h4>
                      </div>
                      <p className="text-gray-600">
                        The core library powering our data visualizations, providing fine-grained control over visual elements, transitions, and data transformations. D3 enables the creation of complex, interactive, data-driven visualizations with precise control.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-lg text-text-color">Three.js</h4>
                      </div>
                      <p className="text-gray-600">
                        Used to create 3D globe visualizations and immersive data landscapes that provide alternative perspectives on global happiness patterns and relationships, enabling users to explore data from novel viewpoints.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                      <div className="flex items-center mb-3">
                        <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-lg text-text-color">Framer Motion</h4>
                      </div>
                      <p className="text-gray-600">
                        Leveraged for smooth animations, transitions between states, and interactive elements that enhance user engagement. Motion adds a layer of polish and interactivity that helps users track changes in data over time.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gray-50 rounded-lg p-5 border-l-4 border-primary">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-text-color mb-1">Visualization Best Practices</h4>
                        <p className="text-gray-600">
                          All visualizations follow established best practices from the fields of data visualization and human-computer interaction, drawing on principles from works by Edward Tufte, Alberto Cairo, and Stephen Few. Our implementation emphasizes both aesthetic appeal and functional clarity.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            
            {activeTab === 'analysis' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-text-color">Analytical Methods</h2>
                  <div className="mt-2 md:mt-0 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>From data to insights</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg mb-6">
                  Our analysis of happiness data employs various statistical and computational methods to uncover patterns, relationships, and insights that help explain what drives happiness across countries and over time.
                </p>
                
                <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Statistical Approaches
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Correlation Analysis
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Examining relationships between happiness and contributing factors:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1.5">
                        <li>Pearson correlation coefficients for linear relationships</li>
                        <li>Spearman rank correlations for non-linear relationships</li>
                        <li>Partial correlations controlling for confounding variables</li>
                        <li>Correlation matrices across multiple variables</li>
                        <li>Statistical significance testing (p-values)</li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                        Time Series Analysis
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Tracking trends and changes in happiness over the decade:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-1.5">
                        <li>Trend identification and decomposition</li>
                        <li>Year-over-year change calculation</li>
                        <li>Moving averages to smooth short-term fluctuations</li>
                        <li>Identification of significant inflection points</li>
                        <li>Growth rate comparisons across regions and factors</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-bold mb-6 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Comparative Analysis Methods
                  </h3>
                  
                  <div className="space-y-5">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-sm border-l-4 border-indigo-500 p-5"
                    >
                      <h4 className="font-semibold text-lg mb-3 text-text-color flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                        Group Comparison Methods
                      </h4>
                      <p className="text-gray-600 mb-3">
                        Statistical techniques for comparing happiness across different groups and regions:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Statistical Tests</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>ANOVA for multi-group comparisons</li>
                            <li>t-tests for pairwise comparisons</li>
                            <li>Chi-square tests for categorical variables</li>
                            <li>Effect size calculations (Cohen's d, η²)</li>
                            <li>Multiple comparison corrections</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-medium text-primary mb-2 text-sm">Grouping Strategies</h5>
                          <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm">
                            <li>Geographic regions and continents</li>
                            <li>Income groups (World Bank classification)</li>
                            <li>HDI categories (low, medium, high, very high)</li>
                            <li>Government system types</li>
                            <li>Cultural dimensions (Hofstede's framework)</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                

                <div className="mt-12 border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-bold mb-4 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Limitations and Considerations
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    While we've strived to create a comprehensive analysis, we acknowledge several important limitations that should be considered when interpreting our findings:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-text-color">Data Gaps</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Some countries have incomplete data for certain years or factors
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-text-color">Cultural Bias</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        The concept and reporting of happiness varies across cultures
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-text-color">Self-Reporting Bias</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Happiness scores rely on subjective self-assessments
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-text-color">Temporal Limitations</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Ten years may be insufficient to capture long-term trends
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-text-color">Causality</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Correlation between factors and happiness doesn't imply causation
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-text-color">Unmeasured Factors</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Many potentially important contributors to happiness are not captured in the data
                      </p>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-10"
                >
                  <h3 className="text-xl font-bold mb-4 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Future Research Directions
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    Based on our analysis and identified limitations, we've outlined several promising directions for future research and visualization enhancements:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-primary mb-2">Data Enrichment</h4>
                      <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                        <li>Incorporate environmental quality metrics (air pollution, green space access)</li>
                        <li>Include digital well-being indicators (internet access, digital literacy)</li>
                        <li>Add pandemic impact data with finer temporal granularity</li>
                        <li>Integrate qualitative data to complement quantitative measures</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <h4 className="font-semibold text-primary mb-2">Advanced Analytics</h4>
                      <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                        <li>Implement machine learning models to predict future happiness trends</li>
                        <li>Develop causal inference frameworks to better understand drivers</li>
                        <li>Conduct cluster analysis to identify similar country groupings</li>
                        <li>Apply sentiment analysis to news and social media for context</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="border-t border-gray-200 pt-8 mt-8"
                >
                  <h3 className="text-xl font-bold mb-6 text-text-color flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    References and Further Reading
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300">
                      <a href="https://worldhappiness.report/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        World Happiness Report
                      </a>
                      <p className="text-gray-600 mt-1">
                        The official website of the World Happiness Report, containing all annual reports and methodology documentation.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300">
                      <a href="https://hdr.undp.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        United Nations Development Programme - Human Development Reports
                      </a>
                      <p className="text-gray-600 mt-1">
                        Source of the Human Development Index data and methodological documentation.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300">
                      <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        World Bank Open Data
                      </a>
                      <p className="text-gray-600 mt-1">
                        Repository of global development data including many of our supplementary indicators.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300">
                      <a href="https://github.com/com-480-data-visualization/HappiScope" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        HappiScope GitHub Repository
                      </a>
                      <p className="text-gray-600 mt-1">
                        Our project repository containing all code, data preprocessing scripts, and technical documentation.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300">
                      <a href="https://gallup.com/analytics/318923/world-poll.aspx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        Gallup World Poll
                      </a>
                      <p className="text-gray-600 mt-1">
                        The original survey source that provides the data for the World Happiness Report.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Methodology