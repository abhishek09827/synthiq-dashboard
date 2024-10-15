import { useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { 
  Box, 
  Text, 
  Flex, 
  Heading, 
  Divider, 
  VStack, 
  IconButton, 
  useBreakpointValue 
} from "@chakra-ui/react";
import { FaPlay, FaPause } from 'react-icons/fa';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const CallDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const call = location.state?.callDetails; // Get the passed call details

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Ensure the audio is ready to play
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!call) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Text fontSize="xl" color="red.400">Call not found or loading...</Text>
      </Flex>
    );
  }

  const isColumn = useBreakpointValue({ base: true, md: false });
  const blueShadow = "0 4px 6px rgba(66, 153, 225, 0.6)";

  const formattedStartTime = call.startedat ? new Date(call.startedat).toLocaleString() : "N/A";
  const formattedEndTime = call.endedat ? new Date(call.endedat).toLocaleString() : "N/A";

  return (
    <Box>
      <Header />
      <Flex>
        <Sidebar />
        <Box flex="1" p={6} bg="black" minH="100vh">
          <Heading 
            as="h1" 
            size="lg" 
            color="blue.400" 
            mb={4} 
            textAlign="center"
            _hover={{ color: "#1662D4", transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
          >
            Call Details for ID: {call.id}
          </Heading>

          <Divider my={4} borderColor="black" />

          <Flex direction={isColumn ? "column" : "row"} gap={6} justify="space-between">
            {/* Left Container for Call Details */}
            <Box 
              flex="1" 
              bg="black" 
              p={4} 
              borderRadius="md" 
              boxShadow={blueShadow}
              _hover={{ transform: "scale(1.02)", transition: "transform 0.2s ease-in-out" }}
            >
              <VStack align="start" spacing={4}>
                <Box w="100%" p={3} borderRadius="md" bg="black" transition="background 0.2s ease-in-out">
                  <Text fontWeight="bold" color="gray.400" mb={1}>Summary:</Text>
                  <Text color="white">
                    {call.summary || "No summary available for this call."}
                  </Text>
                </Box>

                <Box w="100%" p={3} borderRadius="md" bg="black" transition="background 0.2s ease-in-out">
                  <Flex justify="space-between" mb={1}>
                    <Text fontWeight="bold" color="gray.400">Ended Reason:</Text>
                    <Text color="white">{call.endedreason || "N/A"}</Text>
                  </Flex>
                </Box>

                

                

                

                {/* Call Recording with Play/Pause Icon */}
                <Box 
                  w="100%" 
                  p={3} 
                  borderRadius="md" 
                  bg="black" 
                  transition="background 0.2s ease-in-out"
                >
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold" color="gray.400">Call Recording:</Text>
                    {call.recordingurl ? (
                      <Flex alignItems="center">
                        <audio ref={audioRef} src={call.recordingurl} />
                        <IconButton 
                          aria-label={isPlaying ? "Pause recording" : "Play recording"} 
                          icon={isPlaying ? <FaPause /> : <FaPlay />} 
                          onClick={handlePlayPause} 
                          variant="ghost" 
                          colorScheme="blue"
                        />
                      </Flex>
                    ) : (
                      <Text color="gray.400">N/A</Text>
                    )}
                  </Flex>
                </Box>
              </VStack>
            </Box>

            {/* Right Container for Transcript */}
            <Box 
              flex="1" 
              bg="black" 
              p={4} 
              borderRadius="md" 
              boxShadow={blueShadow}
              _hover={{ transform: "scale(1.02)", transition: "transform 0.2s ease-in-out" }}
            >
              <Text fontWeight="bold" color="gray.400" mb={2}>Transcript:</Text>
              <Text color="white" whiteSpace="pre-wrap">
                {call.transcript || "No transcript available for this call."}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CallDetails;
