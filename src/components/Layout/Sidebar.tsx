
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  UserPlus, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Bell,
  Award,
  Network
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', roles: ['admin', 'hr', 'manager', 'employee'] },
    { icon: Users, label: 'Employees', path: '/employees', roles: ['admin', 'hr', 'manager'] },
    { icon: Network, label: 'Organization', path: '/organization-hierarchy', roles: ['admin', 'hr', 'manager'] },
    { icon: Calendar, label: 'Leave Management', path: '/leaves', roles: ['admin', 'hr', 'manager', 'employee'] },
    { icon: Clock, label: 'Attendance', path: '/attendance', roles: ['admin', 'hr', 'manager', 'employee'] },
    { icon: DollarSign, label: 'Payroll', path: '/payroll', roles: ['admin', 'hr'] },
    { icon: UserPlus, label: 'Recruitment', path: '/recruitment', roles: ['admin', 'hr'] },
    { icon: Award, label: 'Performance', path: '/performance', roles: ['admin', 'hr', 'manager', 'employee'] },
    { icon: FileText, label: 'Documents', path: '/documents', roles: ['admin', 'hr', 'manager', 'employee'] },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', roles: ['admin', 'hr'] },
    { icon: Bell, label: 'Announcements', path: '/announcements', roles: ['admin', 'hr', 'manager', 'employee'] },
    { icon: Settings, label: 'Settings', path: '/settings', roles: ['admin', 'hr'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <img 
          src="/lovable-uploads/e80701e6-7295-455c-a88c-e3c4a1baad9b.png" 
          alt="GoPocket Logo" 
          className={cn(
            "object-contain transition-all duration-300",
            isCollapsed ? "w-8 h-6 mx-auto" : "w-10 h-8"
          )}
        />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-3 rounded-lg transition-all duration-200 group",
              isCollapsed ? "justify-center" : "space-x-3",
              isActive(item.path)
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className={cn(
              "transition-colors flex-shrink-0",
              isCollapsed ? "w-6 h-6" : "w-5 h-5",
              isActive(item.path) ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
            )} />
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2024 GoPocket HRMS
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
