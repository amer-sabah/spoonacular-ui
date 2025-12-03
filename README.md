# Spoonacular UI

A React-based frontend application for searching recipes using the Spoonacular API.

## Features

### 🔍 Search & Discovery
- **Recipe Search**: Search recipes by name with real-time loading indicators
- **Advanced Filters**: Filter by cuisine type and maximum calories
- **Smart Autocomplete**: Debounced search suggestions (500ms) with recipe thumbnails showing top 5 matches
- **Recipe Details**: View comprehensive recipe information including ingredients, instructions, nutrition, and pricing

### 🌐 Internationalization (i18n)
- **Bilingual Support**: Full English and Arabic localization
- **RTL Layout**: Proper right-to-left support for Arabic
- **Localized Content**: All UI elements, error messages, and dialog buttons translated
- **Language Switcher**: Easy toggle between languages on any page

### 📊 Nutrition Tracking
- **Ingredient Nutrition**: Detailed calorie information for each ingredient
- **Smart Calorie Calculation**: Real-time total calorie calculation with exclude functionality
- **Interactive Ingredients**: Toggle ingredients to exclude from total calorie count

### 🎨 User Experience
- **Responsive Design**: Bootstrap 5 styling with mobile-friendly layout
- **Recipe Cards**: Visual recipe grid with images and key information
- **Modal Dialogs**: Professional error and notification displays
- **Loading States**: Spinner indicators during API calls

### 🛡️ Error Handling
- **Friendly Error Messages**: User-friendly error dialogs instead of technical jargon
- **Smart Error Detection**: 
  - Rate limit/quota exceeded (402, 429)
  - Network connection errors
  - Server errors (5xx)
  - Resource not found (404)
  - Unauthorized access (401, 403)
- **Console Logging**: Detailed technical error logs for debugging
- **Actionable Guidance**: Clear instructions on what to do when errors occur

### 🏗️ Architecture
- **Centralized API Configuration**: Environment-based API endpoint management
- **State Management**: useReducer pattern for complex component state
- **Modular Components**: Reusable RecipeSearch, RecipeList, and RecipeDetails components
- **Error Handler Utility**: Centralized error message formatting

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

### Search for Recipes

#### Search Logic

The search functionality provides flexible filtering options:

- **Query Only**: Search by recipe name or keywords (e.g., "pasta", "chicken salad")
- **Filters Only**: Search using just cuisine type and/or calorie limit without entering a search query
- **Combined Search**: Use both query and filters together for precise results

**Search Button Behavior**:
- The search button is **enabled** when at least one of the following is provided:
  - Recipe name/keywords in the search box
  - A cuisine type is selected
  - A maximum calorie limit is selected
- The search button is **disabled** only when all three fields are empty

**How It Works**:
1. User can search with any combination of: query text, cuisine filter, and/or calorie filter
2. The `query` parameter is always sent to the API (as an empty string if not provided)
3. Cuisine and calorie filters are sent as optional parameters when selected
4. The backend processes the search based on the combination of parameters provided

#### Step-by-Step Guide

1. **Enter Search Query** (Optional): Type a recipe name in the search box (e.g., "pasta", "chicken", "salad")
   - As you type, autocomplete suggestions will appear with recipe thumbnails after 500ms
   - Click on a suggestion to quickly select it

2. **Apply Filters** (Optional but at least one search criterion required):
   - **Cuisine**: Select a specific cuisine from the dropdown (Italian, Chinese, Mexican, etc.)
   - **Max Calories**: Choose a calorie limit (100, 200, 300, 400, 500, 600, or 700 kcal)

3. **Search**: Click the "Search" button or press Enter
   - The button is only enabled when you have at least a query, cuisine, or calorie filter
   - A loading spinner will appear while fetching results

4. **Browse Results**: View recipe cards in a responsive grid layout
   - Each card shows the recipe image, title, and key information

### View Recipe Details

1. **Click on a Recipe Card**: Opens the detailed recipe view

2. **View Information**:
   - **Recipe Overview**: Servings, cooking time, health score, price per serving
   - **Ingredients List**: All ingredients with amounts and costs
   - **Nutrition Information**: Calorie count for each ingredient
   - **Instructions**: Step-by-step cooking instructions

3. **Calculate Total Calories**:
   - View total calories automatically calculated from all ingredients
   - **Exclude Ingredients**: Check the "Exclude from total calories" box for ingredients you don't want included
   - Total updates in real-time as you toggle ingredients

4. **Navigation**: Click "Back to Search" to return to search results

### Change Language

- Use the **Language Toggle** buttons (English/العربية) at the top of any page
- The entire interface, including error messages, switches language instantly
- Arabic mode includes proper RTL (right-to-left) layout support

### Handle Errors

- If an error occurs (network issues, API limits, etc.), a modal dialog will appear
- Error messages are user-friendly and provide actionable guidance
- Click "Close" or "Back to Search" to dismiss the error and continue

## API Integration

The application connects to the Spoonacular Backend API with the following endpoints:

### Search Recipes
- **Endpoint**: `GET /recipes/search`
- **Parameters**: 
  - `query`: Search term (required)
  - `cuisine`: Cuisine filter (optional)
  - `maxCalories`: Maximum calories per serving (optional)
  - `maxResultSize`: Number of results (default: 10)

### Get Recipe Details
- **Endpoint**: `GET /recipes/{id}`
- **Parameters**: 
  - `id`: Recipe ID (required)

### Get Ingredient Details
- **Endpoint**: `GET /ingredients/{id}`
- **Parameters**: 
  - `id`: Ingredient ID (required)

### Configuration
The API base URL can be configured using environment variables:
```bash
REACT_APP_API_BASE_URL=http://localhost:8080
```
See `.env.example` for reference.

## Technologies Used

- **React 18.2.0**: Frontend framework with Hooks (useState, useEffect, useReducer, useRef)
- **React Router DOM 7.9.6**: Client-side routing
- **Bootstrap 5.3.2**: UI components and responsive design
- **Axios 1.6.2**: HTTP client for API requests
- **i18next 25.7.1 & react-i18next**: Internationalization framework
- **React Scripts**: Build tooling and development server

## Design Decisions

### 1. Using Bootstrap to Build a Responsive App Quickly

**Rapid Development**: Bootstrap's pre-built components and grid system allow for faster development. This helps in setting up a professional-looking UI with minimal custom CSS.

**Responsive Design**: Bootstrap's responsive utilities ensure that the app looks good on various screen sizes without significant effort. This enhances user experience across devices.

**Consistency**: Utilizing Bootstrap encourages design consistency across different components and pages, providing a uniform look and feel.

**Community Support**: Bootstrap has a vast community and extensive documentation, making it easier to find resources and examples to solve design challenges quickly.

### 2. Using useReducer for Recipe Search Component Instead of useState

**Complex State Management**: The useReducer hook is advantageous for managing complex state logic, particularly when dealing with multiple state variables, such as filters and search results.

**Centralized State Logic**: It helps keep the state logic more organized and centralized. This is especially beneficial in a recipe search component, where the state may involve various actions (e.g., updating filters, loading results).

**Improved Readability**: Code readability improves as the reducer function clearly defines how the state transitions occur, making it easier for other developers to understand.

**Easier Testing**: This pattern makes it easier to test the state management logic since it separates the logic in a function, allowing for more straightforward unit tests.

## Project Structure

```
SpoonacularUI/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── RecipeSearch.js      # Search interface with filters and autocomplete
│   │   ├── RecipeList.js        # Recipe grid display
│   │   ├── RecipeListItem.js    # Individual recipe card component
│   │   ├── RecipeDetails.js     # Detailed recipe view with nutrition
│   │   ├── ErrorModal.js        # Reusable error modal component
│   │   └── LanguageSwitcher.js  # Language toggle component (English/Arabic)
│   ├── config/
│   │   └── api.js               # Centralized API configuration
│   ├── constants/
│   │   ├── cuisines.js          # Reusable cuisine options
│   │   └── calorieOptions.js    # Reusable calorie filter options
│   ├── utils/
│   │   ├── errorHandler.js      # Error message formatting utility
│   │   └── languageHelper.js    # Language switching utility
│   ├── i18n.js                  # Internationalization configuration
│   ├── App.js                   # Main app component with routing
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
