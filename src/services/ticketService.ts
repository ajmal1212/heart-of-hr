import { Ticket } from '../types';

const TICKETS_STORAGE_KEY = 'gopocket_tickets';

export const ticketService = {
  // Get all tickets from localStorage
  getTickets: (): Ticket[] => {
    try {
      const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading tickets:', error);
      return [];
    }
  },

  // Save tickets to localStorage
  saveTickets: (tickets: Ticket[]): void => {
    try {
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
    } catch (error) {
      console.error('Error saving tickets:', error);
    }
  },

  // Create a new ticket
  createTicket: (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Ticket => {
    const tickets = ticketService.getTickets();
    const newTicket: Ticket = {
      ...ticketData,
      id: `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tickets.push(newTicket);
    ticketService.saveTickets(tickets);
    return newTicket;
  },

  // Update a ticket
  updateTicket: (id: string, updates: Partial<Ticket>): Ticket | null => {
    const tickets = ticketService.getTickets();
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return null;

    tickets[index] = {
      ...tickets[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.status === 'resolved' || updates.status === 'closed') {
      tickets[index].resolvedAt = new Date().toISOString();
    }

    ticketService.saveTickets(tickets);
    return tickets[index];
  },

  // Delete a ticket
  deleteTicket: (id: string): boolean => {
    const tickets = ticketService.getTickets();
    const filtered = tickets.filter(t => t.id !== id);
    if (filtered.length === tickets.length) return false;
    ticketService.saveTickets(filtered);
    return true;
  },

  // Get ticket by ID
  getTicketById: (id: string): Ticket | null => {
    const tickets = ticketService.getTickets();
    return tickets.find(t => t.id === id) || null;
  },
};
