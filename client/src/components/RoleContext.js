// src/components/RoleContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the Context
export const RoleContext = createContext();

// Create a Provider Component
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("User"); // Default role

  useEffect(() => {
    // Retrieve the role from localStorage if it exists
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const changeRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole); // Persist role in localStorage
  };

  return (
    <RoleContext.Provider value={{ role, changeRole }}>
      {children}
    </RoleContext.Provider>
  );
};
