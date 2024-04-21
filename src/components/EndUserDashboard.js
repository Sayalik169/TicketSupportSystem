import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const EndUserDashboard = () => {
  const user = useSelector(state => state.auth.user);
  const tickets = useSelector(state => state.tickets.endUserTickets);
  const navigate = useNavigate();

  // Check if user is authenticated before rendering the dashboard
  // if (!user) {
  //   return <p>Loading user data...</p>; // Display loading message if user is undefined
  // }

  return (
    <div>
      <h2>Welcome,</h2> Access user data after checking existence
      <h3>Your Tickets:</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>{ticket.title}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/end-user/create-ticket')}>Create New Ticket</button>
    </div>
  );
};

export default EndUserDashboard;
