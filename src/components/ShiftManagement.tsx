
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { useForm } from 'react-hook-form';
import { Plus, Clock, Users, Edit, Trash2, Sun, Moon, Sunrise, Sunset } from 'lucide-react';

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakDuration: number; // in minutes
  employees: number;
  departments: string[];
  type: 'day' | 'night' | 'evening' | 'morning';
  isActive: boolean;
}

const ShiftManagement = () => {
  const [shifts, setShifts] = useState<Shift[]>([
    {
      id: '1',
      name: 'General Shift',
      startTime: '09:00',
      endTime: '18:00',
      breakDuration: 60,
      employees: 120,
      departments: ['HR', 'Finance', 'Marketing'],
      type: 'day',
      isActive: true
    },
    {
      id: '2',
      name: 'Morning Shift',
      startTime: '06:00',
      endTime: '15:00',
      breakDuration: 45,
      employees: 45,
      departments: ['Operations', 'Security'],
      type: 'morning',
      isActive: true
    },
    {
      id: '3',
      name: 'Evening Shift',
      startTime: '15:00',
      endTime: '00:00',
      breakDuration: 60,
      employees: 35,
      departments: ['IT', 'Support'],
      type: 'evening',
      isActive: true
    },
    {
      id: '4',
      name: 'Night Shift',
      startTime: '22:00',
      endTime: '07:00',
      breakDuration: 45,
      employees: 20,
      departments: ['IT', 'Security'],
      type: 'night',
      isActive: true
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const form = useForm();

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

  const calculateShiftDuration = (startTime: string, endTime: string): string => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    let startMinutes = startHour * 60 + startMin;
    let endMinutes = endHour * 60 + endMin;
    
    // Handle overnight shifts
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }
    
    const totalMinutes = endMinutes - startMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
  };

  const handleCreateShift = (data: any) => {
    const newShift: Shift = {
      id: Date.now().toString(),
      name: data.name,
      startTime: data.startTime,
      endTime: data.endTime,
      breakDuration: parseInt(data.breakDuration) || 0,
      employees: 0,
      departments: data.departments || [],
      type: data.type || 'day',
      isActive: true
    };
    
    setShifts([...shifts, newShift]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleEditShift = (shift: Shift) => {
    setEditingShift(shift);
    form.reset({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime,
      breakDuration: shift.breakDuration,
      type: shift.type
    });
    setIsCreateDialogOpen(true);
  };

  const handleDeleteShift = (shiftId: string) => {
    setShifts(shifts.filter(shift => shift.id !== shiftId));
  };

  const toggleShiftStatus = (shiftId: string) => {
    setShifts(shifts.map(shift => 
      shift.id === shiftId ? { ...shift, isActive: !shift.isActive } : shift
    ));
  };

  const totalEmployees = shifts.reduce((total, shift) => total + shift.employees, 0);
  const activeShifts = shifts.filter(shift => shift.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shift Management</h2>
          <p className="text-gray-600">Manage work shifts and timings across your organization</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Shift
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingShift ? 'Edit Shift' : 'Create New Shift'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateShift)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift Name</FormLabel>
                      <FormControl>
                        <Input placeholder="General Shift" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="breakDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Break Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="60" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shift Type</FormLabel>
                      <FormControl>
                        <select className="w-full p-2 border rounded-md" {...field}>
                          <option value="morning">Morning</option>
                          <option value="day">Day</option>
                          <option value="evening">Evening</option>
                          <option value="night">Night</option>
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setIsCreateDialogOpen(false);
                    setEditingShift(null);
                    form.reset();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingShift ? 'Update' : 'Create'} Shift
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Shifts</p>
                <p className="text-2xl font-bold">{shifts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Active Shifts</p>
                <p className="text-2xl font-bold">{activeShifts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Night Shifts</p>
                <p className="text-2xl font-bold">{shifts.filter(s => s.type === 'night').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map((shift) => (
          <Card key={shift.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  {getShiftIcon(shift.type)}
                  {shift.name}
                </CardTitle>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEditShift(shift)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteShift(shift.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getShiftTypeColor(shift.type)}>
                    {shift.type.charAt(0).toUpperCase() + shift.type.slice(1)}
                  </Badge>
                  <Badge variant={shift.isActive ? "default" : "secondary"}>
                    {shift.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">
                      {calculateShiftDuration(shift.startTime, shift.endTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timing:</span>
                    <span className="font-medium">{shift.startTime} - {shift.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Break:</span>
                    <span className="font-medium">{shift.breakDuration}min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees:</span>
                    <span className="font-medium">{shift.employees}</span>
                  </div>
                </div>

                {shift.departments.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Departments:</p>
                    <div className="flex flex-wrap gap-1">
                      {shift.departments.map((dept) => (
                        <Badge key={dept} variant="outline" className="text-xs">
                          {dept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => toggleShiftStatus(shift.id)}
                >
                  {shift.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShiftManagement;
