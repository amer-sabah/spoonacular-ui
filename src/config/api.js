// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  RECIPES_SEARCH: `${API_BASE_URL}/recipes/search`,
  RECIPE_DETAILS: (id) => `${API_BASE_URL}/recipes/${id}`,
  INGREDIENT_DETAILS: (id) => `${API_BASE_URL}/ingredients/${id}`
};

export default API_BASE_URL;
