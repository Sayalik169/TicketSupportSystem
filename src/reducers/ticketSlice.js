// Assuming this file is part of your ticket reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    techSupportTickets: [ // Assuming a specific 'techSupportTickets' property
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
      // No reducers needed for this scenario (assuming no ticket creation/update/deletion)
    },
  });
  
  export default ticketSlice.reducer;
  