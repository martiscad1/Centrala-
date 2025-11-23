import React, { useState, useEffect, useMemo } from 'react';
import { realtimeDB } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './PumpChart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const hours = payload[0].value;
    const fullHours = Math.floor(hours);
    const minutes = Math.round((hours - fullHours) * 60);
    return (
      <div className="custom-tooltip">
        <p className="label">{`Data: ${label}`}</p>
        <p className="intro">{`Timp: ${fullHours} ore și ${minutes} minute`}</p>
      </div>
    );
  }
  return null;
};

const PumpChart = ({ theme }) => {
  const [fullData, setFullData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numberOfDays, setNumberOfDays] = useState(30);
  const dayOptions = [10, 20, 30, 40];

  useEffect(() => {
    const pumpRef = ref(realtimeDB, 'timpPompaActiva');
    const unsubscribe = onValue(pumpRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const parsedData = Object.values(data)
          .map(entry => {
            if (typeof entry !== 'string' || entry.trim() === '') return null;
            
            const parts = entry.split(' ');
            if (parts.length !== 2) return null;

            const dateStr = parts[0];
            const minutes = parseInt(parts[1], 10);

            if (isNaN(minutes)) return null;

            const dateParts = dateStr.split('.').map(Number);
            if (dateParts.length !== 3) return null;
            
            const dateObj = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

            return {
              dateObj,
              date: `${String(dateParts[0]).padStart(2, '0')}.${String(dateParts[1]).padStart(2, '0')}.${dateParts[2]}`,
              hours: parseFloat((minutes / 60).toFixed(2)),
            };
          })
          .filter(Boolean);

        parsedData.sort((a, b) => a.dateObj - b.dateObj);
        setFullData(parsedData);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase read failed for chart: " + error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const chartData = useMemo(() => {
    if (fullData.length > 0) {
      return fullData.slice(-numberOfDays);
    }
    return [];
  }, [fullData, numberOfDays]);

  if (loading) {
    return (
      <div className="chart-loading-container">
        <div className="loading-spinner"></div>
        <p>Se încarcă datele pentru grafic...</p>
      </div>
    );
  }

  return (
    <div className="pump-chart-container">
        <div className="chart-header">
            <h3 className="chart-title">Timp funcționare pompă în ultimele {numberOfDays} de zile</h3>
            <div className="day-selector">
                {dayOptions.map(days => (
                <button 
                    key={days} 
                    onClick={() => setNumberOfDays(days)}
                    className={numberOfDays === days ? 'active' : ''}
                >
                    {days} zile
                </button>
                ))}
            </div>
        </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          barGap={10}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
          <XAxis dataKey="date" tickLine={false} tick={false} />
          <YAxis unit=" ore" tick={{ fill: theme === 'dark' ? '#f1f1f1' : '#333' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128, 128, 128, 0.1)' }}/>
          <Bar dataKey="hours" name="Ore de funcționare" fill="var(--chart-bar-color)" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PumpChart;
