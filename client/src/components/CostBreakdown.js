import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { callData, agentData } from "@/data"; // Import callData and agentData dynamically

const CostBreakdownPerCall = ({ callData }) => (
  <Box overflowX="auto">
    <Table
      variant="striped"
      colorScheme="blackAlpha" // Changed to black theme
      size={useBreakpointValue({ base: "sm", md: "md" })}
      border="1px"
      borderColor="black"
      bg="rgba(0,0,0,0.9)"
      color="white"
    >
      <Thead>
        <Tr>
          <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
            Call ID
          </Th>
          <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
            Cost ($)
          </Th>
          <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
            Duration (mins)
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {callData.map((call) => (
          <Tr
            key={call.id}
            _hover={{ bg: "blackAlpha.700" }} // Black hover state for row
            transition="0.2s ease-out"
          >
            <Td
              fontSize="lg" // Bigger font size
              color="white"
              _hover={{ color: "blue.500" }} // Blue color when hovered
              transition="color 0.2s"
            >
              {call.id}
            </Td>
            <Td
              fontSize="lg" // Bigger font size
              color="white"
              _hover={{ color: "blue.500" }} // Blue color when hovered
              transition="color 0.2s"
            >
              ${call.cost.toFixed(2)}
            </Td>
            <Td
              fontSize="lg" // Bigger font size
              color="white"
              _hover={{ color: "blue.500" }} // Blue color when hovered
              transition="color 0.2s"
            >
              {call.duration} mins
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

const CostBreakdownPerAgent = ({ agentData }) => (
  <Box overflowX="auto">
    <Table
      variant="striped"
      colorScheme="blackAlpha" // Changed to black theme
      size={useBreakpointValue({ base: "sm", md: "md" })}
      border="1px"
      borderColor="black"
      bg="rgba(0,0,0,0.9)"
      color="white"
    >
      <Thead>
        <Tr>
          <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
            Agent ID
          </Th>
          <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
            Total Cost ($)
          </Th>
          <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
            Total Duration (mins)
          </Th>
          <Th color="rgba(255,255,255,0.9)" fontWeight="bold">
            Number of Calls
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {agentData.map((agent) => (
          <Tr
            key={agent.id}
            _hover={{ bg: "blackAlpha.700" }} // Black hover state for row
            transition="0.2s ease-out"
          >
            <Td
              fontSize="lg" // Bigger font size
              color="white"
              _hover={{ color: "blue.500" }} // Blue color when hovered
              transition="color 0.2s"
            >
              {agent.id}
            </Td>
            <Td
              fontSize="lg" // Bigger font size
              color="white"
              _hover={{ color: "blue.500" }} // Blue color when hovered
              transition="color 0.2s"
            >
              ${agent.totalCost.toFixed(2)}
            </Td>
            <Td
              fontSize="lg" // Bigger font size
              color="white"
              _hover={{ color: "blue.500" }} // Blue color when hovered
              transition="color 0.2s"
            >
              {agent.totalDuration} mins
            </Td>
            <Td
              fontSize="lg" // Bigger font size
              color="white"
              _hover={{ color: "blue.500" }} // Blue color when hovered
              transition="color 0.2s"
            >
              {agent.callCount}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </Box>
);

const CostBreakdown = () => {
  // useState to fetch the data dynamically
  const [callDetails, setCallDetails] = useState([]);
  const [agentDetails, setAgentDetails] = useState([]);

  // Simulating data fetch on mount (useEffect)
  useEffect(() => {
    setCallDetails(callData); // Fetch call data from the file
    setAgentDetails(agentData); // Fetch agent data from the file
  }, []);

  return (
    <Box
      border="1px"
      borderColor="black" // Black border color
      p={8}
      borderRadius="lg"
      bg="rgba(0,0,0,0.9)"
      shadow="xl"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6} color="#1662D4">
        Cost Breakdown
      </Text>
      <Tabs isFitted variant="enclosed" colorScheme="blackAlpha"> {/* Black theme */}
        <TabList mb="1em">
          <Tab
            _selected={{ bg: "blackAlpha.700", color: "white" }} // Black selected tab
            color="gray.400"
            _hover={{ color: "white" }}
          >
            Per Call
          </Tab>
          <Tab
            _selected={{ bg: "blackAlpha.700", color: "white" }} // Black selected tab
            color="gray.400"
            _hover={{ color: "white" }}
          >
            Per Agent
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CostBreakdownPerCall callData={callDetails} />
          </TabPanel>
          <TabPanel>
            <CostBreakdownPerAgent agentData={agentDetails} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CostBreakdown;
