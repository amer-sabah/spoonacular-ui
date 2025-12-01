import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RecipeSearch from './components/RecipeSearch';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Router>
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
          <Routes>
            <Route path="/" element={<RecipeSearch />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
