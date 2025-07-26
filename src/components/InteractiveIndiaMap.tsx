
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Search, ZoomIn, ZoomOut, RotateCcw, MapPin, Building2, Users } from 'lucide-react';

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

// Custom icon for branch markers
const createBranchIcon = (employeeCount: number) => {
  return L.divIcon({
    className: 'custom-branch-marker',
    html: `
      <div class="relative">
        <div class="w-8 h-8 bg-red-500 border-2 border-white rounded-full shadow-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white rounded-full flex items-center justify-center">
          <span class="text-xs font-bold text-white">${employeeCount}</span>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

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

  useEffect(() => {
    // Add custom CSS for markers
    const style = document.createElement('style');
    style.textContent = `
      .custom-branch-marker {
        background: transparent !important;
        border: none !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      }
      .leaflet-popup-content {
        margin: 0;
        padding: 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
        
        {/* Search Bar */}
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
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {branches.map((branch) => (
              <Marker
                key={branch.id}
                position={[branch.coordinates.lat, branch.coordinates.lng]}
                icon={createBranchIcon(branch.employees)}
                eventHandlers={{
                  click: () => onBranchSelect(branch),
                }}
              >
                <Popup closeButton={false} className="branch-popup">
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
          
          {/* External Map Controls */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            <Button size="icon" variant="outline" className="bg-white shadow-lg">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" className="bg-white shadow-lg">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline" className="bg-white shadow-lg">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveIndiaMap;
