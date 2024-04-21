import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  techSupportTickets: [
    {
      id: 1,
      title: "Issue with application login",
      description: "I am unable to log in to the application using my credentials.",
      createdBy: "John Doe",
      assignedTo: "Tech Support Team",
      status: "Open",
      createdAt: "2024-04-20T10:00:00Z",
      resolvedAt: null,
    },
    {
      id: 2,
      title: "Issue with Network",
      description: "I am unable to log in to the application using my credentials.",
      createdBy: "John Doe",
      assignedTo: "Tech Support Team",
      status: "Open",
      createdAt: "2024-04-20T10:00:00Z",
      resolvedAt: null,
    },{
      id: 3,
      title: "Facing slowness",
      description: "I am unable to log in to the application using my credentials.",
      createdBy: "John Doe",
      assignedTo: "Tech Support Team",
      status: "Open",
      createdAt: "2024-04-20T10:00:00Z",
      resolvedAt: null,
    },{
      id: 4,
      title: "VPN issue",
      description: "I am unable to log in to the application using my credentials.",
      createdBy: "John Doe",
      assignedTo: "Tech Support Team",
      status: "Open",
      createdAt: "2024-04-20T10:00:00Z",
      resolvedAt: null,
    }
  ],
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    createTicketSuccess(state, action) {
      state.tickets.push(action.payload);
    },
    updateTicket(state, action) {
      const updatedTicketIndex = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (updatedTicketIndex !== -1) {
        state.tickets[updatedTicketIndex] = { ...state.tickets[updatedTicketIndex], ...action.payload.updates };
      }
    },
    deleteTicket(state, action) {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload.id);
    },
  },
});

export const { createTicketSuccess, updateTicket, deleteTicket } = ticketSlice.actions;
export default ticketSlice.reducer;