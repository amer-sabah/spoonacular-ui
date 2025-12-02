import React, { useReducer, useEffect, useRef } from 'react';
import axios from 'axios';
import RecipeList from './RecipeList';
import ErrorModal from './ErrorModal';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../config/api';
import { formatErrorMessage } from '../utils/errorHandler';
import { cuisines } from '../constants/cuisines';
import { getCalorieOptions } from '../constants/calorieOptions';
import '../i18n';

// Action types
const ACTIONS = {
  SET_QUERY: 'SET_QUERY',
  SET_CUISINE: 'SET_CUISINE',
  SET_MAX_CALORIES: 'SET_MAX_CALORIES',
  SEARCH_START: 'SEARCH_START',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_ERROR: 'SEARCH_ERROR',
  SUGGESTIONS_START: 'SUGGESTIONS_START',
  SUGGESTIONS_SUCCESS: 'SUGGESTIONS_SUCCESS',
  SUGGESTIONS_ERROR: 'SUGGESTIONS_ERROR',
  SHOW_SUGGESTIONS: 'SHOW_SUGGESTIONS',
  HIDE_SUGGESTIONS: 'HIDE_SUGGESTIONS',
  CLEAR_ERROR: 'CLEAR_ERROR',
  HIDE_ERROR_MODAL: 'HIDE_ERROR_MODAL'
};

// Initial state
const initialState = {
  query: '',
  cuisine: '',
  maxCalories: '',
  loading: false,
  searchResults: null,
  error: null,
  showErrorModal: false,
  suggestions: [],
  showSuggestions: false,
  loadingSuggestions: false
};

// Reducer function
const searchReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_QUERY:
      return { ...state, query: action.payload };
    case ACTIONS.SET_CUISINE:
      return { ...state, cuisine: action.payload };
    case ACTIONS.SET_MAX_CALORIES:
      return { ...state, maxCalories: action.payload };
    case ACTIONS.SEARCH_START:
      return { ...state, loading: true, error: null, searchResults: null };
    case ACTIONS.SEARCH_SUCCESS:
      return { ...state, loading: false, searchResults: action.payload };
    case ACTIONS.SEARCH_ERROR:
      return { ...state, loading: false, error: action.payload, showErrorModal: true };
    case ACTIONS.HIDE_ERROR_MODAL:
      return { ...state, showErrorModal: false };
    case ACTIONS.SUGGESTIONS_START:
      return { ...state, loadingSuggestions: true };
    case ACTIONS.SUGGESTIONS_SUCCESS:
      return { 
        ...state, 
        loadingSuggestions: false, 
        suggestions: action.payload,
        showSuggestions: true
      };
    case ACTIONS.SUGGESTIONS_ERROR:
      return { ...state, loadingSuggestions: false, suggestions: [] };
    case ACTIONS.SHOW_SUGGESTIONS:
      return { ...state, showSuggestions: true };
    case ACTIONS.HIDE_SUGGESTIONS:
      return { ...state, showSuggestions: false };
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

const RecipeSearch = () => {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const debounceTimer = useRef(null);
  const suggestionsRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  // Debounced autocomplete search
  useEffect(() => {
    if (state.query.trim().length >= 2) {
      // Clear existing timer
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      // Set new timer
      debounceTimer.current = setTimeout(async () => {
        dispatch({ type: ACTIONS.SUGGESTIONS_START });
        try {
          const response = await axios.get(API_ENDPOINTS.RECIPES_SEARCH, {
            params: {
              query: state.query,
              maxResultSize: 5
            }
          });
          dispatch({ 
            type: ACTIONS.SUGGESTIONS_SUCCESS, 
            payload: response.data.results || [] 
          });
        } catch (err) {
          console.error('Error fetching suggestions:', err);
          dispatch({ type: ACTIONS.SUGGESTIONS_ERROR });
        }
      }, 500); // 500ms debounce delay
    } else {
      dispatch({ type: ACTIONS.SUGGESTIONS_ERROR });
      dispatch({ type: ACTIONS.HIDE_SUGGESTIONS });
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [state.query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        dispatch({ type: ACTIONS.HIDE_SUGGESTIONS });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calorieOptions = getCalorieOptions(t);

  const handleSearch = async () => {
    if (!state.query.trim()) {
      dispatch({ type: ACTIONS.SEARCH_ERROR, payload: t('recipeSearch.errorEmpty') });
      return;
    }

    dispatch({ type: ACTIONS.SEARCH_START });

    try {
      const params = {
        query: state.query,
        maxResultSize: 10
      };

      // Add optional filters if selected
      if (state.cuisine) {
        params.cuisine = state.cuisine;
      }
      if (state.maxCalories) {
        params.maxCalories = state.maxCalories;
      }

      const response = await axios.get(API_ENDPOINTS.RECIPES_SEARCH, {
        params: params
      });
      
      dispatch({ type: ACTIONS.SEARCH_SUCCESS, payload: response.data });
    } catch (err) {
      const formattedError = formatErrorMessage(err);
      dispatch({ 
        type: ACTIONS.SEARCH_ERROR, 
        payload: formattedError 
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      dispatch({ type: ACTIONS.HIDE_SUGGESTIONS });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    dispatch({ type: ACTIONS.SET_QUERY, payload: suggestion.title });
    dispatch({ type: ACTIONS.HIDE_SUGGESTIONS });
    // Optionally trigger search immediately
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const handleCloseErrorModal = () => {
    dispatch({ type: ACTIONS.HIDE_ERROR_MODAL });
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
                  value={state.query}
                  onChange={(e) => dispatch({ type: ACTIONS.SET_QUERY, payload: e.target.value })}
                  onKeyPress={handleKeyPress}
                  onFocus={() => state.suggestions.length > 0 && dispatch({ type: ACTIONS.SHOW_SUGGESTIONS })}
                  disabled={state.loading}
                  autoComplete="off"
                />
                {state.showSuggestions && (state.suggestions.length > 0 || state.loadingSuggestions) && (
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
                    {state.loadingSuggestions ? (
                      <div className="p-3 text-center text-muted">
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Loading suggestions...
                      </div>
                    ) : (
                      <ul className="list-group list-group-flush">
                        {state.suggestions.map((suggestion) => (
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
                value={state.cuisine}
                onChange={(e) => dispatch({ type: ACTIONS.SET_CUISINE, payload: e.target.value })}
                disabled={state.loading}
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
                value={state.maxCalories}
                onChange={(e) => dispatch({ type: ACTIONS.SET_MAX_CALORIES, payload: e.target.value })}
                disabled={state.loading}
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
                disabled={state.loading}
              >
                {state.loading ? (
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

        </div>
      </div>

      {state.searchResults && <RecipeList recipes={state.searchResults} />}

      {/* Error Modal */}
      <ErrorModal
        show={state.showErrorModal}
        error={state.error}
        onClose={handleCloseErrorModal}
      />
    </div>
  );
};

export default RecipeSearch;
