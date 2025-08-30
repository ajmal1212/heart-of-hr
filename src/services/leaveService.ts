
import { useAuth } from '../contexts/AuthContext';

export interface LeaveApplicationData {
  type: 'leave' | 'permission' | 'onduty' | 'overtime';
  employeeId: string;
  employeeName: string;
  email: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  fromTime?: string;
  toTime?: string;
  leaveType?: string;
  location?: string;
  reason: string;
  source: string;
}

export const submitLeaveApplication = async (data: LeaveApplicationData, cookies: string) => {
  try {
    const response = await fetch('https://n8n.gopocket.in/webhook/hrms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'hrms_web_app'
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to submit application: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Leave application error:', error);
    throw error;
  }
};
