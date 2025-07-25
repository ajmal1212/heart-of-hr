import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Calendar } from '../components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import AttendancePunchingLog from '../components/AttendancePunchingLog';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Play,
  Pause,
  Calendar as CalendarIcon,
  TrendingUp,
  Users,
  Timer,
  MapPin,
  Smartphone
} from 'lucide-react';

const Attendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const attendanceStats = [
    { label: 'Present Today', value: 142, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Absent Today', value: 8, icon: XCircle, color: 'text-red-600' },
    { label: 'Late Arrivals', value: 12, icon: AlertCircle, color: 'text-yellow-600' },
    { label: 'Avg. Hours', value: '8.5', icon: Clock, color: 'text-blue-600' }
  ];

  const todayAttendance = [
    {
      id: 1,
      employee: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      workHours: '8h 30m',
      status: 'present',
      department: 'Engineering'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      checkIn: '09:15 AM',
      checkOut: '06:15 PM',
      workHours: '8h 30m',
      status: 'late',
      department: 'Marketing'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      checkIn: '-',
      checkOut: '-',
      workHours: '0h 0m',
      status: 'absent',
      department: 'Sales'
    }
  ];

  // Generate current month punching logs for logged in employee
  const generatePunchingLogs = () => {
    const logs = [];
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    for (let day = 1; day <= currentDate.getDate(); day++) {
      const logDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayOfWeek = logDate.getDay();
      
      // Skip weekends for regular work days
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;
      
      const dateStr = logDate.toISOString().split('T')[0];
      const dayName = logDate.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Generate realistic punching data
      const baseCheckIn = new Date(logDate);
      baseCheckIn.setHours(9, 0, 0, 0);
      
      const checkInVariation = Math.random() * 30 - 15; // -15 to +15 minutes
      const checkInTime = new Date(baseCheckIn.getTime() + checkInVariation * 60000);
      
      const checkOutTime = new Date(checkInTime);
      checkOutTime.setHours(checkOutTime.getHours() + 8, checkOutTime.getMinutes() + 30); // 8.5 hours later
      
      const workHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      
      logs.push({
        id: day,
        date: dateStr,
        day: dayName,
        checkIn: checkInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        checkOut: day === currentDate.getDate() ? '-' : checkOutTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        workHours: day === currentDate.getDate() ? 'In Progress' : `${workHours.toFixed(1)}h`,
        status: checkInVariation > 10 ? 'late' : 'present',
        location: 'Office',
        device: Math.random() > 0.5 ? 'Mobile App' : 'Web Portal'
      });
    }
    
    return logs.reverse(); // Most recent first
  };

  const punchingLogs = generatePunchingLogs();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />;
      case 'late': return <AlertCircle className="w-4 h-4" />;
      case 'absent': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-500 mt-1">Track and manage employee attendance</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsCheckedIn(!isCheckedIn)}
            className={isCheckedIn ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            {isCheckedIn ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isCheckedIn ? 'Check Out' : 'Check In'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => (
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
        {/* My Punching Logs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Punching Logs - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardTitle>
                <Badge variant="outline">
                  {punchingLogs.length} working days
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="logs" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="logs">Punching Logs</TabsTrigger>
                  <TabsTrigger value="summary">Monthly Summary</TabsTrigger>
                </TabsList>
                
                <TabsContent value="logs" className="mt-4">
                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Day</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Device</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {punchingLogs.map((log) => (
                          <TableRow key={log.id}>
                            <TableCell className="font-medium">
                              {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </TableCell>
                            <TableCell>{log.day}</TableCell>
                            <TableCell className="text-green-600 font-medium">{log.checkIn}</TableCell>
                            <TableCell className="text-red-600 font-medium">{log.checkOut}</TableCell>
                            <TableCell>{log.workHours}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(log.status)}>
                                {getStatusIcon(log.status)}
                                <span className="ml-1">{log.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {log.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Smartphone className="w-3 h-3" />
                                {log.device}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="summary" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{punchingLogs.filter(l => l.status === 'present').length}</div>
                          <div className="text-sm text-gray-500">Present Days</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">{punchingLogs.filter(l => l.status === 'late').length}</div>
                          <div className="text-sm text-gray-500">Late Days</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(punchingLogs.filter(l => l.workHours !== 'In Progress').reduce((acc, l) => acc + parseFloat(l.workHours), 0))}h
                          </div>
                          <div className="text-sm text-gray-500">Total Hours</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">8.5h</div>
                          <div className="text-sm text-gray-500">Avg. Daily Hours</div>
                        </div>
                      </CardContent>
                    </Card>
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
              <CardTitle>Attendance Calendar</CardTitle>
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Timer className="w-4 h-4 mr-2" />
                Manual Time Entry
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Bulk Attendance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="w-4 h-4 mr-2" />
                Attendance Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Month</span>
                <span className="text-sm text-gray-500">22/23 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Present:</span>
                  <span className="font-medium">22 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Absent:</span>
                  <span className="font-medium">1 day</span>
                </div>
                <div className="flex justify-between">
                  <span>Late:</span>
                  <span className="font-medium">3 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Hours:</span>
                  <span className="font-medium">8.5 hrs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team Punching Log */}
      <AttendancePunchingLog />
    </div>
  );
};

export default Attendance;
