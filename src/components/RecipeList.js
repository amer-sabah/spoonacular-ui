import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n';
import RecipeListItem from './RecipeListItem';

const RecipeList = ({ recipes }) => {
  // Hooks
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Event handlers
  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  // Render helpers
  const renderNoResults = () => (
    <div className="card mt-4">
      <div className="card-body text-center text-muted">
        <i className="bi bi-search me-2"></i>
        {t('recipeList.noResults')}
      </div>
    </div>
  );

  const renderRecipeGrid = () => (
    <div className="mt-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipes.results.map((recipe) => (
          <RecipeListItem 
            key={recipe.id} 
            recipe={recipe} 
            onRecipeClick={handleRecipeClick}
          />
        ))}
      </div>
    </div>
  );

  // Early returns for edge cases
  if (!recipes || !recipes.results || recipes.results.length === 0) {
    return renderNoResults();
  }

  // Main render
  return renderRecipeGrid();
};

export default RecipeList;
