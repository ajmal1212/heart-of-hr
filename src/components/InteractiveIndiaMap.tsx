
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchSelect = (branch: Branch) => {
    onBranchSelect(branch);
    setSearchTerm('');
    
    // Pan to selected branch
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([branch.coordinates.lat, branch.coordinates.lng], 8);
    }
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    console.log('Initializing map...');
    
    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    console.log('Map initialized successfully');

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    console.log('Adding markers for', branches.length, 'branches');

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for each branch
    branches.forEach(branch => {
      const marker = L.marker([branch.coordinates.lat, branch.coordinates.lng])
        .addTo(mapInstanceRef.current!)
        .on('click', () => {
          console.log('Marker clicked:', branch.name);
          onBranchSelect(branch);
        });

      const popupContent = `
        <div class="p-4 min-w-[280px]">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">${branch.name}</h3>
                <p class="text-sm text-gray-600">${branch.city}, ${branch.state}</p>
              </div>
            </div>
            <span class="ml-2 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              ${branch.employees} emp
            </span>
          </div>
          
          <div class="space-y-2">
            <div class="text-sm">
              <span class="font-medium text-gray-700">Address: </span>
              <span class="text-gray-600">${branch.address}</span>
            </div>
            
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-sm font-medium">${branch.employees} Employees</span>
            </div>
            
            <div>
              <div class="text-sm font-medium text-gray-700 mb-1">Departments:</div>
              <div class="flex flex-wrap gap-1">
                ${branch.departments.slice(0, 3).map(dept => 
                  `<span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">${dept}</span>`
                ).join('')}
                ${branch.departments.length > 3 ? 
                  `<span class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">+${branch.departments.length - 3} more</span>` : 
                  ''
                }
              </div>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    console.log('Added', markersRef.current.length, 'markers');
  }, [branches, onBranchSelect]);

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
          <div
            ref={mapRef}
            className="h-full w-full"
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveIndiaMap;
