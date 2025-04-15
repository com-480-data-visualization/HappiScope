import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HappiScope</h3>
            <p className="text-gray-300">
              Exploring the multidimensional nature of global happiness through 
              sophisticated visual analysis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/map" className="text-gray-300 hover:text-white">Interactive Map</Link></li>
              <li><Link to="/factors" className="text-gray-300 hover:text-white">Factor Analysis</Link></li>
              <li><Link to="/compare" className="text-gray-300 hover:text-white">Country Comparison</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About the Project</Link></li>
              <li><Link to="/methodology" className="text-gray-300 hover:text-white">Methodology</Link></li>
              <li><a href="https://github.com/com-480-data-visualization/HappiScope" className="text-gray-300 hover:text-white" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} HappiScope | Created for COM-480 Data Visualization at EPFL
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer