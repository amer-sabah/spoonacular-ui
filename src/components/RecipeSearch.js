import React, { useState } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchResults(null);

    try {
      const response = await axios.get('http://localhost:8080/recipes/search', {
        params: {
          query: query,
          maxResultSize: 10
        }
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
            <div className="col-md-9">
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
            <div className="col-md-3">
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
