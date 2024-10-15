import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  HStack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { IoIosArrowDropdownCircle } from "react-icons/io"; // Importing an icon for the dropdown
import Header from "./Header"; // Adjust the import path as needed
import Sidebar from "./Sidebar"; // Adjust the import path as needed

const CallExpense = () => {
  // State variables for the form fields
  const [agencyMargin, setAgencyMargin] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [providerAPI, setProviderAPI] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [monthlyMaintenanceCost, setMonthlyMaintenanceCost] = useState("");
  const [perMinuteCallFee, setPerMinuteCallFee] = useState("");
  const [billingStartDate, setBillingStartDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [callHistory, setCallHistory] = useState([]);
  const toast = useToast();

  // Assistant selection state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState("");

  // Define a custom blue shadow
  const blueShadow = "0 4px 6px rgba(66, 153, 225, 0.6)"; // blue.400 with 60% opacity

  // Define assistant options
  const assistants = [
    { name: "Assistant A", fee: 0.05 },
    { name: "Assistant B", fee: 0.07 },
    { name: "Assistant C", fee: 0.10 },
    // Add more assistants as needed
  ];

  // Modal control functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handler for assistant selection
  const handleAssistantSelect = (assistant) => {
    setSelectedAssistant(assistant.name);
    setPerMinuteCallFee(assistant.fee);
    closeModal();
    toast({
      title: "Assistant Selected",
      description: `${assistant.name} selected with a per minute fee of $${assistant.fee.toFixed(2)}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handler for calculating total cost
  const handleCalculate = () => {
    const margin = parseFloat(agencyMargin);
    const maintenance = parseFloat(monthlyMaintenanceCost);
    const perMinute = parseFloat(perMinuteCallFee);

    // Validate input
    if (
      selectedAssistant.trim() === "" ||
      isNaN(margin) ||
      isNaN(maintenance) ||
      isNaN(perMinute) ||
      margin < 0 ||
      maintenance < 0 ||
      perMinute < 0
    ) {
      toast({
        title: "Invalid input",
        description: "Please select an assistant and enter valid data for all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const fixedMinutes = 100; // Example: 100 minutes
    const total = maintenance + perMinute * fixedMinutes;
    setTotalCost(total);

    // Add to call history
    setCallHistory([
      ...callHistory,
      {
        assistant: selectedAssistant,
        margin,
        maintenance,
        perMinute,
        total,
        currency,
        providerAPI,
        apiKey,
        billingStartDate,
      },
    ]);

    // Reset inputs
    setAgencyMargin("");
    setProviderAPI("");
    setApiKey("");
    setMonthlyMaintenanceCost("");
    setPerMinuteCallFee("");
    setSelectedAssistant("");
    setBillingStartDate("");

    toast({
      title: "Expense Added",
      description: `Total cost calculated: ${currency} ${total.toFixed(2)}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handler to clear call history
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

  // Handler to export call history to CSV
  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        [
          "Assistant",
          "Margin (%)",
          "Maintenance Cost",
          "Per Minute Fee",
          "Total",
          "Currency",
          "Provider API",
          "API Key",
          "Billing Start Date",
        ],
        ...callHistory.map((e) => [
          e.assistant,
          e.margin.toFixed(2),
          e.maintenance.toFixed(2),
          e.perMinute.toFixed(2),
          e.total.toFixed(2),
          e.currency,
          e.providerAPI,
          e.apiKey,
          e.billingStartDate,
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "call_expenses.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box minHeight="100vh" bg="black" color="white">
      {/* Header Section */}
      <Header />

      {/* Main Layout with Sidebar and Content */}
      <Flex direction={{ base: "column", md: "row" }}>
        {/* Sidebar */}
        <Box
          width={{ base: "full", md: "250px" }}
          bg="black"
          display={{ base: "none", md: "block" }}
          position="sticky"
          top="0"
          h="100vh"
          zIndex="100"
        >
          <Sidebar />
        </Box>

        {/* Main Content Area */}
        <Flex
          flex="1"
          p={{ base: 4, md: 8 }}
          direction="column"
          gap={8}
          overflowY="auto"
        >
          {/* Page Title */}
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="bold"
            color="#1662D4"
            textAlign={{ base: "center", md: "left" }}
          >
            Call Expense Entry
          </Text>

          {/* Assistant Selection Modal */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Choose an Assistant to Set the Per Minute Fee
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4} align="stretch">
                  {assistants.map((assistant) => (
                    <Button
                      key={assistant.name}
                      bg="#1662D4"
                      color="white"
                      onClick={() => handleAssistantSelect(assistant)}
                    >
                      {assistant.name} - ${assistant.fee.toFixed(2)} / min
                    </Button>
                  ))}
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={closeModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Call Expense Entry Form */}
          <Box
            bg="black"
            p={6}
            borderRadius="lg"
            boxShadow={blueShadow} // Apply custom blue shadow
            border="1px"
            borderColor="black"
          >
            <VStack spacing={6} align="stretch">
              {/* Assistant Selection */}
              <FormControl>
                <FormLabel color="white">Assistant</FormLabel>
                <Button onClick={openModal} colorScheme="blue" width="full">
                  {selectedAssistant ? selectedAssistant : "Select Assistant"}
                </Button>
              </FormControl>

              {/* Agency Margin Input */}
              <FormControl>
                <FormLabel color="white">Agency Margin (%)</FormLabel>
                <Input
                  type="number"
                  value={agencyMargin}
                  onChange={(e) => setAgencyMargin(e.target.value)}
                  placeholder="Enter agency margin"
                  bg="black"
                  color="white"
                />
              </FormControl>

              {/* Additional Cost Inputs */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {/* Monthly Maintenance Cost */}
                <FormControl>
                  <FormLabel color="white">Monthly Maintenance Cost</FormLabel>
                  <Input
                    type="number"
                    value={monthlyMaintenanceCost}
                    onChange={(e) => setMonthlyMaintenanceCost(e.target.value)}
                    placeholder="Enter monthly cost"
                    bg="black"
                    color="white"
                  />
                </FormControl>

                {/* Per Minute Call Fee */}
                <FormControl>
                  <FormLabel color="white">Per Minute Call Fee</FormLabel>
                  <Input
                    type="number"
                    value={perMinuteCallFee}
                    onChange={(e) => setPerMinuteCallFee(e.target.value)}
                    placeholder="Enter per minute call fee"
                    bg="black"
                    color="white"
                    isReadOnly
                  />
                </FormControl>
              </SimpleGrid>

              {/* Billing Start Date */}
              <FormControl>
                <FormLabel color="white">Billing Start Date</FormLabel>
                <Input
                  type="date"
                  value={billingStartDate}
                  onChange={(e) => setBillingStartDate(e.target.value)}
                  bg="black"
                  color="white"
                />
              </FormControl>

              {/* Calculate Button */}
              <Button
                colorScheme="blue"
                onClick={handleCalculate}
                width={{ base: "full", md: "auto" }}
              >
                Calculate
              </Button>
            </VStack>
          </Box>

          {/* Call History Table */}
          {callHistory.length > 0 && (
            <Box overflowX="auto">
              <Table size="sm" variant="simple" colorScheme="blue">
                <Thead>
                  <Tr>
                    <Th color="white">Assistant</Th>
                    <Th color="white">Margin (%)</Th>
                    <Th color="white">Maintenance</Th>
                    <Th color="white">Per Minute Fee</Th>
                    <Th color="white">Total</Th>
                    <Th color="white">Currency</Th>
                    <Th color="white">API Provider</Th>
                    <Th color="white">API Key</Th>
                    <Th color="white">Billing Start Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {callHistory.map((entry, index) => (
                    <Tr key={index}>
                      <Td>{entry.assistant}</Td>
                      <Td>{entry.margin.toFixed(2)}</Td>
                      <Td>{entry.maintenance.toFixed(2)}</Td>
                      <Td>{entry.perMinute.toFixed(2)}</Td>
                      <Td>{entry.total.toFixed(2)}</Td>
                      <Td>{entry.currency}</Td>
                      <Td>{entry.providerAPI}</Td>
                      <Td>{entry.apiKey}</Td>
                      <Td>{entry.billingStartDate}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}

          {/* Clear History and Export Buttons */}
          <HStack justify="space-between">
            <Button
              colorScheme="red"
              onClick={handleClearHistory}
              width={{ base: "full", md: "auto" }}
            >
              Clear History
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleExportCSV}
              width={{ base: "full", md: "auto" }}
            >
              Export to CSV
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CallExpense;
