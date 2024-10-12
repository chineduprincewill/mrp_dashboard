import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ labels, data, barsColor, bgColor, title }) => {

    const chartData = {
        labels: labels,
        datasets: [
          {
            label: `${new Date().getFullYear()} ${title} trend`,
            data: data,
            fill: true,
            backgroundColor: bgColor,
            borderColor: barsColor,
            borderWidth: 1, // Set the thickness of the line here
            tension: 0.4, // for smooth lines
          }
        ],
    };
    
    const options = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: title, // Title for x-axis
          },
        },
        y: {
          title: {
            display: true,
            text: 'Count', // Title for y-axis
          },
          beginAtZero: true, // Start y-axis at 0
        },
      },
      plugins: {
        legend: {
          display: true, // Show legend
        },
        tooltip: {
          enabled: true, // Enable tooltips
        },
      },
    };

    return <Line data={chartData} options={options} />
}

export default LineChart