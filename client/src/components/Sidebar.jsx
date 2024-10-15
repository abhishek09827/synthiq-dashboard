// src/components/Sidebar.js
import {
  Box,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdArrowDropDown,
  MdSettings,
  MdAttachMoney,
  MdOutlineWarningAmber,
  MdHome,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { HiMenu, HiX } from "react-icons/hi";
import { FaTools, FaFileAlt, FaUserFriends } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { useState, useContext } from "react";
import { MdOutlineSort } from "react-icons/md";
import { RoleContext } from "@/components/RoleContext"; // Import RoleContext

const Sidebar = () => {
  const hoverColor = "#1662D4";
  const transitionStyle = "all 0.3s ease-in-out";
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { role, changeRole } = useContext(RoleContext); // Consume role and changeRole

  const handleRoleSelection = (selectedRole) => {
    changeRole(selectedRole);
    if (selectedRole === "Admin") {
      navigate("/admin");
    } else {
      navigate("/"); // Redirect to home or appropriate page
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <Box display={{ base: "block", md: "none" }} p={4}>
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <HiX /> : <HiMenu />}
          onClick={onToggle}
          bg="black" // Button background set to black
          color="#1662D4" // Icon color set to #1662D4
          _hover={{ bg: "black", color: hoverColor }} // Hover effect
          variant="outline"
        />
      </Box>

      <Box
        as="aside"
        position={{ base: "absolute", md: "sticky" }}
        top="0"
        left={isOpen ? "0" : "-100%"}
        height="100vh"
        width={{ base: "full", md: isCollapsed ? "80px" : "250px" }}
        bg="black"
        p={4}
        shadow="md"
        overflowY="auto"
        transition="left 0.3s ease-in-out, width 0.3s ease-in-out"
        zIndex="overlay"
      >
        {/* Button to toggle sidebar collapse */}
        <IconButton
          onClick={toggleSidebar}
          icon={isCollapsed ? <HiMenu /> : <MdOutlineSort />}
          bg="black" // Button background set to black
          color="#1662D4" // Icon color set to #1662D4
          _hover={{ bg: "black", color: hoverColor }}
          mb={4}
          width="full"
          size="sm"
          aria-label="Toggle Collapse"
        />

        <Stack spacing={6}>
          <Link to="/">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color="white"
              display="flex"
              alignItems="center"
              _hover={{ fontSize: isCollapsed ? "lg" : "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={MdHome} color="#1662D4" mr={isCollapsed ? 0 : 2} />{" "}
              {/* Icon color set to #1662D4 */}
              {!isCollapsed && "Home"}
            </Text>
          </Link>

          {/* Conditionally render the "Customize" link based on role */}
          {role !== "User" && (
            <Link to="/whitelabel">
              <Text
                fontSize="lg"
                fontWeight="medium"
                color="white"
                display="flex"
                alignItems="center"
                _hover={{ fontSize: isCollapsed ? "lg" : "xl", color: hoverColor }}
                transition={transitionStyle}
              >
                <Icon as={FaTools} color="#1662D4" mr={isCollapsed ? 0 : 2} />{" "}
                {/* Icon color set to #1662D4 */}
                {!isCollapsed && "Customize"}
              </Text>
            </Link>
          )}

          {/* Conditionally render the "Expenses" link based on role */}
          {role !== "User" && (
            <Link to="/call-expense">
              <Text
                fontSize="lg"
                fontWeight="medium"
                color="white"
                display="flex"
                alignItems="center"
                _hover={{ fontSize: isCollapsed ? "lg" : "xl", color: hoverColor }}
                transition={transitionStyle}
              >
                <Icon as={MdAttachMoney} color="#1662D4" mr={isCollapsed ? 0 : 2} />{" "}
                {/* Icon color set to #1662D4 */}
                {!isCollapsed && "Expenses"}
              </Text>
            </Link>
          )}

          <Link to="/analytics">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color="white"
              display="flex"
              alignItems="center"
              _hover={{ fontSize: isCollapsed ? "lg" : "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={FaFileAlt} color="#1662D4" mr={isCollapsed ? 0 : 2} />{" "}
              {/* Icon color set to #1662D4 */}
              {!isCollapsed && "Reports"}
            </Text>
          </Link>

          <Link to="/alerts">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color="white"
              display="flex"
              alignItems="center"
              _hover={{ fontSize: isCollapsed ? "lg" : "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={MdOutlineWarningAmber} color="#1662D4" mr={isCollapsed ? 0 : 2} />{" "}
              {/* Icon color set to #1662D4 */}
              {!isCollapsed && "Alerts"}
            </Text>
          </Link>

          <Link to="/settings">
            <Text
              fontSize="lg"
              fontWeight="medium"
              color="white"
              display="flex"
              alignItems="center"
              _hover={{ fontSize: isCollapsed ? "lg" : "xl", color: hoverColor }}
              transition={transitionStyle}
            >
              <Icon as={MdSettings} color="#1662D4" mr={isCollapsed ? 0 : 2} />{" "}
              {/* Icon color set to #1662D4 */}
              {!isCollapsed && "Settings"}
            </Text>
          </Link>

          <Menu>
            <MenuButton
              as={Text}
              fontSize="lg"
              fontWeight="medium"
              color="white"
              display="flex"
              alignItems="center"
              _hover={{ color: hoverColor, transform: "scale(1.05)" }}
              transition={transitionStyle}
              cursor="pointer"
            >
              <Icon as={MdOutlineAdminPanelSettings} color="#1662D4" mr={isCollapsed ? 0 : 2} />{" "}
              {/* Icon color set to #1662D4 */}
              {!isCollapsed && "Role"}{" "}
              {!isCollapsed && <Icon as={MdArrowDropDown} color="#1662D4" />}
            </MenuButton>
            <MenuList color="black">
              <MenuItem onClick={() => handleRoleSelection("User")}>
                <Icon as={FaUserFriends} mr={2} /> User
              </MenuItem>
              <MenuItem onClick={() => handleRoleSelection("Admin")}>
                <Icon as={MdOutlineAdminPanelSettings} mr={2} /> Admin
              </MenuItem>
              <MenuItem onClick={() => handleRoleSelection("Client")}>
                <Icon as={MdManageAccounts} mr={2} /> Agency
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
