import { useState, useEffect, useCallback } from 'react';
import { firebaseService, IoTEmissionData } from '../data/firebaseService';
import { EmissionAlert } from '../types';

interface UseFirebaseEmissionsReturn {
  emissionData: Array<{timestamp: string, co: number, co2: number}>;
  latestEmission: IoTEmissionData | null;
  alerts: EmissionAlert[];
  isConnected: boolean;
  error: string | null;
}

export const useFirebaseEmissions = (vehicleId?: string): UseFirebaseEmissionsReturn => {
  const [emissionData, setEmissionData] = useState<Array<{timestamp: string, co: number, co2: number}>>([]);
  const [latestEmission, setLatestEmission] = useState<IoTEmissionData | null>(null);
  const [alerts, setAlerts] = useState<EmissionAlert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate mock data as fallback
  const generateMockData = useCallback(() => {
    const now = new Date();
    const data = [];
    
    for (let i = 11; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 2 * 60 * 1000); // 2-minute intervals
      // Use exact values without averaging - simulate real sensor readings
      const co = Math.round(Math.max(30, 45 + Math.random() * 20 - 10) * 100) / 100;
      const co2 = Math.round(Math.max(100, 130 + Math.random() * 30 - 15) * 100) / 100;
      
      data.push({
        timestamp: time.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        }),
        co: co, // Exact sensor value
        co2: co2 // Exact sensor value
      });
    }
    
    return data;
  }, []);

  // Check for emission alerts
  const checkForAlerts = useCallback((data: IoTEmissionData, vehicleId: string) => {
    const coThreshold = 70;
    const co2Threshold = 200;
    
    if (data.co > coThreshold || data.co2 > co2Threshold) {
      const newAlert: EmissionAlert = {
        id: `${Date.now()}-${Math.random()}`,
        type: data.co > 80 || data.co2 > 250 ? 'danger' : 'warning',
        message: `High ${data.co > coThreshold ? 'CO' : 'CO₂'} levels detected: ${data.co > coThreshold ? data.co.toFixed(2) + ' ppm' : data.co2.toFixed(2) + ' ppm'}`,
        timestamp: new Date().toISOString(),
        vehicleId: vehicleId
      };
      
      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    }
  }, []);

  useEffect(() => {
    if (!vehicleId) {
      // No vehicle ID, use mock data
      setEmissionData(generateMockData());
      setIsConnected(false);
      return;
    }

    let emissionUnsubscribe: (() => void) | null = null;
    let latestUnsubscribe: (() => void) | null = null;

    // Try to connect to Firebase
    try {
      // Subscribe to historical emission data
      emissionUnsubscribe = firebaseService.subscribeToEmissionData(
        vehicleId,
        (data: IoTEmissionData[]) => {
          if (data.length > 0) {
            setIsConnected(true);
            setError(null);
            
            // Convert to chart format - use exact sensor values
            const chartData = data.map(item => ({
              timestamp: new Date(item.timestamp).toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
              }),
              co: item.co, // Exact sensor reading
              co2: item.co2 // Exact sensor reading
            }));
            
            setEmissionData(chartData);
          } else {
            // No data from Firebase, use mock data
            setEmissionData(generateMockData());
            setIsConnected(false);
          }
        },
        (error) => {
          console.warn('Firebase connection failed, using mock data:', error);
          setError('Using simulated data - Firebase connection unavailable');
          setEmissionData(generateMockData());
          setIsConnected(false);
        }
      );

      // Subscribe to latest emission for real-time alerts
      latestUnsubscribe = firebaseService.subscribeToLatestEmission(
        vehicleId,
        (data: IoTEmissionData | null) => {
          if (data) {
            setLatestEmission(data);
            checkForAlerts(data, vehicleId); // Use exact sensor values for alerts
          }
        },
        (error) => {
          console.warn('Failed to get latest emission data:', error);
        }
      );

    } catch (error) {
      console.warn('Firebase initialization failed, using mock data:', error);
      setError('Using simulated data - Firebase connection unavailable');
      setEmissionData(generateMockData());
      setIsConnected(false);
    }

    // Cleanup subscriptions
    return () => {
      if (emissionUnsubscribe) emissionUnsubscribe();
      if (latestUnsubscribe) latestUnsubscribe();
    };
  }, [vehicleId, generateMockData, checkForAlerts]);

  // Update mock data every 40 seconds if not connected to Firebase
  useEffect(() => {
    if (!isConnected && !vehicleId) {
      const interval = setInterval(() => {
        setEmissionData(generateMockData());
      }, 40000);

      return () => clearInterval(interval);
    }
  }, [isConnected, vehicleId, generateMockData]);

  return {
    emissionData,
    latestEmission,
    alerts,
    isConnected,
    error
  };
};