// alertsContext.js
import React, { createContext, useState, useContext } from "react";

const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    { name: "Call Cost Alert", threshold: 100, active: true },
    { name: "Duration Alert", threshold: 60, active: false },
  ]);

  return (
    <AlertsContext.Provider value={{ alerts, setAlerts }}>
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertsContext);
