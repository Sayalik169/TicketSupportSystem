import { createSlice } from '@reduxjs/toolkit';

const initialState = 
   [];


const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    createTicketSuccess(state, action) {
      
      state.push(action.payload);
      console.log('msg**', action.payload);
    },
    updateTicket(state, action) {

      const updatedTicketIndex = state.findIndex(ticket => ticket.id === action.payload.id);
      console.log('reducer- updateticket- ', updatedTicketIndex);
      if (updatedTicketIndex !== -1) {
        state[updatedTicketIndex] = { ...state[updatedTicketIndex], ...action.payload.updates };
      }
    },
    deleteTicket(state, action) {
      console.log('deleting');
      state = state.filter(ticket => ticket.id !== action.payload.id);
    },
  },
});

export const { createTicketSuccess, updateTicket, deleteTicket } = ticketSlice.actions;
export default ticketSlice.reducer;