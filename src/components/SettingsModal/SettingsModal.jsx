import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { toast } from 'react-toastify';
import './SettingsModal.css';
import '../../pages/Login.css'; // Importăm stilurile pentru buton

const SettingsModal = ({ onClose, sensorId }) => {
  const [limits, setLimits] = useState({ min: '', max: '' });
  const [isLoading, setIsLoading] = useState(true);

  const title = sensorId === 'senzor1' ? 'Setare Limite Senzor 1' : 'Setare Limite Senzor 2';

  useEffect(() => {
    const db = getDatabase();
    const minPath = sensorId === 'senzor1' ? 'sensor1minim' : 'sensor2minim';
    const maxPath = sensorId === 'senzor1' ? 'sensor1maxim' : 'sensor2maxim';
    
    const minRef = ref(db, minPath);
    const maxRef = ref(db, maxPath);

    const fetchData = async () => {
      try {
        const [minSnap, maxSnap] = await Promise.all([get(minRef), get(maxRef)]);
        setLimits({
          min: minSnap.exists() ? minSnap.val() : '',
          max: maxSnap.exists() ? maxSnap.val() : ''
        });
      } catch (error) {
        toast.error("Eroare la preluarea limitelor!");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [sensorId]);

  // Funcția de salvare a noilor limite cu validări adăugate
  const handleSave = async () => {
    const { min, max } = limits;

    // 1. Verificăm dacă sunt goale
    if (min.toString().trim() === '' || max.toString().trim() === '') {
      toast.warn("Ambele limite trebuie completate!");
      return;
    }

    const minVal = parseFloat(min);
    const maxVal = parseFloat(max);

    // 2. Verificăm dacă sunt numere valide
    if (isNaN(minVal) || isNaN(maxVal)) {
      toast.error("Vă rugăm introduceți valori numerice valide.");
      return;
    }

    // 3. Verificăm intervalul [0, 150]
    if (minVal < 0 || maxVal < 0 || minVal > 150 || maxVal > 150) {
      toast.error("Limitele trebuie să fie în intervalul 0°C - 150°C!");
      return;
    }

    // 4. Verificăm ca min să fie mai mic decât max
    if (minVal >= maxVal) {
      toast.error("Temperatura minimă trebuie să fie mai mică decât cea maximă!");
      return;
    }

    const db = getDatabase();
    const minPath = sensorId === 'senzor1' ? 'sensor1minim' : 'sensor2minim';
    const maxPath = sensorId === 'senzor1' ? 'sensor1maxim' : 'sensor2maxim';
    
    try {
      await set(ref(db, minPath), minVal);
      await set(ref(db, maxPath), maxVal);
      toast.success("Limite salvate cu succes!");
      onClose(); // Închidem modalul după salvare
    } catch (error) {
      toast.error("Eroare la salvarea limitelor!");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLimits(prev => ({ ...prev, [name]: value }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        
        {isLoading ? (
          <p>Se încarcă...</p>
        ) : (
          <div className="modal-body">
            <div className="inputs-container">
              <div className="input-group-modal">
                <label htmlFor="min">MINIM (°C)</label>
                <input 
                  type="number" 
                  id="min"
                  name="min"
                  value={limits.min}
                  onChange={handleInputChange}
                  placeholder="ex: 20"
                />
              </div>
              <div className="input-group-modal">
                <label htmlFor="max">MAXIM (°C)</label>
                <input 
                  type="number" 
                  id="max"
                  name="max"
                  value={limits.max}
                  onChange={handleInputChange}
                  placeholder="ex: 30"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button className="auth-btn" onClick={handleSave}>
                <span>Salvează</span>
              </button>
              <button className="btn-secondary" onClick={onClose}>
                Renunță
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SettingsModal;
