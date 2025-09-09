import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'alternate';
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  className = '', 
  background = 'default' 
}) => {
  const bgClass = background === 'alternate' 
    ? 'bg-gray-50 dark:bg-gray-800' 
    : 'bg-white dark:bg-gray-900';

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={`min-h-screen py-20 ${bgClass} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
};