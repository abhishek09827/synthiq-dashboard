"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import Header from "@/components/Header"; // Assuming this already exists
import Sidebar from "@/components/Sidebar"; // Assuming this already exists
import { ProductTable } from "@/components/ProductTable"; // Assuming this is your table component

export default function AnalyticsPage() {
  // Dark theme colors
  const cardBg = "black";
  const borderColor = "gray.700";
  const fontColor = "white";

  return (
    <Box
      maxWidth="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bg="black"
    >
      <Header /> {/* Top Navbar */}
      <Flex flex="1">
        {/* Sidebar */}
        <Box
          display={{ base: "none", md: "block" }} // Only show on medium screens and up
          position="fixed"
          top="0"
          left="0"
          h="100vh"
          w="250px"
          zIndex="200"
        >
          <Sidebar /> {/* Left Sidebar */}
        </Box>

        {/* Main content area */}
        <Box
          flex="1"
          ml={{ base: 0, md: "250px" }}
          p={8}
          display="flex"
          flexDirection="column"
          gap={8}
          height={{ base: "100%", md: "auto" }} // Set height to auto on larger screens
          width={{ base: "95%", md: "auto" }} // Reduce width on mobile
          maxWidth={{ base: "95vw", md: "auto" }} // Max width on mobile
          alignSelf="center" // Center the content on mobile
        >
          {/* Table Container */}
          <Flex flexDirection="column" flex="1" gap={8}>
            <Box
              border="1px"
              borderColor={borderColor}
              p={8}
              borderRadius="lg"
              bg={cardBg}
              shadow={"0px 4px 12px rgba(0, 0, 139, 0.8)"}
              height="100%"
            >
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
                Detailed Product Table
              </Text>
              {/* Make the table horizontally scrollable */}
              <Box overflowX="auto">
                <ProductTable /> {/* Your table component goes here */}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
