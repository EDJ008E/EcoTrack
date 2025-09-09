import React from 'react';
import { motion } from 'framer-motion';
import { Car, Fuel, Award, MapPin, Gauge } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const VehicleInfo: React.FC = () => {
  const { user } = useAuth();
  const vehicle = user?.vehicle;

  if (!vehicle) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-300';
      case 'expiring': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'expired': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Vehicle Information
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Complete details about your registered vehicle
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{vehicle.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-emerald-100">{vehicle.type}</p>
            <span className="font-mono text-lg font-bold bg-white/20 px-3 py-1 rounded text-white">
              {vehicle.numberPlate}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Engine Type */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Car className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Engine Type</p>
                <p className="font-semibold text-gray-900 dark:text-white">{vehicle.engineType}</p>
              </div>
            </div>

            {/* Fuel Type */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Fuel className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
                <p className="font-semibold text-gray-900 dark:text-white">{vehicle.fuelType}</p>
              </div>
            </div>

            {/* FC Status */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Award className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">FC Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.fcStatus)}`}>
                  {vehicle.fcStatus.charAt(0).toUpperCase() + vehicle.fcStatus.slice(1)}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <MapPin className="h-8 w-8 text-red-600 dark:text-red-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Location</p>
                <p className="font-semibold text-gray-900 dark:text-white">{vehicle.location.address}</p>
              </div>
            </div>

            {/* Live CO */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Gauge className="h-8 w-8 text-orange-500 dark:text-orange-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">CO Level</p>
                <p className="font-semibold text-gray-900 dark:text-white">{vehicle.emissions.co} ppm</p>
              </div>
            </div>

            {/* Live CO₂ */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Gauge className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">CO₂ Level</p>
                <p className="font-semibold text-gray-900 dark:text-white">{vehicle.emissions.co2} g/km</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};