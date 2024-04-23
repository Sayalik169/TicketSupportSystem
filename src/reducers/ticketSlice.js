// Assuming this file is part of your ticket reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    techSupportTickets: [ // Assuming a specific 'techSupportTickets' property
    
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
  