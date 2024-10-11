// src/AreaChart.js
import React from 'react';
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required components
ChartJS.register(LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AreaChart = ({ labels, chartdata, barsColor, title }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: `${new Date().getFullYear()} ${title} trend`,
        data: chartdata,
        fill: true,
        backgroundColor: barsColor,
        borderColor: barsColor,
        tension: 0.4, // for smooth lines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#e0e0e0',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default AreaChart;
