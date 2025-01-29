const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const ticketRoutes = require("./src/routes/ticketRoutes");

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5000";

app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// Database Connection
connectDB();

module.exports = app;