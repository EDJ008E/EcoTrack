import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { inspirationalQuotes } from '../../data/mockData';

export const AdminHomepage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40"></div>
        <img
          src="https://imgs.search.brave.com/_8-7JuoHjusrrd4oqsm2POpEUXCSqpEQIXih-Hj7ypg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzMxLzE3LzI1/LzM2MF9GXzEyMzEx/NzI1MTdfN0NRTmVn/bFNBWERrYnNhNWdC/bXQ3MGlra2VYaTVu/dUcuanBn"
          alt="Smart City Technology"
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
          Admin <span className="text-blue-600 dark:text-blue-400">Control Center</span>
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">Monitor and analyze fleet emissions with AI</p>
          </div>
          <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Predictive Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">Forecast maintenance needs and emission trends</p>
          </div>
          <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fleet Management</h3>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive oversight of heavy motor vehicles</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};