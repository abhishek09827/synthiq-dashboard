// src/components/RoleSelectionModal.js
import React, { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "./RoleContext";

const RoleSelectionModal = ({ isOpen, onClose, intendedRoute }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const { changeRole } = useContext(RoleContext);

  const validate = () => {
    const newErrors = {};
    if (!selectedRole) newErrors.selectedRole = "Role is required";
    if (selectedRole !== "User" && !password) {
      newErrors.password = "Password is required for Admin and Client roles";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      let isValidPassword = true;

      if (selectedRole !== "User") {
        // Replace this with your actual password validation logic/API call
        isValidPassword = await fakePasswordValidation(selectedRole, password);
      }

      if (isValidPassword) {
        changeRole(selectedRole); // Update the role in context and localStorage
        toast({
          title: "Authentication Successful.",
          description: `You are now logged in as ${selectedRole}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        navigate(intendedRoute);
      } else {
        setErrors({ password: "Invalid password" });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to authenticate. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fake password validation function for demonstration
  const fakePasswordValidation = (role, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demonstration, define passwords via environment variables
        const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";
        const clientPassword = process.env.REACT_APP_CLIENT_PASSWORD || "client123";

        if (
          (role === "Admin" && password === adminPassword) ||
          (role === "Client" && password === clientPassword)
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Authenticate to Continue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="role" isInvalid={errors.selectedRole} mb={4}>
            <FormLabel>Select Role</FormLabel>
            <Select
              placeholder="Select role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              bg="gray.700"
              color="white"
              _hover={{ bg: "gray.600" }}
              _focus={{ bg: "gray.600", borderColor: "#1662D4" }}
            >
              <option value="Admin">Admin</option>
              <option value="Client">Client</option>
              <option value="User">User</option>
            </Select>
            {errors.selectedRole && (
              <FormErrorMessage>{errors.selectedRole}</FormErrorMessage>
            )}
          </FormControl>

          {selectedRole !== "User" && (
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                bg="gray.700"
                color="white"
                _hover={{ bg: "gray.600" }}
                _focus={{ bg: "gray.600", borderColor: "#1662D4" }}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} colorScheme="gray">
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Authenticating"
          >
            Authenticate
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RoleSelectionModal;
