
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';

const Analytics = () => {
  const kpiCards = [
    { 
      title: 'Total Employees', 
      value: '1,248', 
      change: '+12%', 
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    { 
      title: 'Employee Turnover', 
      value: '8.2%', 
      change: '-2.1%', 
      trend: 'down',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    { 
      title: 'Avg. Salary', 
      value: '$62,500', 
      change: '+5.2%', 
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    { 
      title: 'Attendance Rate', 
      value: '94.5%', 
      change: '+1.8%', 
      trend: 'up',
      icon: Calendar,
      color: 'text-yellow-600'
    }
  ];

  const departmentData = [
    { name: 'Engineering', employees: 345, budget: 2100000, performance: 92 },
    { name: 'Sales', employees: 189, budget: 1200000, performance: 88 },
    { name: 'Marketing', employees: 156, budget: 800000, performance: 85 },
    { name: 'HR', employees: 89, budget: 600000, performance: 90 },
    { name: 'Finance', employees: 67, budget: 450000, performance: 89 },
    { name: 'Operations', employees: 123, budget: 750000, performance: 86 }
  ];

  const monthlyData = [
    { month: 'Jan', hires: 23, terminations: 8, attendance: 94 },
    { month: 'Feb', hires: 18, terminations: 12, attendance: 92 },
    { month: 'Mar', hires: 31, terminations: 15, attendance: 95 },
    { month: 'Apr', hires: 25, terminations: 9, attendance: 93 },
    { month: 'May', hires: 28, terminations: 11, attendance: 96 },
    { month: 'Jun', hires: 22, terminations: 7, attendance: 94 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 mt-1">Insights and metrics for data-driven HR decisions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${kpi.color}`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workforce">Workforce</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Monthly Hiring Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyData.map((month, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{month.month}</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm">Hires: {month.hires}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-sm">Exits: {month.terminations}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Department Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentData.map((dept, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{dept.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(dept.employees / 1248) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500">{dept.employees}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workforce" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workforce Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Department</th>
                          <th className="text-left p-3">Employees</th>
                          <th className="text-left p-3">Avg. Tenure</th>
                          <th className="text-left p-3">Turnover Rate</th>
                          <th className="text-left p-3">Satisfaction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departmentData.map((dept, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium">{dept.name}</td>
                            <td className="p-3">{dept.employees}</td>
                            <td className="p-3">2.3 years</td>
                            <td className="p-3">
                              <span className="text-green-600">6.2%</span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${dept.performance}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{dept.performance}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Rating</span>
                      <span className="font-medium">4.2/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Goals Completion</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Review Completion</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Training Completion</span>
                      <span className="font-medium">85%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: 'John Doe', dept: 'Engineering', rating: 4.9 },
                      { name: 'Jane Smith', dept: 'Marketing', rating: 4.8 },
                      { name: 'Mike Johnson', dept: 'Sales', rating: 4.7 },
                      { name: 'Sarah Wilson', dept: 'HR', rating: 4.6 }
                    ].map((performer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-gray-500">{performer.dept}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full" 
                              style={{ width: `${(performer.rating / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{performer.rating}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Payroll</p>
                      <p className="text-2xl font-bold text-blue-600">$5.9M</p>
                      <p className="text-sm text-green-600">+8.2% from last year</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Benefits Cost</p>
                      <p className="text-2xl font-bold text-green-600">$1.2M</p>
                      <p className="text-sm text-green-600">+5.1% from last year</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Training Budget</p>
                      <p className="text-2xl font-bold text-purple-600">$234K</p>
                      <p className="text-sm text-red-600">-2.3% from last year</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>HR Trends Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Hiring Trends</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Remote Work Preference</span>
                          <span className="text-sm font-medium">↑ 23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Tech Skills Demand</span>
                          <span className="text-sm font-medium">↑ 18%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Average Time to Hire</span>
                          <span className="text-sm font-medium">↓ 12 days</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Retention Insights</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Work-Life Balance Focus</span>
                          <span className="text-sm font-medium">↑ 31%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Career Growth Requests</span>
                          <span className="text-sm font-medium">↑ 25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Exit Interview Sentiment</span>
                          <span className="text-sm font-medium">↑ 15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
