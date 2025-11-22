import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './firebase.js'; // Import pentru inițializarea Firebase
import './App.css'; // Import ESENȚIAL pentru stilurile globale
import './index.css'; // Importat după App.css, dar este gol, deci nu afectează

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
