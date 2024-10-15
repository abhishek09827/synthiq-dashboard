import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { IoNotificationsCircle } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const fontColor = "#1662D4"; // Bright blue color
  const bgColor = "black";
  const fontFamily = "'Roboto Condensed', sans-serif";

  const [headingText, setHeadingText] = useState(''); // No default heading text
  const [logoUrl, setLogoUrl] = useState('');
  const [logoSize, setLogoSize] = useState('40');

  useEffect(() => {
    // Retrieve values from localStorage
    const storedHeading = localStorage.getItem('customHeading') || '';
    const storedLogoUrl = localStorage.getItem('logoUrl') || '';
    const storedLogoSize = localStorage.getItem('logoSize') || '40';

    setHeadingText(storedHeading);
    setLogoUrl(storedLogoUrl);
    setLogoSize(storedLogoSize);
  }, []);

  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Logout function
  const handleLogout = () => {
    alert("You have logged out!");
    // Implement actual logout logic here
  };

  return (
    <Box
      as="header"
      bg={bgColor}
      color={fontColor}
      p={4}
      position="relative"
      width="100%"
      shadow="lg"
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          {headingText && (
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={fontColor}
              ml={4}
              fontFamily={fontFamily}
              _hover={{ color: "#FF9A00", transform: "scale(1.05)" }}
              transition="all 0.3s ease-in-out"
            >
              {headingText}
            </Text>
          )}
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Dashboard Logo"
              boxSize={`${logoSize}px`} // Dynamic size based on user input
              ml={4}
              objectFit="contain"
            />
          )}
        </Flex>

        <Flex gap={6} align="center">
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<IoNotificationsCircle />}
              fontSize="2.5rem"
              color={fontColor}
              variant="ghost"
              aria-label="Notifications"
              _hover={{ color: "#FF9A00", transform: "scale(1.2)" }}
              transition="all 0.3s ease-in-out"
            />
            <MenuList bg={bgColor} color={fontColor}>
              <MenuItem _hover={{ bg: "gray.700" }} onClick={() => alert("Notification 1 clicked!")}>
                Notification 1
              </MenuItem>
              <MenuItem _hover={{ bg: "gray.700" }} onClick={() => alert("Notification 2 clicked!")}>
                Notification 2
              </MenuItem>
              <MenuItem _hover={{ bg: "gray.700" }} onClick={() => alert("Notification 3 clicked!")}>
                Notification 3
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={
                <Avatar
                  bg={isHovered ? "orange" : "#1662D4"}
                  color="black"
                  icon={<FaRegUser />}
                  boxSize="40px"
                  borderColor="black"
                  borderWidth="2px"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              }
              variant="ghost"
              aria-label="Profile"
              _hover={{
                transform: "scale(1.2)",
              }}
              transition="all 0.3s ease-in-out"
              color={fontColor}
            />
            <MenuList bg={bgColor} color={fontColor}>
              <MenuItem bg="black" _hover={{ bg: "gray.700" }} onClick={() => alert("View Profile clicked!")}>
                View Profile
              </MenuItem>
              <MenuItem bg="black" _hover={{ bg: "gray.700" }} onClick={() => alert("Account Settings clicked!")}>
                Account Settings
              </MenuItem>
              <MenuItem bg="black" _hover={{ bg: "gray.700" }} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
