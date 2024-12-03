"use client";
import { useState, useEffect } from "react";
import { Box, Flex, Grid, Stack, Text } from "@chakra-ui/react";
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
  const [primaryColor, setPrimaryColor] = useState(
    () => localStorage.getItem("primaryColor") || "#00BFFF"
  );

  const cardBg = primaryColor;
  const borderColor = "gray.700";
  const fontColor = "white";
  const headingColor = "#1662D4";
  const hoverShadowColor = "blue.500";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCalls();
        setData(result);

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

    const handleColorChange = () => {
      const color = localStorage.getItem("primaryColor") || "#00BFFF";
      setPrimaryColor(color); // Update state instead of redeclaring
    };

    window.addEventListener("storage", handleColorChange);

    return () => {
      window.removeEventListener("storage", handleColorChange);
    };
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
    "Our analytics dashboard empowers you to monitor and optimize performance seamlessly.",
    "Track, analyze, and elevate your metrics with our intuitive analytics dashboard.",
    "Get real-time insights and actionable data, tailored to your business needs.",
    "Unlock the full potential of your operations with powerful analytics at your fingertips.",
    "Designed for businesses looking to enhance their data-driven decision-making processes.",
    "Stay ahead of the curve with our advanced analytics tools and reporting features.",
  ];

  const footerText = "Quotes to inspire and motivate you daily.";

  return (
    <Box
      maxWidth="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bg="black"
      overflowX="hidden"
    >
      <Header headingText={headingText} zIndex="100" />

      <Flex flex="1">
        <Box
          display={{ base: "none", md: "block" }}
          position="fixed"
          top="0"
          left="0"
          h="100vh"
          w="250px"
          zIndex="200"
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
          ml={{ base: 0, md: "250px" }}
          maxWidth="100%"
        >
          <Stack spacing={8} flex="1">
            {/* Analytics Overview - Full Width */}
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

            {/* Graph Overview - Below Analytics Overview */}
            <Box
              border="1px"
              borderColor={borderColor}
              p={8}
              borderRadius="lg"
              bg="black"
              overflowX={{ base: "auto", md: "visible" }}
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
                
              </Text>
              <Grid
                templateColumns={{ base: "min(600px, 100%)", md: "1fr 1fr" }}
                gap={8}
                alignItems="center"
              >
                <Box width={{ base: "100%", md: "85%" }} mx="auto">
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color={headingColor}
                    mb={4} // Add margin to separate it from the chart
                  >
                    Call Volume Trends
                  </Text>
                  <LineChartComponent callVolumeTrends={callVolumeTrends} />
                </Box>
                <Box width={{ base: "100%", md: "40%" }} mx="auto">
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color={headingColor}
                    mb={4} // Add margin to separate it from the chart
                  >
                   Outcome Trends
                  </Text>
                  <PieChartComponent callOutcomes={data?.getCallOutcomes} />
                </Box>
              </Grid>
            </Box>

            {/* Additional Sections */}
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
              ></Text>
              <ShufflingCards
                cards={quotes}
                interval={7000}
                footerContent={footerText}
              />
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
