import React, { useState } from 'react';
import { Ticket } from '../../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Search, ArrowUpDown, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface TicketTableProps {
  tickets: Ticket[];
  onUpdateStatus: (id: string, status: Ticket['status']) => void;
  onViewDetails: (ticket: Ticket) => void;
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets, onUpdateStatus, onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Ticket>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof Ticket) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusBadgeVariant = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'default';
      case 'in-progress': return 'secondary';
      case 'resolved': return 'outline';
      case 'closed': return 'outline';
      default: return 'default';
    }
  };

  const getPriorityBadgeVariant = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'default';
    }
  };

  const filteredAndSortedTickets = tickets
    .filter(ticket => {
      const matchesSearch = 
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-2">
                  Ticket ID
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('title')}>
                <div className="flex items-center gap-2">
                  Title
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-2">
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('priority')}>
                <div className="flex items-center gap-2">
                  Priority
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-2">
                  Category
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                <div className="flex items-center gap-2">
                  Created
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No tickets found
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                  <TableCell className="font-medium max-w-[300px] truncate">{ticket.title}</TableCell>
                  <TableCell>
                    <Select 
                      value={ticket.status} 
                      onValueChange={(value) => onUpdateStatus(ticket.id, value as Ticket['status'])}
                    >
                      <SelectTrigger className="w-[130px]">
                        <Badge variant={getStatusBadgeVariant(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{ticket.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(ticket)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredAndSortedTickets.length} of {tickets.length} tickets
      </div>
    </div>
  );
};

export default TicketTable;
