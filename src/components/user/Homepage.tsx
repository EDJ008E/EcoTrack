import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { inspirationalQuotes } from '../../data/mockData';

export const UserHomepage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-600/20 dark:from-emerald-900/40 dark:to-blue-900/40"></div>
        <img
          src="https://imgs.search.brave.com/zh0HP8gNNAPLk0KKaDRsmP2_xCE5DmYvwYl7pLJdoGs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEyLzMzLzMzLzc4/LzM2MF9GXzEyMzMz/Mzc4NjNfSFpQc3dm/dFJQNERUWkFQUkF6/YlJPNlBtRk1YczlR/MXAuanBn"
          alt="Clean Environment"
          className="w-full h-full object-cover opacity-30 dark:opacity-20"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Welcome to <span className="text-emerald-600 dark:text-emerald-400">EcoTrack</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 h-16"
        >
          <Typewriter
            words={inspirationalQuotes}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={3000}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-time Monitoring</h3>
            <p className="text-gray-600 dark:text-gray-300">Track your vehicle's emissions in real-time</p>
          </div>
          <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Alerts</h3>
            <p className="text-gray-600 dark:text-gray-300">Get notified when emissions exceed safe limits</p>
          </div>
          <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">FC Management</h3>
            <p className="text-gray-600 dark:text-gray-300">Stay updated with fitness certificate status</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};