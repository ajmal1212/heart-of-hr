import React, { useState, useEffect } from 'react';
import { Plus, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import TicketTable from '../components/Ticket/TicketTable';
import TicketDialog from '../components/Ticket/TicketDialog';
import { ticketService } from '../services/ticketService';
import { Ticket } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../hooks/use-toast';
import { format } from 'date-fns';

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const loadedTickets = ticketService.getTickets();
    setTickets(loadedTickets);
  };

  const handleCreateTicket = (data: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTicket = ticketService.createTicket(data);
      setTickets([...tickets, newTicket]);
      toast({
        title: 'Ticket Created',
        description: `Ticket ${newTicket.id} has been created successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create ticket. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateStatus = (id: string, status: Ticket['status']) => {
    try {
      const updated = ticketService.updateTicket(id, { status });
      if (updated) {
        setTickets(tickets.map(t => t.id === id ? updated : t));
        toast({
          title: 'Status Updated',
          description: `Ticket status changed to ${status}.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update ticket status.',
        variant: 'destructive',
      });
    }
  };

  const handleViewDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const getStatusCounts = () => {
    return {
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in-progress').length,
      resolved: tickets.filter(t => t.status === 'resolved').length,
      closed: tickets.filter(t => t.status === 'closed').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <TicketIcon className="h-8 w-8" />
            Support Tickets
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track support tickets
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.open}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.inProgress}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.resolved}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Closed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.closed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>
            View and manage all support tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketTable
            tickets={tickets}
            onUpdateStatus={handleUpdateStatus}
            onViewDetails={handleViewDetails}
          />
        </CardContent>
      </Card>

      {/* Create Ticket Dialog */}
      <TicketDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateTicket}
        currentUser={user?.email || 'Anonymous'}
      />

      {/* View Ticket Details Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>
              {selectedTicket?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedTicket.title}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge>{selectedTicket.status}</Badge>
                  <Badge variant="outline">{selectedTicket.priority}</Badge>
                  <Badge variant="secondary">{selectedTicket.category}</Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
                <p className="text-sm">{selectedTicket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Created by:</span>
                  <p className="font-medium">{selectedTicket.createdBy}</p>
                </div>
                {selectedTicket.assignedTo && (
                  <div>
                    <span className="text-muted-foreground">Assigned to:</span>
                    <p className="font-medium">{selectedTicket.assignedTo}</p>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-medium">
                    {format(new Date(selectedTicket.createdAt), 'PPP')}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Updated:</span>
                  <p className="font-medium">
                    {format(new Date(selectedTicket.updatedAt), 'PPP')}
                  </p>
                </div>
                {selectedTicket.resolvedAt && (
                  <div>
                    <span className="text-muted-foreground">Resolved:</span>
                    <p className="font-medium">
                      {format(new Date(selectedTicket.resolvedAt), 'PPP')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tickets;
