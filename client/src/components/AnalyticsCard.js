import { Box, Text } from "@chakra-ui/react";

export default function AnalyticsCard({ title, value, bg, shadow, borderRadius, _hover }) {
  return (
    <Box
      bg={bg || "black"} // Explicitly set background to black
      p={6}
      borderRadius={borderRadius || "lg"}
      shadow={shadow || "0px 4px 12px rgba(0, 0, 139, 0.8)"} // Dark blue shadow
      _hover={_hover || { transform: "scale(1.05)", transition: "all 0.3s ease-in-out" }}
      transition="transform 0.3s"
      textAlign="center"
    >
      <Text fontSize="lg" fontWeight="semibold" color="white" mb={2}>
        {title}
      </Text>
      <Text fontSize="3xl" fontWeight="bold" color="white">
        {value}
      </Text>
    </Box>
  );
}
