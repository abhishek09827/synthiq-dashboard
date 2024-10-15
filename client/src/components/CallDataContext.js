// src/CallDataContext.js
import React, { createContext, useState } from 'react';

// Create Context
export const CallDataContext = createContext();

// Create Provider Component
export const CallDataProvider = ({ children }) => {
  const [callData, setCallData] = useState([]);

  return (
    <CallDataContext.Provider value={{ callData, setCallData }}>
      {children}
    </CallDataContext.Provider>
  );
};
