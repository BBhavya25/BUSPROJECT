const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err); // Log the error
    res.status(500).json({ message: "Error creating user" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
};

// Logout is handled on the client side by removing the token
const logout = async (req, res) => {
  res.json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };