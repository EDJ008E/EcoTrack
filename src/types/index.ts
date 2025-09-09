export interface Vehicle {
  id: string;
  name: string;
  numberPlate: string;
  type: string;
  engineType: string;
  fuelType: string;
  fcStatus: 'valid' | 'expired' | 'expiring';
  fcExpiryDate: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  emissions: {
    co: number;
    co2: number;
    timestamp: string;
  };
  emissionHistory: Array<{
    timestamp: string;
    co: number;
    co2: number;
  }>;
}

export interface EmissionAlert {
  id: string;
  type: 'warning' | 'danger';
  message: string;
  timestamp: string;
  vehicleId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  vehicle?: Vehicle;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface NavigationSection {
  id: string;
  label: string;
  icon: string;
}