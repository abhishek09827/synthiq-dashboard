import {
  Box,
  Heading,
  Text,
  IconButton,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  HStack,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { FaTrash, FaDownload, FaLink, FaUpload } from "react-icons/fa";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar"; // Adjust the path based on your project structure
import Header from "./Header"; // Adjust the path based on your project structure

const KnowledgeBase = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch files from the backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getFiles");
        if (!response.ok) {
          throw new Error("Failed to fetch files");
        }
        const data = await response.json();
        
        // Transform response data to match your file structure
        const transformedFiles = data.map((file) => ({
          id: file.id,
          name: file.name || "Unnamed File",
          type: file.mimetype.split("/").pop().toUpperCase(),
          createdAt: new Date(file.createdAt).toLocaleDateString(),
          updatedAt: new Date(file.updatedAt).toLocaleDateString(),
          url: file.url,
        }));

        setFiles(transformedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleFileUpload = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      const newFileEntry = {
        id: files.length + 1,
        name: newFile.name,
        type: newFile.name.split(".").pop().toUpperCase(),
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };
      setFiles([...files, newFileEntry]);
    }
  };

  const handleDelete = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert(`Link copied: ${url}`);
  };

  return (
    <Flex direction="row" bg="black" minH="100vh" color="white">
      {/* Sidebar */}
      <Box w="20%" bg="gray.900" position="fixed" h="100vh">
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box w="80%" ml="20%">
        {/* Header */}
        <Box bg="black" p={4} position="sticky" top="0" zIndex="1000">
          <Header />
        </Box>

        {/* Page Content */}
        <Box p={8}>
          <Heading mb={6} textAlign="center" color="#1662D4">
            Knowledge Base
          </Heading>

          {/* Upload Section */}
          <Box
            border="2px dashed #1662D4"
            borderRadius="md"
            p={8}
            textAlign="center"
            mb={8}
            bg="gray.900"
          >
            <VStack spacing={4}>
              <FaUpload size={40} color="#1662D4" />
              <Text color="gray.300">Drag and drop your file here</Text>
              <Text color="gray.300">or</Text>
              <Button as="label" colorScheme="blue" bg="#1662D4" cursor="pointer">
                Select File (PDF, DOCX, TXT)
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  hidden
                  accept=".pdf,.docx,.txt"
                />
              </Button>
            </VStack>
          </Box>

          {/* Files Table */}
          {loading ? (
            <Flex justifyContent="center" alignItems="center" height="200px">
              <Spinner size="xl" color="#1662D4" />
            </Flex>
          ) : (
            <Table variant="simple" bg="gray.900" borderRadius="md">
              <Thead>
                <Tr>
                  <Th color="#1662D4">File Name</Th>
                  <Th color="#1662D4">Type</Th>
                  <Th color="#1662D4">Created At</Th>
                  <Th color="#1662D4">Updated At</Th>
                  <Th color="#1662D4">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {files.map((file) => (
                  <Tr key={file.id}>
                    <Td>{file.name}</Td>
                    <Td>{file.type}</Td>
                    <Td>{file.createdAt}</Td>
                    <Td>{file.updatedAt}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Download"
                          icon={<FaDownload />}
                          bg="#1662D4"
                          color="white"
                          _hover={{ bg: "#1458A7" }}
                          size="sm"
                          onClick={() => handleDownload(file.url)}
                        />
                        <IconButton
                          aria-label="Copy Link"
                          icon={<FaLink />}
                          bg="teal.500"
                          color="white"
                          _hover={{ bg: "teal.600" }}
                          size="sm"
                          onClick={() => handleCopyLink(file.url)}
                        />
                        <IconButton
                          aria-label="Delete"
                          icon={<FaTrash />}
                          bg="red.500"
                          color="white"
                          _hover={{ bg: "red.600" }}
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default KnowledgeBase;
