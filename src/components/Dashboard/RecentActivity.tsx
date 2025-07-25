
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      user: {
        name: 'Alice Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b1e0b619?w=32&h=32&fit=crop&crop=face',
        initials: 'AJ'
      },
      action: 'submitted leave request',
      type: 'leave',
      status: 'pending',
      time: '2 hours ago',
      details: 'Casual leave for 2 days (Mar 15-16)'
    },
    {
      id: 2,
      user: {
        name: 'Bob Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        initials: 'BW'
      },
      action: 'clocked in',
      type: 'attendance',
      status: 'success',
      time: '3 hours ago',
      details: 'Arrival time: 9:15 AM'
    },
    {
      id: 3,
      user: {
        name: 'Carol Davis',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        initials: 'CD'
      },
      action: 'completed performance review',
      type: 'performance',
      status: 'success',
      time: '5 hours ago',
      details: 'Q1 2024 performance evaluation'
    },
    {
      id: 4,
      user: {
        name: 'David Brown',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
        initials: 'DB'
      },
      action: 'leave request rejected',
      type: 'leave',
      status: 'error',
      time: '1 day ago',
      details: 'Insufficient leave balance'
    },
    {
      id: 5,
      user: {
        name: 'Eva Martinez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face',
        initials: 'EM'
      },
      action: 'updated profile information',
      type: 'profile',
      status: 'success',
      time: '2 days ago',
      details: 'Updated emergency contact details'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions and updates from your team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback className="text-xs">{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm text-gray-900">
                    {activity.user.name}
                  </span>
                  <span className="text-sm text-gray-500">{activity.action}</span>
                  {getStatusIcon(activity.status)}
                </div>
                <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
