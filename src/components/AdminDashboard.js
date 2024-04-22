import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/admindashboard.css';
import { updateTicket } from '../reducers/ticketReducer'; // Import updateTicket action
import {Link} from 'react-router-dom';

const AdminDashboard = () => {
  const tickets = useSelector(state => state.tickets);
  const dispatch = useDispatch();
  const [selectedTicketId, setSelectedTicketId] = useState(null); // Corrected function name

  const handleSelectTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
  };

  // Fetch tickets on component mount (assuming user is already logged in)
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://localhost:7226/api/Values/sample-json-data');
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const fetchedTickets = await response.json();
        console.log('fetch tickets',fetchedTickets);
       dispatch({ type: 'tickets/createTicketsSuccess', payload: fetchedTickets }); // Dispatch a custom action to set tickets
      } catch (error) {
        console.error('Error fetching tickets:', error);
        // Handle error display to user (optional)
      }
    };

    fetchTickets();
  }, []); // Add dispatch as a dependency to ensure effect runs only once

  // Handle potential errors and empty state (optional)
  // if (!tickets) {
  //   return <div>Loading tickets...</div>;
  // }

  // if (tickets.length === 0) {
  //   return <div>No tickets found.</div>;
  // }

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const selectedTicket = tickets.find(ticket => ticket.id === ticketId);

      const response = await fetch(`https://localhost:7226/api/Values/Updateticket`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: ticketId,
          assignedTo: selectedTicket?.assignedTo, // Use optional chaining
          status: newStatus,
          resolvedAt: new Date().toISOString(), // Set resolvedAt to current time
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }

      setSelectedTicketId(null); // Clear selected ticket after successful update
      dispatch(updateTicket({ id: ticketId, updates: { status: newStatus } }));

    } catch (error) {
      console.error('Error updating ticket status:', error);
      // Handle error display to user (optional)
    }
  };

  return (
    <div className="container mt-5">
    <Link to="/end-user/login">End user login</Link>
      <h2>Admin Dashboard</h2>
      <h3>All Tickets:</h3>
      <ul>
        {tickets.length >0 && tickets.map(ticket => (
          <li key={ticket.id} className={`${styles.ticketItem} list-group-item d-flex justify-content-between align-items-center`} onClick={() => handleSelectTicket(ticket.id)}>
            <div>
              {ticket.title}
              <br />
              <span className="text-muted">Created by: {ticket.createdBy}</span>
            </div>
            <div className="d-flex">
              <select
                className="form-select mx-2"
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <span className="badge bg-primary rounded-pill">{ticket.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
