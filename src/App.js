import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './i18n';
import RecipeSearch from './components/RecipeSearch';
import RecipeDetails from './components/RecipeDetails';

function App() {
  const { t } = useTranslation();
  
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-dark bg-primary mb-4">
          <div className="container">
            <span className="navbar-brand mb-0 h1">
              <i className="bi bi-egg-fried me-2"></i>
              {t('app.title')}
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
