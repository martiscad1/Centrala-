import React from 'react';
import { FaCog } from 'react-icons/fa';
import './SettingsCard.css';
import '../../pages/Login.css'; // Importăm stilurile necesare

const SettingsCard = ({ title, min, max, onEdit }) => {
  return (
    <div className="settings-card">
      <div className="settings-header">
        <FaCog className="settings-icon" />
        <h4 className="settings-title">{title}</h4>
      </div>
      <div className="settings-body">
        <div className="limit-section">
          <span className="limit-label">MINIM</span>
          <p className="limit-value">{min !== null ? min : '--'}<span>°C</span></p>
        </div>
        <div className="limit-section">
          <span className="limit-label">MAXIM</span>
          <p className="limit-value">{max !== null ? max : '--'}<span>°C</span></p>
        </div>
      </div>

      {/* 
        Aceasta este structura HTML corectă pentru buton,
        care se bazează pe stilurile din Login.css pentru a funcționa.
        Containerul este necesar pentru aliniere, iar span-ul interior este
        folosit pentru text, permițând pseudo-elementelor să creeze efectul vizual.
      */}
      <div className="auth-btn-container" style={{ marginTop: '1rem' }}>
        <button className="auth-btn" onClick={onEdit}>
          <span>Editează</span>
        </button>
      </div>

    </div>
  );
};

export default SettingsCard;
