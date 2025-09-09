// Mock data generators for fallback when Firebase is not available

export const generateCOData = (hours: number, baseValue: number, variance: number): number[] => {
  return Array.from({ length: hours }, () => {
    return Math.max(0, baseValue + (Math.random() - 0.5) * variance);
  });
};

export const generateCO2Data = (hours: number, baseValue: number, variance: number): number[] => {
  return Array.from({ length: hours }, () => {
    return Math.max(0, baseValue + (Math.random() - 0.5) * variance);
  });
};

export const generateTimeLabels = (hours: number): string[] => {
  const labels = [];
  const now = new Date();
  
  for (let i = hours - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    labels.push(time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }));
  }
  
  return labels;
};

export const generateHotspots = (count: number) => {
  const levels = ['low', 'medium', 'high'] as const;
  const types = ['CO', 'CO2'] as const;
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    lat: 28.6139 + (Math.random() - 0.5) * 0.1,
    lng: 77.2090 + (Math.random() - 0.5) * 0.1,
    level: levels[Math.floor(Math.random() * levels.length)],
    reading: Math.random() * 100 + 20,
    type: types[Math.floor(Math.random() * types.length)]
  }));
};