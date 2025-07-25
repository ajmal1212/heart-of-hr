
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Plus, 
  Bell, 
  Users, 
  Calendar,
  Pin,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Send,
  Filter,
  Search
} from 'lucide-react';

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const announcementStats = [
    { label: 'Total Announcements', value: 48, icon: Bell, color: 'text-blue-600' },
    { label: 'Active', value: 12, icon: Pin, color: 'text-green-600' },
    { label: 'This Week', value: 8, icon: Calendar, color: 'text-purple-600' },
    { label: 'Engagement Rate', value: '87%', icon: Users, color: 'text-yellow-600' }
  ];

  const announcements = [
    {
      id: 1,
      title: 'New Employee Handbook Released',
      content: 'We are excited to announce the release of our updated Employee Handbook for 2024. This comprehensive guide includes new policies, benefits information, and company guidelines. Please review it carefully and reach out to HR with any questions.',
      author: 'HR Team',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      department: 'Human Resources',
      createdAt: '2024-01-25',
      priority: 'high',
      type: 'policy',
      isPinned: true,
      views: 234,
      likes: 45,
      comments: 12,
      status: 'active'
    },
    {
      id: 2,
      title: 'Company All-Hands Meeting - February 15th',
      content: 'Join us for our quarterly all-hands meeting on February 15th at 10:00 AM in the main conference room. We will discuss Q1 results, upcoming projects, and answer your questions. Virtual attendance is also available.',
      author: 'John Doe',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      department: 'Executive',
      createdAt: '2024-01-23',
      priority: 'medium',
      type: 'event',
      isPinned: false,
      views: 189,
      likes: 32,
      comments: 8,
      status: 'active'
    },
    {
      id: 3,
      title: 'New Health & Wellness Program Launch',
      content: 'We are thrilled to introduce our new comprehensive Health & Wellness Program. This includes gym memberships, mental health resources, and wellness challenges. Enrollment opens next Monday.',
      author: 'Sarah Wilson',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      department: 'Benefits',
      createdAt: '2024-01-20',
      priority: 'medium',
      type: 'benefit',
      isPinned: false,
      views: 156,
      likes: 67,
      comments: 15,
      status: 'active'
    },
    {
      id: 4,
      title: 'IT System Maintenance - Weekend',
      content: 'Our IT team will be performing scheduled maintenance on all systems this weekend (Jan 27-28). Some services may be temporarily unavailable. We apologize for any inconvenience.',
      author: 'IT Team',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      department: 'Information Technology',
      createdAt: '2024-01-18',
      priority: 'high',
      type: 'notice',
      isPinned: false,
      views: 298,
      likes: 12,
      comments: 5,
      status: 'active'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'policy': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'benefit': return 'bg-green-100 text-green-800';
      case 'notice': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-500 mt-1">Company news, updates, and important information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Announcement
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {announcementStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Announcements List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Announcements</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pinned">Pinned</TabsTrigger>
                  <TabsTrigger value="policy">Policy</TabsTrigger>
                  <TabsTrigger value="event">Events</TabsTrigger>
                  <TabsTrigger value="benefit">Benefits</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-4">
                  {announcements.map((announcement) => (
                    <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={announcement.authorAvatar} alt={announcement.author} />
                                <AvatarFallback>{announcement.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                                  {announcement.isPinned && <Pin className="w-4 h-4 text-blue-500" />}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span>{announcement.author}</span>
                                  <span>•</span>
                                  <span>{announcement.department}</span>
                                  <span>•</span>
                                  <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getPriorityColor(announcement.priority)}>
                                {announcement.priority}
                              </Badge>
                              <Badge className={getTypeColor(announcement.type)}>
                                {announcement.type}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 leading-relaxed">{announcement.content}</p>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {announcement.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {announcement.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {announcement.comments}
                              </span>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Heart className="w-4 h-4 mr-1" />
                                Like
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Comment
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share className="w-4 h-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="pinned" className="space-y-4 mt-4">
                  {announcements.filter(a => a.isPinned).map((announcement) => (
                    <Card key={announcement.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                          <Pin className="w-5 h-5 text-blue-500" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                            <p className="text-sm text-gray-500">{announcement.author} • {new Date(announcement.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-3">{announcement.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Audience
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Announcement Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Policy Updates</span>
                </div>
                <span className="text-sm text-gray-500">15</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Events</span>
                </div>
                <span className="text-sm text-gray-500">12</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Benefits</span>
                </div>
                <span className="text-sm text-gray-500">8</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Notices</span>
                </div>
                <span className="text-sm text-gray-500">13</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Read Rate</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Interaction Rate</span>
                  <span>64%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Share Rate</span>
                  <span>32%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
