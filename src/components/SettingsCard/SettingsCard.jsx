import React from 'react';
import { FaCog } from 'react-icons/fa';
import './SettingsCard.css';

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
      <button className="edit-button" onClick={onEdit}>
        EDITEAZĂ
      </button>
    </div>
  );
};

export default SettingsCard;
