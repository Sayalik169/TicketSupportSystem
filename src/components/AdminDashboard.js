import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/admindashboard.css';
import { updateTicket,deleteTicket,createTicketSuccess } from '../reducers/ticketReducer'; // Import updateTicket action
import { Link } from 'react-router-dom';

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
        console.log( 'fetchedticktes',fetchedTickets);
        console.log( 'ticktes',tickets);
        dispatch(createTicketSuccess(fetchedTickets)); // Dispatch a custom action to set tickets
      } catch (error) {
        console.error('Error fetching tickets:', error);
        // Handle error display to user (optional)
      }
    };

    fetchTickets();
  }, []); // Add dispatch as a dependency to ensure effect runs only once

  // Handle potential errors and empty state (optional)
   if (!tickets) {
     return <div>Loading tickets...</div>;
   }

   if (tickets.length === 0) {
    return <div>No tickets found.</div>;
   }

  const handleStatusChange = async (ticketId, newStatus) => {
    try {

      const selectedTicket = tickets.find(ticket => ticket.id === ticketId);
      console.log('ticketstatuschange', selectedTicket);
      // Check if the status update is causing recursive calls
      if (selectedTicket.status === newStatus) {
        console.warn('Status is already set to the new value, avoiding recursion');
        return;
      }
      const updatedTicket = {
        id: ticketId,
        title: selectedTicket.title,
        description: selectedTicket.description,
        createdBy: selectedTicket.createdBy,
        assignedTo: selectedTicket.assignedTo,
        status: newStatus,
        createdAt: selectedTicket.createdAt,
        resolvedAt: new Date().toISOString(),
        // id: 1,
        // title: "test",
        // description: "test",
        // createdBy: "test",
        // assignedTo: "test",
        // status: "test",
        // createdAt: "test",
        // resolvedAt: "test",
      };
      console.log('updatedtickets',JSON.stringify(updatedTicket));

      const response = await fetch('https://localhost:7226/api/Values/Updateticket', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTicket),
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
  const handleDeleteTicket = async (ticketId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this ticket?');
      if (!confirmed) return; // Exit if user cancels confirmation

      const response = await fetch(`https://localhost:7226/api/Values/Deleteticket/${ticketId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete ticket');
      }

      dispatch(deleteTicket(ticketId)); // Dispatch delete action to update Redux state

    } catch (error) {
      console.error('Error deleting ticket:', error);
      // Handle error display to user (optional)
    }
  };
  return (
    <div className="container mt-5">
      <Link to="/end-user/login">End user login</Link>
      <h2>Admin Dashboard</h2>
      <h3>All Tickets:</h3>
      <h3>{tickets.length}</h3>
      <ul className={`${styles.ticketList} list-group`}>
        {tickets.length > 0 && tickets.map((ticket,index) => (
          <li key={index} className={`${styles.ticketItem} list-group-item d-flex justify-content-between align-items-center`} 
          onClick={() => handleSelectTicket(ticket.id)}>
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
              <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDeleteTicket(ticket.id)}
                >
                  Delete
                </button>
            </div>
          </li>
        ))}
      </ul>
      {tickets.length === 0 && <div>No tickets found.</div>}
    </div>
  );
};

export default AdminDashboard;
