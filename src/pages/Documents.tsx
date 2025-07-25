
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  FolderOpen,
  Download,
  Share,
  Eye,
  Edit,
  Trash2,
  Star,
  Calendar,
  User,
  File,
  Image,
  FileVideo,
  Archive
} from 'lucide-react';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documentStats = [
    { label: 'Total Documents', value: 1248, icon: FileText, color: 'text-blue-600' },
    { label: 'Folders', value: 24, icon: FolderOpen, color: 'text-purple-600' },
    { label: 'Shared', value: 89, icon: Share, color: 'text-green-600' },
    { label: 'Recent', value: 15, icon: Calendar, color: 'text-yellow-600' }
  ];

  const folders = [
    { id: 1, name: 'Employee Contracts', count: 156, color: 'bg-blue-100 text-blue-800' },
    { id: 2, name: 'HR Policies', count: 23, color: 'bg-green-100 text-green-800' },
    { id: 3, name: 'Performance Reviews', count: 89, color: 'bg-purple-100 text-purple-800' },
    { id: 4, name: 'Training Materials', count: 45, color: 'bg-yellow-100 text-yellow-800' },
    { id: 5, name: 'Payroll Documents', count: 234, color: 'bg-red-100 text-red-800' },
    { id: 6, name: 'Compliance', count: 67, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const documents = [
    {
      id: 1,
      name: 'Employee Handbook 2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2024-01-15',
      modifiedBy: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      folder: 'HR Policies',
      starred: true,
      shared: true
    },
    {
      id: 2,
      name: 'Performance Review Template.docx',
      type: 'doc',
      size: '1.2 MB',
      modified: '2024-01-20',
      modifiedBy: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      folder: 'Performance Reviews',
      starred: false,
      shared: false
    },
    {
      id: 3,
      name: 'Training Video - Onboarding.mp4',
      type: 'video',
      size: '45.8 MB',
      modified: '2024-01-10',
      modifiedBy: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      folder: 'Training Materials',
      starred: false,
      shared: true
    },
    {
      id: 4,
      name: 'Payroll Summary Q1 2024.xlsx',
      type: 'excel',
      size: '3.1 MB',
      modified: '2024-01-25',
      modifiedBy: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      folder: 'Payroll Documents',
      starred: true,
      shared: false
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'excel': return <FileText className="w-5 h-5 text-green-500" />;
      case 'video': return <FileVideo className="w-5 h-5 text-purple-500" />;
      case 'image': return <Image className="w-5 h-5 text-pink-500" />;
      case 'archive': return <Archive className="w-5 h-5 text-gray-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-500 mt-1">Organize and manage all your HR documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FolderOpen className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {documentStats.map((stat, index) => (
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

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {folders.map((folder) => (
                <div key={folder.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">{folder.name}</p>
                      <p className="text-xs text-gray-500">{folder.count} files</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documents</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Recent
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    Starred
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Files</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4 mt-4">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(doc.type)}
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                                  {doc.starred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
                                  {doc.shared && <Share className="w-4 h-4 text-blue-500" />}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                  <span>{doc.folder}</span>
                                  <span>{doc.size}</span>
                                  <span>Modified {new Date(doc.modified).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={doc.avatar} alt={doc.modifiedBy} />
                                <AvatarFallback>{doc.modifiedBy.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-500">{doc.modifiedBy}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="shared" className="space-y-4 mt-4">
                  {documents.filter(doc => doc.shared).map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          {getFileIcon(doc.type)}
                          <div>
                            <h3 className="font-medium text-gray-900">{doc.name}</h3>
                            <p className="text-sm text-gray-500">{doc.folder} • {doc.size}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="starred" className="space-y-4 mt-4">
                  {documents.filter(doc => doc.starred).map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          {getFileIcon(doc.type)}
                          <div>
                            <h3 className="font-medium text-gray-900">{doc.name}</h3>
                            <p className="text-sm text-gray-500">{doc.folder} • {doc.size}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="recent" className="space-y-4 mt-4">
                  {documents.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime()).map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          {getFileIcon(doc.type)}
                          <div>
                            <h3 className="font-medium text-gray-900">{doc.name}</h3>
                            <p className="text-sm text-gray-500">Modified {new Date(doc.modified).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documents;
