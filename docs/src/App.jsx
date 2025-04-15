import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import './App.css'

// Layout Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Lazy-loaded section components
const Home = lazy(() => import('./components/sections/Home'))
const MapVisualization = lazy(() => import('./components/sections/MapVisualization'))
const FactorAnalysis = lazy(() => import('./components/sections/FactorAnalysis'))
const CountryComparison = lazy(() => import('./components/sections/CountryComparison'))
const About = lazy(() => import('./components/sections/About'))
const Methodology = lazy(() => import('./components/sections/Methodology'))

function App() {
  // Detect system dark mode preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <Router basename='/HappiScope'>
      <div className="flex flex-col min-h-screen bg-background dark:bg-background-dark transition-colors duration-200">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="section-container flex justify-center items-center text-text-color dark:text-text-color-dark">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapVisualization />} />
              <Route path="/factors" element={<FactorAnalysis />} />
              <Route path="/compare" element={<CountryComparison />} />
              <Route path="/about" element={<About />} />
              <Route path="/methodology" element={<Methodology />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
