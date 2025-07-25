
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Company } from '../types';

interface AuthContextType {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: string) => void;
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
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        // This would typically check localStorage or make an API call
        const savedUser = localStorage.getItem('hrms_user');
        const savedCompany = localStorage.getItem('hrms_company');
        
        if (savedUser && savedCompany) {
          setUser(JSON.parse(savedUser));
          setCompany(JSON.parse(savedCompany));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, this would be an API call
      if (email === 'admin@acme.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email: 'admin@acme.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin',
          companyId: 'acme-corp',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          isActive: true,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        };

        const mockCompany: Company = {
          id: 'acme-corp',
          name: 'Acme Corporation',
          subdomain: 'acme',
          logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop',
          address: '123 Business St, Tech City, TC 12345',
          phone: '+1 (555) 123-4567',
          email: 'contact@acme.com',
          website: 'https://acme.com',
          timezone: 'America/New_York',
          currency: 'USD',
          subscriptionPlan: 'premium',
          subscriptionStatus: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        };

        setUser(mockUser);
        setCompany(mockCompany);
        setIsAuthenticated(true);
        
        localStorage.setItem('hrms_user', JSON.stringify(mockUser));
        localStorage.setItem('hrms_company', JSON.stringify(mockCompany));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_company');
  };

  const switchRole = (role: string) => {
    if (user) {
      const updatedUser = { ...user, role: role as User['role'] };
      setUser(updatedUser);
      localStorage.setItem('hrms_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      company,
      isAuthenticated,
      isLoading,
      login,
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
