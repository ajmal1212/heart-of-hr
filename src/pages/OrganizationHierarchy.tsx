import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Search, 
  Plus, 
  Edit, 
  Users, 
  Building, 
  Crown,
  Settings,
  Save,
  RotateCcw,
  Maximize2,
  Minimize2,
  MapPin,
  Clock
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Employee } from '../types';
import BranchMap from '../components/BranchMap';
import ShiftManagement from '../components/ShiftManagement';

// Employee Node Component
const EmployeeNode = ({ data }: { data: any }) => {
  const { employee, onEdit, onChangeReporting } = data;
  
  const getRoleColor = (designation: string) => {
    const role = designation.toLowerCase();
    if (role.includes('ceo') || role.includes('president')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (role.includes('director') || role.includes('vp')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (role.includes('manager') || role.includes('head')) return 'bg-green-100 text-green-800 border-green-200';
    if (role.includes('lead') || role.includes('senior')) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px] hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={employee.avatar} alt={employee.firstName} />
            <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900">{employee.firstName} {employee.lastName}</h3>
            <p className="text-sm text-gray-600">{employee.employeeId}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(employee)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Employee
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onChangeReporting(employee)}>
              <Users className="w-4 h-4 mr-2" />
              Change Reporting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="space-y-2">
        <Badge className={getRoleColor(employee.designation)}>
          {employee.designation}
        </Badge>
        <div className="text-sm text-gray-600">
          <p className="flex items-center gap-1">
            <Building className="w-3 h-3" />
            {employee.department}
          </p>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  employee: EmployeeNode,
};

const OrganizationHierarchy = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isReportingDialogOpen, setIsReportingDialogOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const form = useForm();

  // Mock employee data with hierarchy
  const employees: Employee[] = [
    {
      id: '1',
      employeeId: 'EMP001',
      userId: '1',
      companyId: 'acme-corp',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@acme.com',
      phone: '+1 555-0001',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      department: 'Executive',
      designation: 'CEO',
      joiningDate: '2020-01-01',
      salary: 250000,
      status: 'confirmed',
      managerId: undefined,
      address: '123 Main St',
      emergencyContact: { name: 'Jane Smith', phone: '+1 555-0002', relationship: 'Spouse' },
      documents: [],
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2020-01-01T00:00:00Z'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      userId: '2',
      companyId: 'acme-corp',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@acme.com',
      phone: '+1 555-0003',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'VP of Engineering',
      joiningDate: '2020-02-01',
      salary: 180000,
      status: 'confirmed',
      managerId: '1',
      address: '456 Oak Ave',
      emergencyContact: { name: 'Mike Johnson', phone: '+1 555-0004', relationship: 'Spouse' },
      documents: [],
      createdAt: '2020-02-01T00:00:00Z',
      updatedAt: '2020-02-01T00:00:00Z'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      userId: '3',
      companyId: 'acme-corp',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@acme.com',
      phone: '+1 555-0005',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      department: 'Marketing',
      designation: 'VP of Marketing',
      joiningDate: '2020-03-01',
      salary: 160000,
      status: 'confirmed',
      managerId: '1',
      address: '789 Pine St',
      emergencyContact: { name: 'Lisa Brown', phone: '+1 555-0006', relationship: 'Spouse' },
      documents: [],
      createdAt: '2020-03-01T00:00:00Z',
      updatedAt: '2020-03-01T00:00:00Z'
    },
    {
      id: '4',
      employeeId: 'EMP004',
      userId: '4',
      companyId: 'acme-corp',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@acme.com',
      phone: '+1 555-0007',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'Senior Manager',
      joiningDate: '2020-04-01',
      salary: 120000,
      status: 'confirmed',
      managerId: '2',
      address: '321 Elm St',
      emergencyContact: { name: 'David Davis', phone: '+1 555-0008', relationship: 'Spouse' },
      documents: [],
      createdAt: '2020-04-01T00:00:00Z',
      updatedAt: '2020-04-01T00:00:00Z'
    },
    {
      id: '5',
      employeeId: 'EMP005',
      userId: '5',
      companyId: 'acme-corp',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@acme.com',
      phone: '+1 555-0009',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      department: 'Engineering',
      designation: 'Senior Developer',
      joiningDate: '2020-05-01',
      salary: 95000,
      status: 'confirmed',
      managerId: '4',
      address: '654 Maple Ave',
      emergencyContact: { name: 'Maria Wilson', phone: '+1 555-0010', relationship: 'Spouse' },
      documents: [],
      createdAt: '2020-05-01T00:00:00Z',
      updatedAt: '2020-05-01T00:00:00Z'
    },
    {
      id: '6',
      employeeId: 'EMP006',
      userId: '6',
      companyId: 'acme-corp',
      firstName: 'Lisa',
      lastName: 'Martinez',
      email: 'lisa.martinez@acme.com',
      phone: '+1 555-0011',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
      department: 'Marketing',
      designation: 'Marketing Manager',
      joiningDate: '2020-06-01',
      salary: 85000,
      status: 'confirmed',
      managerId: '3',
      address: '987 Cedar St',
      emergencyContact: { name: 'Carlos Martinez', phone: '+1 555-0012', relationship: 'Spouse' },
      documents: [],
      createdAt: '2020-06-01T00:00:00Z',
      updatedAt: '2020-06-01T00:00:00Z'
    }
  ];

  const generateHierarchyLayout = useCallback(() => {
    const employeeMap = new Map(employees.map(emp => [emp.id, emp]));
    const hierarchyLevels: Employee[][] = [];
    
    // Find root (CEO) and build levels
    const findLevel = (employeeId: string, level: number = 0) => {
      const employee = employeeMap.get(employeeId);
      if (!employee) return;
      
      if (!hierarchyLevels[level]) hierarchyLevels[level] = [];
      hierarchyLevels[level].push(employee);
      
      // Find direct reports
      const directReports = employees.filter(emp => emp.managerId === employeeId);
      directReports.forEach(report => findLevel(report.id, level + 1));
    };
    
    // Start with CEO (no manager)
    const ceo = employees.find(emp => !emp.managerId);
    if (ceo) {
      findLevel(ceo.id);
    }
    
    // Generate nodes and edges
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    
    hierarchyLevels.forEach((levelEmployees, level) => {
      levelEmployees.forEach((employee, index) => {
        const x = (index - (levelEmployees.length - 1) / 2) * 350;
        const y = level * 200;
        
        newNodes.push({
          id: employee.id,
          type: 'employee',
          position: { x, y },
          data: {
            employee,
            onEdit: handleEditEmployee,
            onChangeReporting: handleChangeReporting,
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        });
        
        // Create edge to manager
        if (employee.managerId) {
          newEdges.push({
            id: `${employee.managerId}-${employee.id}`,
            source: employee.managerId,
            target: employee.id,
            type: 'smoothstep',
            animated: false,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
          });
        }
      });
    });
    
    setNodes(newNodes);
    setEdges(newEdges);
  }, [employees]);

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleChangeReporting = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsReportingDialogOpen(true);
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSaveChanges = () => {
    // In a real app, this would save to backend
    console.log('Saving hierarchy changes...');
    generateHierarchyLayout();
  };

  const handleResetLayout = () => {
    generateHierarchyLayout();
  };

  useEffect(() => {
    generateHierarchyLayout();
  }, [generateHierarchyLayout]);

  const filteredEmployees = employees.filter(emp => 
    emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Employees', value: employees.length, icon: Users, color: 'text-blue-600' },
    { label: 'Departments', value: new Set(employees.map(e => e.department)).size, icon: Building, color: 'text-green-600' },
    { label: 'Managers', value: employees.filter(e => employees.some(emp => emp.managerId === e.id)).length, icon: Crown, color: 'text-purple-600' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Management</h1>
          <p className="text-gray-500 mt-1">Manage your organization structure, branch network, and shift timings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetLayout}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Layout
          </Button>
          <Button onClick={handleSaveChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={() => setIsFullScreen(!isFullScreen)}>
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Tabs for Hierarchy, Branches, and Shifts */}
      <Tabs defaultValue="hierarchy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hierarchy" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Organization Hierarchy
          </TabsTrigger>
          <TabsTrigger value="branches" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Branch Network
          </TabsTrigger>
          <TabsTrigger value="shifts" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Shift Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hierarchy" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
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

          {/* Search Bar */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees in hierarchy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Hierarchy Flow */}
          <Card className={isFullScreen ? 'fixed inset-0 z-50' : ''}>
            <CardHeader>
              <CardTitle>Organization Chart</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className={`bg-gray-50 ${isFullScreen ? 'h-screen' : 'h-[600px]'}`}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  fitView
                  attributionPosition="bottom-left"
                  className="bg-gray-50"
                >
                  <Background />
                  <Controls />
                  <MiniMap 
                    nodeColor={(node) => '#3b82f6'}
                    maskColor="rgba(255, 255, 255, 0.8)"
                    className="bg-white"
                  />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branches">
          <BranchMap />
        </TabsContent>

        <TabsContent value="shifts">
          <ShiftManagement />
        </TabsContent>
      </Tabs>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.firstName} />
                  <AvatarFallback>{selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
                  <p className="text-sm text-gray-600">{selectedEmployee.designation}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <p className="text-sm text-gray-900">{selectedEmployee.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Employee ID</label>
                  <p className="text-sm text-gray-900">{selectedEmployee.employeeId}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditDialogOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Change Reporting Dialog */}
      <Dialog open={isReportingDialogOpen} onOpenChange={setIsReportingDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Change Reporting Manager</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedEmployee.avatar} alt={selectedEmployee.firstName} />
                  <AvatarFallback>{selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
                  <p className="text-sm text-gray-600">{selectedEmployee.designation}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select New Manager
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select a manager...</option>
                  {employees
                    .filter(emp => emp.id !== selectedEmployee.id)
                    .map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} - {emp.designation}
                      </option>
                    ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsReportingDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsReportingDialogOpen(false)}>
                  Update Reporting
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizationHierarchy;
