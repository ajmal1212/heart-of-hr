
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/Dashboard/StatCard';
import QuickActions from '../components/Dashboard/QuickActions';
import RecentActivity from '../components/Dashboard/RecentActivity';
import UpcomingEvents from '../components/Dashboard/UpcomingEvents';
import { Users, Calendar, Clock, DollarSign, TrendingUp, UserCheck } from 'lucide-react';

const Dashboard = () => {
  const { user, company } = useAuth();

  // Mock data - in a real app, this would come from API
  const stats = [
    {
      title: 'Total Employees',
      value: 124,
      icon: Users,
      change: '+5% from last month',
      changeType: 'increase' as const
    },
    {
      title: 'Active Leaves',
      value: 8,
      icon: Calendar,
      change: '-2 from yesterday',
      changeType: 'decrease' as const
    },
    {
      title: 'Attendance Rate',
      value: '96.5%',
      icon: UserCheck,
      change: '+1.2% from last week',
      changeType: 'increase' as const
    },
    {
      title: 'Avg. Work Hours',
      value: '8.2h',
      icon: Clock,
      change: '+0.3h from last week',
      changeType: 'increase' as const
    },
    {
      title: 'Monthly Payroll',
      value: '$425,000',
      icon: DollarSign,
      change: '+3.2% from last month',
      changeType: 'increase' as const
    },
    {
      title: 'Performance Score',
      value: 4.2,
      icon: TrendingUp,
      change: '+0.1 from last quarter',
      changeType: 'increase' as const
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {getGreeting()}, {user?.firstName}! 👋
        </h1>
        <p className="text-blue-100 mb-4">
          Welcome back to {company?.name}. Here's what's happening today.
        </p>
        <div className="flex items-center space-x-4 text-blue-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm">All systems operational</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-sm">3 pending approvals</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default Dashboard;
