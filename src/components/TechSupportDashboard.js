import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/techsupport.css';

const TechSupportDashboard = () => {
  const [tickets, setTickets] = useState([]); // State to store fetched tickets
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State to handle errors
  const user = useSelector((state) => state.auth.user);

  const userTickets = useSelector((state) => state.tickets.userTickets); // Access user-specific tickets from Redux (assuming a `userTickets` property)

  useEffect(() => {
    setTickets(userTickets); // Update state with user tickets on component mount or changes
  }, [userTickets]);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://localhost:7226/api/Values/sample-json-data'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        setTickets(data); // Update state with fetched tickets
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets(); // Call the function on component mount
  }, [user]); // Empty dependency array to run only once on mount

  return (
    <div className="tech-support-dashboard">
      <h3>Assigned Tickets:</h3>
      {isLoading ? (
        <p>Loading tickets...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="ticket-item">
              <div className="ticket-header">
                <h4>{ticket.title}</h4>
                <p className="status">{ticket.status}</p>
              </div>
              <div className="ticket-details">
                <p>Description: {ticket.description}</p>
                <p>Created By: {ticket.createdBy}</p>
                <p>Assigned To: {ticket.assignedTo}</p>
                {/* <p>Created At: {ticket.createdAt}</p> */}
                {/* Add resolvedAt if applicable */}
              </div>
            </li>
          ))}
          {tickets.length === 0 && <p>No assigned tickets found.</p>}
        </ul>
      )}
    </div>
  );
};

export default TechSupportDashboard;
