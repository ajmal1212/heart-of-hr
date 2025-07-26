import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  Filter, 
  Download, 
  Clock, 
  Calendar,
  User,
  Building2,
  ChevronDown,
  ChevronUp,
  MoreVertical
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { cn } from '../lib/utils';

interface PunchingLogEntry {
  empNo: string;
  employeeName: string;
  department: string;
  avatar: string;
  dailyPunches: { [day: number]: string[] };
  totalHours: string;
  presentDays: number;
  lateCount: number;
}

const AttendancePunchingLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Generate days of current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Enhanced sample data
  const punchingData: PunchingLogEntry[] = [
    {
      empNo: 'SKY1101',
      employeeName: 'AJMAL',
      department: 'DIGITAL MARKETING',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      totalHours: '168.5h',
      presentDays: 20,
      lateCount: 3,
      dailyPunches: {
        1: ['08:54', '13:41', '13:43', '15:53', '15:56', '18:02'],
        2: ['08:50', '13:00', '13:03', '16:13', '16:15', '18:01'],
        3: ['08:57', '12:25', '12:27', '15:33', '15:35', '18:05'],
        4: ['08:44', '10:35', '10:38', '12:22', '12:24', '16:13', '16:16', '18:03'],
        5: ['09:17', '11:59', '12:23', '14:00'],
        6: ['08:43', '10:22', '10:24', '11:14', '11:17', '12:41', '12:43', '15:31', '15:33', '18:01'],
        7: ['08:47', '11:09', '11:11', '12:54', '12:57', '15:42', '15:45', '18:02'],
        8: ['08:54', '11:22', '11:24', '14:32', '14:35', '16:18', '16:21', '17:47', '17:49', '18:07'],
        9: ['08:53', '10:59', '11:02', '14:08', '14:11', '15:08', '15:12', '16:22', '16:25', '18:09'],
        10: ['08:56', '10:05', '10:17', '12:08', '12:09', '16:58', '17:09', '18:01'],
        11: ['09:23', '13:03', '13:06', '13:33'],
        12: ['08:59', '13:05', '13:08', '16:00', '16:03', '17:38', '17:43', '18:04'],
        13: ['08:50', '11:09', '11:12', '13:59', '14:01', '17:07', '17:09', '18:01'],
        14: ['08:53', '11:20', '11:23', '13:27', '13:30', '15:20', '15:23', '17:28', '17:30', '18:00'],
        15: ['08:55', '10:16', '10:16', '10:19', '10:19', '13:22', '13:24', '16:27', '16:30', '18:02'],
        16: ['08:51', '11:49', '11:51', '15:54', '15:57', '18:09'],
        17: ['09:21', '13:28', '13:30', '13:32'],
        18: ['08:48', '09:54', '09:54', '10:53', '10:55', '14:52', '14:54', '17:47', '17:49', '18:01'],
        19: ['08:56', '11:25', '11:26', '14:20', '14:22', '16:05', '16:07', '17:42', '17:42', '17:44', '17:46', '18:01'],
        20: ['08:51', '11:19', '11:21', '12:35', '12:37', '14:06', '14:08', '16:05', '16:07', '17:48', '17:50', '18:00'],
      }
    },
    {
      empNo: 'SKY1171',
      employeeName: 'DIVAKAR S',
      department: 'DIGITAL MARKETING',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      totalHours: '142.3h',
      presentDays: 17,
      lateCount: 5,
      dailyPunches: {
        1: ['08:46', '08:56', '09:09', '12:23', '12:25', '14:18', '15:13', '16:22', '16:28', '18:03'],
        2: ['08:40', '09:02', '09:05', '12:18', '12:22', '13:50', '14:00', '16:20', '16:22', '17:19', '17:23', '17:56', '17:59', '18:01'],
        3: ['09:06', '09:15', '09:20', '17:40', '17:53', '18:02'],
        4: ['09:52', '11:24', '11:32', '12:41', '12:50', '14:02', '14:16', '18:05'],
        5: ['09:31', '14:00'],
        6: ['08:51', '09:01', '09:05', '09:44', '09:46', '10:54', '11:02', '11:20', '11:25', '12:20', '12:24', '13:45', '14:05', '14:42', '14:46', '16:27', '16:29', '18:01'],
        7: ['10:07', '11:06', '11:11', '12:22', '12:23', '12:23', '12:27', '13:48', '14:02', '15:53', '16:01', '18:27'],
        8: ['10:06', '10:07', '10:12', '11:21', '11:24', '12:50', '12:55', '18:07'],
        9: ['09:24', '11:23', '11:26', '12:36', '12:47', '13:05', '13:07', '13:32'],
        10: ['08:52', '09:05', '09:07', '09:48', '09:58', '11:22', '11:29', '13:04', '13:07', '13:57', '14:03', '14:44', '14:50', '16:23', '16:32', '18:03'],
        11: ['08:40', '08:57', '09:04', '10:11', '10:16', '11:21', '11:32', '11:40', '11:43', '11:59', '12:06', '16:23', '16:27', '17:42', '17:50', '18:01'],
        12: ['08:42', '08:58', '09:03', '09:49', '09:56', '11:20', '11:31', '13:05', '13:07', '13:50', '14:06', '14:30', '14:32', '15:39', '15:43', '16:22', '16:29', '18:00'],
        13: ['08:40', '09:11', '09:18', '09:59', '10:02', '13:51', '14:10', '18:02'],
        14: ['08:49', '08:57', '09:01', '10:02', '10:13', '11:19', '11:22', '12:52', '12:54', '13:45', '14:14', '15:45', '15:48', '16:35', '16:43', '17:12', '17:15', '18:01'],
        15: ['09:42', '10:46', '10:50', '11:26', '11:38', '13:18'],
        16: ['08:53', '09:02', '09:05', '11:25', '11:28', '17:22', '17:24', '18:01'],
        17: ['08:54', '10:30', '10:31', '11:28', '11:32', '12:01', '14:12', '18:00'],
      }
    },
    {
      empNo: 'SKY1218',
      employeeName: 'ABENAV .C',
      department: 'DIGITAL MARKETING',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      totalHours: '85.0h',
      presentDays: 10,
      lateCount: 2,
      dailyPunches: {
        1: ['08:45', '12:30', '13:30', '18:00'],
        2: ['08:50', '12:00', '13:00', '17:45'],
        3: ['09:00', '12:15', '13:15', '18:15'],
        4: ['08:55', '12:45', '13:45', '18:05'],
        5: ['09:10', '12:30', '13:30', '17:50'],
        6: ['08:40', '12:00', '13:00', '18:10'],
        7: ['08:58', '12:20', '13:20', '17:55'],
        8: ['09:05', '12:35', '13:35', '18:00'],
        9: ['08:52', '12:10', '13:10', '17:40'],
        10: ['09:15', '12:25', '13:25', '18:20'],
      }
    }
  ];

  const toggleRowExpansion = (empNo: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(empNo)) {
      newExpanded.delete(empNo);
    } else {
      newExpanded.add(empNo);
    }
    setExpandedRows(newExpanded);
  };

  const formatPunchTime = (punches: string[]) => {
    const punchPairs = [];
    for (let i = 0; i < punches.length; i += 2) {
      const checkIn = punches[i];
      const checkOut = punches[i + 1];
      punchPairs.push({ checkIn, checkOut });
    }
    return punchPairs;
  };

  const getDayStatus = (punches: string[]) => {
    if (!punches || punches.length === 0) return 'absent';
    const firstPunch = punches[0];
    const [hour, minute] = firstPunch.split(':').map(Number);
    if (hour > 9 || (hour === 9 && minute > 15)) return 'late';
    return 'present';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-700';
      case 'late': return 'bg-yellow-100 text-yellow-700';
      case 'absent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredData = punchingData.filter(emp => 
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Team Punching Log
            </CardTitle>
            <p className="text-gray-600 mt-1">
              {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • {filteredData.length} employees reporting to you
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Search and Stats */}
        <div className="flex items-center justify-between mt-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{punchingData.reduce((acc, emp) => acc + emp.presentDays, 0)}</div>
              <div className="text-xs text-gray-500">Total Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{punchingData.reduce((acc, emp) => acc + emp.lateCount, 0)}</div>
              <div className="text-xs text-gray-500">Late Arrivals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{punchingData.reduce((acc, emp) => acc + parseFloat(emp.totalHours), 0).toFixed(1)}h</div>
              <div className="text-xs text-gray-500">Total Hours</div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="space-y-2">
          {filteredData.map((employee) => (
            <div key={employee.empNo} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Employee Header */}
              <div className="bg-gray-50 p-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={employee.avatar} alt={employee.employeeName} />
                    <AvatarFallback>{employee.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg text-gray-900">{employee.employeeName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {employee.empNo}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {employee.department}
                      </span>
                      <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {employee.presentDays} days present
                      </span>
                      <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {employee.totalHours}
                      </span>
                      {employee.lateCount > 0 && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                          {employee.lateCount} late
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Export Data</DropdownMenuItem>
                      <DropdownMenuItem>Send Notification</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRowExpansion(employee.empNo)}
                  >
                    {expandedRows.has(employee.empNo) ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </Button>
                </div>
              </div>

              {/* Expanded Punching Data */}
              {expandedRows.has(employee.empNo) && (
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {days.slice(0, 21).map(day => {
                      const punches = employee.dailyPunches[day];
                      const status = getDayStatus(punches);
                      const punchPairs = formatPunchTime(punches || []);
                      
                      return (
                        <div key={day} className="border border-gray-200 rounded-lg p-3 min-h-[120px]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm text-gray-700">{day}</span>
                            <Badge className={cn("text-xs px-2 py-0.5", getStatusColor(status))}>
                              {status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {punchPairs.length > 0 ? punchPairs.map((pair, index) => (
                              <div key={index} className="bg-gray-50 rounded p-2">
                                <div className="text-xs text-green-600 font-medium">
                                  IN: {pair.checkIn}
                                </div>
                                {pair.checkOut && (
                                  <div className="text-xs text-red-600 font-medium">
                                    OUT: {pair.checkOut}
                                  </div>
                                )}
                              </div>
                            )) : (
                              <div className="text-xs text-gray-400 text-center py-2">
                                No punches
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {days.length > 21 && (
                    <div className="grid grid-cols-7 gap-2">
                      {days.slice(21).map(day => {
                        const punches = employee.dailyPunches[day];
                        const status = getDayStatus(punches);
                        const punchPairs = formatPunchTime(punches || []);
                        
                        return (
                          <div key={day} className="border border-gray-200 rounded-lg p-3 min-h-[120px]">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-sm text-gray-700">{day}</span>
                              <Badge className={cn("text-xs px-2 py-0.5", getStatusColor(status))}>
                                {status}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              {punchPairs.length > 0 ? punchPairs.map((pair, index) => (
                                <div key={index} className="bg-gray-50 rounded p-2">
                                  <div className="text-xs text-green-600 font-medium">
                                    IN: {pair.checkIn}
                                  </div>
                                  {pair.checkOut && (
                                    <div className="text-xs text-red-600 font-medium">
                                      OUT: {pair.checkOut}
                                    </div>
                                  )}
                                </div>
                              )) : (
                                <div className="text-xs text-gray-400 text-center py-2">
                                  No punches
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendancePunchingLog;
