
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Clock, 
  Users, 
  Search, 
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Sunrise,
  Sunset
} from 'lucide-react';

interface ShiftTeamEntry {
  id: string;
  shiftName: string;
  shiftType: 'morning' | 'day' | 'evening' | 'night';
  startTime: string;
  endTime: string;
  date: string;
  totalEmployees: number;
  presentEmployees: number;
  absentEmployees: number;
  lateEmployees: number;
  earlyOutEmployees: number;
  employees: {
    empNo: string;
    name: string;
    avatar: string;
    status: 'present' | 'absent' | 'late' | 'early_out';
    punchIn?: string;
    punchOut?: string;
    department: string;
  }[];
}

const ShiftTeamPunchLog = () => {
  const [shiftEntries] = useState<ShiftTeamEntry[]>([
    {
      id: '1',
      shiftName: 'General Shift',
      shiftType: 'day',
      startTime: '09:00',
      endTime: '18:00',
      date: '2024-01-26',
      totalEmployees: 45,
      presentEmployees: 42,
      absentEmployees: 2,
      lateEmployees: 1,
      earlyOutEmployees: 3,
      employees: [
        {
          empNo: 'EMP001',
          name: 'John Smith',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          status: 'present',
          punchIn: '08:55',
          punchOut: '18:05',
          department: 'HR'
        },
        {
          empNo: 'EMP002',
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          status: 'late',
          punchIn: '09:15',
          punchOut: '18:00',
          department: 'Engineering'
        },
        {
          empNo: 'EMP003',
          name: 'Michael Brown',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          status: 'absent',
          department: 'Marketing'
        }
      ]
    },
    {
      id: '2',
      shiftName: 'Night Shift',
      shiftType: 'night',
      startTime: '22:00',
      endTime: '07:00',
      date: '2024-01-26',
      totalEmployees: 20,
      presentEmployees: 18,
      absentEmployees: 1,
      lateEmployees: 1,
      earlyOutEmployees: 0,
      employees: [
        {
          empNo: 'EMP004',
          name: 'Emily Davis',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          status: 'present',
          punchIn: '21:58',
          punchOut: '07:02',
          department: 'IT'
        },
        {
          empNo: 'EMP005',
          name: 'David Wilson',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
          status: 'present',
          punchIn: '21:55',
          punchOut: '07:00',
          department: 'Security'
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-01-26');
  const [expandedShifts, setExpandedShifts] = useState<Set<string>>(new Set());

  const getShiftIcon = (type: string) => {
    switch (type) {
      case 'morning': return <Sunrise className="w-4 h-4" />;
      case 'day': return <Sun className="w-4 h-4" />;
      case 'evening': return <Sunset className="w-4 h-4" />;
      case 'night': return <Moon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getShiftTypeColor = (type: string) => {
    switch (type) {
      case 'morning': return 'bg-yellow-100 text-yellow-800';
      case 'day': return 'bg-blue-100 text-blue-800';
      case 'evening': return 'bg-orange-100 text-orange-800';
      case 'night': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'early_out': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleShiftExpansion = (shiftId: string) => {
    const newExpanded = new Set(expandedShifts);
    if (newExpanded.has(shiftId)) {
      newExpanded.delete(shiftId);
    } else {
      newExpanded.add(shiftId);
    }
    setExpandedShifts(newExpanded);
  };

  const filteredEntries = shiftEntries.filter(entry =>
    entry.date === selectedDate &&
    (entry.shiftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     entry.employees.some(emp => 
       emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       emp.empNo.toLowerCase().includes(searchTerm.toLowerCase())
     ))
  );

  const totalStats = filteredEntries.reduce((acc, entry) => ({
    totalEmployees: acc.totalEmployees + entry.totalEmployees,
    presentEmployees: acc.presentEmployees + entry.presentEmployees,
    absentEmployees: acc.absentEmployees + entry.absentEmployees,
    lateEmployees: acc.lateEmployees + entry.lateEmployees
  }), {
    totalEmployees: 0,
    presentEmployees: 0,
    absentEmployees: 0,
    lateEmployees: 0
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shift Team Punch Log</h2>
          <p className="text-gray-600">Track attendance across different shifts</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search shifts or employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-40"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{totalStats.totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.presentEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-red-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-600">{totalStats.absentEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-sm text-gray-600">Late</p>
                <p className="text-2xl font-bold text-yellow-600">{totalStats.lateEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shift Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleShiftExpansion(entry.id)}
              >
                <div className="flex items-center gap-3">
                  {getShiftIcon(entry.shiftType)}
                  <div>
                    <CardTitle className="text-lg">{entry.shiftName}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getShiftTypeColor(entry.shiftType)}>
                        {entry.shiftType.charAt(0).toUpperCase() + entry.shiftType.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {entry.startTime} - {entry.endTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex gap-2 text-sm">
                      <Badge variant="outline" className="text-green-600">
                        {entry.presentEmployees} Present
                      </Badge>
                      <Badge variant="outline" className="text-red-600">
                        {entry.absentEmployees} Absent
                      </Badge>
                      {entry.lateEmployees > 0 && (
                        <Badge variant="outline" className="text-yellow-600">
                          {entry.lateEmployees} Late
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {entry.presentEmployees}/{entry.totalEmployees} employees
                    </p>
                  </div>
                  {expandedShifts.has(entry.id) ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                  }
                </div>
              </div>
            </CardHeader>

            {expandedShifts.has(entry.id) && (
              <CardContent className="pt-0">
                <div className="border-t pt-4">
                  <div className="grid gap-3">
                    {entry.employees.map((employee) => (
                      <div key={employee.empNo} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{employee.empNo}</span>
                              <span>•</span>
                              <span>{employee.department}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {employee.punchIn && employee.punchOut && (
                            <div className="text-right text-sm">
                              <p className="text-gray-600">
                                In: {employee.punchIn} | Out: {employee.punchOut}
                              </p>
                            </div>
                          )}
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No shift data found for the selected date and filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShiftTeamPunchLog;
