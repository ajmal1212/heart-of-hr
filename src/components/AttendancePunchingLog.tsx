
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface PunchingLogEntry {
  empNo: string;
  employeeName: string;
  department: string;
  dailyPunches: { [day: number]: string[] };
}

const AttendancePunchingLog = () => {
  // Generate days of current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Sample data for 3 employees reporting to the logged-in user
  const punchingData: PunchingLogEntry[] = [
    {
      empNo: 'SKY1101',
      employeeName: 'AJMAL',
      department: 'DIGITAL MARKETING',
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

  const formatPunchTime = (punches: string[]) => {
    return punches.map((punch, index) => (
      <div key={index} className="text-xs text-gray-700 leading-tight">
        {punch}
      </div>
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team Punching Log - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardTitle>
          <Badge variant="outline">
            {punchingData.length} employees reporting to you
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">SNO.</TableHead>
                <TableHead className="w-24">EmpNo</TableHead>
                <TableHead className="w-32">Employee Name</TableHead>
                <TableHead className="w-32">Department</TableHead>
                {days.map(day => (
                  <TableHead key={day} className="w-20 text-center">
                    {day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {punchingData.map((employee, index) => (
                <TableRow key={employee.empNo}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{employee.empNo}</TableCell>
                  <TableCell className="font-medium">{employee.employeeName}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  {days.map(day => (
                    <TableCell key={day} className="text-center p-2">
                      {employee.dailyPunches[day] ? (
                        <div className="space-y-1">
                          {formatPunchTime(employee.dailyPunches[day])}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-xs">-</div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendancePunchingLog;
