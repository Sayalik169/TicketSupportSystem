export const createTicket = async (ticketData) => {
    // Simulate a ticket creation API call using Fetch API
    const API_URL = 'https://localhost:7226/api/Values'; // Replace with your actual API URL
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData),
    });
  
    if (!response.ok) {
      alert('failed to create ticket');
      throw new Error('Failed to create ticket');
    }
    else{
      alert('ticket saved succefully');
    }
  
    // const data = await response.json();
    // return data; // Assuming the API returns the created ticket object
  };
  