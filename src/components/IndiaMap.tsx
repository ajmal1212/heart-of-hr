
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, MapPin, Building2, Users } from 'lucide-react';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
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
  coordinates: [number, number]; // [lat, lng]
  employees: number;
  departments: string[];
  roles: string[];
}

interface IndiaMapProps {
  branches: Branch[];
  onBranchSelect: (branch: Branch) => void;
  selectedBranch: Branch | null;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ branches, onBranchSelect, selectedBranch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [map, setMap] = useState<any>(null);

  // Custom marker icon
  const branchIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const selectedBranchIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#3b82f6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `),
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBranchClick = (branch: Branch) => {
    onBranchSelect(branch);
    if (map) {
      map.setView(branch.coordinates, 10);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search branches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Map Container */}
      <div className="h-[500px] w-full rounded-lg overflow-hidden border">
        <MapContainer
          center={[20.5937, 78.9629]} // Center of India
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredBranches.map((branch) => (
            <Marker
              key={branch.id}
              position={branch.coordinates}
              icon={selectedBranch?.id === branch.id ? selectedBranchIcon : branchIcon}
              eventHandlers={{
                click: () => handleBranchClick(branch),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">{branch.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {branch.city}, {branch.state}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">{branch.address}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">{branch.employees} Employees</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Departments:</p>
                      <div className="flex flex-wrap gap-1">
                        {branch.departments.slice(0, 3).map((dept) => (
                          <Badge key={dept} variant="secondary" className="text-xs">
                            {dept}
                          </Badge>
                        ))}
                        {branch.departments.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{branch.departments.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => onBranchSelect(branch)}
                  >
                    View Details
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Branch List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBranches.map((branch) => (
          <Card 
            key={branch.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedBranch?.id === branch.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleBranchClick(branch)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">{branch.name}</h4>
                    <p className="text-xs text-gray-600">{branch.city}, {branch.state}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {branch.employees} emp
                </Badge>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  <span>{branch.departments.length} Departments</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{branch.roles.length} Roles</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndiaMap;
