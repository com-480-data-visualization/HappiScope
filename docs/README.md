# HappiScope Technical Documentation

This folder contains the source code for the HappiScope website, built using React and Vite.

## Technical Setup

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/com-480-data-visualization/HappiScope.git
cd HappiScope/docs
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

### Project Structure

- `/src` - Main source code
  - `/assets` - Static assets and images
  - `/components` - React components organized by function
    - `/context` - React context providers 
    - `/layout` - Layout components (Header, Footer, etc.)
    - `/sections` - Main page sections
    - `/ui` - Reusable UI components
    - `/visualizations` - Visualization components
  - `/data` - Processed JSON data files

### Technologies Used

- **React** - Frontend library
- **Vite** - Build tool and development server
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **D3** - Data visualization library
- **Recharts** - React charting library
- **Nivo** - React data visualization components
- **React Simple Maps** - React components for geographical maps

### Deployment

The website is deployed to GitHub Pages automatically when changes are pushed to the main branch. The deployment configuration can be found in the package.json file.

---

## Original Vite Documentation

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
