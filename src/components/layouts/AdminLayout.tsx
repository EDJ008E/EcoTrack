import React from 'react';
import { Home, Brain, TrendingUp } from 'lucide-react';
import { Navigation } from '../common/Navigation';
import { Section } from '../common/Section';
import { OTABanner } from '../common/OTABanner';
import { AdminHomepage } from '../admin/Homepage';
import { AIDashboard } from '../admin/AIDashboard';
import { AIPredictions } from '../admin/AIPredictions';

const adminSections = [
  { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { id: 'dashboard', label: 'AI Dashboard', icon: <Brain className="h-4 w-4" /> },
  { id: 'predictions', label: 'Predictions', icon: <TrendingUp className="h-4 w-4" /> },
];

export const AdminLayout: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation sections={adminSections} />
      <OTABanner />
      
      <Section id="home">
        <AdminHomepage />
      </Section>
      
      <Section id="dashboard" background="alternate">
        <AIDashboard />
      </Section>
      
      <Section id="predictions">
        <AIPredictions />
      </Section>
    </div>
  );
};