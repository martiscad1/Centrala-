import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useDarkMode } from './hooks/useDarkMode';
import Home from './pages/Home';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
// ToastContainer a fost eliminat de aici
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const { user, loading } = useAuth();
  const [theme, toggleTheme] = useDarkMode();

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
      {/* ToastContainer a fost mutat în main.jsx pentru a fi la nivel global */}
      <Routes>
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
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" />} 
        />
        <Route 
          path="/change-password" 
          element={
            user ? (
              <ChangePassword />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
