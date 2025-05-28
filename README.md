# HappiScope: Interactive Visualization of Global Happiness Metrics (COM-480 Data Visualization)

| Student's name | SCIPER |
| :------------: | :----: |
|   Chang Jin    | 403930 |
|  Rizhong Lin   | 366842 |
|   Anlan Wang   | 403909 |

This repository contains the work for the COM-480 Data Visualization project, HappiScope - an interactive web-based platform for visualizing the World Happiness Report data (2015-2024) alongside related socioeconomic indicators.

**Quick Links:**

- [**Live Website**](https://com-480-data-visualization.github.io/HappiScope/)
- [**Screencast Demonstration**](./Milestone3/screencast.mp4)
- [**Process Book**](./Milestone3/process_book.pdf)
- [Milestone 1 Details](./Milestone1/)
- [Milestone 2 Details](./Milestone2/)
  - [Milestone 2 Report](./Milestone2/COM_480_Milestone_2.pdf)
- [Milestone 3 Details](./Milestone3/)
- [Data Folder](./data/)
- [Website Source Code (Docs)](./docs/)

## Project Overview

HappiScope visualizes the World Happiness Report data (2015-2024) alongside related socioeconomic indicators like HDI and population. The goal is to provide an intuitive interface for users to explore global happiness trends, understand contributing factors, analyze correlations, and discover geographic or temporal patterns.

### Key Features

- **Interactive World Map** - Explore happiness metrics across countries and years
- **Country Comparison Tool** - Compare happiness metrics between countries over time
- **Factor Analysis Dashboard** - Analyze correlations between happiness and various socioeconomic factors
- **About & Methodology** - Detailed information about the project approach and data sources

## Technical Setup & Installation

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

- `/data` - Raw datasets and data processing scripts
  - `/happiness_score_data` - World Happiness Report data (2015-2024)
  - `/hdi_data` - Human Development Index data
  - `/population_data` - Population data by country
- `/docs` - Website source code (React/Vite)
  - `/src` - Main source code
    - `/assets` - Static assets and images
    - `/components` - React components
    - `/data` - Processed JSON data files
- `/Milestone1`, `/Milestone2`, `/Milestone3` - Project documentation

### Technologies Used

- **React** - Frontend library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **D3.js** - Data visualization library
- **React Simple Maps** - React components for geographical maps
- **Recharts** & **Nivo** - React charting libraries

## Project Milestones

### [Milestone 1 (21st March, 5pm)](./Milestone1/) - 10% of the final grade

Details regarding the project introduction, dataset description, problematic, exploratory data analysis, related work, and initial planning.

### [Milestone 2 (18th April, 5pm)](./Milestone2/) - 10% of the final grade

Progress update, core component descriptions, and planned enhancements. The full report is available as [`COM_480_Milestone_2.pdf`](./Milestone2/COM_480_Milestone_2.pdf).

### [Milestone 3 (30th May, 5pm)](./Milestone3/) - 80% of the final grade

Our final project submission includes:

- **Live website** - [https://com-480-data-visualization.github.io/HappiScope/](https://com-480-data-visualization.github.io/HappiScope/)
- **Screencast** - [2-minute demonstration video](./Milestone3/screencast.mp4)
- **Process book** - [Documentation of our development journey](./Milestone3/process_book.pdf)

## Team Contributions

Our team worked collaboratively on all aspects of the project, with each member focusing on specific areas:

- **Chang Jin (403930)**
  - Led the data preprocessing and analysis phases, ensuring the accuracy and consistency of the data. Additionally, Chang Jin was responsible for compiling the final process book, which detailed the project\'s methodology and key insights.
- **Rizhong Lin (366842)**
  - Took the lead on developing the project\'s web presence and interactive visualizations. This included constructing the user interface and transforming intricate datasets into accessible and compelling visual narratives using technologies like React, D3.js, and Nivo. Rizhong also contributed to enhancing the process book by rephrasing, decorating, and beautifying its content.
- **Anlan Wang (403909)**
  - Played a crucial role in the initial design phase by creating sketches and prototypes that shaped the user interface and overall user experience. Anlan also produced the final screencast to showcase the project\'s functionalities.

All team members contributed equally to the conceptualization, planning, and refinement of the project.
