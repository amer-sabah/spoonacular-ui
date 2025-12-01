import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RecipeSearch from './components/RecipeSearch';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-egg-fried me-2"></i>
            Spoonacular Recipe Search
          </span>
        </div>
      </nav>
      
      <div className="container">
        <RecipeSearch />
      </div>
    </div>
  );
}

export default App;
