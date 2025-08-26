
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
  cookies: string;
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
  const [cookies, setCookies] = useState('');

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('hrms_user');
        const savedCompany = localStorage.getItem('hrms_company');
        const savedCookies = localStorage.getItem('hrms_cookies');
        
        if (savedUser && savedCompany && savedCookies) {
          setUser(JSON.parse(savedUser));
          setCompany(JSON.parse(savedCompany));
          setCookies(savedCookies);
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
      // Call Frappe API for login
      const loginResponse = await fetch('https://hrms-db.gopocket.in/api/method/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          usr: email,
          pwd: password
        })
      });

      if (!loginResponse.ok) {
        throw new Error('Login failed');
      }

      const loginData = await loginResponse.json();
      console.log('Login response:', loginData);

      // Extract cookies from response headers
      const setCookieHeaders = loginResponse.headers.get('set-cookie');
      const cookieString = setCookieHeaders || '';
      setCookies(cookieString);

      // Call n8n webhook
      try {
        await fetch('https://n8n.gopocket.in/webhook/hrms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usr: email,
            pwd: password
          })
        });
        console.log('n8n webhook called successfully');
      } catch (webhookError) {
        console.error('n8n webhook error:', webhookError);
        // Don't throw here as login was successful
      }

      // Create mock user and company data (you can modify this based on API response)
      const mockUser: User = {
        id: loginData.message?.user_id || '1',
        email: email,
        firstName: loginData.message?.first_name || 'User',
        lastName: loginData.message?.last_name || 'Name',
        role: 'admin',
        companyId: 'gopocket-corp',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      };

      const mockCompany: Company = {
        id: 'gopocket-corp',
        name: 'GoPocket Corporation',
        subdomain: 'gopocket',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop',
        address: '123 Business St, Tech City, TC 12345',
        phone: '+1 (555) 123-4567',
        email: 'contact@gopocket.in',
        website: 'https://gopocket.in',
        timezone: 'Asia/Kolkata',
        currency: 'INR',
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
      localStorage.setItem('hrms_cookies', cookieString);

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    setIsAuthenticated(false);
    setCookies('');
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_company');
    localStorage.removeItem('hrms_cookies');
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
      switchRole,
      cookies
    }}>
      {children}
    </AuthContext.Provider>
  );
};
