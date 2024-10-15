// src/components/RoleGuard.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { RoleContext } from "./RoleContext";

const RoleGuard = ({ children, allowedRoles }) => {
  const { role } = useContext(RoleContext);

  if (allowedRoles.includes(role)) {
    return children;
  } else {
    // Optionally, redirect to an unauthorized page or show a message
    return <Navigate to="/unauthorized" replace />;
  }
};

export default RoleGuard;
