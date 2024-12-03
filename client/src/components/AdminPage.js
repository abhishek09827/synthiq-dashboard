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
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userList, setUserList] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User" },
  ]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const toast = useToast();

  const handleEdit = (user) => {
    setCurrentUser(user);
    setSelectedRole(user.role);
    onOpen();
  };

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
    }, 1000);
  };

  const handleAddUserOpen = () => {
    setNewUser({ name: "", email: "", role: "User" });
    setIsAddUserOpen(true);
  };

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
        id: userList.length + 1,
        ...newUser,
      };

      setTimeout(() => {
        setUserList((prevUserList) => [...prevUserList, newUserData]);
        toast({
          title: `User Added`,
          description: `${newUser.name} has been added successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsAddUserOpen(false);
      }, 1000);
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

  const filteredUsers = userList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="rgba(0,0,0,0.9)">
      <Flex flex="1" direction={{ base: "column", md: "row" }}>
        {/* Sticky Sidebar */}
        <Box display={{ base: "none", md: "block" }} position="sticky" top="0" h="100vh" zIndex="100">
          <Sidebar />
        </Box>

        {/* Main content area */}
        <Box as="main" flex="1" p={4} display="flex" flexDirection="column" gap={8}>
          <Header />

          <Box p={4}>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={6} color="#1662D4">
              Admin Page
            </Text>
            <Text mt={2} color="white"></Text>
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
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color="#1662D4" mb={4}>
              User Management
            </Text>
            {/* Search Input */}
            <Input
              placeholder="Search users by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              onChange={(e) => setRoleFilter(e.target.value)}
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
              <option value="Super Admin" style={{ backgroundColor: "black", color: "white" }}>
                Super Admin
              </option>
              <option value="Agency Owner" style={{ backgroundColor: "black", color: "white" }}>
                Agency Owner
              </option>
            </Select>
            {/* Add User Button */}
            <Button bg="#1662D4" color="white" onClick={handleAddUserOpen} mb={4}>
              Add New User
            </Button>

            {/* Scrollable Users Table */}
            <Box overflowX="auto"> {/* Make table horizontally scrollable */}
              <Table
                mt={4}
                variant="striped"
                colorScheme="blackAlpha"
                border="1px"
                borderColor="black"
                size="sm" // Smaller table size for mobile
              >
                <Thead>
                  <Tr>
                    <Th color="rgba(255,255,255,0.9)" fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                      Username
                    </Th>
                    <Th color="rgba(255,255,255,0.9)" fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                      Email
                    </Th>
                    <Th color="rgba(255,255,255,0.9)" fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                      Role
                    </Th>
                    <Th color="rgba(255,255,255,0.9)" fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredUsers.map((user) => (
                    <Tr key={user.id}>
                      <Td color="white" fontSize={{ base: "sm", md: "md" }}>{user.name}</Td>
                      <Td color="white" fontSize={{ base: "sm", md: "md" }}>{user.email}</Td>
                      <Td color="white" fontSize={{ base: "sm", md: "md" }}>{user.role}</Td>
                      <Td>
                        <Button colorScheme="blue" onClick={() => handleEdit(user)} mr={2} size={{ base: "sm", md: "md" }}>
                          Edit
                        </Button>
                        <Button colorScheme="red" onClick={() => handleRemoveUser(user.id)} size={{ base: "sm", md: "md" }}>
                          Remove
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Flex>

      {/* Edit User Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Role</ModalHeader>
          <ModalBody>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Agency Owner">Agency Owner</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => updateUserRole(currentUser.id, selectedRole)}>
              Update Role
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add User Modal */}
      <Modal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              mb={3}
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              mb={3}
            />
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              mb={3}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Agency Owner">Agency Owner</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddUser}>
              Add User
            </Button>
            <Button onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminPage;
