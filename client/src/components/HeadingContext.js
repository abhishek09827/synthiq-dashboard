import { createContext, useContext, useState } from 'react';

// Create a context for the heading text
const HeadingContext = createContext();

export const useHeading = () => useContext(HeadingContext);

// Provider component to wrap around the app
export const HeadingProvider = ({ children }) => {
  const [headingText, setHeadingText] = useState('White Labeling Settings');

  return (
    <HeadingContext.Provider value={{ headingText, setHeadingText }}>
      {children}
    </HeadingContext.Provider>
  );
};
