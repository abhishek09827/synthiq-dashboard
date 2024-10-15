import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack, Alert } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react"; // Import useSignIn hook

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { signIn, setSession } = useSignIn(); // Initialize Clerk's useSignIn
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before new attempt

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        // If login is successful, Clerk automatically manages the session
        alert("Login successful!");
        navigate("/"); // Redirect to dashboard
      } else {
        setError("Login failed, please try again.");
      }
    } catch (err) {
      setError(err.errors ? err.errors[0].message : err.message);
    }
  };

  return (
    <VStack spacing={4} w="100%" maxW="md" mx="auto" mt={10}>
      <Heading>Login</Heading>
      {error && <Alert status="error">{error}</Alert>}

      <Box as="form" w="full" onSubmit={handleLogin}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" bgColor="#00BFFF" w="full" mt={4}>
          Login
        </Button>
      </Box>
    </VStack>
  );
}
