import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Select,
  HStack,
  Button,
  Spinner,
  Text,
  VStack,
  Stack,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import axios from "axios";
import { Global as EmotionGlobal } from "@emotion/react";

export const ProductTable = () => {
  const [callData, setCallData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("startedat");
  const [sortOrder, setSortOrder] = useState("asc");
  const [timeFilter, setTimeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedCallId, setSelectedCallId] = useState(null);
  const [currency, setCurrency] = useState("USD"); // State for selected currency
  const [provider, setProvider] = useState("vapi");
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Determine user ID and endpoint based on the selected provider
      const userId =
        provider === "vapi"
          ? "user_2nHekPnt5JHC1R2sn5Y1GygO4Id"
          : "user_2mTuXtHhPMncnh6FBcuCvlynvGX";
      const endpoint =
        provider === "vapi"
          ? "http://localhost:3000/api/call-logs"
          : "http://localhost:3000/api/call-logs-retell";

      try {
        const response = await axios.post(
          endpoint,
          { id: userId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data?.callLogs || [];
        setCallData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [provider]);

  const handleProviderChange = (e) => {
    setProvider(e.target.value); // Update the provider state
  };

  const convertCurrency = (amount, currency) => {
    const rate = exchangeRates[currency] || 1;
    return (amount * rate).toFixed(2);
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return "$";
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const API_KEY = "9d50780ad3af870c214a64f8bf9461dd";

  const sortData = (data, sortBy, sortOrder) => {
    return [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filterData = (data, timeFilter) => {
    if (!timeFilter) return data;
    return data.filter((call) => {
      const callTime = new Date(call.startedat).getHours();
      if (timeFilter === "morning") return callTime >= 6 && callTime < 12;
      if (timeFilter === "afternoon") return callTime >= 12 && callTime < 18;
      if (timeFilter === "evening") return callTime >= 18 && callTime < 24;
      return true;
    });
  };

  useEffect(() => {
    if (!loading && !error && Array.isArray(callData)) {
      const updatedData = sortData(
        filterData(callData, timeFilter),
        sortBy,
        sortOrder
      );
      setFilteredData(updatedData);
    }
  }, [callData, timeFilter, sortBy, sortOrder, loading, error]);

  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "calls.csv");
    link.click();
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Calls");
    XLSX.writeFile(wb, "calls.xlsx");
  };

  const handleViewDetails = (call) => {
    navigate(`/call/${call.id}`, { state: { callDetails: call } });
  };

  const handleShowFullId = (callId) => {
    setSelectedCallId(callId);
    onOpen();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">Error: {error}</Text>;

  return (
    <>
      <EmotionGlobal
        styles={`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap');
        `}
      />
      <Box
        border="1px"
        borderColor="black"
        p={4}
        borderRadius="lg"
        bg="black"
        shadow="xl"
      >
        <HStack spacing={4} mb={4}>
          <Select
            placeholder="Filter by time"
            onChange={(e) => setTimeFilter(e.target.value)}
            color="white"
            bg="black"
          >
            <option
              value=""
              style={{ backgroundColor: "black", color: "white" }}
            >
              All
            </option>
            <option
              value="morning"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Morning
            </option>
            <option
              value="afternoon"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Afternoon
            </option>
            <option
              value="evening"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Evening
            </option>
          </Select>
          <Select
            placeholder="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
            color="white"
          >
            <option
              value="startedat"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Date
            </option>
            <option
              value="cost"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Cost
            </option>
            <option
              value="endedreason"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Outcome
            </option>
          </Select>

          <Select
            placeholder="Provider API"
            value={provider}
            onChange={handleProviderChange} // Calls the function when the dropdown changes
            color="white"
          >
            <option
              value="vapi"
              style={{ backgroundColor: "black", color: "white" }}
            >
              VAPI
            </option>
            <option
              value="retell"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Retell
            </option>
          </Select>

          <Select
            placeholder="Sort order"
            onChange={(e) => setSortOrder(e.target.value)}
            color="white"
          >
            <option
              value="asc"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Ascending
            </option>
            <option
              value="desc"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Descending
            </option>
          </Select>
          <Select
            onChange={handleCurrencyChange}
            color="white"
            bg="black"
            _placeholder={{ color: "white" }}
            _hover={{ bg: "black" }}
            _focus={{ bg: "black" }}
          >
            <option
              style={{ backgroundColor: "black", color: "white" }}
              value="USD"
            >
              USD ($)
            </option>
            <option
              style={{ backgroundColor: "black", color: "white" }}
              value="EUR"
            >
              EUR (€)
            </option>
            <option
              style={{ backgroundColor: "black", color: "white" }}
              value="GBP"
            >
              GBP (£)
            </option>
          </Select>
        </HStack>

        <HStack spacing={4} mb={4}>
          <Button onClick={handleExportCSV} colorScheme="blue">
            Export CSV
          </Button>
          <Button onClick={handleExportExcel} colorScheme="blue">
            Export Excel
          </Button>
        </HStack>

        {isMobile ? (
          <VStack spacing={4} align="stretch">
            {currentData.map((call) => (
              <Box
                key={call.id}
                p={4}
                border="1px"
                borderColor="gray.600"
                borderRadius="md"
                bg="gray.800"
              >
                {Object.entries({
                  "Call ID": (
                    <>
                      {call.id.slice(0, 8)}...
                      <Button
                        size="xs"
                        variant="link"
                        onClick={() => handleShowFullId(call.id)}
                      >
                        View Full
                      </Button>
                    </>
                  ),
                  Date: new Date(call.startedat).toLocaleDateString(),
                  Time: new Date(call.startedat).toLocaleTimeString(),
                  "Duration (mins)": parseFloat(
                    call.duration_in_minutes
                  ).toFixed(2),
                  Cost: `${getCurrencySymbol()}${convertCurrency(
                    call.cost,
                    currency
                  )}`,
                  Outcome: call.endedreason,
                }).map(([label, value]) => (
                  <HStack key={label} justify="space-between">
                    <Text fontWeight="500" color="gray.400">
                      {label}
                    </Text>
                    <Text color="white">{value}</Text>
                  </HStack>
                ))}
                <Button
                  size="sm"
                  mt={2}
                  colorScheme="blue"
                  onClick={() => handleViewDetails(call)}
                >
                  Details
                </Button>
              </Box>
            ))}
          </VStack>
        ) : (
          <TableContainer>
            <Table
              variant="striped"
              colorScheme="blackAlpha"
              border="1px"
              borderColor="black"
              bg="black"
              color="white"
            >
              <Thead>
                <Tr>
                  <Th
                    color="rgba(255,255,255,0.9)"
                    fontWeight="500"
                    fontFamily="Inter"
                  >
                    Call ID
                  </Th>
                  <Th
                    color="rgba(255,255,255,0.9)"
                    fontWeight="500"
                    fontFamily="Inter"
                  >
                    Date
                  </Th>
                  <Th
                    color="rgba(255,255,255,0.9)"
                    fontWeight="500"
                    fontFamily="Inter"
                  >
                    Time
                  </Th>
                  <Th
                    color="rgba(255,255,255,0.9)"
                    fontWeight="500"
                    fontFamily="Inter"
                  >
                    Duration (mins)
                  </Th>
                  <Th
                    color="rgba(255,255,255,0.9)"
                    fontWeight="500"
                    fontFamily="Inter"
                  >
                    Cost
                  </Th>
                  <Th
                    color="rgba(255,255,255,0.9)"
                    fontWeight="500"
                    fontFamily="Inter"
                  >
                    Outcome
                  </Th>
                  <Th
                    color="rgba(255,255,255,0.9)"
                    fontWeight="500"
                    fontFamily="Inter"
                  >
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentData.map((call, index) => (
                  <Tr key={index} _hover={{ bg: "blackAlpha.700" }}>
                    <Td>
                      {provider === "retell"
                        ? String(call.call_id || "").slice(0, 8) || "N/A"
                        : String(call.id || "").slice(0, 8) || "N/A"}
                      ...
                      <Button
                        size="xs"
                        variant="link"
                        onClick={() =>
                          handleShowFullId(
                            provider === "retell" ? call.call_id : call.id
                          )
                        }
                      >
                        View Full
                      </Button>
                    </Td>
                    <Td>
                      {provider === "retell"
                        ? new Date(call.start_timestamp).toLocaleDateString()
                        : new Date(call.startedat).toLocaleDateString()}
                    </Td>
                    <Td>
                      {provider === "retell"
                        ? new Date(call.start_timestamp).toLocaleTimeString()
                        : new Date(call.startedat).toLocaleTimeString()}
                    </Td>
                    <Td>
                      {provider === "retell"
                        ? (
                            (call.end_timestamp - call.start_timestamp) /
                            60000
                          ).toFixed(2)
                        : parseFloat(call.duration_in_minutes).toFixed(2)}
                    </Td>
                    <Td>
                      {provider === "retell"
                        ? "N/A"
                        : `${getCurrencySymbol()}${convertCurrency(
                            call.cost,
                            currency
                          )}`}
                    </Td>
                    <Td>
                      {provider === "retell"
                        ? call.call_status
                        : call.endedreason}
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        onClick={() => handleViewDetails(call)}
                        colorScheme="blue"
                      >
                        Details
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}

        <HStack justifyContent="space-between" mt={4}>
          <Button
            onClick={prevPage}
            isDisabled={currentPage === 1}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={nextPage}
            isDisabled={currentPage === totalPages}
            colorScheme="blue"
          >
            Next
          </Button>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="black">
          <ModalHeader color="blue">Full Call ID</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">{selectedCallId}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
