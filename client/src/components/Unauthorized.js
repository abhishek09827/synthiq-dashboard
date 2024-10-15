// src/pages/Unauthorized.js
import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="3xl" mb={4}>
        Unauthorized Access
      </Text>
      <Text mb={6}>
        You do not have permission to view this page. Please contact the administrator if you believe this is a mistake.
      </Text>
      <Button colorScheme="blue" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
