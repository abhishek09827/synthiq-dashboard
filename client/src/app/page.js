// src/pages/Home.jsx
"use client";
import { useState, useEffect } from "react";
import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AnalyticsCard from "@/components/AnalyticsCard";
import BarChartComponent from "@/components/BarChartComponent";
import LineChartComponent from "@/components/LineChartComponent";
import PieChartComponent from "@/components/PieChartComponent";
import { fetchCalls } from "@/api";
import CostBreakdown from "@/components/CostBreakdown";
import ShufflingCards from "@/components/ShufflingCards";

export default function Home() {
  const [data, setData] = useState([]);
  const [callVolumeTrends, setCallVolumeTrends] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [headingText, setHeadingText] = useState("");
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem("primaryColor") || "#00BFFF"; // Default color
  });

  const cardBg = "black";
  const borderColor = "gray.700";
  const fontColor = "white";
  const headingColor = "#1662D4";
  const hoverShadowColor = "blue.500";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCalls();
        setData(result);

        // Transform callVolumeTrends into an array
        if (result.getCallVolumeTrends) {
          const trendsArray = Object.entries(result.getCallVolumeTrends).map(
            ([date, volume]) => ({ date, volume })
          );
          setCallVolumeTrends(trendsArray);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Text color={fontColor}>Loading...</Text>;
  if (error) return <Text color={fontColor}>Error: {error.message}</Text>;

  const analyticsData = [
    { title: "Total Minutes Used", value: data?.totalMinutes || "N/A" },
    { title: "Total Call Cost", value: `$${data?.totalCallCost || "N/A"}` },
    {
      title: "Average Call Duration",
      value: `${data?.averageCallDuration || "N/A"} mins`,
    },
    {
      title: "Call Volume Trends",
      value: Object.keys(data?.getCallVolumeTrends || {}).length || "0",
    },
    { title: "Peak Hour Analysis", value: `${data?.getPeakHour || "N/A"}:00` },
    {
      title: "Call Outcome Stats",
      value: `Customer-ended calls: ${
        data?.getCallOutcomes?.["customer-ended-call"] || 0
      }`,
    },
  ];

  const callData = [
    { id: "call1", cost: 12.34, duration: 15 },
    { id: "call2", cost: 7.89, duration: 8 },
  ];

  const agentData = [
    { id: "agent1", totalCost: 20.23, totalDuration: 45, callCount: 3 },
    { id: "agent2", totalCost: 30.56, totalDuration: 60, callCount: 5 },
  ];

  const quotes = [
    "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Strive not to be a success, but rather to be of value.",
    "I attribute my success to this: I never gave or took any excuse.",
    "The harder the conflict, the more glorious the triumph.",
  ];

  const cardsContent = quotes.map((quote, idx) => (
    <Box
      bg="black"
      p={6}
      borderRadius="md"
      color="white"
      key={idx}
      textAlign="center"
      fontSize={{ base: "md", md: "lg", lg: "xl" }}
      fontStyle="italic"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _hover={{
        boxShadow: "0 4px 20px blue",
      }}
    >
      "{quote}"
    </Box>
  ));

  return (
    <Box
      maxWidth="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bg="black"
    >
      <Header headingText={headingText} />
      <Flex flex="1">
        <Box
          display={{ base: "none", md: "block" }} // Hide sidebar on mobile
          position="sticky"
          top="0"
          h="100vh"
          zIndex="100"
        >
          <Sidebar />
        </Box>

        <Box
          as="main"
          flex="1"
          p={{ base: 4, md: 8 }}
          display="flex"
          flexDirection="column"
          gap={8}
        >
          <Stack spacing={8} flex="1">
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
              <GridItem height="100%" display="flex" flexDirection="column">
                <Box
                  border="1px"
                  borderColor={borderColor}
                  p={8}
                  borderRadius="lg"
                  bg="black"
                  flex="1"
                  _hover={{
                    boxShadow: "0 4px 20px blue",
                  }}
                >
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="bold"
                    mb={6}
                    color={headingColor}
                  >
                    Analytics Overview
                  </Text>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={8}
                  >
                    {analyticsData.map((item, index) => (
                      <AnalyticsCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        bg={cardBg}
                        color={fontColor}
                        borderColor={borderColor}
                        _hover={{
                          transform: "scale(1.07)",
                          boxShadow: `0 4px 20px ${hoverShadowColor}`,
                          transition: "all 0.4s ease-in-out",
                        }}
                      />
                    ))}
                  </Grid>
                </Box>
              </GridItem>

              <GridItem height="100%" display="flex" flexDirection="column">
                <Box
                  border="1px"
                  borderColor={borderColor}
                  p={8}
                  borderRadius="lg"
                  bg="black"
                  flex="1"
                  _hover={{
                    boxShadow: "0 4px 20px blue",
                  }}
                >
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="bold"
                    mb={6}
                    color={headingColor}
                  >
                    Graph Overview
                  </Text>
                  <Stack spacing={8} flex="1">
                    {/* Pass the callVolumeTrends data to LineChartComponent */}
                    <LineChartComponent callVolumeTrends={callVolumeTrends} />
                    {/* Pass the call data to PieChartComponent */}
                    <PieChartComponent callData={data} />
                  </Stack>
                </Box>
              </GridItem>
            </Grid>

            <Box
              border="1px"
              borderColor={borderColor}
              p={8}
              borderRadius="lg"
              bg="black"
              _hover={{
                boxShadow: "0 4px 20px blue",
              }}
            >
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                mb={6}
                color={headingColor}
              >
                Detailed Graphs
              </Text>
              <Stack spacing={8}>
                {/* Include BarChartComponent only here */}
                <BarChartComponent callVolumeTrends={callVolumeTrends} />
              </Stack>
            </Box>

            <Box
              border="1px"
              borderColor={borderColor}
              p={8}
              borderRadius="lg"
              bg="black"
              _hover={{
                boxShadow: "0 4px 20px blue",
              }}
            >
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                mb={6}
                color={headingColor}
              >
                Call View Stats
              </Text>
              <CostBreakdown callData={callData} agentData={agentData} />
            </Box>

            <Box
              border="1px"
              borderColor={borderColor}
              p={8}
              borderRadius="lg"
              bg="black"
              _hover={{
                boxShadow: "0 4px 20px blue",
              }}
            >
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="bold"
                mb={6}
                color={fontColor}
              >
                Inspirational Quotes
              </Text>
              <ShufflingCards cards={cardsContent} interval={7000} />
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
