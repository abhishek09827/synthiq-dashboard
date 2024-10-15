// LineChartComponent.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = ({ callVolumeTrends }) => {
  // Handle cases where callVolumeTrends might be empty
  if (!callVolumeTrends || callVolumeTrends.length === 0) {
    return <p style={{ color: 'white' }}>No call volume data available.</p>;
  }

  // Sort the trends by date if necessary
  const sortedTrends = callVolumeTrends.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Prepare the data for the chart
  const labels = sortedTrends.map(trend => new Date(trend.date).toLocaleDateString());
  const dataValues = sortedTrends.map(trend => trend.volume);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Call Volume',
        data: dataValues,
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
        fill: true,  // Ensures the area under the line is filled
        tension: 0.4,  // Curved lines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Font color for legend text
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Call Volume: ${context.raw}`, // Adjusting label format
        },
        titleColor: 'white', // Font color for tooltip title
        bodyColor: 'white', // Font color for tooltip body
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // Font color for x-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color
        },
      },
      y: {
        ticks: {
          color: 'white', // Font color for y-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light grid line color
        },
      },
    },
  };

  return (
    <div>
      {/* Optional Title */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
