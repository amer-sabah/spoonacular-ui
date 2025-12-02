import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../config/api';
import '../i18n';

const RecipeSearch = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const debounceTimer = useRef(null);
  const suggestionsRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  // Debounced autocomplete search
  useEffect(() => {
    if (query.trim().length >= 2) {
      // Clear existing timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Set new timer
      debounceTimer.current = setTimeout(async () => {
        setLoadingSuggestions(true);
        try {
          const response = await axios.get(API_ENDPOINTS.RECIPES_SEARCH, {
            params: {
              query: query,
              maxResultSize: 5
            }
          });
          setSuggestions(response.data.results || []);
          setShowSuggestions(true);
        } catch (err) {
          console.error('Error fetching suggestions:', err);
          setSuggestions([]);
        } finally {
          setLoadingSuggestions(false);
        }
      }, 500); // 500ms debounce delay
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cuisines = [
    'African', 'Asian', 'American', 'British', 'Cajun', 'Caribbean', 
    'Chinese', 'Eastern European', 'European', 'French', 'German', 
    'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 
    'Korean', 'Latin American', 'Mediterranean', 'Mexican', 
    'Middle Eastern', 'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'
  ];

  const calorieOptions = [
    { label: t('calories.max100'), value: 100 },
    { label: t('calories.max200'), value: 200 },
    { label: t('calories.max300'), value: 300 },
    { label: t('calories.max400'), value: 400 },
    { label: t('calories.max500'), value: 500 },
    { label: t('calories.max600'), value: 600 },
    { label: t('calories.max700'), value: 700 }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      setError(t('recipeSearch.errorEmpty'));
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

      const response = await axios.get(API_ENDPOINTS.RECIPES_SEARCH, {
        params: params
      });
      
      setSearchResults(response.data);
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      console.error('Error searching recipes:', errorMessage);
      setError(`${t('recipeSearch.errorPrefix')} ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    // Optionally trigger search immediately
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  return (
    <div className="search-container">
      <div className="card search-card">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="card-title mb-0">{t('recipeSearch.title')}</h2>
            <div className="btn-group" role="group" style={{ direction: 'ltr' }}>
              <button 
                type="button" 
                className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => changeLanguage('en')}
              >
                English
              </button>
              <button 
                type="button" 
                className={`btn btn-sm ${i18n.language === 'ar' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => changeLanguage('ar')}
              >
                العربية
              </button>
            </div>
          </div>
          
          <div className="row g-3 mb-3">
            <div className="col-md-12">
              <div className="position-relative" ref={suggestionsRef}>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={t('recipeSearch.placeholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  disabled={loading}
                  autoComplete="off"
                />
                {showSuggestions && (suggestions.length > 0 || loadingSuggestions) && (
                  <div 
                    className="position-absolute w-100 bg-white border rounded shadow-lg" 
                    style={{ 
                      top: '100%', 
                      zIndex: 1000, 
                      maxHeight: '300px', 
                      overflowY: 'auto',
                      marginTop: '4px'
                    }}
                  >
                    {loadingSuggestions ? (
                      <div className="p-3 text-center text-muted">
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Loading suggestions...
                      </div>
                    ) : (
                      <ul className="list-group list-group-flush">
                        {suggestions.map((suggestion) => (
                          <li 
                            key={suggestion.id}
                            className="list-group-item list-group-item-action d-flex align-items-center" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <img 
                              src={suggestion.image} 
                              alt={suggestion.title}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="rounded me-3"
                            />
                            <span>{suggestion.title}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small text-muted">
                <i className="bi bi-globe me-1"></i>
                {t('recipeSearch.cuisineLabel')}
              </label>
              <select
                className="form-select"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                disabled={loading}
              >
                <option value="">{t('recipeSearch.allCuisines')}</option>
                {cuisines.map((c) => (
                  <option key={c} value={c}>{t(`cuisines.${c}`)}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">
                <i className="bi bi-fire me-1"></i>
                {t('recipeSearch.maxCaloriesLabel')}
              </label>
              <select
                className="form-select"
                value={maxCalories}
                onChange={(e) => setMaxCalories(e.target.value)}
                disabled={loading}
              >
                <option value="">{t('recipeSearch.anyCalories')}</option>
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
                    {t('recipeSearch.searching')}
                  </>
                ) : (
                  <>
                    <i className="bi bi-search me-2"></i>
                    {t('recipeSearch.searchButton')}
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
