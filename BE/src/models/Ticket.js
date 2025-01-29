const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  busName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  seatNumber: { type: Number, required: true },
});

module.exports = mongoose.model("Ticket", ticketSchema);
