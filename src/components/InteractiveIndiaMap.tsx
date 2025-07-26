
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Search, MapPin, Building2, Users } from 'lucide-react';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Branch {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  coordinates: { lat: number; lng: number };
  employees: number;
  departments: string[];
  roles: string[];
}

interface InteractiveIndiaMapProps {
  branches: Branch[];
  selectedBranch: Branch | null;
  onBranchSelect: (branch: Branch) => void;
}

const InteractiveIndiaMap: React.FC<InteractiveIndiaMapProps> = ({
  branches,
  selectedBranch,
  onBranchSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSelect = (branch: Branch) => {
    onBranchSelect(branch);
    setSearchTerm('');
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Interactive Branch Map
          </CardTitle>
          <Badge variant="secondary">
            {branches.length} Branches
          </Badge>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search branches, cities, or states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          {searchTerm && filteredBranches.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-50 max-h-48 overflow-y-auto">
              {filteredBranches.map((branch) => (
                <div
                  key={branch.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSearchSelect(branch)}
                >
                  <div className="font-medium">{branch.name}</div>
                  <div className="text-sm text-gray-600">{branch.city}, {branch.state}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            attributionControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {branches.map((branch) => (
              <Marker
                key={branch.id}
                position={[branch.coordinates.lat, branch.coordinates.lng]}
                eventHandlers={{
                  click: () => onBranchSelect(branch),
                }}
              >
                <Popup>
                  <div className="p-4 min-w-[280px]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            <Building2 className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">{branch.name}</h3>
                          <p className="text-sm text-gray-600">{branch.city}, {branch.state}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {branch.employees} emp
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Address: </span>
                        <span className="text-gray-600">{branch.address}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">{branch.employees} Employees</span>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Departments:</div>
                        <div className="flex flex-wrap gap-1">
                          {branch.departments.slice(0, 3).map((dept) => (
                            <Badge key={dept} variant="outline" className="text-xs">
                              {dept}
                            </Badge>
                          ))}
                          {branch.departments.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{branch.departments.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveIndiaMap;
