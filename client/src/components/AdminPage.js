"use client";
import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Header from "@/components/Header"; // Adjust the import path as needed
import Sidebar from "@/components/Sidebar"; // Adjust the import path as needed

const AdminPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [roleFilter, setRoleFilter] = useState(""); // State for role filter
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userList, setUserList] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
    // Add more users as needed
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" }); // State for new user
  const [isAddUserOpen, setIsAddUserOpen] = useState(false); // State for adding user modal
  const toast = useToast();

  // Function to open the modal and set the current user
  const handleEdit = (user) => {
    setCurrentUser(user);
    setSelectedRole(user.role); // Set initial role in the modal
    onOpen(); // Open the modal
  };

  // Function to simulate an API call for updating the role
  const updateUserRole = (userId, newRole) => {
    if (newRole === "") {
      toast({
        title: "No Role Selected",
        description: "Please select a role before updating.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setTimeout(() => {
      setUserList((prevUserList) =>
        prevUserList.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      toast({
        title: `Role Updated`,
        description: `${currentUser.name}'s role has been updated to ${newRole}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }, 1000); // Simulate a delay
  };

  // Function to open the add user modal
  const handleAddUserOpen = () => {
    setNewUser({ name: "", email: "", role: "User" }); // Reset new user data
    setIsAddUserOpen(true);
  };

  // Function to add a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newUser.email)) {
        toast({
          title: `Invalid Email`,
          description: `Please enter a valid email address.`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const newUserData = {
        id: userList.length + 1, // Assign a new ID
        ...newUser,
      };

      // Simulate an API call
      setTimeout(() => {
        setUserList((prevUserList) => [...prevUserList, newUserData]);
        toast({
          title: `User Added`,
          description: `${newUser.name} has been added successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsAddUserOpen(false); // Close the modal
      }, 1000); // Simulate a delay
    } else {
      toast({
        title: `Error`,
        description: `Please fill in all fields.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to remove a user
  const handleRemoveUser = (userId) => {
    setUserList((prevUserList) => prevUserList.filter((user) => user.id !== userId));
    toast({
      title: `User Removed`,
      description: `User has been removed successfully.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Filter users based on the search term and selected role
  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true; // Check role filter
    return matchesSearch && matchesRole;
  });

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="rgba(0,0,0,0.9)">
      <Header /> {/* Header on top */}
      <Flex flex="1">
        {/* Sticky Sidebar */}
        <Box position="sticky" top="0" h="100vh" zIndex="100">
          <Sidebar />
        </Box>

        {/* Main content area */}
        <Box as="main" flex="1" p={8} display="flex" flexDirection="column" gap={8}>
          <Box p={4}>
            <Text fontSize="2xl" fontWeight="bold" mb={6} color="#1662D4">
              Welcome to the Admin Page
            </Text>
            <Text mt={2} color="white">
              This page is accessible to admin users only.
            </Text>
          </Box>

          {/* User Management Section */}
          <Box
            bg="rgba(0,0,0,0.9)"
            p={6}
            borderRadius="lg"
            shadow="xl"
            border="1px"
            borderColor="black"
          >
            <Text fontSize="xl" fontWeight="bold" color="#1662D4" mb={4}>
              User Management
            </Text>
            {/* Search Input */}
            <Input
              placeholder="Search users by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              mb={4}
              color="white"
              bg="blackAlpha.600"
              _placeholder={{ color: "white" }}
              border="1px"
            />
            {/* Role Filter Select */}
            <Select
              placeholder="Filter by Role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)} // Update role filter on selection
              mb={4}
              color="white"
              bg="black"
              borderColor="white"
              _focus={{ borderColor: "#1662D4", boxShadow: "0 0 0 1px #1662D4" }}
            >
              <option value="User" style={{ backgroundColor: "black", color: "white" }}>
                User
              </option>
              <option value="Admin" style={{ backgroundColor: "black", color: "white" }}>
                Admin
              </option>
              <option
                value="Super Admin"
                style={{ backgroundColor: "black", color: "white" }}
              >
                Super Admin
              </option>
              <option
                value="Agency Owner"
                style={{ backgroundColor: "black", color: "white" }}
              >
                Agency Owner
              </option>
            </Select>
            {/* Add User Button */}
            <Button bg="#1662D4" color="white" onClick={handleAddUserOpen} mb={4}>
              Add New User
            </Button>
            {/* Users Table */}
            <Table
              mt={4}
              variant="striped"
              colorScheme="blackAlpha"
              border="1px"
              borderColor="black"
              size="md"
            >
              <Thead>
                <Tr>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
                    Username
                  </Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
                    Email
                  </Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
                    Role
                  </Th>
                  <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr
                    key={user.id}
                    _hover={{ bg: "blackAlpha.700" }} // Black hover state for row
                    transition="0.2s ease-out"
                  >
                    <Td
                      fontSize="lg"
                      color="white"
                      _hover={{ color: "blue.600" }} // Blue color when hovered
                      transition="0.3s ease-out"
                    >
                      {user.name}
                    </Td>
                    <Td color="white" fontSize="lg">
                      {user.email}
                    </Td>
                    <Td color="white" fontSize="lg">
                      {user.role}
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        <Button
                          bg="#1662D4"
                          size="sm"
                          color="white"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleRemoveUser(user.id)}
                        >
                          Remove
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          {/* Edit User Modal */}
          {currentUser && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent bg="blackAlpha.800" borderRadius="xl" color="white">
                <ModalHeader>Edit Role for {currentUser.name}</ModalHeader>
                <ModalBody>
                  <Select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    mb={4}
                    borderColor="whiteAlpha.700"
                    bg="black"
                    color="white"
                    _focus={{ borderColor: "#1662D4", boxShadow: "0 0 0 1px #1662D4" }}
                  >
                    <option value="User" style={{ backgroundColor: "black", color: "white" }}>
                      User
                    </option>
                    <option value="Admin" style={{ backgroundColor: "black", color: "white" }}>
                      Admin
                    </option>
                    <option
                      value="Super Admin"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      Super Admin
                    </option>
                    <option
                      value="Agency Owner"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      Agency Owner
                    </option>
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={() => updateUserRole(currentUser.id, selectedRole)}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}

          {/* Add User Modal */}
          {isAddUserOpen && (
            <Modal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)}>
              <ModalOverlay />
              <ModalContent bg="blackAlpha.800" borderRadius="xl" color="white">
                <ModalHeader>Add New User</ModalHeader>
                <ModalBody>
                  <Input
                    placeholder="Enter name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    mb={4}
                    color="white"
                    bg="blackAlpha.600"
                    _placeholder={{ color: "gray.400" }}
                  />
                  <Input
                    placeholder="Enter email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    mb={4}
                    color="white"
                    bg="blackAlpha.600"
                    _placeholder={{ color: "gray.400" }}
                  />
                  <Select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    borderColor="whiteAlpha.700"
                    bg="black"
                    color="white"
                    _focus={{ borderColor: "#1662D4", boxShadow: "0 0 0 1px #1662D4" }}
                  >
                    <option value="User" style={{ backgroundColor: "black", color: "white" }}>
                      User
                    </option>
                    <option value="Admin" style={{ backgroundColor: "black", color: "white" }}>
                      Admin
                    </option>
                    <option
                      value="Super Admin"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      Super Admin
                    </option>
                    <option
                      value="Agency Owner"
                      style={{ backgroundColor: "black", color: "white" }}
                    >
                      Agency Owner
                    </option>
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme="green" onClick={handleAddUser}>
                    Add User
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminPage;
