"use client";
import { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Switch,
  IconButton,
  TableContainer,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    { name: "Call Cost Alert", threshold: 100, active: true },
    { name: "Duration Alert", threshold: 60, active: false },
  ]);
  const [newAlert, setNewAlert] = useState({ name: "", threshold: "", active: false });
  const [editingIndex, setEditingIndex] = useState(null);

  // Blue theme colors with orange hover for text
  const cardBg = "rgba(10, 10, 25, 0.9)";
  const borderColor = "gray.600";
  const fontColor = "white"; // Blue theme font color
  const hoverColor = "#1662D4"; // Orange color on hover for text
  const tableHeaderBg = "#1a202c";
  const hoverBg = "#2d3748";

  const handleAddAlert = () => {
    if (editingIndex !== null) {
      const updatedAlerts = [...alerts];
      updatedAlerts[editingIndex] = newAlert;
      setAlerts(updatedAlerts);
      setEditingIndex(null);
    } else {
      setAlerts([...alerts, newAlert]);
    }
    setNewAlert({ name: "", threshold: "", active: false });
  };

  const handleEditAlert = (index) => {
    setNewAlert(alerts[index]);
    setEditingIndex(index);
  };

  const handleDeleteAlert = (index) => {
    const updatedAlerts = alerts.filter((_, i) => i !== index);
    setAlerts(updatedAlerts);
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="black">
      <Header />
      <Flex flex="1">
        {/* Sticky Sidebar */}
        <Box position="sticky" top="0" h="100vh" zIndex="100">
          <Sidebar />
        </Box>

        <Box as="main" flex="1" p={8} display="flex" flexDirection="column" gap={8}>
          <Stack spacing={8} flex="1">
            {/* Alert Configuration Section */}
            <Box
              border="1px"
              borderColor={borderColor}
              p={8}
              borderRadius="lg"
              bg={cardBg}
              shadow="2xl"
              transition="all 0.3s"
              _hover={{ shadow: `0 0 10px 2px ${hoverColor}` }} // Only shadow turns blue on hover
            >
              <Text fontSize="2xl" fontWeight="bold" mb={6} color={fontColor} _hover={{ color: hoverColor }}>
                Custom Alert Configuration
              </Text>

              {/* Form to add/edit alerts */}
              <Stack spacing={4} mb={6}>
                <Input
                  placeholder="Alert Name"
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                  bg="gray.800"
                  color={fontColor}
                  _hover={{ color: hoverColor }}
                  _placeholder={{ color: "gray.500" }}
                  focusBorderColor={fontColor}
                />
                <Input
                  placeholder="Threshold"
                  value={newAlert.threshold}
                  onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
                  bg="gray.800"
                  color={fontColor}
                  _hover={{ color: hoverColor }}
                  _placeholder={{ color: "gray.500" }}
                  focusBorderColor={fontColor}
                />
                <Flex alignItems="center" color={fontColor}>
                  <Text mr={4} _hover={{ color: hoverColor }}>Active:</Text>
                  <Switch
                    isChecked={newAlert.active}
                    onChange={(e) => setNewAlert({ ...newAlert, active: e.target.checked })}
                    colorScheme="blue"
                  />
                </Flex>
                <Button
                  colorScheme="blue"
                  onClick={handleAddAlert}
                  bg="#1662D4"
                  _hover={{ bg: "#007acc", color: hoverColor }}
                  transition="all 0.3s"
                >
                  {editingIndex !== null ? "Update Alert" : "Add Alert"}
                </Button>
              </Stack>

              {/* Display the alerts in a table */}
              <TableContainer>
                <Table variant="simple" size="md" bg={cardBg} borderRadius="lg">
                  <Thead bg={tableHeaderBg}>
                    <Tr>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Name</Th>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Threshold</Th>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Active</Th>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {alerts.map((alert, index) => (
                      <Tr key={index} _hover={{ bg: hoverBg }}>
                        <Td color={fontColor} _hover={{ color: hoverColor }}>{alert.name}</Td>
                        <Td color={fontColor} _hover={{ color: hoverColor }}>{alert.threshold}</Td>
                        <Td color={fontColor} _hover={{ color: hoverColor }}>{alert.active ? "Yes" : "No"}</Td>
                        <Td>
                          <IconButton
                            icon={<CiEdit />}
                            onClick={() => handleEditAlert(index)}
                            mr={2}
                            colorScheme="yellow"
                            aria-label="Edit alert"
                          />
                          <IconButton
                            icon={<MdDelete />}
                            onClick={() => handleDeleteAlert(index)}
                            colorScheme="red"
                            aria-label="Delete alert"
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
