import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n';

const RecipeList = ({ recipes }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  if (!recipes || !recipes.results || recipes.results.length === 0) {
    return (
      <div className="card mt-4">
        <div className="card-body text-center text-muted">
          <i className="bi bi-search me-2"></i>
          {t('recipeList.noResults')}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipes.results.map((recipe) => (
          <div key={recipe.id} className="col">
            <div 
              className="card h-100 recipe-card" 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={recipe.image} 
                className="card-img-top" 
                alt={recipe.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
