
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import Dashboard from './Dashboard';
import LoadingScreen from '../components/LoadingScreen';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Loading HRMSPro..." />;
  }

  return isAuthenticated ? <Dashboard /> : <Login />;
};

export default Index;
