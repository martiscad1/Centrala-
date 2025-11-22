import React from 'react';
import { Sun, Moon, LogOut } from 'lucide-react';
import './Header.css';

const Header = ({ theme, toggleTheme, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Centrală</h1>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={onLogout} className="logout-btn">
            <LogOut size={20} />
            <span className="logout-text">Delogare</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
