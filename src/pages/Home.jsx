import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import SettingsCard from '../components/SettingsCard/SettingsCard';
import SettingsModal from '../components/SettingsModal/SettingsModal';
import { FaTemperatureHigh } from 'react-icons/fa';
import PumpChart from '../components/PumpChart/PumpChart'; // Am adăugat importul aici
import './Home.css';

const Home = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [releu1Status, setReleu1Status] = useState(null);
  const [senzor1Temp, setSenzor1Temp] = useState(null);
  const [senzor2Temp, setSenzor2Temp] = useState(null);
  const [senzor1Limits, setSenzor1Limits] = useState({ min: null, max: null });
  const [senzor2Limits, setSenzor2Limits] = useState({ min: null, max: null });
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const releu1Ref = ref(db, 'releu1');
    const senzor1Ref = ref(db, 'senzor1');
    const senzor2Ref = ref(db, 'senzor2');
    const senzor1MinimRef = ref(db, 'sensor1minim');
    const senzor1MaximRef = ref(db, 'sensor1maxim');
    const senzor2MinimRef = ref(db, 'sensor2minim');
    const senzor2MaximRef = ref(db, 'sensor2maxim');

    const unsubscribeReleu1 = onValue(releu1Ref, (snapshot) => setReleu1Status(snapshot.val()));
    const unsubscribeSenzor1 = onValue(senzor1Ref, (snapshot) => setSenzor1Temp(snapshot.val()));
    const unsubscribeSenzor2 = onValue(senzor2Ref, (snapshot) => setSenzor2Temp(snapshot.val()));
    const unsubscribeSenzor1Min = onValue(senzor1MinimRef, (snapshot) => {
      setSenzor1Limits(prevLimits => ({ ...prevLimits, min: snapshot.val() }));
    });
    const unsubscribeSenzor1Max = onValue(senzor1MaximRef, (snapshot) => {
      setSenzor1Limits(prevLimits => ({ ...prevLimits, max: snapshot.val() }));
    });
    const unsubscribeSenzor2Min = onValue(senzor2MinimRef, (snapshot) => {
      setSenzor2Limits(prevLimits => ({ ...prevLimits, min: snapshot.val() }));
    });
    const unsubscribeSenzor2Max = onValue(senzor2MaximRef, (snapshot) => {
      setSenzor2Limits(prevLimits => ({ ...prevLimits, max: snapshot.val() }));
    });

    return () => {
      unsubscribeReleu1();
      unsubscribeSenzor1();
      unsubscribeSenzor2();
      unsubscribeSenzor1Min();
      unsubscribeSenzor1Max();
      unsubscribeSenzor2Min();
      unsubscribeSenzor2Max();
    };
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Eroare la delogare:", error);
    }
  };
  
  const openSettingsModal = (sensorId) => {
    setEditingSensor(sensorId);
    setModalOpen(true);
  };

  const closeSettingsModal = () => {
    setModalOpen(false);
    setEditingSensor(null);
  };

  const getStatusText = () => releu1Status === null ? "Se încarcă statusul..." : releu1Status === 1 ? "Pompa activă" : "Pompa oprită";
  const getStatusClass = () => releu1Status === null ? 'status-loading' : releu1Status === 1 ? 'status-active' : 'status-inactive';

  const getTemperatureStyles = (temp) => {
    if (temp === null || temp === '--') {
      return {
        valueStyle: { color: 'var(--text-color)' },
        iconStyle: { color: 'var(--accent-color)', filter: `drop-shadow(0 4px 10px rgba(var(--accent-color-rgb), 0.4))` },
      };
    }
    const minTemp = 0, maxTemp = 80;
    const startColor = [52, 152, 219], endColor = [231, 76, 60];
    const clampedTemp = Math.max(minTemp, Math.min(temp, maxTemp));
    const percentage = (clampedTemp - minTemp) / (maxTemp - minTemp);
    const r = Math.round(startColor[0] + percentage * (endColor[0] - startColor[0]));
    const g = Math.round(startColor[1] + percentage * (endColor[1] - startColor[1]));
    const b = Math.round(startColor[2] + percentage * (endColor[2] - startColor[2]));
    const color = `rgb(${r}, ${g}, ${b})`;
    const shadowColor = `rgba(${r}, ${g}, ${b}, 0.55)`;
    return {
      valueStyle: { color: color },
      iconStyle: { color: color, filter: `drop-shadow(0 4px 12px ${shadowColor})` },
    };
  };

  const senzor1Styles = getTemperatureStyles(senzor1Temp);
  const senzor2Styles = getTemperatureStyles(senzor2Temp);

  return (
    <div className="page-container home-container">
      <Header theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
      <div className={`status-header ${getStatusClass()}`}>
        <h2>{getStatusText()}</h2>
      </div>
      <main className="home-content">
        <div className="sensor-groups-container">
          {/* Grupul Senzorului 1 */}
          <div className="sensor-group">
            <div className="sensor-card">
              <FaTemperatureHigh className="sensor-icon" style={senzor1Styles.iconStyle} />
              <h3 className="sensor-title">Temperatură Senzor 1</h3>
              <p className="temperature-value" style={senzor1Styles.valueStyle}>
                {senzor1Temp !== null ? senzor1Temp : '--'}<span>°C</span>
              </p>
            </div>
            <SettingsCard 
              title="Setare Limite Senzor 1"
              min={senzor1Limits.min}
              max={senzor1Limits.max}
              onEdit={() => openSettingsModal('senzor1')} 
            />
          </div>

          {/* Grupul Senzorului 2 */}
          <div className="sensor-group">
            <div className="sensor-card">
              <FaTemperatureHigh className="sensor-icon" style={senzor2Styles.iconStyle} />
              <h3 className="sensor-title">Temperatură Senzor 2</h3>
              <p className="temperature-value" style={senzor2Styles.valueStyle}>
                {senzor2Temp !== null ? senzor2Temp : '--'}<span>°C</span>
              </p>
            </div>
            <SettingsCard 
              title="Setare Limite Senzor 2"
              min={senzor2Limits.min}
              max={senzor2Limits.max}
              onEdit={() => openSettingsModal('senzor2')} 
            />
          </div>
        </div>
        
        {/* Aici am adăugat noua componentă de grafic */}
        <PumpChart theme={theme} />
      </main>

      {isModalOpen && (
        <SettingsModal 
          onClose={closeSettingsModal} 
          sensorId={editingSensor} 
        />
      )}
    </div>
  );
};

export default Home;
