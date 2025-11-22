import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './Home.css';

const Home = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Navigarea va fi gestionată automat de hook-ul `useAuth` din App.jsx
      // dar o putem lăsa și aici pentru o delogare mai rapidă vizual
      navigate('/login'); 
    } catch (error) {
      console.error("Eroare la delogare:", error);
    }
  };

  return (
    <div className="page-container home-container">
      <Header theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
      <main className="home-content">
        <div className="welcome-card">
            <h1>Bun venit în Centrală!</h1>
            <p>Aplicația ta personală pentru management.</p>
            <p>Folosește meniul de mai sus pentru a naviga și a-ți gestiona setările.</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
