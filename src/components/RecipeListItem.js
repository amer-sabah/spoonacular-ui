import React from 'react';

const RecipeListItem = ({ recipe, onRecipeClick }) => {
  return (
    <div className="col">
      <div 
        className="card h-100 recipe-card" 
        onClick={() => onRecipeClick(recipe.id)}
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
  );
};

export default RecipeListItem;
