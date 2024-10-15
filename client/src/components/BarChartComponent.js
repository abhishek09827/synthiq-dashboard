import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ callOutcomes }) => {
  const chartRef = useRef(null);

  // Prepare the data for the chart
  const labels = Object.keys(callOutcomes);
  const dataValues = Object.values(callOutcomes);

  // Creating gradient color for bars
  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.5)');
    gradient.addColorStop(1, 'rgba(75, 192, 192, 1)');
    return gradient;
  };

  const data = {
    labels: labels.map(label =>
      label.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    ), // Capitalize and format labels
    datasets: [
      {
        label: 'Call Outcomes',
        data: dataValues,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          return createGradient(ctx, chartArea);
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: 'white',
        bodyColor: 'white',
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.raw} occurrences`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 60, // Set maximum value slightly above the highest count
        ticks: {
          color: 'white',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return (
    <div style={{ height: '500px', width: '100%' }}> {/* Increased height */}
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

// Sample data passed to the component
const getCallOutcomes = {
  "customer-ended-call": 59,
  "exceeded-max-duration": 1,
  "customer-did-not-answer": 11,
  "silence-timed-out": 13,
  "assistant-ended-call": 4,
  "phone-call-provider-closed-websocket": 5,
  "customer-did-not-give-microphone-permission": 5
};

// Example usage of the BarChartComponent
const App = () => {
  return (
    <div>
      <h1>Call Outcomes Chart</h1>
      <BarChartComponent callOutcomes={getCallOutcomes} />
    </div>
  );
};

export default App;
