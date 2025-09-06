import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown, Search, Filter, Mail, Phone, MapPin, Users, IndianRupee } from 'lucide-react';
import { LeadData } from '@/services/leadService';
import { format } from 'date-fns';

interface LeadTableProps {
  leads: LeadData[];
}

type SortField = 'full_name' | 'time_stamp' | 'lead_status' | 'insurance_type' | 'insurance_partner';
type SortDirection = 'asc' | 'desc';

const LeadTable: React.FC<LeadTableProps> = ({ leads }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('time_stamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getInsuranceTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'health':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'life':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'term':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const uniqueStatuses = useMemo(() => {
    const statuses = leads.map(lead => lead.lead_status).filter(Boolean);
    return Array.from(new Set(statuses));
  }, [leads]);

  const uniqueTypes = useMemo(() => {
    const types = leads.map(lead => lead.insurance_type).filter(Boolean);
    return Array.from(new Set(types));
  }, [leads]);

  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leads.filter(lead => {
      const matchesSearch = lead.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lead.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || lead.lead_status === statusFilter;
      const matchesType = typeFilter === 'all' || lead.insurance_type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'time_stamp') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = aValue?.toString().toLowerCase() || '';
        bValue = bValue?.toString().toLowerCase() || '';
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [leads, searchTerm, statusFilter, typeFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => handleSort(field)}
      className="h-auto p-0 font-medium text-left justify-start"
    >
      {children}
      <ArrowUpDown className="ml-2 h-3 w-3" />
    </Button>
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground flex items-center">
              Showing {filteredAndSortedLeads.length} of {leads.length} leads
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <SortButton field="full_name">Customer Name</SortButton>
                  </TableHead>
                  <TableHead>
                    <SortButton field="lead_status">Status</SortButton>
                  </TableHead>
                  <TableHead>
                    <SortButton field="insurance_type">Type</SortButton>
                  </TableHead>
                  <TableHead>
                    <SortButton field="insurance_partner">Partner</SortButton>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Sum Insured</TableHead>
                  <TableHead>Family Members</TableHead>
                  <TableHead>
                    <SortButton field="time_stamp">Date</SortButton>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No leads found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedLeads.map((lead) => (
                    <TableRow key={lead.name} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{lead.full_name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {lead.postal_code}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {lead.lead_status && (
                          <Badge className={getStatusColor(lead.lead_status)}>
                            {lead.lead_status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.insurance_type && (
                          <Badge className={getInsuranceTypeColor(lead.insurance_type)}>
                            {lead.insurance_type}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.insurance_partner && (
                          <Badge variant="outline">
                            {lead.insurance_partner}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {lead.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {lead.sum_insured_plan && (
                          <div className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{lead.sum_insured_plan}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {lead.family_members && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{lead.family_members}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{formatDate(lead.time_stamp)}</span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadTable;