import { 
  Box, Flex, Heading, Text, Input, Button, Select, Checkbox, Stack, Divider, Card, CardBody, Icon 
} from "@chakra-ui/react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar"; // Adjust the import path as necessary
import { FaUser, FaLock, FaBell, FaGlobe, FaMoneyBillWave } from 'react-icons/fa';

const SettingsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [notifications, setNotifications] = useState({
    emailNotifications: false,
    smsNotifications: false,
  });
  const [timeZone, setTimeZone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const timeZones = ["UTC", "GMT", "CET", "EST", "PST"];
  const currencies = ["USD", "EUR", "GBP", "INR"];

  const handleSaveProfile = () => {
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ name, email, instagramUrl, linkedinUrl, notifications, timeZone, currency })
    );
    alert("Profile updated successfully!");
  };

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setNotifications((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Box bg="black" minH="100vh">
      <Flex direction={{ base: "column", md: "row" }} height="100vh">
        {/* Sidebar */}
        <Box display={{ base: "block", md: "block" }}>
          <Sidebar />
        </Box>

        {/* Main content */}
        <Flex flex="1" p={{ base: 4, md: 8 }} justify="center">
          <Box w="100%" maxW="800px" mx="auto">
            <Card bg="black" p={8} borderRadius="md" shadow="xl">
              <CardBody>
                <Heading color="blue.400" mb={6} textAlign="center">
                  User Settings
                </Heading>

                {/* Profile Information Section */}
                <Box mb={8}>
                  <Heading size="md" color="white" mb={4}>
                    <Icon as={FaUser} mr={2} /> Profile Information
                  </Heading>
                  <Stack spacing={4}>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                      type="email"
                    />
                  </Stack>
                </Box>

                {/* Social Media URLs */}
                <Box mb={8}>
                  <Heading size="md" color="white" mb={4}>
                    Social Media Links
                  </Heading>
                  <Stack spacing={4}>
                    <Input
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="https://www.instagram.com/yourusername"
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                      type="url"
                    />
                    <Input
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/in/yourusername"
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                      type="url"
                    />
                  </Stack>
                </Box>

                <Divider my={6} borderColor="black" />

                {/* Notification Preferences */}
                <Box mb={8}>
                  <Heading size="md" color="white" mb={4}>
                    <Icon as={FaBell} mr={2} /> Notifications
                  </Heading>
                  <Stack spacing={4}>
                    <Checkbox
                      name="emailNotifications"
                      isChecked={notifications.emailNotifications}
                      onChange={handleNotificationChange}
                      colorScheme="blue"
                      color="white"
                    >
                      Email Notifications
                    </Checkbox>
                    <Checkbox
                      name="smsNotifications"
                      isChecked={notifications.smsNotifications}
                      onChange={handleNotificationChange}
                      colorScheme="blue"
                      color="white"
                    >
                      Slack Notification
                    </Checkbox>
                  </Stack>
                </Box>

                {/* Time Zone and Currency */}
                <Box mb={8}>
                  <Heading size="md" color="white" mb={4}>
                    <Icon as={FaGlobe} mr={2} /> Time Zone & Currency
                  </Heading>
                  <Flex justify="space-between" direction={{ base: "column", md: "row" }}>
                    <Select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                      _focus={{ borderColor: "#FF9A00", boxShadow: "0 0 0 1px #FF9A00" }}
                      mb={{ base: 4, md: 0 }}
                      mr={{ md: 2 }}
                    >
                      <option value="" disabled>
                        Select Time Zone
                      </option>
                      {timeZones.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone}
                        </option>
                      ))}
                    </Select>

                    <Select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                      _focus={{ borderColor: "#FF9A00", boxShadow: "0 0 0 1px #FF9A00" }}
                    >
                      <option value="" disabled>
                        Select Currency
                      </option>
                      {currencies.map((curr) => (
                        <option key={curr} value={curr}>
                          {curr}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Box>

                <Divider my={6} borderColor="black" />

                {/* Change Password Section */}
                <Box mb={8}>
                  <Heading size="md" color="white" mb={4}>
                    <Icon as={FaLock} mr={2} /> Change Password
                  </Heading>
                  <Stack spacing={4}>
                    <Input
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      type="password"
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                    <Input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      type="password"
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                    <Input
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      type="password"
                      bg="black"
                      color="white"
                      _placeholder={{ color: "gray.400" }}
                    />
                    <Button
                      onClick={handleChangePassword}
                      colorScheme="blue"
                      w="full"
                      mt={4}
                    >
                      Change Password
                    </Button>
                  </Stack>
                </Box>

                {/* Save Button */}
                <Button
                  onClick={handleSaveProfile}
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  mt={6}
                >
                  Save Changes
                </Button>
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default SettingsPage;
