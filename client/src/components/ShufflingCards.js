import React, { useState, useEffect } from 'react';
import { Box, Text, usePrefersReducedMotion, Divider } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Define keyframes for fade in and fade out
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const ShufflingCards = ({ cards, interval = 5000, footerContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this is running on the client side only
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isClient) {
      return; // Skip animations for users who prefer reduced motion or if not on the client side
    }

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [cards.length, interval, prefersReducedMotion, isClient]);

  // Determine the animation based on the change
  const animation = prefersReducedMotion
    ? undefined
    : `${fadeIn} 1s ease-in-out, ${fadeOut} 1s ease-in-out ${interval - 1000}ms`;

  return (
    <Box
      width="100%"
      maxWidth="600px"
      height="300px" // Adjusted height to accommodate footer
      bg="black"
      borderRadius="md"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      justifyContent="space-between" // Ensure space between card content and footer
      position="relative"
      overflow="hidden"
      mx="auto"
      p={4}
    >
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        {cards.map((card, index) => (
          <Box
            key={index}
            position="absolute"
            width="100%"
            textAlign="center"
            color="white"
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontStyle="italic"
            bg="black"
            borderRadius="md"
            p={6}
            opacity={index === currentIndex ? 1 : 0}
            animation={index === currentIndex && !prefersReducedMotion ? animation : undefined}
            transition="opacity 1s ease-in-out"
          >
            "{card}"
          </Box>
        ))}
      </Box>

      {/* Footer Section */}
      <Box as="footer" mt={4}>
        <Divider borderColor="gray.600" />
        <Text color="gray.400" fontSize="sm" textAlign="center" mt={2}>
          {footerContent}
        </Text>
      </Box>
    </Box>
  );
};

export default ShufflingCards;
