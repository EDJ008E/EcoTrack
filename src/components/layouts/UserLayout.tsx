import React from 'react';
import { Home, BarChart3, Car, Map, HelpCircle, Award } from 'lucide-react';
import { Navigation } from '../common/Navigation';
import { Section } from '../common/Section';
import { OTABanner } from '../common/OTABanner';
import { UserHomepage } from '../user/Homepage';
import { UserDashboard } from '../user/Dashboard';
import { VehicleInfo } from '../user/VehicleInfo';
import { EmissionMap } from '../user/EmissionMap';
import { QASection } from '../user/QASection';
import { FCInfo } from '../user/FCInfo';

const userSections = [
  { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
  { id: 'vehicle', label: 'Vehicle', icon: <Car className="h-4 w-4" /> },
  { id: 'map', label: 'Map', icon: <Map className="h-4 w-4" /> },
  { id: 'fc', label: 'FC Info', icon: <Award className="h-4 w-4" /> },
  { id: 'qa', label: 'Q&A', icon: <HelpCircle className="h-4 w-4" /> },
];

export const UserLayout: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation sections={userSections} />
      <OTABanner />
      
      <Section id="home">
        <UserHomepage />
      </Section>
      
      <Section id="dashboard" background="alternate">
        <UserDashboard />
      </Section>
      
      <Section id="vehicle">
        <VehicleInfo />
      </Section>
      
      <Section id="map" background="alternate">
        <EmissionMap />
      </Section>
      
      <Section id="fc" background="alternate">
        <FCInfo />
      </Section>
      
      <Section id="qa">
        <QASection />
      </Section>
    </div>
  );
};