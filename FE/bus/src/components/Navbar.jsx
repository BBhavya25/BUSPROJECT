import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from "../assets/logo.png"; // Ensure the path is correct
import './styles.css'; // Your CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // For the mobile menu

  // Handle Logout: Clear login state & redirect
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // ✅ Clear login state
    navigate("/login"); // ✅ Redirect to login
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logoImage} alt="Logo" />
        <span>Quick Bus</span>
      </div>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <Link to="/mainpage">Home</Link> {/* Link to Home */}
        <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
