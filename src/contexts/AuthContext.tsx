import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Company, Employee } from '../types';

interface AuthContextType {
  user: User | null;
  employee: Employee | null;
  company: Company | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (employeeId: string, password: string) => Promise<void>;
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
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookies] = useState('');

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('hrms_user');
        const savedEmployee = localStorage.getItem('hrms_employee');
        const savedCompany = localStorage.getItem('hrms_company');
        const savedCookies = localStorage.getItem('hrms_cookies');
        
        if (savedUser && savedEmployee && savedCompany && savedCookies) {
          setUser(JSON.parse(savedUser));
          setEmployee(JSON.parse(savedEmployee));
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

  const login = async (employeeId: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Parallel API calls to reduce login time
      const [loginResponse, webhookResponse] = await Promise.allSettled([
        fetch('https://hrms-db.gopocket.in/api/method/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            usr: employeeId, // Changed from email to employeeId
            pwd: password
          })
        }),
        fetch('https://n8n.gopocket.in/webhook/hrms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usr: employeeId, // Changed from email to employeeId
            pwd: password
          })
        })
      ]);

      // Handle login response
      if (loginResponse.status === 'rejected') {
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
      }

      const loginResult = loginResponse.value;
      const loginData = await loginResult.json();
      console.log('Login response:', loginData);

      if (!loginResult.ok) {
        const errorMessage = loginData.message || loginData.exc || loginData.error || `Authentication failed with status ${loginResult.status}`;
        throw new Error(errorMessage);
      }

      if (loginData.message) {
        const message = loginData.message.toLowerCase();
        if (message.includes('invalid') || message.includes('incorrect') || message.includes('failed')) {
          throw new Error(loginData.message);
        }
        if (message.indexOf('logged in') === -1 && !loginData.message.user_id && !loginData.full_name) {
          throw new Error(loginData.message || 'Invalid employee ID or password');
        }
      }

      if (loginData.exc) {
        throw new Error('Invalid employee ID or password');
      }

      const setCookieHeaders = loginResult.headers.get('set-cookie');
      const cookieString = setCookieHeaders || '';
      setCookies(cookieString);

      // Handle webhook response
      let employeeData = null;
      if (webhookResponse.status === 'fulfilled' && webhookResponse.value.ok) {
        const webhookData = await webhookResponse.value.json();
        console.log('n8n webhook response:', webhookData);
        
        if (Array.isArray(webhookData) && webhookData.length > 0) {
          const empData = webhookData[0];
          // Fix avatar URL construction here
          const avatarUrl = empData.image 
            ? (empData.image.startsWith('http') 
                ? empData.image 
                : `https://hrms-db.gopocket.in${empData.image}`)
            : undefined;
          
          employeeData = {
            id: empData.name,
            employeeId: empData.employee,
            userId: empData.name,
            companyId: empData.company?.toLowerCase().replace(/\s+/g, '-') || 'gopocket',
            firstName: empData.first_name,
            lastName: empData.last_name || '',
            email: empData.company_email || empData.personal_email,
            phone: empData.cell_number,
            avatar: avatarUrl,
            department: empData.department,
            designation: empData.designation,
            joiningDate: empData.date_of_joining,
            salary: empData.ctc || 0,
            status: empData.status?.toLowerCase() === 'active' ? 'confirmed' : 'probation',
            address: '',
            emergencyContact: {
              name: empData.person_to_be_contacted || '',
              phone: empData.emergency_phone_number || '',
              relationship: empData.relation || ''
            },
            documents: [],
            createdAt: empData.creation,
            updatedAt: empData.modified
          } as Employee;
        }
      } else {
        console.warn('n8n webhook failed or was rejected');
      }

      // Determine user role based on employee ID or designation
      let userRole: User['role'] = 'employee';
      if (employeeId === 'HR001' || employeeId === 'hr001') { // Example HR employee ID
        userRole = 'admin';
      } else if (employeeData?.designation?.toLowerCase().includes('manager')) {
        userRole = 'manager';
      }

      // Create user data with fallback values
      const userData: User = {
        id: loginData.message?.user_id || employeeData?.id || '1',
        employeeId: employeeId, // Add employeeId to user object
        email: employeeData?.email || '', // Get email from employee data
        firstName: employeeData?.firstName || loginData.message?.first_name || loginData.full_name?.split(' ')[0] || 'User',
        lastName: employeeData?.lastName || loginData.message?.last_name || loginData.full_name?.split(' ').slice(1).join(' ') || 'Name',
        role: userRole,
        companyId: employeeData?.companyId || 'gopocket',
        avatar: employeeData?.avatar || '/lovable-uploads/e80701e6-7295-455c-a88c-e3c4a1baad9b.png',
        isActive: true,
        createdAt: employeeData?.createdAt || new Date().toISOString(),
        updatedAt: employeeData?.updatedAt || new Date().toISOString()
      };

      // Create company data
      const companyData: Company = {
        id: employeeData?.companyId || 'gopocket',
        name: employeeData?.companyId === 'gopocket' ? 'GoPocket' : 'Company Name',
        subdomain: 'gopocket',
        logo: '/lovable-uploads/e80701e6-7295-455c-a88c-e3c4a1baad9b.png',
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

      // Set state and save to localStorage
      setUser(userData);
      setEmployee(employeeData);
      setCompany(companyData);
      setIsAuthenticated(true);
      
      localStorage.setItem('hrms_user', JSON.stringify(userData));
      if (employeeData) {
        localStorage.setItem('hrms_employee', JSON.stringify(employeeData));
      }
      localStorage.setItem('hrms_company', JSON.stringify(companyData));
      localStorage.setItem('hrms_cookies', cookieString);

    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof Error) {
        throw error;
      } else if (typeof error === 'string') {
        throw new Error(error);
      } else {
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setEmployee(null);
    setCompany(null);
    setIsAuthenticated(false);
    setCookies('');
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_employee');
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
      employee,
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