import React from 'react';
import { TrendingDown, TrendingUp, BarChart2 } from 'lucide-react';

interface EmissionSummaryProps {
  type: 'CO' | 'CO2';
  currentValue: number;
  unit?: string;
}

const EmissionSummary: React.FC<EmissionSummaryProps> = ({
  type,
  currentValue,
  unit = 'ppm'
}) => {
  // Determine colors based on emission type
  const getColor = () => {
    if (type === 'CO') {
      return {
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        textColor: 'text-blue-700 dark:text-blue-300',
        iconColor: 'text-blue-600 dark:text-blue-400'
      };
    } else {
      return {
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        textColor: 'text-purple-700 dark:text-purple-300',
        iconColor: 'text-purple-600 dark:text-purple-400'
      };
    }
  };
  
  const colors = getColor();
  
  return (
    <div className={`rounded-lg shadow-sm p-4 ${colors.bgColor} border ${colors.borderColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-semibold ${colors.textColor}`}>
            {type === 'CO' ? 'Carbon Monoxide (CO)' : 'Carbon Dioxide (CO₂)'}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {currentValue.toFixed(2)} <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
          </p>
        </div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colors.bgColor}`}>
          {type === 'CO' ? (
            <span className="text-2xl">💨</span>
          ) : (
            <span className="text-2xl">🌫️</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmissionSummary;