import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useMediaQuery,
  Icon,
  Image,
} from "@chakra-ui/react";
import { IoNotificationsCircle } from "react-icons/io5";
import {
  FaRegUser,
  FaHome,
  FaCog,
  FaChartPie,
  FaExclamationCircle,
  FaDollarSign,
  FaTools,
  FaFileAlt,
} from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RoleContext } from "@/components/RoleContext";
import { MdAttachMoney, MdOutlineAdminPanelSettings, MdSettings } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineWarningAmber } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useAlerts } from "./alertsContext";

const Header = () => {
  const fontColor = "#1662D4";
  const hoverColor = "#ffffff";
  const bgColor = "black";
  const transitionStyle = "all 0.3s ease-in-out";
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { role, changeRole } = useContext(RoleContext);
  const [logoUrl, setLogoUrl] = useState("");
  const { alerts } = useAlerts();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLogoUrl = localStorage.getItem("logoUrl");
    if (savedLogoUrl) {
      setLogoUrl(savedLogoUrl);
    }
  }, []);

  const handleLogout = () => {
    alert("You have logged out!");
  };

  const handleRoleSelection = (selectedRole) => {
    changeRole(selectedRole);
    if (selectedRole === "Admin") {
      navigate("/admin");
    }
  };

  return (
    <Box as="header" bg={bgColor} color={fontColor} p={4} position="relative" width="100%" shadow="lg">
      <Flex align="center" justify="space-between">
        <Flex align="center" flexGrow={1}>
          {isMobile && logoUrl ? (
            <Image src={logoUrl} alt="Logo" boxSize="40px" objectFit="contain" />
          ) : (
            <Text fontSize="xl" fontWeight="bold" color={fontColor}>
              {/* Logo text */}
            </Text>
          )}
        </Flex>

        <Flex align="center" gap={4}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<IoNotificationsCircle />}
              fontSize="2.5rem"
              color={fontColor}
              variant="ghost"
              aria-label="Notifications"
              p={2}
              _hover={{ color: hoverColor, transform: "scale(1.2)" }}
              transition={transitionStyle}
            />
            <MenuList bg={bgColor} color={fontColor}>
              {alerts && alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <MenuItem key={index} _hover={{ bg: "gray.700" }} bg="black" color="white">
                    {`${alert.name}: Threshold ${alert.threshold} (Active: ${alert.active ? "Yes" : "No"})`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem _hover={{ bg: "gray.700" }} bg="black" color="white">
                  No new alerts
                </MenuItem>
              )}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaUser />}
              fontSize="2rem"
              color={isHovered ? hoverColor : fontColor}
              variant="ghost"
              p={2}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              _hover={{ color: hoverColor, transform: "scale(1.2)" }}
              transition={transitionStyle}
            />
            <MenuList bg={bgColor} color={fontColor}>
              <MenuItem _hover={{ bg: "gray.700" }} bg="black" color="white">
                Profile
              </MenuItem>
              <MenuItem _hover={{ bg: "gray.700" }} bg="black" color="white" onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isMobile && (
        <Flex direction="row" align="center" justify="space-around" p={2} bg={bgColor} shadow="md" mt={2}>
          {[
            { to: "/", label: "Home", icon: <FaHome /> },
            ...(role !== "User" ? [
              { to: "/whitelabel", label: "Customize", icon: <FaTools /> },
              { to: "/call-expense", label: "Expenses", icon: <MdAttachMoney /> }
            ] : []),
            { to: "/analytics", label: "Reports", icon: <FaFileAlt /> },
            { to: "/alerts", label: "Alerts", icon: <MdOutlineWarningAmber /> },
            { to: "/settings", label: "Settings", icon: <MdSettings /> }
          ].map(({ to, label, icon }) => (
            <Link key={label} to={to} style={{ color: fontColor, textDecoration: 'none' }}>
              <IconButton
                aria-label={label}
                icon={icon}
                variant="ghost"
                color={fontColor}
                _hover={{ color: hoverColor, transform: "scale(1.2)" }}
                transition={transitionStyle}
              />
            </Link>
          ))}

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MdOutlineAdminPanelSettings />}
              variant="ghost"
              color={fontColor}
              aria-label="Select Role"
              _hover={{ color: hoverColor, transform: "scale(1.2)" }}
              transition={transitionStyle}
            />
            <MenuList bg="white" color="black">
              {["Admin", "User", "Agency"].map((roleOption) => (
                <MenuItem
                  key={roleOption}
                  onClick={() => handleRoleSelection(roleOption)}
                  icon={roleOption === "Admin" ? <MdManageAccounts /> : roleOption === "User" ? <FaUserFriends /> : <CgOrganisation />}
                  _hover={{ bg: "gray.900", color: hoverColor }}
                >
                  {roleOption}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Box>
  );
};

export default Header;
