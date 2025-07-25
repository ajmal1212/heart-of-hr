import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Calendar } from '../components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  Filter,
  Search,
  FileText,
  Timer,
  Users,
  MapPin
} from 'lucide-react';

const Leaves = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('all');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationType, setApplicationType] = useState('');

  const leaveStats = [
    { label: 'Total Leaves', value: 25, icon: CalendarIcon, color: 'text-blue-600' },
    { label: 'Used', value: 12, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Pending', value: 3, icon: Clock, color: 'text-yellow-600' },
    { label: 'Remaining', value: 10, icon: AlertCircle, color: 'text-purple-600' }
  ];

  const leaveRequests = [
    {
      id: 1,
      employee: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      leaveType: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-17',
      days: 3,
      status: 'pending',
      reason: 'Family vacation'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      leaveType: 'Sick Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      days: 3,
      status: 'approved',
      reason: 'Medical treatment'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      leaveType: 'Personal Leave',
      startDate: '2024-02-25',
      endDate: '2024-02-25',
      days: 1,
      status: 'rejected',
      reason: 'Personal work'
    }
  ];

  const applicationOptions = [
    { id: 'leave', label: 'Apply for Leave', icon: CalendarIcon, color: 'bg-blue-100 text-blue-800' },
    { id: 'permission', label: 'Apply Permission', icon: Clock, color: 'bg-green-100 text-green-800' },
    { id: 'onduty', label: 'Apply On Duty', icon: MapPin, color: 'bg-purple-100 text-purple-800' },
    { id: 'overtime', label: 'Apply Overtime', icon: Timer, color: 'bg-orange-100 text-orange-800' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleApplicationClick = (type: string) => {
    setApplicationType(type);
    setShowApplyModal(true);
  };

  const renderApplicationForm = () => {
    switch (applicationType) {
      case 'leave':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="maternity">Maternity Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input type="date" id="startDate" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input type="date" id="endDate" />
              </div>
            </div>
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea id="reason" placeholder="Please provide reason for leave" />
            </div>
          </div>
        );
      case 'permission':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="permissionDate">Date</Label>
              <Input type="date" id="permissionDate" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromTime">From Time</Label>
                <Input type="time" id="fromTime" />
              </div>
              <div>
                <Label htmlFor="toTime">To Time</Label>
                <Input type="time" id="toTime" />
              </div>
            </div>
            <div>
              <Label htmlFor="permissionReason">Reason</Label>
              <Textarea id="permissionReason" placeholder="Please provide reason for permission" />
            </div>
          </div>
        );
      case 'onduty':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ondutyDate">Date</Label>
              <Input type="date" id="ondutyDate" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ondutyFromTime">From Time</Label>
                <Input type="time" id="ondutyFromTime" />
              </div>
              <div>
                <Label htmlFor="ondutyToTime">To Time</Label>
                <Input type="time" id="ondutyToTime" />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" />
            </div>
            <div>
              <Label htmlFor="ondutyReason">Purpose</Label>
              <Textarea id="ondutyReason" placeholder="Please provide purpose of on duty" />
            </div>
          </div>
        );
      case 'overtime':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="overtimeDate">Date</Label>
              <Input type="date" id="overtimeDate" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="overtimeFromTime">From Time</Label>
                <Input type="time" id="overtimeFromTime" />
              </div>
              <div>
                <Label htmlFor="overtimeToTime">To Time</Label>
                <Input type="time" id="overtimeToTime" />
              </div>
            </div>
            <div>
              <Label htmlFor="overtimeReason">Reason</Label>
              <Textarea id="overtimeReason" placeholder="Please provide reason for overtime" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-500 mt-1">Manage employee leave requests and policies</p>
        </div>
      </div>

      {/* Application Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {applicationOptions.map((option) => (
          <Card key={option.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleApplicationClick(option.id)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${option.color}`}>
                  <option.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{option.label}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {leaveStats.map((stat, index) => (
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
        {/* Leave Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Leave Requests</CardTitle>
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-4">
                  {leaveRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={request.avatar} alt={request.employee} />
                              <AvatarFallback>{request.employee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-900">{request.employee}</h3>
                              <p className="text-sm text-gray-500">{request.leaveType}</p>
                              <p className="text-xs text-gray-400 mt-1">{request.reason}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getStatusColor(request.status)}>
                                {getStatusIcon(request.status)}
                                <span className="ml-1">{request.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-400">{request.days} day(s)</p>
                          </div>
                        </div>
                        
                        {request.status === 'pending' && (
                          <div className="flex gap-2 mt-4 pt-4 border-t">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="pending" className="space-y-4 mt-4">
                  {leaveRequests.filter(r => r.status === 'pending').map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={request.avatar} alt={request.employee} />
                              <AvatarFallback>{request.employee.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-900">{request.employee}</h3>
                              <p className="text-sm text-gray-500">{request.leaveType}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-0"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leave Balance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Annual Leave</span>
                  <span>8/15</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '53%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sick Leave</span>
                  <span>3/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Personal Leave</span>
                  <span>1/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {applicationOptions.find(opt => opt.id === applicationType)?.label}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setShowApplyModal(false)}>
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
            
            {renderApplicationForm()}
            
            <div className="flex gap-2 mt-6">
              <Button className="flex-1" onClick={() => setShowApplyModal(false)}>
                Submit Application
              </Button>
              <Button variant="outline" onClick={() => setShowApplyModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
