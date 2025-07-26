
import React from 'react';
import AttendancePunchingLog from '../components/AttendancePunchingLog';
import ShiftTeamPunchLog from '../components/ShiftTeamPunchLog';

const Attendance = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Management</h1>
        <p className="text-gray-600">Track and manage employee attendance across shifts</p>
      </div>

      {/* Shift Team Punch Log */}
      <ShiftTeamPunchLog />

      {/* Individual Punching Log */}
      <AttendancePunchingLog />
    </div>
  );
};

export default Attendance;
