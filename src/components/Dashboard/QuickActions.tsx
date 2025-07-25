
import React from 'react';
import { Plus, Clock, Calendar, FileText, Users, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      title: 'Add Employee',
      description: 'Add a new employee to your organization',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => console.log('Add employee')
    },
    {
      icon: Calendar,
      title: 'Request Leave',
      description: 'Submit a leave request',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => console.log('Request leave')
    },
    {
      icon: Clock,
      title: 'Clock In/Out',
      description: 'Mark your attendance',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('Clock in/out')
    },
    {
      icon: FileText,
      title: 'Generate Report',
      description: 'Create HR reports',
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => console.log('Generate report')
    },
    {
      icon: Users,
      title: 'Team Meeting',
      description: 'Schedule a team meeting',
      color: 'bg-pink-500 hover:bg-pink-600',
      onClick: () => console.log('Team meeting')
    },
    {
      icon: DollarSign,
      title: 'Payroll',
      description: 'Process monthly payroll',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      onClick: () => console.log('Payroll')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks you can perform quickly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
              onClick={action.onClick}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
