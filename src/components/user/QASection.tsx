import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What are safe emission levels for my vehicle?",
    answer: "For petrol vehicles: CO should be below 50 ppm and CO₂ below 150 g/km. For diesel vehicles: CO below 30 ppm and CO₂ below 120 g/km. These thresholds ensure compliance with environmental standards."
  },
  {
    question: "How often should I check my vehicle's emission levels?",
    answer: "We recommend monitoring emission levels daily, especially before long trips. Our system automatically tracks and alerts you every 40 seconds when levels exceed safe thresholds."
  },
  {
    question: "What should I do if I receive a high emission alert?",
    answer: "Immediately reduce speed, avoid heavy acceleration, and consider pulling over safely. Schedule a maintenance check as high emissions often indicate engine problems or the need for servicing."
  },
  {
    question: "How can I improve my vehicle's emission performance?",
    answer: "Regular maintenance, using quality fuel, maintaining proper tire pressure, and smooth driving habits significantly reduce emissions. Consider upgrading to newer emission control systems if available."
  },
  {
    question: "What happens if my FC certificate expires?",
    answer: "An expired fitness certificate means your vehicle is not legally compliant. You'll receive renewal reminders 30 days before expiry. Driving with an expired FC can result in fines and legal issues."
  }
];

export const QASection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
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
          Questions & Guidance
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Get answers to common emission monitoring questions
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto space-y-4"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            layout
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
              </div>
              <motion.div
                animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openItems.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 pt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};