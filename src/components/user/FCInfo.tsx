import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, AlertTriangle, Settings, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const FCInfo: React.FC = () => {
  const { user } = useAuth();
  const vehicle = user?.vehicle;

  if (!vehicle) return null;

  const fcExpiryDate = new Date(vehicle.fcExpiryDate);
  const today = new Date();
  const daysUntilExpiry = Math.ceil((fcExpiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const downloadFC = () => {
    // Create a mock FC document
    const fcContent = `
FITNESS CERTIFICATE

Vehicle Registration Number: ${vehicle.numberPlate}
Vehicle Name: ${vehicle.name}
Vehicle Type: ${vehicle.type}
Engine Type: ${vehicle.engineType}
Fuel Type: ${vehicle.fuelType}

Certificate Status: ${vehicle.fcStatus.toUpperCase()}
Issue Date: ${new Date(fcExpiryDate.getTime() - 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
Expiry Date: ${fcExpiryDate.toLocaleDateString()}

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

  const reminders = [
    {
      id: 1,
      type: 'renewal',
      title: 'FC Renewal Reminder',
      description: `Your fitness certificate expires in ${daysUntilExpiry} days`,
      priority: daysUntilExpiry <= 30 ? 'high' : 'medium',
      icon: Calendar
    },
    {
      id: 2,
      type: 'service',
      title: 'Regular Maintenance Due',
      description: 'Engine servicing recommended based on emission patterns',
      priority: 'medium',
      icon: Settings
    },
    {
      id: 3,
      type: 'inspection',
      title: 'Emission System Check',
      description: 'Schedule emission control system inspection',
      priority: 'low',
      icon: AlertTriangle
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      case 'medium': return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20';
      case 'low': return 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20';
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
          Fitness Certificate Info
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Stay updated with renewal reminders and maintenance alerts
        </p>
      </motion.div>

      {/* FC Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Fitness Certificate Status
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Current validity and renewal information</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            vehicle.fcStatus === 'valid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' :
            vehicle.fcStatus === 'expiring' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }`}>
            {vehicle.fcStatus.charAt(0).toUpperCase() + vehicle.fcStatus.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Expiry Date</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {fcExpiryDate.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Days Remaining</p>
            <p className={`text-lg font-semibold ${
              daysUntilExpiry <= 30 ? 'text-red-600 dark:text-red-400' :
              daysUntilExpiry <= 60 ? 'text-orange-600 dark:text-orange-400' :
              'text-emerald-600 dark:text-emerald-400'
            }`}>
              {daysUntilExpiry} days
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadFC}
            className="w-full flex items-center justify-center space-x-3 py-3 px-6 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
          >
            <Download className="h-5 w-5" />
            <span>Download Fitness Certificate</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Reminders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders.map((reminder, index) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            className={`rounded-xl p-6 border-2 ${getPriorityColor(reminder.priority)}`}
          >
            <div className="flex items-start space-x-3 mb-4">
              <reminder.icon className={`h-6 w-6 mt-1 ${
                reminder.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                reminder.priority === 'medium' ? 'text-orange-600 dark:text-orange-400' :
                'text-emerald-600 dark:text-emerald-400'
              }`} />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {reminder.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {reminder.description}
                </p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                reminder.priority === 'high' ? 'bg-red-600 hover:bg-red-700 text-white' :
                reminder.priority === 'medium' ? 'bg-orange-600 hover:bg-orange-700 text-white' :
                'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              Take Action
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};