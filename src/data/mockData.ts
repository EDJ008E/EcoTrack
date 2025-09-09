import { Vehicle } from '../types';

export const mockHMVVehicles: Vehicle[] = Array.from({ length: 50 }, (_, i) => {
  const vehicleTypes = ['Truck', 'Bus', 'Heavy Truck', 'Tanker', 'Container Truck'];
  const engineTypes = ['Diesel', 'CNG', 'Electric', 'Hybrid'];
  const fuelTypes = ['Diesel', 'CNG', 'Electric', 'Hybrid'];
  const fcStatuses = ['valid', 'expired', 'expiring'] as const;
  
  const baseEmissions = {
    co: 60 + Math.random() * 100,
    co2: 200 + Math.random() * 300
  };

  return {
    id: `hmv-${i + 1}`,
    name: `${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]} ${String(i + 1).padStart(3, '0')}`,
    numberPlate: `DL${Math.floor(Math.random() * 99) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9999) + 1000}`,
    type: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
    engineType: engineTypes[Math.floor(Math.random() * engineTypes.length)],
    fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
    fcStatus: fcStatuses[Math.floor(Math.random() * fcStatuses.length)],
    fcExpiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    location: {
      lat: 28.6139 + (Math.random() - 0.5) * 0.1,
      lng: 77.2090 + (Math.random() - 0.5) * 0.1,
      address: `Location ${i + 1}, Delhi NCR`
    },
    emissions: {
      co: Math.round(baseEmissions.co),
      co2: Math.round(baseEmissions.co2),
      timestamp: new Date().toISOString()
    },
    emissionHistory: Array.from({ length: 12 }, (_, j) => ({
      timestamp: new Date(Date.now() - j * 2 * 60 * 1000).toISOString(),
      co: Math.round(baseEmissions.co + (Math.random() - 0.5) * 20),
      co2: Math.round(baseEmissions.co2 + (Math.random() - 0.5) * 50)
    }))
  };
}).sort((a, b) => (b.emissions.co + b.emissions.co2) - (a.emissions.co + a.emissions.co2));

export const inspirationalQuotes = [
  "Every small action towards cleaner air makes a big difference for our planet.",
  "Clean emissions today, breathable air tomorrow.",
  "Technology and nature can work together for a sustainable future.",
  "Monitor today, preserve tomorrow - every emission counts.",
  "Green choices create blue skies for generations to come.",
  "Innovation in emission control paves the way to environmental harmony."
];