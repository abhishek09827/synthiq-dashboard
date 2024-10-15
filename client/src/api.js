// src/app/api.js
export const fetchCalls = async () => {
  const userId = "user_2nHekPnt5JHC1R2sn5Y1GygO4Id"; // Pass the required user ID
  try {
    const response = await fetch('http://localhost:3000/api/analytics', {
      method: 'POST', // or 'GET' depending on your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: "user_2nHekPnt5JHC1R2sn5Y1GygO4Id" }) // Pass the ID in the body as JSON
    });
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
