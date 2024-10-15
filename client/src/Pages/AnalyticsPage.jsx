// src/pages/AnalyticsPage.jsx
"use client";

import { Box, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import Header from "@/components/Header"; // Assuming this already exists
import Sidebar from "@/components/Sidebar"; // Assuming this already exists
import { ProductTable } from "@/components/ProductTable"; // Assuming this is your table component

export default function AnalyticsPage() {
  // Dark theme colors
  const cardBg = "black";
  const borderColor = "gray.700";
  const fontColor = "white";

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="black">
      <Header /> {/* Top Navbar */}
      <Flex flex="1">
        {/* Sticky Sidebar */}
        <Box position="sticky" top="0" h="100vh" zIndex="100">
          <Sidebar /> {/* Left Sidebar */}
        </Box>

        {/* Main content area */}
        <Box as="main" flex="1" p={8} display="flex" flexDirection="column" gap={8}>
          <Stack spacing={8} flex="1">
            {/* Table Container */}
            <Box 
              border="1px" 
              borderColor={borderColor} 
              p={8} 
              borderRadius="lg" 
              bg="black" 
              shadow={"0px 4px 12px rgba(0, 0, 139, 0.8)"} 
              height="100%"
            >
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor}>
                Detailed Product Table
              </Text>
              <ProductTable /> {/* Your table component goes here */}
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
