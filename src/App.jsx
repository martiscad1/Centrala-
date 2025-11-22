import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useDarkMode } from './hooks/useDarkMode';
import Home from './pages/Home';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import { ToastContainer } from 'react-toastify'; // Importăm containerul
import 'react-toastify/dist/ReactToastify.css'; // Importăm stilurile
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
      {/* Containerul pentru notificări a fost adăugat și configurat aici */}
      <ToastContainer
        position="top-right"
        autoClose={5000} // Timp de afișare mărit la 5 secunde
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme} // Se adaptează automat la tema light/dark
      />

      <div className="aurora-background">
        <div className="aurora-container" id="aurora-1"></div>
        <div className="aurora-container" id="aurora-2"></div>
        <div className="aurora-container" id="aurora-3"></div>
        <div className="aurora-container" id="aurora-4"></div>
        <div className="aurora-container" id="aurora-5"></div>
      </div>
      
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
