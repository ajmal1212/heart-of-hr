
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Target, 
  TrendingUp, 
  Award, 
  Users,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  BarChart3,
  Calendar
} from 'lucide-react';

const Performance = () => {
  const performanceStats = [
    { label: 'Total Reviews', value: 156, icon: Users, color: 'text-blue-600' },
    { label: 'Completed', value: 142, icon: CheckCircle, color: 'text-green-600' },
    { label: 'In Progress', value: 12, icon: Clock, color: 'text-yellow-600' },
    { label: 'Overdue', value: 2, icon: AlertCircle, color: 'text-red-600' }
  ];

  const employees = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      designation: 'Senior Developer',
      department: 'Engineering',
      overallRating: 4.5,
      goals: 8,
      completedGoals: 6,
      lastReview: '2024-01-15',
      nextReview: '2024-07-15',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      designation: 'Marketing Manager',
      department: 'Marketing',
      overallRating: 4.8,
      goals: 6,
      completedGoals: 5,
      lastReview: '2024-01-10',
      nextReview: '2024-07-10',
      status: 'in-progress'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      designation: 'Sales Representative',
      department: 'Sales',
      overallRating: 4.2,
      goals: 5,
      completedGoals: 3,
      lastReview: '2023-12-20',
      nextReview: '2024-06-20',
      status: 'overdue'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Complete React Migration Project',
      employee: 'John Doe',
      department: 'Engineering',
      priority: 'high',
      progress: 85,
      dueDate: '2024-03-15',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Increase Lead Generation by 25%',
      employee: 'Jane Smith',
      department: 'Marketing',
      priority: 'medium',
      progress: 60,
      dueDate: '2024-04-01',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Achieve Q1 Sales Target',
      employee: 'Mike Johnson',
      department: 'Sales',
      priority: 'high',
      progress: 100,
      dueDate: '2024-03-31',
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-500 mt-1">Track goals, reviews, and employee performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Review
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="reviews" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="goals">Goals & OKRs</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>
                
                <TabsContent value="reviews" className="space-y-4 mt-4">
                  {employees.map((employee) => (
                    <Card key={employee.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={employee.avatar} alt={employee.name} />
                              <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                              <p className="text-sm text-gray-500">{employee.designation} • {employee.department}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1">
                                  {renderStars(employee.overallRating)}
                                </div>
                                <span className="text-sm text-gray-500">{employee.overallRating}/5</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getStatusColor(employee.status)}>
                                {employee.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-500">
                              <p>Goals: {employee.completedGoals}/{employee.goals}</p>
                              <p>Next Review: {new Date(employee.nextReview).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Target className="w-4 h-4 mr-1" />
                                Goals
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="goals" className="space-y-4 mt-4">
                  {goals.map((goal) => (
                    <Card key={goal.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                            <p className="text-sm text-gray-500">{goal.employee} • {goal.department}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(goal.priority)}>
                              {goal.priority}
                            </Badge>
                            <Badge className={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                            <span>{goal.status === 'completed' ? 'Completed' : `${100 - goal.progress}% remaining`}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="feedback" className="space-y-4 mt-4">
                  <div className="text-center py-8">
                    <Award className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">360° Feedback</h3>
                    <p className="text-gray-500">Collect feedback from peers, managers, and direct reports</p>
                    <Button className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Request Feedback
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Rating</span>
                  <span className="text-sm font-medium">4.5/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Goals Completed</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">On-time Reviews</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Feedback Response</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create Review
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Set Goals
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="w-4 h-4 mr-2" />
                360° Feedback
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Performance Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">July 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-gray-500">July 10, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Performance;
