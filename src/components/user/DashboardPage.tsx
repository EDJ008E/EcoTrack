import React, { useState, useEffect } from 'react';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import EmissionsChart from './EmissionsChart';
import EmissionSummary from './EmissionSummary';
import EmissionHotspots from './EmissionHotspots';
import {
  generateCOData,
  generateCO2Data,
  generateTimeLabels,
  generateHotspots
} from '../../utils/mockData';
import { ref, onValue } from 'firebase/database';
import { database } from '../../data/firebaseService';

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Raw sensor data - no calculations
  const [currentCO, setCurrentCO] = useState<number>(52.00);
  const [currentCO2, setCurrentCO2] = useState<number>(134.00);
  
  const [coData, setCoData] = useState<number[]>([]);
  const [co2Data, setCo2Data] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [hotspots, setHotspots] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Real-time sensor value updates - exact values from IoT devices
  useEffect(() => {
    try {
      const coRef = ref(database, 'SensorData/MQ9'); // CO sensor
      const co2Ref = ref(database, 'SensorData/MQ135');   // CO2 sensor

      const unsubscribeCO = onValue(coRef, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setCurrentCO(parseFloat(value)); // Exact sensor value
          setIsConnected(true);
          setError(null);
        }
      }, (error) => {
        console.warn('CO sensor connection failed:', error);
        setError('Firebase connection unavailable - using demo data');
        setIsConnected(false);
      });

      const unsubscribeCO2 = onValue(co2Ref, (snapshot) => {
        const value = snapshot.val();
        if (value !== null && value !== undefined) {
          setCurrentCO2(parseFloat(value)); // Exact sensor value
          setIsConnected(true);
          setError(null);
        }
      }, (error) => {
        console.warn('CO2 sensor connection failed:', error);
        setError('Firebase connection unavailable - using demo data');
        setIsConnected(false);
      });

      return () => {
        unsubscribeCO();
        unsubscribeCO2();
      };
    } catch (error) {
      console.warn('Firebase initialization failed:', error);
      setError('Firebase connection unavailable - using demo data');
      setIsConnected(false);
    }
  }, []);

  // Update chart data with raw sensor readings
  const updateData = () => {
    setLoading(true);

    // Generate mock historical data for charts (fallback)
    const newCoData = generateCOData(12, currentCO, 10);
    const newCo2Data = generateCO2Data(12, currentCO2, 20);
    const newTimeLabels = generateTimeLabels(12);
    const newHotspots = generateHotspots(8);

    setCoData(newCoData);
    setCo2Data(newCo2Data);
    setTimeLabels(newTimeLabels);
    setHotspots(newHotspots);
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    updateData();

    // Update charts every 2 minutes
    const interval = setInterval(() => {
      updateData();
    }, 120000);

    return () => clearInterval(interval);
  }, [currentCO, currentCO2]);

  return (
    <div className="space-y-8">
      {/* Header with Refresh Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Emissions Dashboard
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Monitor your vehicle's environmental impact in real-time
          </p>
        </div>

        <button
          onClick={updateData}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Firebase Connection Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isConnected ? (
              <Wifi className="h-6 w-6 text-emerald-500 animate-pulse" />
            ) : (
              <WifiOff className="h-6 w-6 text-orange-500" />
            )}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {isConnected ? 'Connected to IoT Device' : 'Using Demo Data'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {isConnected 
                  ? 'Receiving raw sensor data from your vehicle'
                  : 'Firebase connection unavailable - showing simulated data'
                }
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isConnected 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
              : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
          }`}>
            {isConnected ? 'LIVE' : 'DEMO'}
          </div>
        </div>
        {error && (
          <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <p className="text-sm text-orange-800 dark:text-orange-300">{error}</p>
          </div>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Last Update: {lastUpdate.toLocaleTimeString()}
        </p>
      </div>

      {/* Current Emission Levels - Raw Sensor Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmissionSummary
          type="CO"
          currentValue={currentCO}
        />
        <EmissionSummary
          type="CO2"
          currentValue={currentCO2}
          unit="ppm"
        />
      </div>

      {/* Separate Charts for CO and CO₂ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmissionsChart
          title="Carbon Monoxide (CO)"
          labels={timeLabels}
          data={coData}
          color="#EF4444"
          limit={1600}
          unit="ppm"
        />
        <EmissionsChart
          title="Carbon Dioxide (CO₂)"
          labels={timeLabels}
          data={co2Data}
          color="#8B5CF6"
          limit={550}
          unit="ppm"
        />
      </div>

      <EmissionHotspots hotspots={hotspots} />
    </div>
  );
};

export default DashboardPage;