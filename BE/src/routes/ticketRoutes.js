const express = require('express');
const router = express.Router();
const { bookTicket, getTickets,  deleteTicket } = require('../controllers/ticketController');

// POST request to book a bus ticket
router.post('/bookticket', bookTicket);

// GET request to get all bus tickets
router.get('/gettickets', getTickets);


// DELETE request to delete a bus ticket by ID
router.delete('/deleteticket/:id', deleteTicket);

module.exports = router;
