import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export const OTABanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Simulate OTA update every 2 minutes
    const interval = setInterval(() => {
      setShowBanner(true);
      setIsUpdating(true);
      
      setTimeout(() => {
        setIsUpdating(false);
      }, 3000);
    }, 120000);

    // Show initial update after 10 seconds
    setTimeout(() => {
      setShowBanner(true);
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-16 left-0 right-0 z-40 bg-blue-600 dark:bg-blue-700 text-white px-4 py-3"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Download className={`h-5 w-5 ${isUpdating ? 'animate-bounce' : ''}`} />
              <span className="text-sm font-medium">
                {isUpdating ? 'Applying OTA update...' : 'System updated successfully!'}
              </span>
              {isUpdating && (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="p-1 hover:bg-blue-700 dark:hover:bg-blue-800 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};