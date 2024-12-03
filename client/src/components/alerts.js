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
  Select,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Global as EmotionGlobal } from "@emotion/react";
import { useAlerts } from "./alertsContext"; // Import alerts context

export default function AlertsPage() {
  const { alerts, setAlerts } = useAlerts(); // Use alerts from context
  const [newAlert, setNewAlert] = useState({
    name: "",
    threshold: "",
    thresholdType: "day",
    thresholdMeasure: "calls",
    active: false,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const cardBg = "rgba(10, 10, 25, 0.9)";
  const borderColor = "gray.600";
  const fontColor = "white";
  const hoverColor = "#1662D4";
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
    setNewAlert({ name: "", threshold: "", thresholdType: "day", thresholdMeasure: "calls", active: false });
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
    <Box maxWidth="100vw" minHeight="100vh" display="flex" flexDirection="column" bg="black">
      <EmotionGlobal
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      />
      <Header alerts={alerts} zIndex="100" />
      <Flex flex="1">
        <Box display={{ base: "none", md: "block" }} position="fixed" top="0" left="0" h="100vh" w="250px" zIndex="200">
          <Sidebar />
        </Box>

        <Box
          as="main"
          flex="1"
          p={8}
          display="flex"
          flexDirection="column"
          ml={{ base: 0, md: "250px" }}
          height={{ base: "100vh", md: "auto" }}
          maxWidth={{ base: "90%", md: "auto" }}
          mx="auto"
        >
          <Flex flex="1" display="flex" flexDirection="column" gap={8}>
            <Box
              border="1px"
              borderColor={borderColor}
              p={8}
              borderRadius="lg"
              bg={cardBg}
              shadow="2xl"
              transition="all 0.3s"
              _hover={{ shadow: `0 0 10px 2px ${hoverColor}` }}
            >
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                mb={6}
                color={fontColor}
                fontFamily="Inter"
                _hover={{ color: hoverColor }}
              >
                Custom Alert Configuration
              </Text>

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
                  fontWeight="300"
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
                  fontWeight="300"
                />
                
                {/* Threshold Type Selection */}
                <Select
                  placeholder="Select Threshold Type"
                  value={newAlert.thresholdType}
                  onChange={(e) => setNewAlert({ ...newAlert, thresholdType: e.target.value })}
                  bg="gray.800"
                  color={fontColor}
                  _hover={{ color: hoverColor }}
                >
                  <option value="day" style={{ backgroundColor: "black", color: "white" }}>Day</option>
                  <option value="week" style={{ backgroundColor: "black", color: "white" }}>Week</option>
                </Select>

                {/* Threshold Measure Selection */}
                <Select
                  placeholder="Select Threshold Measure"
                  value={newAlert.thresholdMeasure}
                  onChange={(e) => setNewAlert({ ...newAlert, thresholdMeasure: e.target.value })}
                  bg="gray.800"
                  color={fontColor}
                  _hover={{ color: hoverColor }}
                >
                  <option value="calls" style={{ backgroundColor: "black", color: "white" }}>Number of Calls </option>
                  <option value="amount" style={{ backgroundColor: "black", color: "white" }}>Amount </option>
                </Select>

                <Flex alignItems="center" color={fontColor}>
                  <Text mr={4} _hover={{ color: hoverColor }} fontWeight="300">
                    Active:
                  </Text>
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
                  width="full"
                >
                  {editingIndex !== null ? "Update Alert" : "Add Alert"}
                </Button>
              </Stack>

              <TableContainer>
                <Table variant="simple" size="md" bg={cardBg} borderRadius="lg">
                  <Thead bg={tableHeaderBg}>
                    <Tr>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Name</Th>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Threshold</Th>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Type</Th>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Measure</Th>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Active</Th>
                      <Th color={fontColor} borderBottomColor={borderColor} _hover={{ color: hoverColor }}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {alerts.map((alert, index) => (
                      <Tr key={index} _hover={{ bg: hoverBg }}>
                        <Td color={fontColor} _hover={{ color: hoverColor }}>{alert.name}</Td>
                        <Td color={fontColor} _hover={{ color: hoverColor }}>{alert.threshold}</Td>
                        <Td color={fontColor} _hover={{ color: hoverColor }}>{alert.thresholdType}</Td>
                        <Td color={fontColor} _hover={{ color: hoverColor }}>{alert.thresholdMeasure}</Td>
                        <Td color={fontColor} _hover={{ color: hoverColor }}>{alert.active ? "Yes" : "No"}</Td>
                        <Td>
                          <IconButton icon={<CiEdit />} onClick={() => handleEditAlert(index)} mr={2} colorScheme="yellow" aria-label="Edit alert" />
                          <IconButton icon={<MdDelete />} onClick={() => handleDeleteAlert(index)} colorScheme="red" aria-label="Delete alert" />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
