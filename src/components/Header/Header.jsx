import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Importăm useNavigate
import { Sun, Moon, User, LogOut, KeyRound } from 'lucide-react';
import './Header.css';

const Header = ({ theme, toggleTheme, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // Inițializăm hook-ul de navigare

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Închide meniul la click în afara lui
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Modificăm funcția pentru a naviga la noua pagină
  const handlePasswordChange = () => {
    navigate('/change-password');
    setIsMenuOpen(false); // Închide meniul după acțiune
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false); // Închide meniul după acțiune
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Centrală</h1>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="user-menu-container" ref={menuRef}>
            <button onClick={toggleMenu} className="user-menu-btn">
              <User size={22} />
            </button>

            {isMenuOpen && (
              <div className="user-dropdown-menu">
                <ul>
                  <li onClick={handlePasswordChange}>
                    <KeyRound size={18} />
                    <span>Schimbă parola</span>
                  </li>
                  <li onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Delogare</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
