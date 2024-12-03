// AlertsNotification.js
import { useAlerts } from "@/context/alertsContext";
import { Box, Text, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function AlertsNotification() {
  const { alerts } = useAlerts();

  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="1000" color="white" p={4}>
      <Stack spacing={3}>
        {alerts.map((alert, index) => (
          <Box key={index} bg="blue.600" borderRadius="md" p={3}>
            <Text fontWeight="bold">{alert.name}</Text>
            <Text>Threshold: {alert.threshold}</Text>
            <Text>Status: {alert.active ? "Active" : "Inactive"}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
