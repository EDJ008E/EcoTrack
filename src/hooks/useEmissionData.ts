import { useState, useEffect } from 'react';
import { Vehicle, EmissionAlert } from '../types';

export const useEmissionData = (vehicle?: Vehicle) => {
  const [emissionData, setEmissionData] = useState<Array<{timestamp: string, co: number, co2: number}>>([]);
  const [alerts, setAlerts] = useState<EmissionAlert[]>([]);

  useEffect(() => {
    if (!vehicle) return;

    const generateData = () => {
      const now = new Date();
      const data = [];
      
      for (let i = 11; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 2 * 60 * 1000); // 2-minute intervals
        const co = Math.max(20, 50 + Math.random() * 30 - 15);
        const co2 = Math.max(80, 120 + Math.random() * 40 - 20);
        
        data.push({
          timestamp: time.toLocaleTimeString('en-US', { hour12: false }),
          co: Math.round(co),
          co2: Math.round(co2)
        });
      }
      
      setEmissionData(data);
      
      // Check for alerts
      const latestData = data[data.length - 1];
      if (latestData.co > 70 || latestData.co2 > 150) {
        const newAlert: EmissionAlert = {
          id: Date.now().toString(),
          type: latestData.co > 80 || latestData.co2 > 170 ? 'danger' : 'warning',
          message: `High ${latestData.co > 70 ? 'CO' : 'CO₂'} levels detected: ${latestData.co > 70 ? latestData.co + ' ppm' : latestData.co2 + ' g/km'}`,
          timestamp: new Date().toISOString(),
          vehicleId: vehicle.id
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    };

    generateData();
    const interval = setInterval(generateData, 40000); // 40 seconds

    return () => clearInterval(interval);
  }, [vehicle]);

  return { emissionData, alerts };
};