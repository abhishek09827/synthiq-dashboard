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
  Image,
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
import { useState, useContext, useEffect } from "react";
import { MdOutlineSort } from "react-icons/md";
import { RoleContext } from "@/components/RoleContext";
import { CgOrganisation } from "react-icons/cg";
import { LuFiles } from "react-icons/lu";

const Sidebar = () => {
  const hoverColor = "#ffffff";
  const defaultColor = "#1662D4";
  const transitionStyle = "all 0.3s ease-in-out";
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { role, changeRole } = useContext(RoleContext);

  const handleRoleSelection = (selectedRole) => {
    changeRole(selectedRole);
    if (selectedRole === "Admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const iconSize = isCollapsed ? 7 : 5;

  const [logoUrl, setLogoUrl] = useState(null);
  const [headingText, setHeadingText] = useState("");
  const [logoSize, setLogoSize] = useState("40");

  useEffect(() => {
    const savedLogo = localStorage.getItem("logoUrl");
    const savedHeading = localStorage.getItem("customHeading");
    const savedLogoSize = localStorage.getItem("logoSize");
    setLogoUrl(savedLogo);
    setHeadingText(savedHeading);
    setLogoSize(savedLogoSize);
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap"
        rel="stylesheet"
      />

      <Box
        as="aside"
        position={{ base: "absolute", md: "sticky" }}
        top="0"
        left={isOpen ? "0" : "-100%"}
        height="100vh"
        width={{ base: "full", md: isCollapsed ? "80px" : "250px" }}
        bg="gray.900"
        p={4}
        shadow="md"
        overflowY="auto"
        transition="left 0.3s ease-in-out, width 0.3s ease-in-out"
        zIndex="overlay"
        fontFamily="'Inter', sans-serif"
        fontWeight="500"
      >
        <Stack spacing={6}>
          {/* Sidebar Header with Logo and Collapse Toggle */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Conditionally render the logo and heading based on sidebar state */}
            {!isCollapsed && logoUrl && (
              <Image
                src={logoUrl}
                alt="Logo"
                boxSize={isCollapsed ? "40px" : `${logoSize}px`}
                mr={isCollapsed ? 0 : 2}
              />
            )}
            {!isCollapsed && (
              <Text fontSize="lg" fontWeight={600} color={defaultColor}>
                {headingText}
              </Text>
            )}
            <IconButton
              onClick={toggleSidebar}
              icon={isCollapsed ? <HiMenu /> : <MdOutlineSort />}
              bg="rgba(10, 10, 25, 0.9)"
              color={defaultColor}
              _hover={{ bg: "rgba(10, 10, 25, 0.9)", color: hoverColor }}
              size="lg"
              aria-label="Toggle Collapse"
              display="flex"
              alignItems="center"
              justifyContent="center"
              m="0 auto"
            />
          </Box>

          {/* Mobile Menu Toggle Button */}
          <Box display={{ base: "block", md: "none" }} alignItems="center">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <IconButton
                aria-label="Toggle Sidebar"
                icon={isOpen ? <HiX /> : <HiMenu />}
                onClick={onToggle}
                bg="rgba(10, 10, 25, 0.9)"
                color={defaultColor}
                _hover={{ bg: "rgba(10, 10, 25, 0.9)", color: hoverColor }}
                variant="outline"
                size="lg"
              />
              {!isCollapsed && (
                <Text fontSize="lg" fontWeight={500}>
                  Menu
                </Text>
              )}
            </Stack>
          </Box>

          {/* Sidebar Links */}
          <Link to="/">
            <Text
              fontSize="lg"
              display="flex"
              alignItems="center"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              _hover={{
                fontSize: isCollapsed ? "lg" : "xl",
                color: hoverColor,
              }}
              transition={transitionStyle}
              fontWeight={500}
            >
              <Icon
                as={MdHome}
                color={defaultColor}
                boxSize={iconSize}
                mr={isCollapsed ? 0 : 2}
                _hover={{
                  color: hoverColor,
                  transition: transitionStyle,
                }}
              />
              {!isCollapsed && "Home"}
            </Text>
          </Link>

          {role !== "User" && (
            <Link to="/whitelabel">
              <Text
                fontSize="lg"
                display="flex"
                alignItems="center"
                justifyContent={isCollapsed ? "center" : "flex-start"}
                _hover={{
                  fontSize: isCollapsed ? "lg" : "xl",
                  color: hoverColor,
                }}
                transition={transitionStyle}
                fontWeight={500}
              >
                <Icon
                  as={FaTools}
                  color={defaultColor}
                  boxSize={iconSize}
                  mr={isCollapsed ? 0 : 2}
                  _hover={{
                    color: hoverColor,
                    transition: transitionStyle,
                  }}
                />
                {!isCollapsed && "Customize"}
              </Text>
            </Link>
          )}

          {role !== "User" && (
            <Link to="/call-expense">
              <Text
                fontSize="lg"
                display="flex"
                alignItems="center"
                justifyContent={isCollapsed ? "center" : "flex-start"}
                _hover={{
                  fontSize: isCollapsed ? "lg" : "xl",
                  color: hoverColor,
                }}
                transition={transitionStyle}
                fontWeight={500}
              >
                <Icon
                  as={MdAttachMoney}
                  color={defaultColor}
                  boxSize={iconSize}
                  mr={isCollapsed ? 0 : 2}
                  _hover={{
                    color: hoverColor,
                    transition: transitionStyle,
                  }}
                />
                {!isCollapsed && "Expenses"}
              </Text>
            </Link>
          )}

          <Link to="/analytics">
            <Text
              fontSize="lg"
              display="flex"
              alignItems="center"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              _hover={{
                fontSize: isCollapsed ? "lg" : "xl",
                color: hoverColor,
              }}
              transition={transitionStyle}
              fontWeight={500}
            >
              <Icon
                as={FaFileAlt}
                color={defaultColor}
                boxSize={iconSize}
                mr={isCollapsed ? 0 : 2}
                _hover={{
                  color: hoverColor,
                  transition: transitionStyle,
                }}
              />
              {!isCollapsed && "Reports"}
            </Text>
          </Link>

          <Link to="/alerts">
            <Text
              fontSize="lg"
              display="flex"
              alignItems="center"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              _hover={{
                fontSize: isCollapsed ? "lg" : "xl",
                color: hoverColor,
              }}
              transition={transitionStyle}
              fontWeight={500}
            >
              <Icon
                as={MdOutlineWarningAmber}
                color={defaultColor}
                boxSize={iconSize}
                mr={isCollapsed ? 0 : 2}
                _hover={{
                  color: hoverColor,
                  transition: transitionStyle,
                }}
              />
              {!isCollapsed && "Alerts"}
            </Text>
          </Link>

          <Link to="/settings">
            <Text
              fontSize="lg"
              display="flex"
              alignItems="center"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              _hover={{
                fontSize: isCollapsed ? "lg" : "xl",
                color: hoverColor,
              }}
              transition={transitionStyle}
              fontWeight={500}
            >
              <Icon
                as={MdSettings}
                color={defaultColor}
                boxSize={iconSize}
                mr={isCollapsed ? 0 : 2}
                _hover={{
                  color: hoverColor,
                  transition: transitionStyle,
                }}
              />
              {!isCollapsed && "Settings"}
            </Text>
          </Link>

          <Link to="/knowledge-base">
            <Text
              fontSize="lg"
              display="flex"
              alignItems="center"
              justifyContent={isCollapsed ? "center" : "flex-start"}
              _hover={{
                fontSize: isCollapsed ? "lg" : "xl",
                color: hoverColor,
              }}
              transition={transitionStyle}
              fontWeight={500}
            >
              <Icon
                as={LuFiles}
                color={defaultColor}
                boxSize={iconSize}
                mr={isCollapsed ? 0 : 2}
                _hover={{
                  color: hoverColor,
                  transition: transitionStyle,
                }}
              />
              {!isCollapsed && "Files"}
            </Text>
          </Link>

          {/* Role Selection Menu */}
          <Menu>
            <MenuButton
              as={Text}
              fontSize="lg"
              display="flex"
              alignItems="center"
              justifyContent={isCollapsed ? "center" : "flex-start"} // Center aligns content in collapsed mode
              _hover={{ color: hoverColor, transform: "scale(1.05)" }}
              transition={transitionStyle}
              cursor="pointer"
              fontWeight={500}
              width="100%" // Ensures full width for alignment
            >
              <Stack
                direction="row"
                spacing={isCollapsed ? 0 : 2}
                alignItems="center"
                justifyContent={isCollapsed ? "center" : "flex-start"}// Ensures content is centered in collapsed mode
                width="100%" // Ensures full width for flex alignment
              >
                <Icon
                  as={MdOutlineAdminPanelSettings}
                  color={defaultColor}
                  boxSize={iconSize}
                  _hover={{
                    color: hoverColor,
                    transition: transitionStyle,
                  }}
                />
                {!isCollapsed && (
                  <Text color={hoverColor}>Role</Text> // Text element added for label
                )}
                {!isCollapsed && (
                  <Icon as={MdArrowDropDown} color={hoverColor} />
                )}
              </Stack>
            </MenuButton>
            <MenuList bg="white" color="black">
              <MenuItem
                onClick={() => handleRoleSelection("Admin")}
                icon={<Icon as={MdManageAccounts} />}
                _hover={{ bg: "gray.900", color: hoverColor }}
              >
                Admin
              </MenuItem>
              <MenuItem
                onClick={() => handleRoleSelection("User")}
                icon={<Icon as={FaUserFriends} />}
                _hover={{ bg: "gray.700", color: hoverColor }}
              >
                User
              </MenuItem>
              <MenuItem
                onClick={() => handleRoleSelection("Agency")}
                icon={<Icon as={CgOrganisation} />}
                _hover={{ bg: "gray.700", color: hoverColor }}
              >
                Agency
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
