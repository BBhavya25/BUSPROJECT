const Ticket = require('../models/Ticket');

// Book a bus ticket
exports.bookTicket = async (req, res) => {
    const { busName, from, to, date, seatNumber } = req.body;

    try {
        const ticket = new Ticket({
            busName,
            from,
            to,
            date,
            seatNumber
        });
        await ticket.save();
        res.status(201).json({ message: 'Bus ticket booked successfully', ticket });
    } catch (error) {
        res.status(500).json({ message: 'Failed to book bus ticket', error: error.message });
    }
};

// Get all tickets
exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
    }
};


// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByIdAndDelete(id);
        if (!ticket) {
            return res.status(404).send(); // Just return a 404 with no body
        }
        res.status(200).send(); // 200 OK without a body message
    } catch (error) {
        res.status(500).send(); // 500 error without a body message
    }
};
