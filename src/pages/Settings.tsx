
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  Settings as SettingsIcon, 
  Building, 
  Users, 
  Shield, 
  Bell,
  Palette,
  Globe,
  Key,
  Database,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Save,
  Upload,
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { company, user } = useAuth();
  const [activeTab, setActiveTab] = useState('company');

  const settingsCategories = [
    { id: 'company', label: 'Company', icon: Building },
    { id: 'users', label: 'Users & Roles', icon: Users },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'api', label: 'API & Webhooks', icon: Key },
    { id: 'backup', label: 'Backup & Data', icon: Database }
  ];

  const notifications = [
    { id: 'email_new_employee', label: 'New Employee Registration', email: true, push: true },
    { id: 'email_leave_requests', label: 'Leave Requests', email: true, push: false },
    { id: 'email_payroll', label: 'Payroll Updates', email: false, push: true },
    { id: 'email_performance', label: 'Performance Reviews', email: true, push: true },
    { id: 'email_announcements', label: 'Company Announcements', email: true, push: false }
  ];

  const roles = [
    { id: 'admin', name: 'Admin', users: 3, permissions: ['All permissions'] },
    { id: 'hr', name: 'HR Manager', users: 8, permissions: ['Employee Management', 'Payroll', 'Recruitment'] },
    { id: 'manager', name: 'Manager', users: 24, permissions: ['Team Management', 'Performance', 'Attendance'] },
    { id: 'employee', name: 'Employee', users: 156, permissions: ['Self Service', 'Leave Requests', 'Timesheet'] }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your HRMS configuration and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Settings
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {settingsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-colors ${
                    activeTab === category.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                {/* Company Settings */}
                <TabsContent value="company" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="company-name">Company Name</Label>
                          <Input id="company-name" defaultValue={company?.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-email">Email</Label>
                          <Input id="company-email" defaultValue={company?.email} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-phone">Phone</Label>
                          <Input id="company-phone" defaultValue={company?.phone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-website">Website</Label>
                          <Input id="company-website" defaultValue={company?.website} />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="company-address">Address</Label>
                          <Input id="company-address" defaultValue={company?.address} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-timezone">Timezone</Label>
                          <Input id="company-timezone" defaultValue={company?.timezone} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-currency">Currency</Label>
                          <Input id="company-currency" defaultValue={company?.currency} />
                        </div>
                        <div className="space-y-2">
                          <Label>Company Logo</Label>
                          <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={company?.logo} alt={company?.name} />
                              <AvatarFallback>{company?.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Logo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Subscription</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Current Plan</p>
                        <p className="text-xl font-bold text-blue-600">{company?.subscriptionPlan}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="text-xl font-bold text-green-600">{company?.subscriptionStatus}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600">Next Billing</p>
                        <p className="text-xl font-bold text-purple-600">Feb 15, 2024</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Users & Roles */}
                <TabsContent value="users" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">User Roles</h3>
                    <div className="space-y-4">
                      {roles.map((role) => (
                        <Card key={role.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{role.name}</h4>
                                <p className="text-sm text-gray-500">{role.users} users</p>
                                <div className="flex gap-2 mt-2">
                                  {role.permissions.map((permission, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                      {permission}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="outline" size="sm">Users</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Require 2FA for all users</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Password Policy</p>
                          <p className="text-sm text-gray-500">Enforce strong passwords</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Session Timeout</p>
                          <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Audit Logs</p>
                          <p className="text-sm text-gray-500">Track all user actions</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{notification.label}</p>
                            <p className="text-sm text-gray-500">Configure notification settings</p>
                          </div>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <Switch defaultChecked={notification.email} />
                            </div>
                            <div className="flex items-center gap-2">
                              <Bell className="w-4 h-4" />
                              <Switch defaultChecked={notification.push} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Appearance */}
                <TabsContent value="appearance" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Appearance Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-500">Enable dark theme</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Compact Layout</p>
                          <p className="text-sm text-gray-500">Use compact interface</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <div className="flex gap-2">
                          {['blue', 'green', 'purple', 'red', 'yellow'].map((color) => (
                            <div
                              key={color}
                              className={`w-8 h-8 rounded bg-${color}-500 cursor-pointer border-2 border-transparent hover:border-gray-300`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Integrations */}
                <TabsContent value="integrations" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Third-party Integrations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Google Workspace</h4>
                              <p className="text-sm text-gray-500">Connect Google accounts</p>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Slack</h4>
                              <p className="text-sm text-gray-500">Team communication</p>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Stripe</h4>
                              <p className="text-sm text-gray-500">Payment processing</p>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Zoom</h4>
                              <p className="text-sm text-gray-500">Video conferencing</p>
                            </div>
                            <Button variant="outline" size="sm">Connect</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* API & Webhooks */}
                <TabsContent value="api" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">API Keys</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Production API Key</p>
                          <p className="text-sm text-gray-500 font-mono">pk_live_1234567890</p>
                        </div>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Development API Key</p>
                          <p className="text-sm text-gray-500 font-mono">pk_test_0987654321</p>
                        </div>
                        <Button variant="outline" size="sm">Regenerate</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Webhooks</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input id="webhook-url" placeholder="https://your-app.com/webhook" />
                      </div>
                      <div className="space-y-2">
                        <Label>Events</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="employee-created" />
                            <label htmlFor="employee-created">Employee Created</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="leave-requested" />
                            <label htmlFor="leave-requested">Leave Requested</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="payroll-processed" />
                            <label htmlFor="payroll-processed">Payroll Processed</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Backup & Data */}
                <TabsContent value="backup" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Data Backup</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Automatic Backups</p>
                          <p className="text-sm text-gray-500">Daily automated backups</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label>Backup Frequency</Label>
                        <select className="w-full p-2 border rounded">
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label>Retention Period</Label>
                        <select className="w-full p-2 border rounded">
                          <option>30 days</option>
                          <option>90 days</option>
                          <option>1 year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Data Export</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export All Data
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export Employee Data
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export Payroll Data
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
