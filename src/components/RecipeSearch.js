import React, { useState } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const cuisines = [
    'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 
    'Chinese', 'Eastern European', 'European', 'French', 'German', 
    'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 
    'Korean', 'Latin American', 'Mediterranean', 'Mexican', 
    'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'
  ];

  const calorieOptions = [
    { label: 'Max 100 Calories', value: 100 },
    { label: 'Max 200 Calories', value: 200 },
    { label: 'Max 300 Calories', value: 300 },
    { label: 'Max 400 Calories', value: 400 },
    { label: 'Max 500 Calories', value: 500 },
    { label: 'Max 600 Calories', value: 600 },
    { label: 'Max 700 Calories', value: 700 }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      const params = {
        query: query,
        maxResultSize: 10
      };

      // Add optional filters if selected
      if (cuisine) {
        params.cuisine = cuisine;
      }
      if (maxCalories) {
        params.maxCalories = maxCalories;
      }

      const response = await axios.get('http://localhost:8080/recipes/search', {
        params: params
      });
      
      setSearchResults(response.data);
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      console.error('Error searching recipes:', errorMessage);
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="card search-card">
        <div className="card-body p-4">
          <h2 className="card-title mb-4">Search Recipes</h2>
          
          <div className="row g-3 mb-3">
            <div className="col-md-12">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter recipe name (e.g., pasta, chicken, salad)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small text-muted">
                <i className="bi bi-globe me-1"></i>
                Cuisine (Optional)
              </label>
              <select
                className="form-select"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                disabled={loading}
              >
                <option value="">All Cuisines</option>
                {cuisines.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">
                <i className="bi bi-fire me-1"></i>
                Max Calories (Optional)
              </label>
              <select
                className="form-select"
                value={maxCalories}
                onChange={(e) => setMaxCalories(e.target.value)}
                disabled={loading}
              >
                <option value="">Any Calories</option>
                {calorieOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-12">
              <button
                className="btn btn-primary btn-lg w-100 search-btn"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <i className="bi bi-search me-2"></i>
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>

      {searchResults && <RecipeList recipes={searchResults} />}
    </div>
  );
};

export default RecipeSearch;
