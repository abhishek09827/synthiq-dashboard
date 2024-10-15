// src/hooks/useAuth.js

import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data from authentication API or context
    // Replace this with your actual authentication logic
    const fetchUser = () => {
      const mockUser = {
        username: "JohnDoe",
        role: "Admin", // Replace this with dynamic role from API
      };
      setUser(mockUser);
    };

    fetchUser();
  }, []);

  return { user };
};
