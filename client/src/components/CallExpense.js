import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  SimpleGrid,
  VStack,
  Modal,
  Select,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

const CallExpense = () => {
  const [agencyMargin, setAgencyMargin] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [providerAPI, setProviderAPI] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [monthlyMaintenanceCost, setMonthlyMaintenanceCost] = useState("");
  const [billingStartDate, setBillingStartDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [callHistory, setCallHistory] = useState([]);
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  // Slabs state management
  const [slabs, setSlabs] = useState([{ rate: "", minutes: 1000 }]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = "user_2nHekPnt5JHC1R2sn5Y1GygO4Id";
      try {
        const response = await axios.post(
          "http://localhost:3000/api/call-logs",
          { id: userId },
          { headers: { "Content-Type": "application/json" } }
        );

        const data = response.data?.callLogs || [];
        const fetchedAssistants = data.map((log) => ({
          name: log.assistantid || "Default Assistant",
          fee: log.cost || 0.05,
        }));

        setAssistants(fetchedAssistants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAssistantSelect = (assistant) => {
    setSelectedAssistant(assistant.name);
    closeModal();
    toast({
      title: "Assistant Selected",
      description: `${assistant.name} with call fee of ${assistant.fee} selected.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddSlab = () => {
    setSlabs([...slabs, { rate: "", minutes: 1000 }]);
  };

  const handleSlabChange = (index, field, value) => {
    const newSlabs = [...slabs];
    newSlabs[index][field] = value;
    setSlabs(newSlabs);
  };

  const handleCalculate = () => {
    const margin = parseFloat(agencyMargin) || 0;
    const maintenance = parseFloat(monthlyMaintenanceCost) || 0;
    let total = maintenance;

    const selectedAssistantFee =
      assistants.find((assistant) => assistant.name === selectedAssistant)
        ?.fee || 0;

    let remainingMinutes = 3000; // Example: assuming 3000 minutes
    slabs.forEach((slab, index) => {
      const rate =
        parseFloat(slab.rate) || (index === 0 ? selectedAssistantFee : 0);
      const minutes = Math.min(
        remainingMinutes,
        parseInt(slab.minutes) || 1000
      );
      total += rate * minutes;
      remainingMinutes -= minutes;
    });

    total = total + (total * margin) / 100;
    setTotalCost(total);

    setCallHistory((prev) => [
      ...prev,
      {
        assistant: selectedAssistant,
        margin,
        maintenance,
        slabs,
        total,
        currency,
        providerAPI,
        apiKey,
        billingStartDate,
      },
    ]);

    toast({
      title: "Calculation Complete",
      description: `Total cost calculated: $${total.toFixed(2)}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleClearHistory = () => {
    setCallHistory([]);
    toast({
      title: "History Cleared",
      description: "Call history has been cleared.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minHeight="100vh" bg="black" color="white">
      <Flex direction={{ base: "column", md: "row" }} overflow="hidden">
        <Box
          width={{ base: "100%", md: "250px" }}
          bg="black"
          position={{ base: "relative", md: "sticky" }}
          top={{ base: "auto", md: "0" }}
          minHeight={{ base: "auto", md: "100vh" }}
        >
          <Sidebar />
        </Box>

        <Box
          flex="1"
          ml={{ base: 0, md: 4 }}
          p={{ base: 4, md: 8 }}
          overflowY="auto"
          maxHeight={{ base: "calc(100vh - 60px)", md: "auto" }}
        >
          <Header />
          <Flex
            direction="column"
            gap={8}
            overflowY="auto"
            maxWidth="1200px"
            mx="auto"
          >
            <Text
              fontSize={{ base: "lg", md: "2xl" }}
              fontWeight="bold"
              color="#1662D4"
              textAlign="center"
            >
              Call Expense Entry
            </Text>

            <Box
              bg="gray.800"
              p={6}
              borderRadius="lg"
              border="1px"
              borderColor="gray.700"
              maxWidth="800px"
              mx="auto"
            >
              <VStack spacing={6} align="stretch">
                <FormControl>
                  <FormLabel color="white">Assistant</FormLabel>
                  <Button onClick={openModal} colorScheme="blue" width="full">
                    {selectedAssistant ? selectedAssistant : "Select Assistant"}
                  </Button>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel color="white">Agency Margin (%)</FormLabel>
                    <Input
                      type="number"
                      value={agencyMargin}
                      onChange={(e) => setAgencyMargin(e.target.value)}
                      placeholder="Enter agency margin"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="white">
                      Monthly Maintenance Cost
                    </FormLabel>
                    <Input
                      type="number"
                      value={monthlyMaintenanceCost}
                      onChange={(e) =>
                        setMonthlyMaintenanceCost(e.target.value)
                      }
                      placeholder="Enter maintenance cost"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="white">Currency</FormLabel>
                    <Input
                      type="text"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      placeholder="Enter currency"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="white">Provider API</FormLabel>
                    <Select
                      value={providerAPI}
                      onChange={(e) => setProviderAPI(e.target.value)}
                      defaultValue=""
                      bg="gray.700" // Set the background of the dropdown to black
                      color="white"
                      border="1px"
                      borderColor="white"
                      _hover={{ borderColor: "#1662D4" }}
                      _focus={{
                        borderColor: "#1662D4",
                        boxShadow: "0 0 0 1px #1662D4",
                      }}
                      sx={{
                        option: {
                          backgroundColor: "black", // Options background color
                          color: "white",
                          _hover: { backgroundColor: "#1662D4" }, // Highlighted option on hover
                          _selected: { backgroundColor: "#1662D4" }, // Selected option background
                        },
                      }}
                    >
                      <option
                        value=""
                        disabled
                        style={{ backgroundColor: "black" }}
                      >
                        Select Provider API
                      </option>
                      <option value="Vapi">Vapi</option>
                      <option value="Retell">Retell</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel color="white">API Key</FormLabel>
                    <Input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter API key"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="white">Billing Start Date</FormLabel>
                    <Input
                      type="date"
                      value={billingStartDate}
                      onChange={(e) => setBillingStartDate(e.target.value)}
                      placeholder="Select billing start date"
                      bg="gray.700"
                      color="white"
                    />
                  </FormControl>
                </SimpleGrid>

                <Button
                  onClick={handleAddSlab}
                  colorScheme="green"
                  width="full"
                >
                  Add Slab
                </Button>

                {slabs.map((slab, index) => (
                  <SimpleGrid columns={2} spacing={4} key={index}>
                    <FormControl>
                      <FormLabel color="white">
                        Per Minute Slab {index + 1}
                      </FormLabel>
                      <Input
                        type="number"
                        value={slab.rate}
                        onChange={(e) =>
                          handleSlabChange(index, "rate", e.target.value)
                        }
                        placeholder={`Enter rate for slab ${index + 1}`}
                        bg="gray.700"
                        color="white"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel color="white">
                        Minutes for Slab {index + 1}
                      </FormLabel>
                      <Input
                        type="number"
                        value={slab.minutes}
                        onChange={(e) =>
                          handleSlabChange(index, "minutes", e.target.value)
                        }
                        placeholder={`Enter minutes for slab ${index + 1}`}
                        bg="gray.700"
                        color="white"
                      />
                    </FormControl>
                  </SimpleGrid>
                ))}

                <Button
                  colorScheme="blue"
                  width="full"
                  onClick={handleCalculate}
                >
                  Calculate Total
                </Button>
                <Button
                  colorScheme="red"
                  width="full"
                  onClick={handleClearHistory}
                >
                  Clear History
                </Button>
              </VStack>
            </Box>

            {/* New Flex container for the table */}
            <Flex direction="column" maxWidth="800px" mx="auto" mt={8}>
              <Box overflowX="auto">
                <Table colorScheme="gray">
                  <Thead bg="blue.900">
                    <Tr>
                      <Th color="white">Assistant</Th>
                      <Th color="white">Agency Margin</Th>
                      <Th color="white">Maintenance Cost</Th>
                      <Th color="white">Currency</Th>
                      <Th color="white">Provider API</Th>
                      <Th color="white">API Key</Th>
                      <Th color="white">Billing Start Date</Th>
                      <Th color="white">Total Cost</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {callHistory.map((log, index) => (
                      <Tr key={index}>
                        <Td>{log.assistant}</Td>
                        <Td>{log.margin}%</Td>
                        <Td>${log.maintenance}</Td>
                        <Td>{log.currency}</Td>
                        <Td>{log.providerAPI}</Td>
                        <Td>{log.apiKey}</Td>
                        <Td>{log.billingStartDate}</Td>
                        <Td>${log.total.toFixed(2)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent bg="gray.900" color="white">
          <ModalHeader>Select Assistant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {assistants.map((assistant, index) => (
              <Checkbox
                key={index}
                value={assistant.name}
                onChange={() => handleAssistantSelect(assistant)}
              >
                {assistant.name} - ${assistant.fee}/min
              </Checkbox>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CallExpense;
