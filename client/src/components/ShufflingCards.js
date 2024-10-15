// ShufflingCards.js
import React, { useState, useEffect } from 'react';
import { Box, Text, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';

// Define keyframes for fade in and fade out
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const ShufflingCards = ({ cards, interval = 5000 }) => { // interval in ms
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return; // Skip animations for users who prefer reduced motion
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [cards.length, interval, prefersReducedMotion]);

  // Determine the animation based on the change
  const animation = prefersReducedMotion
    ? undefined
    : `${fadeIn} 1s ease-in-out, ${fadeOut} 1s ease-in-out ${interval - 1000}ms`;

  return (
    <Box
      width="100%"
      maxWidth="600px"
      height="200px"
      bg="black" // Changed from gray.800 to black
      borderRadius="md"
      boxShadow="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      mx="auto"
      p={4}
    >
      {cards.map((card, index) => (
        <Box
          key={index}
          position="absolute"
          width="100%"
          textAlign="center"
          color="white" // Bright color for contrast
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontStyle="italic"
          bg="black" // Ensure each card has a black background
          borderRadius="md" // Optional: Add rounded corners to each card
          p={6} // Optional: Add padding for better text spacing
          opacity={index === currentIndex ? 1 : 0}
          animation={index === currentIndex && !prefersReducedMotion ? animation : undefined}
          transition="opacity 1s ease-in-out"
        >
          "{card}"
        </Box>
      ))}
    </Box>
  );
};

export default ShufflingCards;
