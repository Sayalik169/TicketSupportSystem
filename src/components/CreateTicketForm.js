import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from './ticket'; // Assuming correct import path
import '../styles/ticket.css'; // Import the CSS file

const CreateTicketForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('End User'); // Assuming user identification
  const [assignedTo, setAssignedTo] = useState(''); // Optional: Assigned team/person
  const [status, setStatus] = useState('New'); // Optional: Initial ticket status
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = {
      title,
      description,
      createdBy,
      assignedTo,
      status,
    };
    try {
      const createdTicket = await dispatch(createTicket(newTicket));
      // Handle successful creation (optional: display confirmation message)
      setTitle(''); // Clear form after submission (optional)
      setDescription('');
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle creation error (optional: display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-ticket-form">
      <h2>Create Ticket</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-label="Enter a descriptive ticket title" // Improve accessibility
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          aria-label="Provide a detailed description of the issue" // Improve accessibility
        />
      </div>
      <div className="form-group">
        <label htmlFor="assignedTo">Assigned To:</label>
        <input
          type="text"
          id="assignedTo"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          aria-label="Assign the ticket to a specific team or person (optional)" // Improve accessibility
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}
                aria-label="Select the initial ticket status"> {/* Improve accessibility */}
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          {/* Add other status options as needed */}
        </select>
      </div>
      <button type="submit" className="submit-button">
        Submit Ticket
      </button>
    </form>
  );
};

export default CreateTicketForm;
