import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck, AlertTriangle, TrendingUp, Brain, Download } from 'lucide-react';
import { mockHMVVehicles } from '../../data/mockData';
import { Vehicle } from '../../types';

export const AIDashboard: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [sortBy, setSortBy] = useState<'total' | 'co' | 'co2'>('total');

  const sortedVehicles = [...mockHMVVehicles].sort((a, b) => {
    switch (sortBy) {
      case 'co': return b.emissions.co - a.emissions.co;
      case 'co2': return b.emissions.co2 - a.emissions.co2;
      default: return (b.emissions.co + b.emissions.co2) - (a.emissions.co + a.emissions.co2);
    }
  });

  const topEmitters = sortedVehicles.slice(0, 10).map(v => ({
    name: v.name,
    co: v.emissions.co,
    co2: v.emissions.co2,
    total: v.emissions.co + v.emissions.co2
  }));

  const getEmissionLevel = (co: number, co2: number) => {
    const total = co + co2;
    if (total > 400) return { level: 'critical', color: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300' };
    if (total > 300) return { level: 'high', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300' };
    if (total > 200) return { level: 'medium', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300' };
    return { level: 'low', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300' };
  };

  const downloadVehicleFC = (vehicle: Vehicle) => {
    const fcContent = `
FITNESS CERTIFICATE

Vehicle Registration Number: ${vehicle.numberPlate}
Vehicle Name: ${vehicle.name}
Vehicle Type: ${vehicle.type}
Engine Type: ${vehicle.engineType}
Fuel Type: ${vehicle.fuelType}

Certificate Status: ${vehicle.fcStatus.toUpperCase()}
Issue Date: ${new Date(new Date(vehicle.fcExpiryDate).getTime() - 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
Expiry Date: ${new Date(vehicle.fcExpiryDate).toLocaleDateString()}

Current Emission Levels:
- CO: ${vehicle.emissions.co} ppm
- CO₂: ${vehicle.emissions.co2} g/km

This certificate confirms that the above vehicle meets the required fitness standards.

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([fcContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FC_${vehicle.numberPlate}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <Brain className="h-10 w-10 mr-3 text-blue-600 dark:text-blue-400" />
          AI-Powered Fleet Dashboard
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Intelligent monitoring and analysis of 50 heavy motor vehicles
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        {[
          { key: 'total', label: 'Total Emissions' },
          { key: 'co', label: 'CO Levels' },
          { key: 'co2', label: 'CO₂ Levels' }
        ].map((option) => (
          <button
            key={option.key}
            onClick={() => setSortBy(option.key as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === option.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </motion.div>

      {/* Top Emitters Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Top 10 Emitters - Real-time Analysis
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topEmitters}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                className="text-xs text-gray-600 dark:text-gray-300"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis className="text-xs text-gray-600 dark:text-gray-300" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="co" fill="#F97316" name="CO (ppm)" />
              <Bar dataKey="co2" fill="#3B82F6" name="CO₂ (g/km)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Vehicle List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Fleet Overview (50 Heavy Motor Vehicles)
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Vehicle</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Number Plate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">CO (ppm)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">CO₂ (g/km)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedVehicles.slice(0, 15).map((vehicle, index) => {
                const emissionInfo = getEmissionLevel(vehicle.emissions.co, vehicle.emissions.co2);
                return (
                  <motion.tr
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Truck className="h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{vehicle.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-900 dark:text-white">
                        {vehicle.numberPlate}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{vehicle.type}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${vehicle.emissions.co > 80 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                        {vehicle.emissions.co}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${vehicle.emissions.co2 > 250 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                        {vehicle.emissions.co2}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${emissionInfo.color}`}>
                        {emissionInfo.level}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVehicle(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedVehicle.name} - Detailed Profile
              </h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Number Plate</span>
                  <span className="font-mono text-lg font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 px-3 py-1 rounded border">
                    {selectedVehicle.numberPlate}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Engine Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedVehicle.engineType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Fuel Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedVehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">FC Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmissionLevel(selectedVehicle.emissions.co, selectedVehicle.emissions.co2).color}`}>
                    {selectedVehicle.fcStatus}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Location</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedVehicle.location.address}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Current Emissions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CO Level</p>
                    <p className="text-xl font-bold text-orange-600">{selectedVehicle.emissions.co} ppm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">CO₂ Level</p>
                    <p className="text-xl font-bold text-blue-600">{selectedVehicle.emissions.co2} g/km</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadVehicleFC(selectedVehicle)}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all duration-200"
                >
                  <Download className="h-4 w-4" />
                  <span>Download FC</span>
                </motion.button>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};