import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Demo login logic
    if (email.includes('admin')) {
      setUser({
        id: '2',
        name: 'Admin User',
        email: email,
        role: 'admin'
      });
    } else {
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'user',
        vehicle: {
          id: 'v1',
          name: 'Honda City',
          numberPlate: 'DL01AB1234',
          type: 'Sedan',
          engineType: 'Petrol',
          fuelType: 'Gasoline',
          fcStatus: 'valid',
          fcExpiryDate: '2025-06-15',
          location: {
            lat: 28.6139,
            lng: 77.2090,
            address: 'New Delhi, India'
          },
          emissions: {
            co: 45,
            co2: 120,
            timestamp: new Date().toISOString()
          },
          emissionHistory: []
        }
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAdmin: user?.role === 'admin' 
    }}>
      {children}
    </AuthContext.Provider>
  );
};