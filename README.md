# Spoonacular UI

A React-based frontend application for searching recipes using the Spoonacular API.

## Features

- Recipe search interface with Bootstrap styling
- Integration with Spoonacular Backend API
- Console output display for search results
- Real-time search with loading indicators

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spoonacular Backend running on http://localhost:8080

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure the backend is running on http://localhost:8080

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to http://localhost:3000

## Usage

1. Enter a recipe search query (e.g., "pasta", "chicken", "salad")
2. Click the "Search" button or press Enter
3. View the results in the console output section
4. Check the browser's developer console for full JSON response

## API Integration

The application connects to the backend API at:
- **Endpoint**: `GET http://localhost:8080/recipes/search`
- **Parameters**: 
  - `query`: Search term (required)
  - `maxResultSize`: Number of results (default: 10)

## Technologies Used

- React 18
- Bootstrap 5
- Axios for HTTP requests
- React Scripts for build tooling

## Project Structure

```
SpoonacularUI/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── RecipeSearch.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
