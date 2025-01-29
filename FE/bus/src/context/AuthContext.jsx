import React, { createContext, useState, useContext } from "react";
import axios from "axios"; // Import axios to make API calls

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track the login status
  const [error, setError] = useState(null); // Store any error messages

  // Signup function to handle new user creation
  const signup = async (username, password, email) => {
    try {
      // Send signup request to the backend API
      const response = await axios.post("https://busproject-hvdj.onrender.com/signup", {
        username,
        password,
        email,
      });

      // If signup is successful, set the user as logged in (without token)
      if (response.data.message === "User created successfully") {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError("Error creating user. Please try again.");
    }
  };

  // Login function (similar to the previous version)
  const login = () => {
    setIsLoggedIn(true); // Set logged in status to true
  };

  // Logout function (to handle logout)
  const logout = () => {
    setIsLoggedIn(false); // Set logged in status to false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signup, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
