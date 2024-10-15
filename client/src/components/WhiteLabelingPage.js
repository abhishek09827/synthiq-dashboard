import { useState } from 'react';
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
  Flex,
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';

const WhiteLabelingPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [logoUrl, setLogoUrl] = useState(() => localStorage.getItem('logoUrl') || '');
  const [logoSize, setLogoSize] = useState(() => localStorage.getItem('logoSize') || '40');
  const [primaryColor, setPrimaryColor] = useState('#00BFFF');
  const [headingText, setHeadingText] = useState(() => localStorage.getItem('customHeading') || '');
  const [customUrl, setCustomUrl] = useState(() => localStorage.getItem('customUrl') || '');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result); // Set the logo URL to the result of FileReader
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('customHeading', headingText);
    localStorage.setItem('logoUrl', logoUrl);
    localStorage.setItem('logoSize', logoSize);
    localStorage.setItem('customUrl', customUrl);
    localStorage.setItem('primaryColor', primaryColor);
    setSuccessMessage('Customization settings saved successfully!');
  };

  return (
    <ColorModeProvider>
      <Flex direction="column" height="100vh">
        <Header defaultHeadingText={headingText} /> {/* Pass the defaultHeadingText prop */}

        <Flex flex="1">
          <Sidebar />

          <Box flex="1" p={5}>
            <VStack spacing={4} w="100%" maxW="md" mx="auto" mt={10}>
              <Heading>White Labeling Settings</Heading>

              <FormControl id="headingText">
                <FormLabel>Custom Heading</FormLabel>
                <Input
                  type="text"
                  value={headingText}
                  onChange={(e) => setHeadingText(e.target.value)}
                  placeholder="Enter custom heading"
                />
              </FormControl>

              {successMessage && <Alert status="success">{successMessage}</Alert>}

              <FormControl id="logoUpload">
                <FormLabel>Upload Dashboard Logo</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </FormControl>

              <FormControl id="logoSize">
                <FormLabel>Logo Size (in px)</FormLabel>
                <Input
                  type="number"
                  value={logoSize}
                  onChange={(e) => setLogoSize(e.target.value)}
                  placeholder="Enter logo size in px"
                />
              </FormControl>

              <FormControl id="customUrl">
                <FormLabel>Custom Website Address</FormLabel>
                <Input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="Enter custom website address"
                />
              </FormControl>

              <FormControl id="primaryColor">
                <FormLabel>Primary Color</FormLabel>
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
        </Flex>
      </Flex>
    </ColorModeProvider>
  );
};

export default WhiteLabelingPage;
