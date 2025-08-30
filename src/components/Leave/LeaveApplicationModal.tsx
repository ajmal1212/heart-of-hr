
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { submitLeaveApplication, LeaveApplicationData } from '../../services/leaveService';
import { useToast } from '../ui/use-toast';

interface LeaveApplicationModalProps {
  applicationType: string;
  applicationLabel: string;
  isOpen: boolean;
  onClose: () => void;
}

const LeaveApplicationModal: React.FC<LeaveApplicationModalProps> = ({
  applicationType,
  applicationLabel,
  isOpen,
  onClose
}) => {
  const { employee, cookies } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    setIsSubmitting(true);
    try {
      const applicationData: LeaveApplicationData = {
        type: applicationType as 'leave' | 'permission' | 'onduty' | 'overtime',
        employeeId: employee.employeeId,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        reason: formData.reason || formData.purpose || '',
        source: 'hrms_web_app',
        ...formData
      };

      await submitLeaveApplication(applicationData, cookies);
      
      toast({
        title: "Application Submitted",
        description: `Your ${applicationLabel.toLowerCase()} has been submitted successfully.`,
      });
      
      onClose();
      setFormData({});
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit application",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderForm = () => {
    switch (applicationType) {
      case 'leave':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select onValueChange={(value) => handleInputChange('leaveType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="maternity">Maternity Leave</SelectItem>
                  <SelectItem value="casual">Casual Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  type="date" 
                  id="startDate" 
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  type="date" 
                  id="endDate" 
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea 
                id="reason" 
                placeholder="Please provide reason for leave" 
                onChange={(e) => handleInputChange('reason', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 'permission':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input 
                type="date" 
                id="date" 
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromTime">From Time</Label>
                <Input 
                  type="time" 
                  id="fromTime" 
                  onChange={(e) => handleInputChange('fromTime', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="toTime">To Time</Label>
                <Input 
                  type="time" 
                  id="toTime" 
                  onChange={(e) => handleInputChange('toTime', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea 
                id="reason" 
                placeholder="Please provide reason for permission" 
                onChange={(e) => handleInputChange('reason', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 'onduty':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input 
                type="date" 
                id="date" 
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromTime">From Time</Label>
                <Input 
                  type="time" 
                  id="fromTime" 
                  onChange={(e) => handleInputChange('fromTime', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="toTime">To Time</Label>
                <Input 
                  type="time" 
                  id="toTime" 
                  onChange={(e) => handleInputChange('toTime', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="Enter location" 
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea 
                id="purpose" 
                placeholder="Please provide purpose of on duty" 
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 'overtime':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input 
                type="date" 
                id="date" 
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromTime">From Time</Label>
                <Input 
                  type="time" 
                  id="fromTime" 
                  onChange={(e) => handleInputChange('fromTime', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="toTime">To Time</Label>
                <Input 
                  type="time" 
                  id="toTime" 
                  onChange={(e) => handleInputChange('toTime', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reason">Reason</Label>
              <Textarea 
                id="reason" 
                placeholder="Please provide reason for overtime" 
                onChange={(e) => handleInputChange('reason', e.target.value)}
                required
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{applicationLabel}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {renderForm()}
          
          <div className="flex gap-2 mt-6">
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplicationModal;
