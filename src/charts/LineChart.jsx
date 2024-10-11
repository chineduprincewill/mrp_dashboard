import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ labels, data, barsColor, fillColor, title }) => {

    const chartData = {
        labels: labels,
        datasets: [
          {
            label: `${new Date().getFullYear()} ${title} trend`,
            data: data,
            fill: true,
            backgroundColor: fillColor,
            borderColor: barsColor,
            borderWidth: 1, // Set the thickness of the line here
            tension: 0.4, // for smooth lines
          }
        ],
    };
    
    const options = {
        scales: {
            y: {
            beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />
}

export default LineChart