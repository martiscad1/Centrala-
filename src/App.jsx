import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useDarkMode } from './hooks/useDarkMode';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

const App = () => {
  const { user, loading } = useAuth();
  const [theme, toggleTheme] = useDarkMode(); // Hook-ul pentru tema

  // Afișează un ecran de încărcare în timp ce se verifică starea autentificării
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Se încarcă...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Fundalul animat "aurora" */}
      <div className="aurora-background">
        <div className="aurora-container" id="aurora-1"></div>
        <div className="aurora-container" id="aurora-2"></div>
        <div className="aurora-container" id="aurora-3"></div>
        <div className="aurora-container" id="aurora-4"></div>
        <div className="aurora-container" id="aurora-5"></div>
      </div>
      
      <Routes>
        {/* Ruta pentru pagina principală, accesibilă doar dacă utilizatorul este logat */}
        <Route 
          path="/" 
          element={
            user ? (
              <Home theme={theme} toggleTheme={toggleTheme} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        {/* Ruta pentru pagina de login, accesibilă doar dacă utilizatorul NU este logat */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
