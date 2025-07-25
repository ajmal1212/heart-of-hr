
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock, Gift, Users, Coffee } from 'lucide-react';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      type: 'meeting',
      date: '2024-03-15',
      time: '10:00 AM',
      attendees: 8,
      location: 'Conference Room A',
      icon: Users,
      color: 'bg-blue-500',
      badge: 'Today'
    },
    {
      id: 2,
      title: 'Alice Johnson Birthday',
      type: 'birthday',
      date: '2024-03-16',
      time: 'All day',
      attendees: null,
      location: 'Office',
      icon: Gift,
      color: 'bg-pink-500',
      badge: 'Tomorrow'
    },
    {
      id: 3,
      title: 'Coffee Chat Session',
      type: 'social',
      date: '2024-03-17',
      time: '3:00 PM',
      attendees: 12,
      location: 'Cafeteria',
      icon: Coffee,
      color: 'bg-orange-500',
      badge: 'Mar 17'
    },
    {
      id: 4,
      title: 'Monthly All-Hands',
      type: 'meeting',
      date: '2024-03-20',
      time: '2:00 PM',
      attendees: 45,
      location: 'Main Hall',
      icon: Users,
      color: 'bg-purple-500',
      badge: 'Mar 20'
    },
    {
      id: 5,
      title: 'Project Deadline',
      type: 'deadline',
      date: '2024-03-22',
      time: '5:00 PM',
      attendees: null,
      location: 'Development Team',
      icon: Clock,
      color: 'bg-red-500',
      badge: 'Mar 22'
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Today':
        return 'bg-green-100 text-green-800';
      case 'Tomorrow':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>
          Important events and deadlines this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${event.color}`}>
                <event.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-gray-900">{event.title}</h4>
                  <Badge variant="secondary" className={`text-xs ${getBadgeColor(event.badge)}`}>
                    {event.badge}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  {event.attendees && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
