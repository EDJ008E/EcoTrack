import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export const EmissionMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate map initialization
    if (mapRef.current) {
      // In a real implementation, this would initialize Leaflet map
      console.log('Map initialized');
    }
  }, []);

  const emissionZones = [
    { id: 1, name: 'Industrial Zone A', level: 'high', lat: 28.6139, lng: 77.2090 },
    { id: 2, name: 'Commercial District', level: 'medium', lat: 28.6189, lng: 77.2150 },
    { id: 3, name: 'Residential Area', level: 'low', lat: 28.6089, lng: 77.2030 },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Emission Zones Map
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Interactive map showing emission levels across different zones
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.065188955724!2d77.89805427479955!3d10.416397389711307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9ffb95456ce7f%3A0x14d566dfc1364080!2sPSNA%20College%20Of%20Engineering%20And%20Technology!5e0!3m2!1sen!2sin!4v1756722346141!5m2!1sen!2sin"
                width="100%" 
                height="450" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Vehicle Location Map"
              />
              
              {/* Overlay with emission zone indicators */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Navigation className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Live Location</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">PSNA College of Engineering</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Zone Legend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Emission Zones
          </h3>
          
          {emissionZones.map((zone) => (
            <div
              key={zone.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{zone.name}</h4>
                <MapPin className={`h-4 w-4 ${
                  zone.level === 'high' ? 'text-red-500' :
                  zone.level === 'medium' ? 'text-orange-500' : 'text-emerald-500'
                }`} />
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                zone.level === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                zone.level === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
              }`}>
                {zone.level.charAt(0).toUpperCase() + zone.level.slice(1)} Risk
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};