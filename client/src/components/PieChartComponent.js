import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import callData from "../pieData"; // Update import to point to pieData.js

ChartJS.register(ArcElement, Tooltip);

const PieChartComponent = () => {
  const [pieData, setPieData] = useState({ labels: [], data: [] });

  useEffect(() => {
    if (callData.length > 0) {
      const outcomeCounts = groupOutcomes(callData); // Group outcomes
      const labels = Object.keys(outcomeCounts); // Get labels (outcomes)
      const data = Object.values(outcomeCounts); // Get data (counts)
      setPieData({ labels, data });
    }
  }, []);

  const data = {
    labels: pieData.labels,
    datasets: [
      {
        label: 'Call Outcomes',
        data: pieData.data,
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40', '#c9cbcf',
        ],
        borderColor: '#fff',
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
        titleColor: '#FF9A00',
        bodyColor: '#FF9A00',
      },
      legend: {
        labels: {
          color: 'white', // Set legend label color to white
        },
      },
    },
    cutout: '70%', // Set cutout for the donut chart
  };

  return (
    <Box>
      {/* Donut Chart */}
      <Box>
        {pieData.labels.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <Text color="white">No data available</Text>
        )}
      </Box>
    </Box>
  );
};

// Group outcomes by count and ensure specific order
const specificOutcomes = [
  'voicemails',
  'time-outs',
  'pipeline-error',
  'no-mic-access',
  'pipeline-anthropic',
  'pipeline-cartesian',
  // Add 'others' for unspecified outcomes
];

const groupOutcomes = (data) => {
  const grouped = data.reduce((acc, curr) => {
    const outcome = specificOutcomes.includes(curr.outcome) ? curr.outcome : 'others';
    acc[outcome] = (acc[outcome] || 0) + 1;
    return acc;
  }, {});

  // Ensure all specific outcomes are included, even if zero count
  specificOutcomes.forEach(outcome => {
    if (!grouped[outcome]) {
      grouped[outcome] = 0; // Assign zero if missing
    }
  });

  return grouped;
};

export default PieChartComponent;
