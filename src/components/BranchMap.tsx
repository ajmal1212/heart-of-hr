
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

interface Branch {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  coordinates: { x: number; y: number };
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
      coordinates: { x: 280, y: 120 },
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
      coordinates: { x: 220, y: 280 },
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
      coordinates: { x: 260, y: 350 },
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

  const handleCreateBranch = (data: any) => {
    const newBranch: Branch = {
      id: Date.now().toString(),
      name: data.name,
      city: data.city,
      state: data.state,
      address: data.address,
      coordinates: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
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
            <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border" style={{ height: '500px' }}>
              {/* Improved India Map */}
              <svg 
                viewBox="0 0 400 300" 
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* India outline - more detailed path */}
                <path
                  d="M120,80 Q140,60 170,65 Q200,55 230,70 Q260,60 290,80 Q310,100 300,140 Q290,180 270,220 Q250,250 220,260 Q190,270 160,255 Q130,240 115,200 Q100,160 110,120 Q115,100 120,80 Z"
                  fill="#e0f7fa"
                  stroke="#0277bd"
                  strokeWidth="2"
                  className="drop-shadow-sm"
                />
                
                {/* Kashmir region */}
                <path
                  d="M170,65 Q180,50 200,55 Q220,50 230,70"
                  fill="#e0f7fa"
                  stroke="#0277bd"
                  strokeWidth="2"
                />
                
                {/* Northeast states */}
                <path
                  d="M290,80 Q320,85 330,100 Q325,115 300,120 Q290,110 290,80"
                  fill="#e0f7fa"
                  stroke="#0277bd"
                  strokeWidth="2"
                />
                
                {/* Western coastline detail */}
                <path
                  d="M115,200 Q110,220 120,240 Q130,245 135,230 Q125,215 115,200"
                  fill="#e0f7fa"
                  stroke="#0277bd"
                  strokeWidth="2"
                />
                
                {/* Branch markers */}
                {branches.map((branch) => (
                  <g key={branch.id}>
                    {/* Marker shadow */}
                    <circle
                      cx={branch.coordinates.x + 2}
                      cy={branch.coordinates.y + 2}
                      r="8"
                      fill="rgba(0,0,0,0.2)"
                    />
                    {/* Main marker */}
                    <circle
                      cx={branch.coordinates.x}
                      cy={branch.coordinates.y}
                      r="8"
                      fill="#ef4444"
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-10 transition-all animate-pulse"
                      onClick={() => setSelectedBranch(branch)}
                    />
                    {/* City label */}
                    <text
                      x={branch.coordinates.x}
                      y={branch.coordinates.y - 15}
                      fontSize="12"
                      textAnchor="middle"
                      fill="#1f2937"
                      className="font-semibold pointer-events-none"
                    >
                      {branch.city}
                    </text>
                    {/* Employee count badge */}
                    <circle
                      cx={branch.coordinates.x + 12}
                      cy={branch.coordinates.y - 8}
                      r="8"
                      fill="#3b82f6"
                      stroke="white"
                      strokeWidth="1"
                    />
                    <text
                      x={branch.coordinates.x + 12}
                      y={branch.coordinates.y - 5}
                      fontSize="10"
                      textAnchor="middle"
                      fill="white"
                      className="font-bold pointer-events-none"
                    >
                      {branch.employees}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
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

      {/* Branch Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <Card 
            key={branch.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedBranch(branch)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{branch.name}</h3>
                  <p className="text-sm text-gray-600">{branch.city}, {branch.state}</p>
                </div>
                <Badge variant="secondary">{branch.employees} emp</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Departments: </span>
                  <span className="text-gray-600">{branch.departments.length}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Roles: </span>
                  <span className="text-gray-600">{branch.roles.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BranchMap;
