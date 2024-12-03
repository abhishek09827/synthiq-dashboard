import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  ColorModeProvider,
  useColorMode,
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const WhiteLabelingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logoUrl, setLogoUrl] = useState(() => localStorage.getItem("logoUrl") || "");
  const [logoSize, setLogoSize] = useState(() => localStorage.getItem("logoSize") || "40");
  const [primaryColor, setPrimaryColor] = useState("#00BFFF");
  const [headingText, setHeadingText] = useState(() => localStorage.getItem("customHeading") || "");
  const [customUrl, setCustomUrl] = useState(() => localStorage.getItem("customUrl") || "");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleSave = () => {
    localStorage.setItem("customHeading", headingText);
    localStorage.setItem("logoUrl", logoUrl);
    localStorage.setItem("logoSize", logoSize);
    localStorage.setItem("customUrl", customUrl);
    localStorage.setItem("primaryColor", primaryColor);
    setSuccessMessage("Customization settings saved successfully!");
  };

  return (
    <>
      {/* Import Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap');
      `}</style>

      <ColorModeProvider>
        <Flex direction="column" height="100vh">
          <Flex flex="1">
            {/* Sidebar logic */}
            {!isMobile || isSidebarOpen ? (
              <Box position={isMobile ? "absolute" : "sticky"} top="0" zIndex="100">
                <Sidebar />
              </Box>
            ) : null}

            <Box flex="1">
              <Header /> {/* Header below Sidebar */}

              <Box p={5}>
                <VStack
                  spacing={4}
                  w="100%"
                  maxW="md"
                  mx="auto"
                  mt={10}
                  fontFamily="'Inter', sans-serif"
                >
                  <Heading fontWeight="500">White Labeling Settings</Heading>

                  <FormControl id="headingText">
                    <FormLabel fontWeight="300">Custom Heading</FormLabel>
                    <Input
                      type="text"
                      value={headingText}
                      onChange={(e) => setHeadingText(e.target.value)}
                      placeholder="Enter custom heading"
                    />
                  </FormControl>

                  {successMessage && (
                    <Alert status="success" bg="white" color="black">
                      <AlertIcon />
                      <AlertTitle fontWeight="300">{successMessage}</AlertTitle>
                    </Alert>
                  )}

                  <FormControl id="logoUrl">
                    <FormLabel fontWeight="300">Dashboard Logo URL</FormLabel>
                    <Input
                      type="text"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="Enter logo URL"
                    />
                  </FormControl>

                  <FormControl id="logoSize">
                    <FormLabel fontWeight="300">Logo Size (in px)</FormLabel>
                    <Input
                      type="number"
                      value={logoSize}
                      onChange={(e) => setLogoSize(e.target.value)}
                      placeholder="Enter logo size in px"
                    />
                  </FormControl>

                  <FormControl id="customUrl">
                    <FormLabel fontWeight="300">Custom Website Address</FormLabel>
                    <Input
                      type="text"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="Enter custom website address"
                    />
                  </FormControl>

                  <FormControl id="primaryColor">
                    <FormLabel fontWeight="300">Primary Color</FormLabel>
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                    />
                  </FormControl>

                  <Button colorScheme="blue" onClick={handleSave}>
                    Save Customizations
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </ColorModeProvider>
    </>
  );
};

export default WhiteLabelingPage;
