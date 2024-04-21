const API_URL = 'https://localhost:7226/api/Values'; // Replace with your actual API URL

export const createTicket = async (ticketData) => {
  // Simulate a ticket creation API call using Fetch API
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error('Failed to create ticket');
  }

  const data = await response.json();
  return data; // Assuming the API returns the created ticket object
};
