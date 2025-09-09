import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: {
        title: 'Emissions Dashboard',
        lastUpdate: 'Last Update',
        carbonMonoxide: 'Carbon Monoxide (CO)',
        carbonDioxide: 'Carbon Dioxide (CO₂)',
        safeLevel: 'Safe Level',
        hotspots: 'Emission Hotspots',
        emissionTrend: 'from last hour',
        dailyAverage: 'Daily Average',
        peakValue: 'Peak Value'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;