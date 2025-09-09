import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Brain, TrendingUp, Wrench, AlertCircle } from 'lucide-react';

const predictionData = [
  { month: 'Jan', predicted: 280, actual: 275 },
  { month: 'Feb', predicted: 285, actual: 282 },
  { month: 'Mar', predicted: 290, actual: 288 },
  { month: 'Apr', predicted: 295, actual: null },
  { month: 'May', predicted: 300, actual: null },
  { month: 'Jun', predicted: 305, actual: null },
];

const maintenanceData = [
  { name: 'Immediate', value: 8, color: '#EF4444' },
  { name: 'This Week', value: 15, color: '#F97316' },
  { name: 'This Month', value: 18, color: '#EAB308' },
  { name: 'Future', value: 9, color: '#10B981' },
];

export const AIPredictions: React.FC = () => {
  const predictions = [
    {
      title: "Emission Trend Forecast",
      description: "AI predicts 12% increase in fleet emissions over next 3 months",
      confidence: 89,
      priority: "high",
      icon: TrendingUp
    },
    {
      title: "Maintenance Requirements",
      description: "23 vehicles require immediate attention based on emission patterns",
      confidence: 94,
      priority: "critical",
      icon: Wrench
    },
    {
      title: "Compliance Risk Assessment",
      description: "15 vehicles at risk of failing next emission inspection",
      confidence: 76,
      priority: "medium",
      icon: AlertCircle
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20';
      case 'high': return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20';
      case 'medium': return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20';
      default: return 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20';
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
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <Brain className="h-10 w-10 mr-3 text-purple-600 dark:text-purple-400" />
          AI Predictions & Analytics
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Proactive insights for fleet management and maintenance planning
        </p>
      </motion.div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictions.map((prediction, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            className={`rounded-xl p-6 border-2 ${getPriorityColor(prediction.priority)}`}
          >
            <div className="flex items-start space-x-3 mb-4">
              <prediction.icon className={`h-6 w-6 mt-1 ${
                prediction.priority === 'critical' ? 'text-red-600 dark:text-red-400' :
                prediction.priority === 'high' ? 'text-orange-600 dark:text-orange-400' :
                prediction.priority === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-emerald-600 dark:text-emerald-400'
              }`} />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {prediction.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {prediction.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">AI Confidence</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{prediction.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Forecast */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Emission Trend Forecast
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-xs text-gray-600 dark:text-gray-300" />
                <YAxis className="text-xs text-gray-600 dark:text-gray-300" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Actual"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="AI Prediction"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Maintenance Schedule */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Maintenance Schedule
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={maintenanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {maintenanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};