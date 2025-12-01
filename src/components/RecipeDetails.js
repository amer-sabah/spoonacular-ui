import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [ingredientsData, setIngredientsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8080/recipes/${id}`);
      const recipeData = response.data;
      setRecipe(recipeData);

      // Fetch ingredient details for each ingredient
      if (recipeData.extendedIngredients) {
        fetchIngredientsData(recipeData.extendedIngredients);
      }
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      console.error('Error fetching recipe details:', errorMessage);
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredientsData = async (ingredients) => {
    const ingredientsInfo = {};

    for (const ingredient of ingredients) {
      try {
        const response = await axios.get(`http://localhost:8080/recipes/ingredients/${ingredient.id}`, {
          params: {
            amount: ingredient.measures?.metric?.amount || 1,
            unit: ingredient.measures?.metric?.unitLong || 'serving'
          }
        });
        ingredientsInfo[ingredient.id] = response.data;
      } catch (err) {
        console.error(`Error fetching ingredient ${ingredient.id}:`, err);
      }
    }

    setIngredientsData(ingredientsInfo);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Search
        </button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Recipe not found
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          <i className="bi bi-arrow-left me-2"></i>
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-primary mb-4" onClick={() => navigate('/')}>
        <i className="bi bi-arrow-left me-2"></i>
        Back to Search
      </button>

      <div className="card">
        <div className="row g-0">
          <div className="col-md-5">
            <img 
              src={recipe.image} 
              className="img-fluid rounded-start" 
              alt={recipe.title}
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h2 className="card-title mb-4">{recipe.title}</h2>
              
              <div className="row mb-3">
                <div className="col-6 col-md-4 mb-3">
                  <div className="text-muted small">Servings</div>
                  <div className="fs-5 fw-bold">
                    <i className="bi bi-people me-2 text-primary"></i>
                    {recipe.servings}
                  </div>
                </div>
                <div className="col-6 col-md-4 mb-3">
                  <div className="text-muted small">Ready In</div>
                  <div className="fs-5 fw-bold">
                    <i className="bi bi-clock me-2 text-primary"></i>
                    {recipe.readyInMinutes} min
                  </div>
                </div>
                <div className="col-6 col-md-4 mb-3">
                  <div className="text-muted small">Health Score</div>
                  <div className="fs-5 fw-bold">
                    <i className="bi bi-heart-pulse me-2 text-primary"></i>
                    {recipe.healthScore}
                  </div>
                </div>
                <div className="col-6 col-md-4 mb-3">
                  <div className="text-muted small">Price Per Serving</div>
                  <div className="fs-5 fw-bold">
                    <i className="bi bi-currency-dollar me-2 text-primary"></i>
                    ${(recipe.pricePerServing / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
        <div className="card mt-4">
          <div className="card-body">
            <h4 className="card-title mb-4">
              <i className="bi bi-basket me-2"></i>
              Ingredients
            </h4>
            <div className="row">
              {recipe.extendedIngredients.map((ingredient) => {
                const ingredientInfo = ingredientsData[ingredient.id];
                return (
                  <div key={ingredient.id} className="col-md-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2">{ingredient.originalName}</h6>
                        <div className="small text-muted">
                          <div>
                            <strong>Amount:</strong> {ingredient.measures?.metric?.amount} {ingredient.measures?.metric?.unitLong}
                          </div>
                          {ingredientInfo && (
                            <>
                              <div>
                                <strong>Estimated Cost:</strong> ${(ingredientInfo.estimatedCost?.value / 100).toFixed(2)}
                              </div>
                              {ingredientInfo.nutrition?.nutrients && (
                                <div>
                                  {ingredientInfo.nutrition.nutrients
                                    .filter(n => n.name === 'Calories')
                                    .map((nutrient, idx) => (
                                      <div key={idx}>
                                        <strong>Calories:</strong> {nutrient.amount} {nutrient.unit}
                                      </div>
                                    ))
                                  }
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && (
        <div className="card mt-4 mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4">
              <i className="bi bi-list-ol me-2"></i>
              Instructions
            </h4>
            {recipe.analyzedInstructions.map((instruction, idx) => (
              <div key={idx} className="mb-3">
                {instruction.name && <h5>{instruction.name}</h5>}
                <ol className="list-group list-group">
                  {instruction.steps.map((step) => (
                    <li key={step.number} className="list-group-item">
                      <strong>Step {step.number}:</strong> {step.step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
