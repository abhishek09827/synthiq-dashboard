// src/app/AuthContent.js

import React from 'react';
import { useAuth, SignInButton, useUser } from '@clerk/clerk-react';
import axios from 'axios';

const AuthContent = () => {
  const { isLoaded, getToken } = useAuth();
  const { user } = useUser();

  const handleLogin = async () => {
    const token = await getToken();
    const id = user?.id; // Ensure user is loaded before accessing id

    if (id) {
      axios.post('http://localhost:3000/api/login', { token, id })
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        {user ? (
          <h1>Welcome, {user.id}</h1>
        ) : (
          <SignInButton redirectUrl="http://localhost:3000/dashboard" />
        )}
      </div>
      <button onClick={handleLogin}>Hiii</button>
    </>
  );
};

export default AuthContent;
