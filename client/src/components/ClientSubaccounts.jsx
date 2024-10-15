// src/pages/ClientSubaccounts.jsx

import React from "react";
import {
  Box,
  Heading,
  Flex,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";

// Sample Data
const subaccountsData = [
  {
    id: 1,
    name: "John Doe",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2024-12-31",
    creditBalance: "$500",
  },
  {
    id: 2,
    name: "Jane Smith",
    subscriptionStatus: "Expired",
    subscriptionExpiry: "2023-11-15",
    creditBalance: "$0",
  },
  {
    id: 3,
    name: "Bob Johnson",
    subscriptionStatus: "Active",
    subscriptionExpiry: "2024-06-20",
    creditBalance: "$250",
  },
  // Add more subaccounts as needed
];

const ClientSubaccounts = () => {
  // Colors based on the current color mode
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const tableBg = useColorModeValue("white", "gray.800");
  const badgeColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "Expired":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box p={6} bg={bgColor} minH="100vh">
      <Flex
        mb={6}
        justify="space-between"
        align="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Heading size="lg" mb={{ base: 4, md: 0 }}>
          Client Subaccounts
        </Heading>
        <Button
          leftIcon={<IoMdAdd />}
          colorScheme="teal"
          variant="solid"
          size="md"
        >
          Add Subaccount
        </Button>
      </Flex>

      <TableContainer bg={tableBg} borderRadius="md" boxShadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Subscription Status</Th>
              <Th>Subscription Expiry Date</Th>
              <Th isNumeric>Credit Balance</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subaccountsData.map((subaccount) => (
              <Tr key={subaccount.id}>
                <Td>
                  <Flex align="center">
                    {/* Placeholder for avatar or icon */}
                    <Box
                      bg="teal.500"
                      color="white"
                      borderRadius="full"
                      width="32px"
                      height="32px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mr={3}
                      fontSize="sm"
                    >
                      {subaccount.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </Box>
                    <Text>{subaccount.name}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Badge colorScheme={badgeColor(subaccount.subscriptionStatus)}>
                    {subaccount.subscriptionStatus}
                  </Badge>
                </Td>
                <Td>
                  {new Date(subaccount.subscriptionExpiry).toLocaleDateString()}
                </Td>
                <Td isNumeric>{subaccount.creditBalance}</Td>
                <Td>
                  <Flex>
                    <IconButton
                      aria-label="Edit Subaccount"
                      icon={<FaEdit />}
                      size="sm"
                      mr={2}
                      colorScheme="blue"
                      variant="ghost"
                    />
                    <IconButton
                      aria-label="Delete Subaccount"
                      icon={<FaTrash />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientSubaccounts;
