
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useForm } from 'react-hook-form';
import { Plus, MapPin, Users, Building2, Briefcase } from 'lucide-react';
import IndiaMap from './IndiaMap';

interface Branch {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  coordinates: [number, number]; // [lat, lng]
  employees: number;
  departments: string[];
  roles: string[];
}

const BranchMap = () => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      name: 'Delhi Head Office',
      city: 'New Delhi',
      state: 'Delhi',
      address: 'Connaught Place, New Delhi',
      coordinates: [28.6139, 77.2090],
      employees: 150,
      departments: ['HR', 'Finance', 'IT', 'Marketing'],
      roles: ['CEO', 'VP', 'Manager', 'Executive']
    },
    {
      id: '2',
      name: 'Mumbai Branch',
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'Bandra Kurla Complex, Mumbai',
      coordinates: [19.0760, 72.8777],
      employees: 80,
      departments: ['Sales', 'Marketing', 'Operations'],
      roles: ['Regional Head', 'Manager', 'Executive', 'Associate']
    },
    {
      id: '3',
      name: 'Bangalore Branch',
      city: 'Bangalore',
      state: 'Karnataka',
      address: 'Electronic City, Bangalore',
      coordinates: [12.9716, 77.5946],
      employees: 120,
      departments: ['Engineering', 'Product', 'QA'],
      roles: ['Tech Lead', 'Senior Developer', 'Developer', 'Intern']
    }
  ]);

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const form = useForm();

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const commonDepartments = [
    'HR', 'Finance', 'IT', 'Marketing', 'Sales', 'Operations', 
    'Engineering', 'Product', 'QA', 'Legal', 'Admin'
  ];

  const commonRoles = [
    'CEO', 'VP', 'Director', 'Manager', 'Team Lead', 'Senior Executive',
    'Executive', 'Associate', 'Intern'
  ];

  // City coordinates for major Indian cities
  const getCityCoordinates = (city: string, state: string): [number, number] => {
    const cityCoords: { [key: string]: [number, number] } = {
      'Delhi': [28.6139, 77.2090],
      'Mumbai': [19.0760, 72.8777],
      'Bangalore': [12.9716, 77.5946],
      'Chennai': [13.0827, 80.2707],
      'Kolkata': [22.5726, 88.3639],
      'Hyderabad': [17.3850, 78.4867],
      'Pune': [18.5204, 73.8567],
      'Ahmedabad': [23.0225, 72.5714],
      'Jaipur': [26.9124, 75.7873],
      'Lucknow': [26.8467, 80.9462],
    };
    
    return cityCoords[city] || [20.5937, 78.9629]; // Default to center of India
  };

  const handleCreateBranch = (data: any) => {
    const newBranch: Branch = {
      id: Date.now().toString(),
      name: data.name,
      city: data.city,
      state: data.state,
      address: data.address,
      coordinates: getCityCoordinates(data.city, data.state),
      employees: 0,
      departments: data.departments || [],
      roles: data.roles || []
    };
    
    setBranches([...branches, newBranch]);
    setIsCreateDialogOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Branch Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Branch Network</h2>
          <p className="text-gray-600">Manage your organization's branches across India</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Branch</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateBranch)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Mumbai Branch" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Mumbai" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Complete address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="departments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departments</FormLabel>
                        <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[100px] bg-gray-50">
                          {commonDepartments.map((dept) => (
                            <Badge 
                              key={dept} 
                              variant="outline" 
                              className="cursor-pointer hover:bg-blue-50"
                              onClick={() => {
                                const current = field.value || [];
                                const updated = current.includes(dept) 
                                  ? current.filter((d: string) => d !== dept)
                                  : [...current, dept];
                                field.onChange(updated);
                              }}
                            >
                              {dept}
                              {(field.value || []).includes(dept) && ' ✓'}
                            </Badge>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roles</FormLabel>
                        <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[100px] bg-gray-50">
                          {commonRoles.map((role) => (
                            <Badge 
                              key={role} 
                              variant="outline" 
                              className="cursor-pointer hover:bg-green-50"
                              onClick={() => {
                                const current = field.value || [];
                                const updated = current.includes(role) 
                                  ? current.filter((r: string) => r !== role)
                                  : [...current, role];
                                field.onChange(updated);
                              }}
                            >
                              {role}
                              {(field.value || []).includes(role) && ' ✓'}
                            </Badge>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Branch</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* India Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Branch Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <IndiaMap 
              branches={branches}
              onBranchSelect={setSelectedBranch}
              selectedBranch={selectedBranch}
            />
          </CardContent>
        </Card>

        {/* Branch Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Branch Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBranch ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedBranch.name}</h3>
                  <p className="text-sm text-gray-600">{selectedBranch.city}, {selectedBranch.state}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedBranch.address}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{selectedBranch.employees} Employees</span>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Departments
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedBranch.departments.map((dept) => (
                      <Badge key={dept} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Roles
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedBranch.roles.map((role) => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Click on a branch marker to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BranchMap;
