// api.js
import axios from "axios";
const BASE_URL = "http://localhost:5000"; // Update to your backend URL

// Signup API request
export const signupUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Login API request
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Logout API request
export const logoutUser = async () => {
  try {
    await axios.post(`${BASE_URL}/api/auth/logout`);
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


export const getTickets = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/tickets/gettickets`); // Corrected route
    return response.data; // Assuming the data returned is an array of tickets
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error; // Re-throw error to be handled in the component
  }
};

// Book a ticket
export const bookTicket = async (ticketData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/tickets/bookTicket`, ticketData); // Corrected route
    return response.data; // Assuming response returns the booked ticket data
  } catch (error) {
    console.error('Error booking ticket:', error);
    throw error; // Re-throw error to be handled in the component
  }
};

// Delete a ticket
export const deleteTicket = async (ticketId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/tickets/deleteticket/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw error;
  }
};
