import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip);

const PieChartComponent = ({ callOutcomes }) => {
  const [pieData, setPieData] = useState({ labels: [], data: [] });

  useEffect(() => {
    if (callOutcomes) {
      // Map callOutcomes data to labels and values for the pie chart
      const labels = Object.keys(callOutcomes);
      const data = Object.values(callOutcomes);
      setPieData({ labels, data });
    }
  }, [callOutcomes]);

  const data = {
    labels: pieData.labels,
    datasets: [
      {
        data: pieData.data,
        backgroundColor: [
          "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff", "#ff9f40", "#c9cbcf",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
        titleColor: "#FF9A00",
        bodyColor: "#FF9A00",
      },
      legend: {
        display: false, // Hides the legend
      },
    },
    cutout: "70%",
  };

  return (
    <Box>
      {pieData.labels.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <Text color="white">No data available</Text>
      )}
    </Box>
  );
};

export default PieChartComponent;
