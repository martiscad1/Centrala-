import React from 'react';
import './StatusCard.css';

const StatusCard = ({ title, status }) => {
  const isActive = status === 1;
  const statusText = isActive ? 'Activă' : 'Oprită';
  const cardClass = isActive ? 'status-card active' : 'status-card inactive';

  return (
    <div className={cardClass}>
      <div className="status-indicator"></div>
      <div className="status-content">
        <h3 className="status-title">{title}</h3>
        <p className="status-text">{statusText}</p>
      </div>
    </div>
  );
};

export default StatusCard;
