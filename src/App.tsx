import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { UserLayout } from './components/layouts/UserLayout';
import { AdminLayout } from './components/layouts/AdminLayout';

const AppContent: React.FC = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return isAdmin ? <AdminLayout /> : <UserLayout />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="font-inter antialiased">
          <AppContent />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;