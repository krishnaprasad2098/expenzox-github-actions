

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isTokenAvailable = window.localStorage.getItem("token");
  
  // Add error handling to the JSON.parse operation to avoid crashes
  let isUserAvailable = null;
  try {
    const storedUser = window.localStorage.getItem("user");
    isUserAvailable = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    // If parsing fails, the stored data isn't valid JSON
    console.error("Error parsing user data from localStorage:", error);
    // Clear the invalid data
    window.localStorage.removeItem("user");
  }

  console.log("from context local storage:", isUserAvailable);

  useEffect(() => {
    if (isTokenAvailable && isUserAvailable) {
      setIsLoggedIn(true);
      setUser(isUserAvailable);
    }
  }, []); // Remove user dependency to avoid potential infinite loops

  console.log("From Context:", isLoggedIn);
  
  // Function to update user data
  const updateUser = (userData) => {
    console.log("User data", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true); // Set logged in when updating user
  };

  // Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false); // Set logged out when clearing user
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;